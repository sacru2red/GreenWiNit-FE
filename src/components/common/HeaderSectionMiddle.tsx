import AppTitle from './AppTitle'
import SubTitle from './SubTitle'

interface HeaderSectionMiddleProps {
  initalPosition?: boolean
}

const HeaderSectionMiddle = ({ initalPosition }: HeaderSectionMiddleProps) => {
  return (
    <div
      className={`absolute top-[36vh] flex w-full flex-col items-center justify-center gap-2 transition-all delay-250 duration-1000 ${
        initalPosition ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <AppTitle />
      <SubTitle />
    </div>
  )
}

export default HeaderSectionMiddle
