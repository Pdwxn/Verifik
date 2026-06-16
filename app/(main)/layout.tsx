import BottomNav from '@/components/ui/BottomNav'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto">
      <main className="flex-1 pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
