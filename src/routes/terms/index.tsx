import { createFileRoute } from '@tanstack/react-router'
import MyPageLayout from '@/components/my-page-screen/my-page-layout'
import { TERMS } from '@/constant/terms'
import { PRIVACYS } from '@/constant/privacys'

export const Route = createFileRoute('/terms/')({
  component: Terms,
})

function TermsSection({
  title,
  items,
}: {
  title: string
  items: { title: string; content: string }[]
}) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-start text-xl font-bold">{title}</h3>
      {items.map((item, index) => (
        <div key={index} className="text-start">
          <h2 className="text-secondary-foreground text-lg">{item.title}</h2>
          <p className="text-lighter-gray text-sm whitespace-pre-wrap">{item.content}</p>
        </div>
      ))}
    </section>
  )
}

function Terms() {
  return (
    <MyPageLayout title="약관 및 정책" className="gap-4">
      <TermsSection title="서비스 이용약관" items={TERMS} />
      <TermsSection title="개인정보처리방침" items={PRIVACYS} />
    </MyPageLayout>
  )
}

export default Terms
