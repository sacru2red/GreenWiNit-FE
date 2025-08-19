import useUserMe from './use-user-me'

const useUserProfileImageUrl = () => {
  const { data } = useUserMe()
  return data?.result?.profileImageUrl ?? null
}

export default useUserProfileImageUrl
