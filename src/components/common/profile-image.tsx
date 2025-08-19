function ProfileImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="h-[92px] w-[92px] overflow-hidden rounded-full border-2 border-gray-300 bg-cover bg-no-repeat">
      <img src={imageUrl} alt="프로필 이미지" className="h-full w-full object-scale-down" />
    </div>
  )
}

export default ProfileImage
