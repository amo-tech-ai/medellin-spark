# Professional Profile Page - UI Design Plan

**Page Number**: 03
**Date Created**: January 13, 2025
**Design System**: Medellin AI (Soft Intelligence)
**Status**: Ready for Implementation

---

## 1. Page Overview

### 1.1 Page Name
- **Name**: Professional Profile
- **Route**: `/profile` (own profile), `/profile/:userId` (public view)
- **User Role**: Authenticated users (edit own), public (view others)

### 1.2 Purpose & User Goals
**Primary Purpose**: Professional profile showcasing expertise, presentations, and availability for opportunities.

**User Goals**:
- Primary: Showcase professional experience and pitch deck portfolio
- Secondary: Connect with opportunities, display availability, share contact info

### 1.3 User Personas
1. **Founder**: Showcase pitch decks to attract investors/advisors
2. **Consultant**: Display expertise, past presentations, testimonials
3. **Job Seeker**: Professional profile for startup opportunities

---

## 2. UI Layout Structure

```
ProfilePage
├── ProfileHeader
│   ├── Avatar (120px, circular)
│   ├── Name & Title
│   ├── Location & Availability Badge
│   └── ActionButtons (Edit Profile, Share, Contact)
├── AboutSection
│   ├── Bio (500 chars max)
│   └── Skills Tags
├── PresentationsShowcase
│   ├── "Featured Presentations" heading
│   └── Grid of 3-4 presentation cards
├── ExperienceTimeline
│   ├── Current role
│   ├── Past roles (5 max)
│   └── Education
├── ContactSection
│   ├── Email (optional visibility)
│   ├── LinkedIn, Twitter, Website links
│   └── "Open to opportunities" toggle
└── Footer
```

---

## 3. Design Specifications

### 3.1 Color Palette (Soft Intelligence)
- **Warm Amber** `#F5A623` - Primary CTA (Edit Profile, Contact)
- **Deep Indigo** `#4A5568` - Name, headings
- **Soft Slate** `#718096` - Body text, metadata
- **Muted Teal** `#38B2AC` - "Available" badge, links
- **Pure White** `#FFFFFF` - Background
- **Cloud Gray** `#F7FAFC` - Section backgrounds

### 3.2 Typography
```
Name (h1): 2.5rem (40px) / 700 / Deep Indigo
Title: 1.25rem (20px) / 500 / Soft Slate
Section Headings (h2): 1.5rem (24px) / 600 / Deep Indigo
Body: 1rem (16px) / 400 / Charcoal
```

### 3.3 Responsive Layout
- **Desktop**: 2-column layout (profile left, content right)
- **Tablet**: 1 column, narrower max-width
- **Mobile**: Full-width stack

---

## 4. Key Components

### 4.1 ProfileHeader
**Visual Design**:
```
┌──────────────────────────────────────────────┐
│  ┌─────┐  Sarah Chen                        │
│  │     │  Product Designer & Founder        │
│  │ 👤  │  📍 San Francisco • Available      │
│  │     │  [Edit Profile] [Share] [Contact]  │
│  └─────┘                                     │
└──────────────────────────────────────────────┘
```

**Props**:
```typescript
interface ProfileHeaderProps {
  user: {
    id: string;
    avatarUrl?: string;
    fullName: string;
    title: string;
    location?: string;
    isAvailable: boolean;
  };
  isOwnProfile: boolean;
  onEdit?: () => void;
  onContact?: () => void;
}
```

### 4.2 PresentationsShowcase
**Visual Design**: Grid of 3-4 presentation cards (same as My Presentations page)
- Card shows: Cover image, title, view count, like count
- Click to view full presentation
- "View All Presentations" link at bottom

### 4.3 AvailabilityBadge
```css
background: rgba(56, 178, 172, 0.1) /* Muted Teal 10% */
color: #38B2AC /* Muted Teal */
padding: 4px 12px
border-radius: 999px
font-size: 14px
font-weight: 500
```

---

## 5. Interactive Elements

### 5.1 Edit Profile Button (Own Profile Only)
```css
background: #F5A623 /* Warm Amber */
color: #FFFFFF
padding: 10px 20px
border-radius: 8px
font-weight: 500

/* Hover */
background: #E89714
transform: translateY(-2px)
```

### 5.2 Contact Button (Other Profiles)
Opens modal with:
- Subject line pre-filled
- Message textarea
- User's email (if public) or internal message system
- "Send Message" CTA (Warm Amber)

### 5.3 Share Button
Copies profile URL to clipboard, shows toast confirmation

---

## 6. Content Guidelines

### 6.1 Empty States
**No Presentations**:
- "No presentations yet"
- "Sarah hasn't shared any presentations publicly."

**No Experience**:
- "Add your experience to showcase your background."

### 6.2 Validation Rules
- **Bio**: 500 characters max
- **Name**: Required, 2-50 characters
- **Title**: Optional, 100 characters max
- **Email**: Valid email format (for contact)

---

## 7. Accessibility

- [x] Avatar has alt text: "{Name}'s profile picture"
- [x] Availability badge has aria-label: "Available for opportunities"
- [x] All links keyboard accessible
- [x] Color contrast meets WCAG AA
- [x] Form inputs have labels
- [x] Focus indicators visible (2px Warm Amber outline)

---

## 8. Data Model

```typescript
interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  job_title?: string;
  bio?: string;
  location?: string;
  is_available: boolean;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  email_public: boolean;
  skills: string[];
  created_at: string;
  updated_at: string;
}

interface Experience {
  id: string;
  user_id: string;
  company: string;
  title: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
}
```

---

## 9. API Endpoints

```typescript
// Fetch profile
GET /rest/v1/profiles?user_id=eq.{userId}&select=*,experiences(*),presentations(*)

// Update profile
PATCH /rest/v1/profiles?user_id=eq.{userId}
Body: { full_name, job_title, bio, is_available, ... }

// Send message
POST /rest/v1/rpc/send_message
Body: { to_user_id, subject, message }
```

---

## 10. Real-World Use Cases

### Use Case 1: Founder Showcasing Portfolio
**Steps**:
1. Completes profile with bio, skills, experience
2. Makes 3 best pitch decks public
3. Enables "Available for opportunities"
4. Shares profile URL on LinkedIn
5. Receives messages from investors/advisors
**Outcome**: 5 investor connections in 2 weeks

### Use Case 2: Viewing Another User's Profile
**Steps**:
1. Discovers user via Jobs Marketplace
2. Clicks on user's profile
3. Reviews presentations, experience
4. Clicks "Contact" button
5. Sends message introducing opportunity
**Outcome**: Connection established

---

## 11. Success Metrics

- **Profile Completion Rate**: >80% complete all sections
- **Availability Engagement**: >40% enable "Available" badge
- **Contact Rate**: >20% of profile views result in message
- **Presentation Views**: Avg 50 views per featured presentation

---

**Document Status**: ✅ Complete
**Version**: 1.0
**Created**: January 13, 2025
**Ready for Implementation** 🚀
