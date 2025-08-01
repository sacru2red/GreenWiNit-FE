import BottomNavigation from '@/components/common/bottom-navigation'
import PageContainer from '@/components/common/page-container'
import ProductList from '@/components/shop-screen/product-list'
import UserStatusbar from '@/components/shop-screen/user-statusbar'
import { useUserStatus } from '@/hooks/use-user-status'

function PointShop() {
  const { data: userStatus } = useUserStatus()
  const userTotalPoints = userStatus?.result?.userTotalPoints ?? 0

  return (
    <PageContainer>
      <div className="flex h-[48px] w-full items-center justify-center bg-white py-8">
        <span className="text-[24px] font-bold text-black">포인트상점</span>
      </div>
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
