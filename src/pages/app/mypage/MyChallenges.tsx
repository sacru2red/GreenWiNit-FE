import MyPageLayout from '@/pages/app/mypage/MyPageLayout'
import MyChallengesCategory from '@/components/my-challenges-screen/MyChallengesCategory'
import Challenge from '@/components/common/Challenge'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TabProps } from '@/components/home-screen/Challenges/type'
import { useChallenges } from '@/hooks/useChallenges'

function MyChallenges() {
  const [tab, setTab] = useState<TabProps['tab']>('individual')
  const tabToType = tab === 'individual' ? 0 : 1
  const { data: challenges } = useChallenges()
  const filteredChallenges = challenges?.filter((c) => c.type === tabToType)
  const navigate = useNavigate()

  return (
    <MyPageLayout title="나의 챌린지">
      <MyChallengesCategory tab={tab} setTab={setTab} />
      <section className="mt-5 grid grid-cols-2 gap-[14px]">
        {filteredChallenges?.map((challenge) => (
          <Challenge
            challenge={challenge}
            onClick={() => navigate(`/challenges/${challenge.id}/detail`)}
          />
        ))}
      </section>
    </MyPageLayout>
  )
}

export default MyChallenges
