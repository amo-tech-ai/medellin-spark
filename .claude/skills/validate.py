#!/usr/bin/env python3
"""
Skills Validation Script
Validates all Claude Skills for Anthropic best practices compliance
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Tuple

# ANSI color codes
GREEN = '\033[0;32m'
RED = '\033[0;31m'
YELLOW = '\033[1;33m'
BLUE = '\033[0;34m'
NC = '\033[0m'  # No Color

class SkillValidator:
    def __init__(self, skills_dir: str):
        self.skills_dir = Path(skills_dir)
        self.total_skills = 0
        self.passed_skills = 0
        self.failed_skills = 0
        self.warnings = 0
        self.results = []

    def validate_skill(self, skill_path: Path) -> Tuple[bool, List[str]]:
        """Validate a single skill file"""
        skill_name = skill_path.parent.name
        issues = []
        passed = True

        try:
            with open(skill_path, 'r', encoding='utf-8') as f:
                content = f.read()
                lines = content.split('\n')

            # Test 1: YAML frontmatter structure
            if not lines[0].strip() == '---':
                issues.append(f"{RED}✗ FAIL{NC}: Missing opening --- for YAML frontmatter")
                passed = False
            else:
                issues.append(f"{GREEN}✓ PASS{NC}: YAML frontmatter opens correctly")

            # Find closing ---
            closing_line = None
            for i, line in enumerate(lines[1:10], 1):
                if line.strip() == '---':
                    closing_line = i
                    break

            if not closing_line:
                issues.append(f"{RED}✗ FAIL{NC}: Missing closing --- for YAML frontmatter")
                passed = False
            else:
                issues.append(f"{GREEN}✓ PASS{NC}: YAML frontmatter closes correctly")

            # Test 2: Name field
            name_match = re.search(r'^name:\s*(.+)$', content, re.MULTILINE)
            if not name_match:
                issues.append(f"{RED}✗ FAIL{NC}: Missing 'name' field")
                passed = False
            else:
                name_value = name_match.group(1).strip()
                if len(name_value) > 64:
                    issues.append(f"{RED}✗ FAIL{NC}: Name too long ({len(name_value)} chars, max 64)")
                    passed = False
                else:
                    issues.append(f"{GREEN}✓ PASS{NC}: Name present and valid ({len(name_value)} chars)")

            # Test 3: Description field
            desc_match = re.search(r'^description:\s*(.+)$', content, re.MULTILINE)
            if not desc_match:
                issues.append(f"{RED}✗ FAIL{NC}: Missing 'description' field")
                passed = False
            else:
                desc_value = desc_match.group(1).strip()
                if len(desc_value) > 1024:
                    issues.append(f"{RED}✗ FAIL{NC}: Description too long ({len(desc_value)} chars, max 1024)")
                    passed = False
                elif len(desc_value) < 50:
                    issues.append(f"{YELLOW}⚠ WARN{NC}: Description short ({len(desc_value)} chars)")
                    self.warnings += 1
                    issues.append(f"{GREEN}✓ PASS{NC}: Description present")
                else:
                    issues.append(f"{GREEN}✓ PASS{NC}: Description present and valid ({len(desc_value)} chars)")

                # Check for first/second person
                if re.search(r'\b(I can|you can|your|I will|I help|you should)\b', desc_value, re.IGNORECASE):
                    issues.append(f"{YELLOW}⚠ WARN{NC}: Description uses first/second person (should be third)")
                    self.warnings += 1
                else:
                    issues.append(f"{GREEN}✓ PASS{NC}: Description uses third-person voice")

            # Test 4: File length
            line_count = len(lines)
            if line_count > 1000:
                issues.append(f"{RED}✗ FAIL{NC}: File too long ({line_count} lines, max 500 recommended)")
                passed = False
            elif line_count > 500:
                issues.append(f"{YELLOW}⚠ WARN{NC}: File long ({line_count} lines, < 500 recommended)")
                self.warnings += 1
                issues.append(f"{GREEN}✓ PASS{NC}: File length acceptable")
            else:
                issues.append(f"{GREEN}✓ PASS{NC}: File length optimal ({line_count} lines)")

            # Test 5: Content after frontmatter
            if closing_line:
                content_lines = [l for l in lines[closing_line+1:] if l.strip()]
                if len(content_lines) < 10:
                    issues.append(f"{RED}✗ FAIL{NC}: Very little content ({len(content_lines)} lines)")
                    passed = False
                else:
                    issues.append(f"{GREEN}✓ PASS{NC}: Substantial content ({len(content_lines)} non-empty lines)")

            # Test 6: No Windows paths
            if '\\' in content and 'newline\\n' not in content and '\\s' not in content:
                issues.append(f"{YELLOW}⚠ WARN{NC}: May contain Windows-style backslashes")
                self.warnings += 1
            else:
                issues.append(f"{GREEN}✓ PASS{NC}: No Windows-style paths")

            # Test 7: Has markdown headers
            if not re.search(r'^#{1,3}\s+', content, re.MULTILINE):
                issues.append(f"{YELLOW}⚠ WARN{NC}: No markdown headers found")
                self.warnings += 1
            else:
                issues.append(f"{GREEN}✓ PASS{NC}: Markdown structure present")

            # Test 8: Has code blocks
            code_blocks = len(re.findall(r'```', content))
            if code_blocks < 2:
                issues.append(f"{YELLOW}⚠ WARN{NC}: Few/no code examples (found {code_blocks//2} blocks)")
                self.warnings += 1
            else:
                issues.append(f"{GREEN}✓ PASS{NC}: Contains code examples ({code_blocks//2} blocks)")

        except Exception as e:
            issues.append(f"{RED}✗ FAIL{NC}: Error reading file: {str(e)}")
            passed = False

        return passed, issues

    def run_validation(self):
        """Run validation on all skills"""
        print("=" * 60)
        print("MEDELLIN SPARK - SKILLS VALIDATION REPORT")
        print("=" * 60)
        print()

        # Find all SKILL.md files
        skill_files = list(self.skills_dir.glob("*/SKILL.md"))

        for skill_path in sorted(skill_files):
            skill_name = skill_path.parent.name
            self.total_skills += 1

            print("━" * 60)
            print(f"{BLUE}Testing: {skill_name}{NC}")
            print("━" * 60)

            passed, issues = self.validate_skill(skill_path)

            for issue in issues:
                print(issue)

            print()
            if passed:
                print(f"{GREEN}✓ {skill_name}: PASSED{NC}")
                self.passed_skills += 1
            else:
                print(f"{RED}✗ {skill_name}: FAILED{NC}")
                self.failed_skills += 1

            self.results.append((skill_name, passed))
            print()

        # Summary
        print("=" * 60)
        print("VALIDATION SUMMARY")
        print("=" * 60)
        print()
        print(f"Total Skills Tested: {self.total_skills}")
        print(f"{GREEN}Passed: {self.passed_skills}{NC}")
        print(f"{RED}Failed: {self.failed_skills}{NC}")
        print(f"{YELLOW}Warnings: {self.warnings}{NC}")
        print()

        # Detailed results
        print("DETAILED RESULTS:")
        for skill_name, passed in self.results:
            status = f"{GREEN}✓ PASS{NC}" if passed else f"{RED}✗ FAIL{NC}"
            print(f"  {status} - {skill_name}")
        print()

        if self.failed_skills == 0:
            print(f"{GREEN}✓ ALL SKILLS PASSED VALIDATION{NC}")
            return 0
        else:
            print(f"{RED}✗ SOME SKILLS FAILED VALIDATION{NC}")
            return 1

if __name__ == "__main__":
    skills_dir = "/home/sk/medellin-spark/.claude/skills"
    validator = SkillValidator(skills_dir)
    exit_code = validator.run_validation()
    exit(exit_code)
