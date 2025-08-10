import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { ReactNode } from 'react'
import BottomNavigation from '@/components/common/bottom-navigation'

interface MyPageLayoutProps {
  title: string
  background?: 'green' | 'white'
  showBottomNavigation?: boolean
  children: ReactNode
}

function MyPageLayout({
  title,
  background = 'white',
  showBottomNavigation = false,
  children,
}: MyPageLayoutProps) {
  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageLayOut.HeaderSection.BackIcon />
        <PageTitle>{title}</PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection bg={background === 'green' ? 'theme' : 'form'} className="mt-0">
        {children}
      </PageLayOut.BodySection>
      {showBottomNavigation && (
        <PageLayOut.FooterSection>
          <BottomNavigation />
        </PageLayOut.FooterSection>
      )}
    </PageLayOut.Container>
  )
}

export default MyPageLayout
