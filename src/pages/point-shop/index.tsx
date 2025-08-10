import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import ProductList from '@/components/shop-screen/product-list'
import UserStatusbar from '@/components/shop-screen/user-statusbar'
import { useUserStatus } from '@/hooks/use-user-status'

function PointShop() {
  const { data: userStatus } = useUserStatus()
  const userTotalPoints = userStatus?.result?.userTotalPoints ?? 0

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageTitle>포인트상점</PageTitle>
      </PageLayOut.HeaderSection>
      <UserStatusbar point={userTotalPoints ?? 0} availablePoint={userTotalPoints ?? 0} />
      <PageLayOut.BodySection>
        <ProductList />
      </PageLayOut.BodySection>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default PointShop
