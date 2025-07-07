import { useState } from 'react'
import Tab from '@/components/home-screen/Challenges/Tab'
import { TabProps } from '@/components/home-screen/Challenges/type'
import { useChallenges } from '@/hooks/useChallenges'
import Challenge from '@/components/common/Challenge'
import { useNavigate } from 'react-router-dom'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline'
import { MOUNTAIN_MEADOW } from '@/constant/styles'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import WarnNotLoggedIn from '../WarnNotLoggedIn'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const Challenges = () => {
  const [tab, setTab] = useState<TabProps['tab']>('individual')
  const tabToType = tab === 'individual' ? 0 : 1
  const { data: challenges } = useChallenges()
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()
  const [isWarnNotLoggedInDialogOpen, setIsWarnNotLoggedInDialogOpen] = useState(false)

  return (
    <div className="flex h-full flex-col">
      <Tab tab={tab} setTab={setTab} />
      <div className="flex h-0 w-full flex-[1_1_auto] flex-col p-4 pt-8">
        <div className="flex flex-row items-center gap-1">
          <span className="text-title-smaller text-xl font-bold">{`${tab === 'individual' ? '개인' : '팀'} 챌린지`}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoOutlineIcon htmlColor={MOUNTAIN_MEADOW} />
            </TooltipTrigger>
            <TooltipContent className="p-4 shadow-xl">
              <p className="text-center">
                원하는 챌린지에 참여 후<br />
                [참여 챌린지]에서 인증해주세요!
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Carousel className="mt-4">
          <CarouselContent className="-ml-4">
            {challenges
              ?.filter((c) => c.type === tabToType)
              .map((challenge) => (
                <CarouselItem key={challenge.id} className="max-w-[200px] pb-1 pl-4">
                  <Challenge
                    challenge={challenge}
                    onClick={() => {
                      if (!isLoggedIn) {
                        setIsWarnNotLoggedInDialogOpen(true)
                        return
                      }
                      navigate(`/challenges/${challenge.id}/detail`)
                    }}
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
      <WarnNotLoggedIn
        isOpen={isWarnNotLoggedInDialogOpen}
        onOpenChange={setIsWarnNotLoggedInDialogOpen}
      />
    </div>
  )
}

export default Challenges
