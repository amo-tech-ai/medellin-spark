// ==================================================
// PageHeader Component - My Presentations
// ==================================================
// Personalized greeting + stats section at top of page
// Created: January 13, 2025
// Design: Soft Intelligence system

import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import type { PageHeaderProps, GreetingTime } from '@/types/presentations.types';

// ==================================================
// HELPER FUNCTIONS
// ==================================================

/**
 * Get time-based greeting (morning/afternoon/evening)
 */
const getGreetingTime = (): GreetingTime => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
};

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  const months = Math.floor(diffDays / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
};

// ==================================================
// COMPONENT
// ==================================================

export const PageHeader = ({
  userName,
  presentationCount,
  lastEditedAt,
  weeklyActivity,
}: PageHeaderProps) => {
  const [greetingTime, setGreetingTime] = useState<GreetingTime>('morning');

  // Update greeting time on mount
  useEffect(() => {
    setGreetingTime(getGreetingTime());
  }, []);

  // Capitalize first letter of user name
  const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <header className="bg-white border-b border-soft-gray py-8 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Greeting Row */}
        <div className="flex items-start justify-between mb-6">
          {/* Left: Greeting */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deep-indigo mb-2">
              Good {greetingTime}, {displayName}
            </h1>
            <p className="text-base text-soft-slate">
              {presentationCount === 0
                ? "Let's create your first presentation"
                : `You have ${presentationCount} presentation${
                    presentationCount === 1 ? '' : 's'
                  }`}
            </p>
          </div>

          {/* Right: User Avatar (optional) */}
          <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-powder-blue">
            <User className="w-6 h-6 text-deep-indigo" />
          </div>
        </div>

        {/* Stats Row */}
        {presentationCount > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Stat 1: Total Presentations */}
            <div className="bg-cloud-gray rounded-lg p-4">
              <div className="text-2xl font-bold text-deep-indigo mb-1">
                {presentationCount}
              </div>
              <div className="text-sm text-soft-slate">
                Total Presentation{presentationCount === 1 ? '' : 's'}
              </div>
            </div>

            {/* Stat 2: Last Edited */}
            {lastEditedAt && (
              <div className="bg-cloud-gray rounded-lg p-4">
                <div className="text-sm font-semibold text-deep-indigo mb-1">
                  Last Edit
                </div>
                <div className="text-sm text-soft-slate">
                  {formatRelativeTime(lastEditedAt)}
                </div>
              </div>
            )}

            {/* Stat 3: Created This Week */}
            {weeklyActivity && (
              <div className="bg-cloud-gray rounded-lg p-4">
                <div className="text-2xl font-bold text-muted-teal mb-1">
                  +{weeklyActivity.created}
                </div>
                <div className="text-sm text-soft-slate">Created This Week</div>
              </div>
            )}

            {/* Stat 4: Edited This Week */}
            {weeklyActivity && (
              <div className="bg-cloud-gray rounded-lg p-4">
                <div className="text-2xl font-bold text-powder-blue mb-1">
                  {weeklyActivity.edited}
                </div>
                <div className="text-sm text-soft-slate">Edited This Week</div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
