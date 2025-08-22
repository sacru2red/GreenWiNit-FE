import { usersApi } from '@/api/users'
import UserCard from '@/components/common/user-card'
import { Card, CardAction, CardContent } from '@/components/shadcn/card'
import MyPageLayout from '@/components/my-page-screen/my-page-layout'
import { authStore } from '@/store/auth-store'
import { useNavigate } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { queryClient } from '@/constant/globals'

export const Route = createFileRoute('/my-page/')({
  component: MyPage,
})

function MyPage() {
  const navigate = useNavigate()

  const CARD_ITEMS = [
    {
      category: 'SNS',
      items: [
        {
          title: '인스타그램',
          action: () => window.open('https://www.instagram.com/greenwinit/', '_blank'),
        },
        {
          title: '블로그',
          action: () => window.open('https://blog.naver.com/greenwinit_knock/', '_blank'),
        },
      ],
    },
    {
      category: '고객센터',
      items: [
        {
          title: '1:1문의',
          action: () =>
            window.open(
              'https://docs.google.com/forms/d/e/1FAIpQLSf3XdNHHpF30JI33iR-wj9p2DRzPe6qeEPhXQ29LWXyXHS7rg/viewform',
              '_blank',
            ),
        },
        {
          title: 'FAQ',
          action: () =>
            window.open(
              'https://www.notion.so/FAQ-243adf41302d80f895cbdd4b2947b9fa?source=copy_link',
              '_blank',
            ),
        },
      ],
    },
    {
      category: '환경설정',
      items: [
        { title: '약관 및 정책', action: () => navigate({ to: '/terms' }) },
        { title: '회원정보수정', action: () => navigate({ to: '/my-page/edit-profile' }) },
        { title: '회원탈퇴', action: () => navigate({ to: '/my-page/withdraw' }) },
        {
          title: '로그아웃',
          action: async () => {
            if (authStore.getState().accessToken) {
              await usersApi.logout()
            }
            authStore.getState().initAccessToken()
            queryClient.clear()
            navigate({ to: '/' })
          },
        },
      ],
    },
  ]

  return (
    <MyPageLayout title="마이페이지" showBottomNavigation={true}>
      <div className="flex flex-col gap-8">
        <UserCard />
        {CARD_ITEMS.map((el, i) => {
          return (
            <Card
              key={i}
              className="border-lighter-gray-border h-fit rounded-2xl border bg-white p-0"
            >
              <CardContent className="flex flex-col px-0">
                <button className="flex w-full flex-row items-center justify-center p-4 font-bold">
                  {el.category}
                </button>
                {el.items.map((item, j) => (
                  <button onClick={item.action} key={j}>
                    <CardAction className="flex w-full flex-row items-center border-t-[1px] border-t-[9E9E9E] p-4">
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
                  </button>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </MyPageLayout>
  )
}

export default MyPage
