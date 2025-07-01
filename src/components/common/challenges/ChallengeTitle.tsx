import LogoIcon from '@/components/common/LogoIcon'

interface ChallengeTitleProps {
  title?: string | undefined | null
}

const ChallengeTitle = ({ title }: ChallengeTitleProps) => {
  return (
    <div className="flex flex-row items-center justify-start gap-1.5">
      <LogoIcon size="small" className="border-none bg-transparent" />
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  )
}

export default ChallengeTitle
