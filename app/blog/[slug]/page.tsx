import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/db/queries';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Articulo no encontrado' };
  return {
    title: `${post.title} | Diario Aurelia`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <section className="pt-28 pb-16 bg-gradient-to-br from-ivory-100 to-rose-100">
        <div className="container-site max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-plum-700 mb-6 hover:underline">
            <ArrowLeft size={16} /> Volver al diario
          </Link>
          <span className="eyebrow">{post.category}</span>
          <h1 className="heading-lg mt-4 mb-6">{post.title}</h1>
          <div className="flex items-center gap-6 text-sm text-charcoal-500">
            <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-site max-w-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[2/1] object-cover rounded-3xl mb-10"
          />
          <div
            className="prose prose-lg max-w-none text-charcoal-700"
            dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
          />
        </div>
      </section>
    </>
  );
}
