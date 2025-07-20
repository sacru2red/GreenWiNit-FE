import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <h1>Error 404</h1>
      <p>
        방문하려는 페이지의 주소가 잘못 입력되었거나
        <br />
        페이지의 주소가 변경 혹은 삭제되어 요청하신
        <br />
        페이지를 찾을 수 없습니다.
      </p>
      <p className="text-light-gray">
        입력하신 주소를 확인 후 오류가 계속 발생하는
        <br />
        경우 고객센터로 문의하시기 바랍니다.
      </p>
      <div className="flex w-full flex-row justify-center">
        <Button type="button" onClick={() => navigate('/')} size="flex" className="h-fit max-w-40">
          홈으로
        </Button>
      </div>
    </div>
  )
}
