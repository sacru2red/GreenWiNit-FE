import { createFileRoute } from '@tanstack/react-router'
import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import ProductList from '@/components/shop-screen/product-list'
import UserStatusbar from '@/components/shop-screen/user-statusbar'
import { useUserPoints } from '@/hooks/use-user-points'

export const Route = createFileRoute('/point-shop/')({
  component: PointShop,
})

function PointShop() {
  const { data: points } = useUserPoints()
  const totalEarnedPoints = points?.result?.totalEarned ?? 0
  const currentPoints = points?.result?.currentBalance ?? 0

  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
        <PageLayOut.HeaderSection>
          <PageTitle>포인트상점</PageTitle>
        </PageLayOut.HeaderSection>
        <PageLayOut.BodySection className="p-0">
          <UserStatusbar accumulatedPoint={totalEarnedPoints} availablePoint={currentPoints} />
          <ProductList />
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default PointShop
