import React from 'react'
import LogoIcon from '@/components/common/LogoIcon'

function ProfileUploader() {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) setProfileFile(file)
  //   // image upload POST 요청 보내고 받아온 url 값으로 LocoIcon 변경해야 함
  // }

  return (
    <div className="flex w-full">
      <button
        type="button"
        onClick={handleClick}
        className="relative flex items-center justify-center rounded-full bg-white shadow-md"
      >
        <LogoIcon size="large" className="cursor-pointer" onClick={handleClick} />
        <img
          src="/icons/camera.svg"
          alt="사진 업로드"
          width={24}
          height={24}
          className="absolute right-0 bottom-0"
        />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        // onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

export default ProfileUploader
