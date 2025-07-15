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
    <div className="relative w-fit">
      <LogoIcon size="large" className="cursor-pointer" onClick={handleClick} />
      <button
        type="button"
        onClick={handleClick}
        className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md"
      >
        <img src="/icons/file_upload.svg" alt="사진 업로드" width={32} height={32} />
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
