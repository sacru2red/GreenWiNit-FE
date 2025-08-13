import useUserMe from './use-user-me'

const useUserEmail = () => {
  const { data } = useUserMe()
  return data?.result?.email ?? null
}

export default useUserEmail
