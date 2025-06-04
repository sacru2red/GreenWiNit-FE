import { Button } from "@/components/ui/button";

function Login() {
  return (
    <>
      <img src="/img/1.png" className="absolute bottom-0" />
      <img
        src="/img/2.png"
        className="absolute bottom-0 left-0 right-0 mx-auto"
      />
      <div className="flex flex-col gap-1 mx-auto my-auto">
        <span className="font-jalnan text-[#0FBA7E] text-[40px]">
          Greenwinit
        </span>
        <span>함께 이기는 환경 챌린지</span>
        <Button className="w-[295px] h-[44px] bg-[#0FBA7E] text-white mt-10">
          시작
        </Button>
      </div>
    </>
  );
}

export default Login;
