import UserCard from '@/components/common/UserCard'
import { Card, CardAction, CardContent } from '@/components/ui/card'
import MyPageLayout from '@/pages/my-page/my-page-layout'
import { useUserStore } from '@/store/userStore'

function MyPage() {
  const logout = useUserStore((s) => s.logout)

  const CARD_ITEMS = [
    {
      category: 'SNS',
      items: [
        { title: '인스타그램', url: '' },
        { title: '블로그', url: '' },
      ],
    },
    {
      category: '고객센터',
      items: [
        { title: '1:1문의', url: '' },
        { title: 'FAQ', url: '' },
      ],
    },
    {
      category: '환경설정',
      items: [
        { title: '약관 및 정책', url: '' },
        { title: '회원정보수정', url: '' },
        { title: '회원탈퇴', url: '' },
        {
          title: '로그아웃',
          url: '',
          action: logout,
        },
      ],
    },
  ]

  return (
    <MyPageLayout title="마이페이지" navigationIsExist={true}>
      <div className="flex flex-col gap-10 px-[13px] py-[33px]">
        <UserCard />
        {CARD_ITEMS.map((el, i) => {
          return (
            <Card key={i} className="h-fit rounded-2xl bg-white p-0 shadow-lg">
              <CardContent className="flex flex-col">
                <button className="flex w-full flex-row items-center justify-center p-4 font-bold">
                  {el.category}
                </button>
                {el.items.map((item, j) => {
                  return (
                    <CardAction
                      key={j}
                      className="flex w-full flex-row items-center border-t-[1px] border-t-[9E9E9E] p-4"
                      onClick={item.action}
                    >
                      <span className="text-title-smaller text-4">{item.title}</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-auto"
                      >
                        <path d="M8 4L14 10L8 16" stroke="#9E9E9E" strokeWidth="2" />
                      </svg>
                    </CardAction>
                  )
                })}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </MyPageLayout>
  )
}

export default MyPage
