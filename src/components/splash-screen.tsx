import { useEffect, useState } from 'react'
import HeaderSectionMiddle from './common/header-section-middle'

const SplashScreen = () => {
  const [showImages, setShowImages] = useState(false)

  useEffect(() => {
    setShowImages(true)
  }, [])

  return (
    <div className="flex flex-1">
      <div className="absolute bottom-0 left-[50%] h-[255px] w-full translate-x-[-50%] overflow-hidden">
        <img
          src="/img/1.png"
          className={`absolute bottom-0 w-full transition-all duration-500 ${
            showImages ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        />
        <img
          src="/img/2.png"
          className={`absolute bottom-0 left-[50%] translate-x-[-50%] transition-all delay-300 duration-500 ${
            showImages ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        />
      </div>
      <HeaderSectionMiddle initalPosition={!showImages} />
    </div>
  )
}

export default SplashScreen
