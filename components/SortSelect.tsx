'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function SortSelect({
  options,
  currentParams = {},
}: {
  options: { label: string; value: string }[];
  currentParams?: Record<string, string>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const current = currentParams.sort || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(currentParams)) {
      if (k !== 'sort') params.set(k, v);
    }
    const val = e.target.value;
    if (val) params.set('sort', val);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <select
      value={current}
      onChange={handleChange}
      className="px-4 py-2 border border-ivory-300 rounded-full bg-ivory-50 text-sm cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
