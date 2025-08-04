import { TeamDetailResponse } from '@/api/challenges'
import dayjs from 'dayjs'

interface PropertyListProps {
  team: TeamDetailResponse
}

const PropertyList = ({ team }: PropertyListProps) => {
  return (
    <div className="bg-mountain_meadow-0 flex flex-col items-start gap-2 rounded-lg p-4">
      <span className="text-mountain_meadow-700 text-lg font-bold">날짜</span>
      <p>{`${dayjs(team.groupBeginDateTime).format('YYYY-MM-DD')}`}</p>
      <span className="text-mountain_meadow-700 text-lg font-bold">시간</span>
      <p>{`${dayjs(team.groupBeginDateTime).format('HH:mm')} ~ ${dayjs(team.groupEndDateTime).format('HH:mm')}`}</p>
      <span className="text-mountain_meadow-700 text-lg font-bold">장소</span>
      <p>{`${team.groupAddress}`}</p>
      <span className="text-mountain_meadow-700 text-lg font-bold">채팅방</span>
      <a href={team.openChatUrl} target="_blank" rel="noopener noreferrer">
        {`${team.openChatUrl}`}
      </a>
    </div>
  )
}

export default PropertyList
