'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SortSelect({
  options,
}: {
  options: { label: string; value: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get('sort') || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const val = e.target.value;
    if (val) params.set('sort', val);
    else params.delete('sort');
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
