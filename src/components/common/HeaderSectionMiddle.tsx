import AppTitle from './AppTitle'
import SubTitle from './SubTitle'

interface HeaderSectionMiddleProps {
  initalPosition?: boolean
}

const HeaderSectionMiddle = ({ initalPosition }: HeaderSectionMiddleProps) => {
  return (
    <div
      className={`absolute top-[30vh] flex h-[18vh] w-full flex-col items-center justify-center gap-1 transition-all delay-250 duration-1000 ${
        initalPosition ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <AppTitle className="absolute top-0" />
      <SubTitle className="absolute bottom-0" />
    </div>
  )
}

export default HeaderSectionMiddle
