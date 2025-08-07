import useUserMe from './use-user-me'

const useUserName = () => {
  const { data } = useUserMe()
  return data?.result?.nickname ?? null
}

export default useUserName
