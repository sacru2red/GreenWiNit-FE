import { createFileRoute } from '@tanstack/react-router'
import MyPageLayout from '@/components/my-page-screen/my-page-layout'
import { TERMS } from '@/constant/terms'

export const Route = createFileRoute('/terms/')({
  component: Terms,
})

function Terms() {
  return (
    <MyPageLayout title="그린위닛 서비스 이용약관">
      {TERMS.map((term, index) => (
        <div key={index} className="mt-5 flex flex-col gap-1 text-start">
          <h2 className="text-secondary-foreground text-lg">{term.title}</h2>
          <p className="text-lighter-gray text-md">{term.content}</p>
        </div>
      ))}
    </MyPageLayout>
  )
}

export default Terms
