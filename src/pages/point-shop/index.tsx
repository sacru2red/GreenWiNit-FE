import BottomNavigation from '@/components/common/bottom-navigation'
import PageContainer from '@/components/common/page-container'
import PageHeaderSection from '@/components/common/page-header-section'
import PageTitle from '@/components/common/page-title'
import ProductList from '@/components/shop-screen/product-list'
import UserStatusbar from '@/components/shop-screen/user-statusbar'
import { useUserStatus } from '@/hooks/use-user-status'

function PointShop() {
  const { data: userStatus } = useUserStatus()
  const userTotalPoints = userStatus?.result?.userTotalPoints ?? 0

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageTitle>포인트상점</PageTitle>
      </PageHeaderSection>
      <div className="h-[48]px flex w-full items-center justify-center">
        <UserStatusbar point={userTotalPoints ?? 0} availablePoint={userTotalPoints ?? 0} />
      </div>
      <div className="scrollbar-hide flex flex-1 overflow-y-auto">
        <ProductList />
      </div>
      <BottomNavigation />
    </PageContainer>
  )
}

export default PointShop
