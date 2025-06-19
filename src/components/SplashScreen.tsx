import { Fragment, useEffect, useState } from 'react'

const SplashScreen = () => {
  const [showImages, setShowImages] = useState(false)

  useEffect(() => {
    setShowImages(true)
  }, [])

  return (
    <Fragment>
      <div className="fixed inset-0 bg-white">
        <img
          src="/img/1.png"
          className={`absolute right-0 bottom-0 left-0 mx-auto transition-all duration-500 ${
            showImages ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        />
        <img
          src="/img/2.png"
          className={`absolute right-0 bottom-0 left-0 mx-auto transition-all delay-300 duration-500 ${
            showImages ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        />
        <div
          className={`mx-auto my-auto flex h-full flex-col items-center justify-center gap-1 transition-all delay-250 duration-1000 ${
            showImages ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="font-jalnan text-[40px] text-[#0FBA7E]">Greenwinit</span>
          <span>함께 이기는 환경 챌린지</span>
        </div>
      </div>
    </Fragment>
  )
}

export default SplashScreen
