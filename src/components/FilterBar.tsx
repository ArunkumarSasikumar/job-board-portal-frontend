'use client';

type FilterBarProps = {
  inputValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
};
export default function FilterBar({
  inputValue,
  onSearchChange,
  isPending,
}: FilterBarProps) {
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={onSearchChange}
        placeholder="Search jobs..."
        className="w-full max-w-[500px] text-sm border transition-all duration-[0.2s] 
        ease-[ease-in-out] px-3.5 py-2.5 rounded-lg border-solid border-[var(--border-color)] 
        focus:border-[var(--border-color)] focus:shadow-[0_0_0_2px_rgba(79,70,229,0.2)] hover:border-[var(--border-hover)]
        placeholder:text-[var(--text-color)] color-[var(--text-color)}"
      />
      {isPending && <div>Loading...</div>}
    </div>
  );
}
