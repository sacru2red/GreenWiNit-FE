import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import Description from '@/components/common/teams/description'
import MemberCount from '@/components/common/teams/member-count'
import Overview from '@/components/common/teams/overview'
import PropertyList from '@/components/common/teams/property-list'
import { Button } from '@/components/common/button'
import useChallengesTeam from '@/hooks/challenge/use-challenges-team'
import { showMessageIfExists } from '@/lib/error'
import { Dialog, DialogContent, DialogDescription } from '@/components/shadcn/dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges/$challenge-id/teams/$team-id/')({
  component: TeamDetail,
})

function TeamDetail() {
  const params = Route.useParams()
  const challengeId = Number(params['challenge-id'])
  const teamId = Number(params['team-id'])

  const queryClient = useQueryClient()
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const navigate = useNavigate()

  const { data, isLoading } = useChallengesTeam(teamId)
  const team = data?.result
  const { mutate: joinTeam } = useMutation({
    mutationFn: () => challengesApi.joinTeam(challengeId, teamId),
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
      setOpenConfirmDialog(true)
    },
    onError(error) {
      console.error(error)
      showMessageIfExists(error)
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (team == null) {
    // @TODO redirect to 404 page
    return <div>Service Unavailable</div>
  }

  return (
    <PageLayOut.Container bg="form">
      <PageLayOut.ScrollableContent>
        <PageLayOut.HeaderSection>
          <PageLayOut.HeaderSection.BackIcon />
          <PageTitle>팀 정보</PageTitle>
        </PageLayOut.HeaderSection>
        <PageLayOut.BodySection bg="form" padding="zero" className="m-0">
          <Overview team={team} challengeId={challengeId} />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <MemberCount team={team} />
            <Description team={team} />
            <PropertyList team={team} />
            <div className="mt-auto flex w-full">
              <Button size="flex" onClick={() => joinTeam()}>
                팀 가입신청
              </Button>
            </div>
          </div>
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <DialogContent className="flex flex-col gap-3">
          <DialogDescription className="text-center !text-lg !text-black">
            팀 가입 완료
          </DialogDescription>
          <DialogDescription className="!text-light-gray text-center !text-sm">
            [홈] -&gt; [참여 챌린지]에서 확인하세요!
            <br />
            오픈채팅방을 통해 이야기를 나눠요.
          </DialogDescription>
          <div className="flex w-full flex-row justify-center">
            <Button size="sm" onClick={() => navigate({ to: `/challenges/${challengeId}/teams` })}>
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayOut.Container>
  )
}

export default TeamDetail
