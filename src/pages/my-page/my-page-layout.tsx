import PageContainer from '@/components/common/page-container'
import PageHeaderSection from '@/components/common/page-header-section'
import PageTitle from '@/components/common/page-title'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MyPageLayoutProps {
  title: string
  background?: 'green' | 'white'
  children: ReactNode
}

function MyPageLayout({ title, background = 'white', children }: MyPageLayoutProps) {
  return (
    <PageContainer>
      <PageHeaderSection className="py-5">
        <PageHeaderSection.BackIcon />
        <PageTitle>{title}</PageTitle>
      </PageHeaderSection>
      <main
        className={cn(
          'relative flex min-h-[calc(100vh-48px)] w-full min-w-[375px] flex-col overflow-scroll px-4 py-6',
          background === 'green' ? 'bg-[#E8F5E9]' : 'bg-white',
        )}
      >
        {children}
      </main>
    </PageContainer>
  )
}

export default MyPageLayout
