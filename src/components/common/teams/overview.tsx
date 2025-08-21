import {
  CHALLENGE_ROOT_QUERY_KEY,
  challengesApi,
  challengesQueryKeys,
  TeamDetailResponse,
} from '@/api/challenges'
import LogoIcon from '../logo-icon'
import { Ellipsis as MoreHorizIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover'
import { Separator } from '@/components/shadcn/separator'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/common/modal/dialog'
import { Button } from '@/components/common/button'

interface OverviewProps {
  team: TeamDetailResponse
  allowManage?: boolean
  challengeId: number
}

const Overview = ({ team, allowManage = false, challengeId }: OverviewProps) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [showConfirmDeletingDialog, setShowConfirmDeletingDialog] = useState(false)

  const { mutate: deleteTeam } = useMutation({
    mutationFn: () => challengesApi.deleteTeam(team.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CHALLENGE_ROOT_QUERY_KEY],
      })
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.challenges.detail({
          id: challengeId,
          challengeType: 'team',
        }).queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.challenges.team(team.id).queryKey,
      })
      navigate({ to: `/challenges/${challengeId}/teams` })
    },
  })

  return (
    <div className="bg-card relative flex flex-col items-center gap-2 p-4">
      {allowManage && team.leaderMe ? (
        <Popover>
          <PopoverTrigger asChild>
            <MoreHorizIcon className="absolute top-3 right-3 cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent align="end" className="overlay-hidden w-auto p-0">
            <div className="flex flex-col">
              {/**
               * TS094
               *    <button
               *      className="px-4 py-1 text-sm focus-visible:outline-0"
               *      onClick={() =>
               *        navigate({ to: `/challenges/${challengeId}/teams/${team.id}/modify` })
               *      }
               *    >
               *      수정하기
               *    </button>
               */}
              <Separator orientation="horizontal" />
              <button
                className="px-4 py-1 text-sm focus-visible:outline-0"
                onClick={() => setShowConfirmDeletingDialog(true)}
              >
                삭제하기
              </button>
            </div>
          </PopoverContent>
        </Popover>
      ) : null}
      <LogoIcon size="large" className="border bg-white" />
      <span className="text-mountain_meadow-700 text-2xl font-bold">{team.groupName}</span>
      <Dialog
        open={showConfirmDeletingDialog}
        onOpenChange={() => setShowConfirmDeletingDialog(false)}
      >
        <DialogContent className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>팀 삭제</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center !text-sm">
            팀을 삭제하시겠습니까?
            <br />
            팀 삭제시, 기존 다른 팀원의
            <br />
            [나의 팀] 목록에서도 삭제됩니다.
          </DialogDescription>
          <div className="flex gap-2">
            <Button size="sm" variant="cancel" onClick={() => setShowConfirmDeletingDialog(false)}>
              취소
            </Button>
            <Button size="sm" onClick={() => deleteTeam()}>
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Overview
