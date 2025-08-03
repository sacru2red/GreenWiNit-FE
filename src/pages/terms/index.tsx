import MyPageLayout from '@/pages/my-page/my-page-layout'
import { TERMS } from '@/constant/terms'

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
