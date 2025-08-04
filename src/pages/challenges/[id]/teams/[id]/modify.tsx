import PageContainer from '@/components/common/page-container'
import PageHeaderSection from '@/components/common/page-header-section'
import PageTitle from '@/components/common/page-title'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import UpsertPageBody from '@/components/common/teams/upsert-page-body'
import { FormState, UpsertPageBodyProps } from '@/components/common/teams/upsert-page-body/types'
import useChallengesTeam from '@/hooks/challenge/use-challenges-team'

dayjs.extend(customParseFormat)

const TeamModify = () => {
  const params = useParams<{ challengeId: string; teamId: string }>()
  const challengeId = Number(params.challengeId)
  const teamId = Number(params.teamId)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data, isLoading } = useChallengesTeam(challengeId, teamId)
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
        groupBeginDateTime: dayjs(rest.startAt).toISOString(),
        groupEndDateTime: dayjs(rest.endAt).toISOString(),
        groupName: rest.name,
        roadAddress: rest.address.roadAddress,
        detailAddress: rest.address.detailAddress,
        groupDescription: rest.description,
        maxParticipants: rest.maxMemberCount,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.challenges.list({
          challengeType: 'team',
        }).queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.challenges.detail(challengeId).queryKey,
      })
      navigate(`/challenges/${challengeId}/teams`)
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
    <PageContainer bg="form">
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>수정하기</PageTitle>
      </PageHeaderSection>
      <UpsertPageBody
        mode="modify"
        onSubmit={onSubmit}
        initialData={{
          ...team,
          id: team.id.toString(),
          name: team.groupName,
          address: {
            roadAddress: team.groupAddress,
            roadnameCode: '',
            zonecode: '',
            detailAddress: team.groupAddress,
            sigungu: '',
          },
          description: team.groupDescription,
          date: dayjs(team.groupBeginDateTime).toDate(),
          startAt: dayjs(team.groupBeginDateTime).toDate(),
          endAt: dayjs(team.groupEndDateTime).toDate(),
          maxMemberCount: team.maxParticipants,
          openChatUrl: team.openChatUrl,
        }}
      />
    </PageContainer>
  )
}

export default TeamModify
