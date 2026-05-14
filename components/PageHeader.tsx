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
    <section className="pt-40 pb-16 bg-gradient-to-br from-plum-900 to-plum-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(220,176,96,0.20),transparent_55%)] pointer-events-none" />
      <div className="container-site relative z-10 text-center max-w-3xl">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1
          className="heading-xl mt-4 mb-3 text-ivory-50"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && <p className="text-[17px] text-ivory-50/75">{subtitle}</p>}
        {crumbs.length > 0 && (
          <div className="flex justify-center gap-2 text-xs uppercase tracking-[0.1em] text-ivory-50/60 mt-6">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="text-gold-500 hover:underline">{c.label}</Link>
                ) : (
                  <span>{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-ivory-50/30">/</span>}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
