import LogoIcon from '@/components/common/LogoIcon'

function LogoAndName({ name }: { name: string }) {
  return (
    <div className="mx-auto flex flex-col items-center gap-4 py-6">
      <LogoIcon size="large" className="bg-white" />
      <span className="text-xl font-bold">{name}</span>
    </div>
  )
}

export default LogoAndName
