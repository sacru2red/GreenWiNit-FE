function FilterButton({ openDialog }: { openDialog: () => void }) {
  return (
    <button
      className="flex items-center gap-1 rounded-full bg-[#e8f5e9] px-3 py-2"
      onClick={openDialog}
    >
      <img src="/icons/filter.svg" alt="필터 아이콘" width={16} height={16} />
      <span className="text-mountain_meadow-700 text-xs">필터</span>
    </button>
  )
}

export default FilterButton
