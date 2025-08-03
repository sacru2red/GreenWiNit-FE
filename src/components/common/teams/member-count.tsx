import { TeamDetailResponse } from '@/api/challenges'

interface MemberCountProps {
  team: TeamDetailResponse
}

const MemberCount = ({ team }: MemberCountProps) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-title-smaller text-lg">현재 팀원</span>
      <span className="text-mountain_meadow-700 text-xl font-bold">{`${team.currentParticipants}명`}</span>
    </div>
  )
}

export default MemberCount
