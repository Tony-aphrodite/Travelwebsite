import Link from 'next/link';

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: { href?: string; label: string }[];
}) {
  return (
    <section className="pt-40 pb-16 bg-gradient-to-br from-ivory-100 to-rose-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,165,116,0.18),transparent_50%)] pointer-events-none" />
      <div className="container-site relative z-10 text-center max-w-3xl">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1
          className="heading-xl mt-4 mb-3"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && <p className="text-[17px] text-charcoal-500">{subtitle}</p>}
        {crumbs.length > 0 && (
          <div className="flex justify-center gap-2 text-xs uppercase tracking-[0.1em] text-charcoal-500 mt-6">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="text-plum-700">{c.label}</Link>
                ) : (
                  <span>{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-ivory-300">/</span>}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
