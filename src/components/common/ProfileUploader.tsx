import React, { useState } from 'react'
import LogoIcon from '@/components/common/LogoIcon'
import { imageApi } from '@/api/image'
import { cn } from '@/lib/utils'

function ProfileUploader() {
  const [profileImage, setProfileImage] = useState('')
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const res = await imageApi.uploadImages(file, 'profile')
      if (res.success) setProfileImage(res.result)
    }
  }

  return (
    <div className="relative w-fit">
      <LogoIcon
        size="large"
        className={cn('cursor-pointer', profileImage && `bg-[url(${profileImage})]`)}
        onClick={handleClick}
      />
      <button
        type="button"
        onClick={handleClick}
        className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md"
      >
        <img src="/icons/camera.svg" alt="사진 업로드" width={32} height={32} />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

export default ProfileUploader
