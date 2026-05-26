import Link from 'next/link';

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  bgImage,
  bgImageAlt = '',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: { href?: string; label: string }[];
  /** Optional background photo for the hero (full-width, dark overlay applied) */
  bgImage?: string;
  bgImageAlt?: string;
}) {
  const hasImage = !!bgImage;

  return (
    <section
      className={`pt-40 pb-16 relative overflow-hidden ${
        hasImage ? 'min-h-[440px] flex items-center' : 'bg-ivory-100'
      }`}
    >
      {hasImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImage}
            alt={bgImageAlt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-plum-900/65 via-plum-900/45 to-plum-900/65 pointer-events-none" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(196,148,53,0.10),transparent_55%)] pointer-events-none" />
      )}

      <div className="container-site relative z-10 text-center max-w-3xl">
        {eyebrow && (
          <span className={`eyebrow ${hasImage ? '!text-gold-300 before:!bg-gold-300' : ''}`}>
            {eyebrow}
          </span>
        )}
        <h1
          className={`heading-xl mt-4 mb-3 ${hasImage ? '!text-ivory-50' : ''}`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && (
          <p className={`text-[17px] ${hasImage ? 'text-ivory-50/85' : 'text-charcoal-700'}`}>
            {subtitle}
          </p>
        )}
        {crumbs.length > 0 && (
          <div
            className={`flex justify-center gap-2 text-xs uppercase tracking-[0.1em] mt-6 ${
              hasImage ? 'text-ivory-50/75' : 'text-charcoal-500'
            }`}
          >
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.href ? (
                  <Link
                    href={c.href}
                    className={`hover:underline ${hasImage ? 'text-gold-300' : 'text-plum-700'}`}
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span>{c.label}</span>
                )}
                {i < crumbs.length - 1 && (
                  <span className={hasImage ? 'text-ivory-50/40' : 'text-ivory-300'}>/</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
