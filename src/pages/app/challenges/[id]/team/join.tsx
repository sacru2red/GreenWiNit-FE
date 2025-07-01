import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import ChallengeTitle from '@/components/common/challenges/ChallengeTitle'
import TeamCard from '@/components/common/challenges/TeamCard'
import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import useChallenge from '@/hooks/useChallenge'
import { useMessageStore } from '@/store/messageStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const JoinTeam = () => {
  const params = useParams<{ id: string }>()
  const challengeId = params.id

  const { data: challenge } = useChallenge(challengeId)
  const queryClient = useQueryClient()
  const { showMessage } = useMessageStore()

  const { mutate: joinTeam } = useMutation({
    mutationFn: (teamId: string) => challengesApi.joinTeam(challengeId, teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: challengesQueryKeys.list().queryKey })
      queryClient.invalidateQueries({ queryKey: challengesQueryKeys.detail(challengeId).queryKey })
    },
    onError(error) {
      console.error(error)
      showMessage(error.message)
    },
  })

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>팀 선택하기</PageTitle>
      </PageHeaderSection>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <ChallengeTitle title={challenge?.name} />
        <div className="flex flex-1 flex-col gap-4">
          {challenge?.type === 1 &&
            challenge.teams.map((team) => (
              <button key={team.id} onClick={() => joinTeam(team.id)}>
                <TeamCard team={team} />
              </button>
            ))}
        </div>
      </div>
    </PageContainer>
  )
}

export default JoinTeam
