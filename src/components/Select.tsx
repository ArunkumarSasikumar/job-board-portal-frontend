'use client';

import { formatJobType } from '../features/helper';

type SelectProps<T extends string> = {
  value: T;
  options: T[];
  onChange: (value: T) => void;
};

export default function Select<T extends string>({
  value,
  options,
  onChange,
}: SelectProps<T>) {
  const jobTypeLabelCondition = options[1] === 'Full_time';

  const selectId = jobTypeLabelCondition
    ? 'job-type-filter'
    : 'location-filter';
  const labelText = jobTypeLabelCondition ? 'Job Type' : 'Location';
  return (
    <>
      <label htmlFor={selectId} className="text-[var(--text-color)]">
        {labelText}
      </label>
      <select
        id={selectId}
        className="w-full max-w-[240px] text-sm text-[#333] bg-white border cursor-pointer transition-all duration-[0.2s] ease-[ease-in-out] px-3.5 py-2.5 rounded-lg border-solid border-[#ccc] hover:border-[#888] focus:border-indigo-600 focus:shadow-[0_0_0_2px_rgba(79,70,229,0.2)]"
        value={value}
        onChange={(event) => {
          const selectedOption = options.find(
            (option) => option === event.target.value
          );

          if (selectedOption) {
            onChange(selectedOption);
          }
        }}
      >
        {options.map((option) => (
          <option key={option} value={option} className="text-sm text-[#333]">
            {formatJobType(option)}
          </option>
        ))}
      </select>
    </>
  );
}
