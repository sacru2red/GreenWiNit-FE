import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import SubmitEditButton from '@/components/edit-profile-screen/submit-edit-button'
import { FormEvent, useState } from 'react'

function NicknameEditForm() {
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const checkNicknameDuplication = () => {
    // 닉네임 중복 확인 api 연결 예정
  }

  const updateNickname = () => {
    // 닉네임 수정 api 연결 예정
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowConfirmModal(true)
  }

  return (
    <>
      <section className="w-full flex-1">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <fieldset>
            <legend className="sr-only">현재 닉네임</legend>
            <label
              htmlFor="current-nickname"
              className="text-secondary-foreground block text-start text-sm"
            >
              현재 닉네임
            </label>
            <input
              type="text"
              id="current-nickname"
              name="current-nickname"
              placeholder="현재 닉네임을 입력해주세요"
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault()
              }}
              className="text-secondary-foreground mt-2 h-[48px] w-full rounded-sm bg-[#F5F5F5] px-4 py-3 focus:outline-none"
            />
          </fieldset>
          <fieldset>
            <legend className="sr-only">변경할 닉네임</legend>
            <label
              htmlFor="new-nickname"
              className="text-secondary-foreground block text-start text-sm"
            >
              변경할 닉네임
            </label>
            <div className="mt-2 flex w-full overflow-hidden rounded-md border border-gray-300">
              <input
                id="new-nickname"
                type="text"
                placeholder="아이디 입력(6~20자)"
                // 중복체크 안되었을 떄에는 keydown 막고, 체크 되었으면 keydown 허용해서 enter 치면 모달 띄우게 할 예정
                // onKeyDown={(e) => {
                //   if (e.key === 'Enter') e.preventDefault()
                // }}
                className="flex-1 bg-white px-4 py-3 text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={checkNicknameDuplication}
                className="hover:bg-mountain_meadow bg-gray-300 px-4 text-sm text-white"
              >
                중복 확인
              </button>
            </div>
            <span className="text-lighter-gray mt-2 block text-start text-xs">
              2~20자 이내, 특수문자 사용 불가
            </span>
          </fieldset>
          <fieldset>
            <legend className="sr-only">제출 버튼</legend>
            <SubmitEditButton />
          </fieldset>
        </form>
      </section>
      {showConfirmModal && (
        <ConfirmDialog
          isOpen={showConfirmModal}
          setIsOpen={setShowConfirmModal}
          description={`회원정보를\n 수정하시겠습니까?`}
          onConfirm={updateNickname}
        />
      )}
    </>
  )
}

export default NicknameEditForm
