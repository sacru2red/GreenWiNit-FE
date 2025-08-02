import Row from '@/components/common/form/row'
import MyPageLayout from '@/pages/my-page/my-page-layout'

function CertifiedChallengesDetail() {
  const responseDataMock = {
    title: '오늘은 따릉이 타는 날',
    createdAt: '2025-08-01',
    imageUrl: '/img/mock_bicycle.png',
    review: '짱이였음.',
  }

  return (
    <MyPageLayout title="인증 챌린지" navigationIsExist={true}>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Row>
          <h3>제목</h3>
          <div className="w-full rounded-[10px] border border-[#c0c0c0] bg-white p-4 text-start">
            <span className="text-secondary-foreground text-base">{responseDataMock.title}</span>
          </div>
        </Row>
        <Row>
          <h3>날짜</h3>
          <div className="flex w-full gap-3 rounded-[10px] border border-[#c0c0c0] bg-white p-4">
            <img src="/icons/calendar.svg" alt="달력 아이콘" width={24} height={24} />
            <span className="text-secondary-foreground text-base">
              {responseDataMock.createdAt}{' '}
            </span>
          </div>
        </Row>
        <Row>
          <h3>대표 이미지</h3>
          <img src={responseDataMock.imageUrl} alt="대표 이미지" width={340} height={160} />
        </Row>
        <Row>
          <h3>간단한 후기를 남겨주세요.</h3>
          <div className="min-h-20 w-full rounded-[10px] border border-[#c0c0c0] bg-white p-4 text-start">
            <span className="text-secondary-foreground text-sm">{responseDataMock.review}</span>
          </div>
        </Row>
      </div>
    </MyPageLayout>
  )
}

export default CertifiedChallengesDetail
