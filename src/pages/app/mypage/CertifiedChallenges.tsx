import MyPageLayout from '@/pages/app/mypage/MyPageLayout'
import Challenge from '@/components/common/Challenge'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { ChallengeTypeSwitch } from '@/components/ChallengeTypeSwitch'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

function CertifiedChallenges() {
  const [challengeType, setChallengeType] = useState<0 | 1>(0)
  const navigate = useNavigate()

  const { data: challenges } = useQuery({
    queryKey: challengesQueryKeys.listJoinedMine().queryKey,
    queryFn: challengesApi.getJoinedChallengesMine,
  })
  const filteredChallenges = challenges?.filter((c) => c.type === challengeType)

  return (
    <MyPageLayout title="인증 챌린지">
      <div className="flex w-full flex-1 flex-col gap-4 p-4">
        <div className="flex w-fit flex-row items-center justify-center rounded-xl border bg-gray-200">
          <ChallengeTypeSwitch on={challengeType === 0} onClick={() => setChallengeType(0)}>
            개인
          </ChallengeTypeSwitch>
          <ChallengeTypeSwitch on={challengeType === 1} onClick={() => setChallengeType(1)}>
            팀
          </ChallengeTypeSwitch>
        </div>
        <div className="flex h-full flex-row items-start justify-start">
          {filteredChallenges?.length ? (
            <Carousel className="w-full">
              <CarouselContent className="-ml-4 items-start justify-start">
                {filteredChallenges.map((challenge) => (
                  <CarouselItem key={challenge.id} className="max-w-[200px] pb-1 pl-4">
                    <Challenge
                      challenge={challenge}
                      onClick={() => navigate(`/my-page/challenges-certify/${challenge.id}`)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <p className="w-full self-center text-center text-xl whitespace-pre-line">
              {`[홈]-[${challengeType === 0 ? '개인' : '팀'} 챌린지]에서\n새로운 챌린지에 참여해주세요.`}
            </p>
          )}
        </div>
      </div>
    </MyPageLayout>
  )
}

export default CertifiedChallenges
