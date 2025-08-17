import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { CommonChallenge, GetCertifiedChallengesMineElement } from '@/api/challenges'
import { ChallengeTypeSwitch } from '@/components/challenge-type-switch'
import { Dispatch, SetStateAction } from 'react'
import Challenge from '@/components/common/challenge'
import { ChallengeType } from '@/types/challenge'

interface FilteredChallengesDisplayProps<
  T extends CommonChallenge | GetCertifiedChallengesMineElement,
> {
  challengeType: ChallengeType
  setChallengeType: Dispatch<SetStateAction<ChallengeType>>
  challenges?: T[]
  handleNavigate: (challengeId: number) => void
}

function FilteredChallengesDisplay<T extends CommonChallenge | GetCertifiedChallengesMineElement>({
  challengeType,
  setChallengeType,
  challenges,
  handleNavigate,
}: FilteredChallengesDisplayProps<T>) {
  return (
    <section className="flex w-full flex-1 flex-col gap-4 p-4">
      <div className="flex w-fit flex-row items-center justify-center rounded-xl border bg-gray-200">
        <ChallengeTypeSwitch
          on={challengeType === 'individual'}
          onClick={() => setChallengeType('individual')}
        >
          개인
        </ChallengeTypeSwitch>
        <ChallengeTypeSwitch on={challengeType === 'team'} onClick={() => setChallengeType('team')}>
          팀
        </ChallengeTypeSwitch>
      </div>
      <div className="flex h-full flex-row items-start justify-start">
        {challenges?.length ? (
          <Carousel className="w-full">
            <CarouselContent className="-ml-4 items-start justify-start">
              {challenges.map((challenge) => (
                <CarouselItem key={challenge.id} className="max-w-[200px] pb-1 pl-4">
                  <Challenge challenge={challenge} onClick={() => handleNavigate(challenge.id)} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <p className="w-full self-center text-center text-xl whitespace-pre-line">
            {`[홈]-[${challengeType === 'individual' ? '개인' : '팀'} 챌린지]에서\n새로운 챌린지에 참여해주세요.`}
          </p>
        )}
      </div>
    </section>
  )
}

export default FilteredChallengesDisplay
