import { useEffect, useState } from 'react'
import AppTitle from './common/AppTitle'
import SubTitle from './common/SubTitle'

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
      <div
        className={`absolute top-[320px] flex w-full flex-col items-center justify-center gap-1 transition-all delay-250 duration-1000 ${
          showImages ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <AppTitle />
        <SubTitle />
      </div>
    </div>
  )
}

export default SplashScreen
