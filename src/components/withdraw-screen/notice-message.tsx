function NoticeMessage() {
  return (
    <section className="mx-auto flex flex-col items-center gap-4 px-4 py-6">
      <img src="/icons/notice.svg" alt="주의" width={64} height={64} />
      <h2 className="text-lg font-bold">회원탈퇴를 진행하시겠습니까?</h2>
      <p className="text-light-gray text-xs">
        탈퇴 시 모든 활동 내역과 개인정보가 삭제되며,
        <br /> 이 작업은 되돌릴 수 없습니다.
      </p>
    </section>
  )
}

export default NoticeMessage
