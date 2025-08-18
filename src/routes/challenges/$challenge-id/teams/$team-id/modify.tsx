import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { toast } from 'sonner'
import { dayjs } from '@/constant/globals'
import UpsertPageBody from '@/components/common/teams/upsert-page-body'
import { FormState, UpsertPageBodyProps } from '@/components/common/teams/upsert-page-body/types'
import useChallengesTeam from '@/hooks/challenge/use-challenges-team'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges/$challenge-id/teams/$team-id/modify')({
  component: TeamModify,
})

function TeamModify() {
  const params = Route.useParams()
  const challengeId = Number(params['challenge-id'])
  const teamId = Number(params['team-id'])
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data, isLoading } = useChallengesTeam(teamId)
  const team = data?.result

  const { mutate: modifyTeam } = useMutation({
    mutationFn: async (team: FormState) => {
      const { id, ...rest } = team
      if (id == null) {
        throw new Error('team.id is required')
      }
      await challengesApi.modifyTeam({
        ...rest,
        id,
        beginDateTime: dayjs(rest.startAt).format('YYYY-MM-DD HH:mm'),
        endDateTime: dayjs(rest.endAt).format('YYYY-MM-DD HH:mm'),
        groupName: rest.name,
        roadAddress: rest.address.roadAddress,
        detailAddress: rest.address.detailAddress,
        description: rest.description,
        maxParticipants: rest.maxMemberCount,
        startTime: dayjs(team.startAt).format('HH:mm'),
        endTime: dayjs(team.endAt).format('HH:mm'),
        sigungu: team.address.sigungu,
        challengeDate: dayjs(team.date).format('YYYY-MM-DD'),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.challenges.list({
          challengeType: 'team',
        }).queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.challenges.detail({
          id: challengeId,
          challengeType: 'team',
        }).queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.challenges.team(teamId).queryKey,
      })
      navigate({ to: `/challenges/${challengeId}/teams` })
    },
    onError(error) {
      console.error(error)
      toast.error(error.message)
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (team == null) {
    // @TODO redirect to 500 page
    return <div>Server Error</div>
  }

  const onSubmit: UpsertPageBodyProps['onSubmit'] = (data) => {
    modifyTeam(data)
  }

  return (
    <PageLayOut.Container bg="form">
      <PageLayOut.HeaderSection>
        <PageLayOut.HeaderSection.BackIcon />
        <PageTitle>수정하기</PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection>
        <UpsertPageBody
          mode="modify"
          onSubmit={onSubmit}
          initialData={{
            ...team,
            id: team.id,
            name: team.groupName,
            address: {
              roadAddress: team.roadAddress,
              roadnameCode: '',
              zonecode: '',
              detailAddress: team.detailAddress,
              sigungu: team.sigungu,
            },
            description: team.description,
            date: dayjs(team.challengeDate).toDate(),
            startAt: dayjs(team.startTime, 'HH:mm:ss').toDate(),
            endAt: dayjs(team.endTime, 'HH:mm:ss').toDate(),
            maxMemberCount: team.maxParticipants,
            openChatUrl: team.openChatUrl,
          }}
        />
      </PageLayOut.BodySection>
    </PageLayOut.Container>
  )
}

export default TeamModify
