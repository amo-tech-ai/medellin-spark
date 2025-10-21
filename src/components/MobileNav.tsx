import { Home, Calendar, FileText, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, label: 'Events', href: '/dashboard/events' },
    { icon: FileText, label: 'Decks', href: '/dashboard/pitch-decks' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0
        bg-white border-t border-gray-200
        flex justify-around items-center
        h-16 z-50
        md:hidden
        pb-safe-bottom
      "
    >
      {navItems.map(({ icon: Icon, label, href }) => {
        const isActive = location.pathname === href;
        return (
          <Link
            key={href}
            to={href}
            className={`
              flex flex-col items-center justify-center
              min-w-[64px] h-12
              text-xs
              ${isActive ? 'text-primary' : 'text-gray-600'}
            `}
          >
            <Icon className="h-6 w-6 mb-1" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
