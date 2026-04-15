import Link from 'next/link';
import { Clock, User, ArrowRight, Search } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { getBlogPosts } from '@/lib/db/queries';
import BlogFilters from '@/components/BlogFilters';
import NewsletterForm from '@/components/NewsletterForm';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const category = params.category && params.category !== 'Todas' ? params.category : undefined;
  const q = params.q || undefined;

  const blogPosts = await getBlogPosts({ category, q });
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHeader
        eyebrow="Diario de viajeras"
        title="Historias que <span class='italic-script'>inspiran</span>"
        subtitle="Guias, consejos y relatos escritos por nuestras expertas y por viajeras como tu."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Blog' }]}
      />

      {/* Featured */}
      {featured && (
        <section className="container-site -mt-8 relative z-10 mb-16">
          <article className="card-soft overflow-hidden grid lg:grid-cols-2 shadow-soft-lg">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-5 left-5 bg-white/95 text-plum-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                Destacado
              </span>
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-charcoal-500 mb-3">
                <span className="text-gold-700 font-semibold">{featured.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {featured.readTime}
                </span>
              </div>
              <h2 className="heading-lg mb-4 leading-tight">{featured.title}</h2>
              <p className="text-charcoal-700 leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between pt-5 border-t border-ivory-200">
                <div className="flex items-center gap-2 text-sm">
                  <User size={14} className="text-plum-700" />
                  <span>{featured.author}</span>
                  <span className="text-charcoal-500">· {featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="text-plum-700 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Leer articulo <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Search + categories */}
      <section className="container-site mb-12">
        <BlogFilters activeCategory={category} activeQuery={q} />
      </section>

      {/* Posts grid */}
      <section className="container-site pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <article
              key={post.slug}
              className="card-soft overflow-hidden hover:-translate-y-1 hover:shadow-soft-lg group flex flex-col"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 text-plum-700 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-xl mb-2 leading-tight group-hover:text-plum-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-charcoal-500 line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-charcoal-500 mt-auto pt-4 border-t border-ivory-200">
                    <span className="flex items-center gap-1">
                      <User size={11} /> {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-site pb-24">
        <div className="rounded-3xl bg-gradient-to-br from-plum-800 to-plum-700 p-10 lg:p-14 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl" />
          <div className="relative max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-gold-400">Newsletter</span>
            <h2 className="font-display text-4xl mt-3 mb-4">
              Historias de viaje en tu <span className="italic-script text-gold-400">buzon</span>
            </h2>
            <p className="text-white/80 mb-6">
              Cada domingo, una nueva guia curada por nuestras expertas. Sin spam, solo
              inspiracion.
            </p>
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </section>
    </>
  );
}
