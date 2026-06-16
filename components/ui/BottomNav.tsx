'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  {
    href: '/scan',
    label: 'Escanear',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2.5 : 1.5}
        stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75V16.5ZM16.5 6.75h.75v.75h-.75v-.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 13.5h.75v.75h-.75v-.75ZM13.5 18.75h.75v.75h-.75v-.75ZM18.75 13.5h.75v.75h-.75v-.75ZM18.75 18.75h.75v.75h-.75v-.75Z" />
      </svg>
    ),
  },
  {
    href: '/history',
    label: 'Historial',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2.5 : 1.5}
        stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    href: '/profile',
    label: 'Perfil',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2.5 : 1.5}
        stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-4">
        {tabs.map(tab => {
          const active = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 min-h-[48px] min-w-[64px] justify-center rounded-xl transition-colors ${
                active ? 'text-emerald-600' : 'text-gray-400'
              }`}
            >
              {tab.icon(active)}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
