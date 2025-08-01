import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'

export default function InternalServerError() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <h1>Error 500</h1>
      <p>일시적인 오류가 발생했습니다.</p>
      <p className="text-light-gray">
        서비스 이용에 불편을 드려 죄송합니다.
        <br />
        잠시 후 다시 이용해주세요.
      </p>
      <div className="flex w-full flex-row justify-center gap-4">
        {location.pathname !== '/500' ? (
          <Button
            type="button"
            onClick={() => window.location.reload()}
            variant="cancel"
            size="flex"
            className="h-fit max-w-40"
          >
            새로고침
          </Button>
        ) : null}
        <Button type="button" onClick={() => navigate(-1)} size="flex" className="h-fit max-w-40">
          이전 페이지
        </Button>
      </div>
    </div>
  )
}
