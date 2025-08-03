import { MockedTeam } from '@/api/challenges'

interface DescriptionProps {
  team: MockedTeam
}

const Description = ({ team }: DescriptionProps) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-title-smaller text-lg font-bold">소개 및 목표</span>
      <p>{team.description}</p>
    </div>
  )
}

export default Description
