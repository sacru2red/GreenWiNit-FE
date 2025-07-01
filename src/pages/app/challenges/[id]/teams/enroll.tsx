import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import Required from '@/components/common/Required'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const TeamEnroll = () => {
  return (
    <PageContainer className="bg-white">
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>팀 등록하기</PageTitle>
      </PageHeaderSection>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col items-start gap-1">
          <span>
            제목
            <Required />
          </span>
          <Input placeholder="내용을 입력해주세요." />
        </div>
        <div className="mt-auto flex">
          <Button size="flex">등록하기</Button>
        </div>
      </div>
    </PageContainer>
  )
}

export default TeamEnroll
