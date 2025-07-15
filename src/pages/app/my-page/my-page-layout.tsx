import BottomNavigation from '@/components/common/BottomNav'
import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MyPageLayoutProps {
  title: string
  background?: 'green' | 'white'
  children: ReactNode
  navigationIsExist?: boolean
}

function MyPageLayout({
  title,
  background = 'white',
  children,
  navigationIsExist = false,
}: MyPageLayoutProps) {
  return (
    <PageContainer>
      <PageHeaderSection className="py-5">
        <PageHeaderSection.BackIcon />
        <PageTitle>{title}</PageTitle>
      </PageHeaderSection>

      <main
        className={cn(
          'relative flex min-h-[calc(100vh-48px)] w-full flex-col overflow-scroll px-4 py-6',
          background === 'green' ? 'bg-[#E8F5E9]' : 'bg-white',
          navigationIsExist ? 'min-h-[calc(100vh-125px)]' : 'min-h-[calc(100vh-48px)]',
        )}
      >
        {children}
      </main>

      {navigationIsExist && <BottomNavigation />}
    </PageContainer>
  )
}

export default MyPageLayout
