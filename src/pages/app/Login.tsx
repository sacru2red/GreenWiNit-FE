import { Button } from '@/components/ui/button'

function Login() {
  return (
    <>
      <img src="/img/1.png" className="absolute bottom-0" />
      <img src="/img/2.png" className="absolute right-0 bottom-0 left-0 mx-auto" />
      <div className="mx-auto my-auto flex flex-col gap-1">
        <span className="font-jalnan text-[40px] text-[#0FBA7E]">Greenwinit</span>
        <span>함께 이기는 환경 챌린지</span>
        <Button className="mt-10 h-[44px] w-[295px] bg-[#0FBA7E] text-white">시작</Button>
      </div>
    </>
  )
}

export default Login
