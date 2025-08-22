import ImageIcon from '@/components/common/image-icon'

function ProfileAndName({ name }: { name: string }) {
  return (
    <div className="mx-auto flex flex-col items-center gap-4 py-6">
      <ImageIcon size="large" className="bg-white" type="profile" />
      <span className="text-xl font-bold">{name}</span>
    </div>
  )
}

export default ProfileAndName
