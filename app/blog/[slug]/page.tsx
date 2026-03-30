import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Calendar } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import { client, sanityIsConfigured } from "@/sanity/lib/client";
import { postBySlugQuery, allSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Types ─── */
type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  seoTitle?: string;
  seoDescription?: string;
  geoTarget?: string;
  publishedAt?: string;
  mainImage?: { asset: object; alt?: string };
  content?: TypedObject[];
};

/* ─── Static params ─── */
export async function generateStaticParams() {
  if (!sanityIsConfigured) return [];
  const slugs: { slug: string }[] = await client.fetch(allSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

/* ─── Dynamic metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: Post | null = await client.fetch(postBySlugQuery, { slug });
  if (!post) return { title: "Post no encontrado · CADRE Solutions" };

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? "";
  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: `${title} · CADRE Solutions`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(imageUrl && { images: [{ url: imageUrl, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

/* ─── Portable Text components (monochrome) ─── */
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-[1.85] text-zinc-300">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display mb-4 mt-10 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display mb-3 mt-8 text-xl font-semibold text-white">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display mb-2 mt-6 text-lg font-semibold text-zinc-200">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-white/25 pl-6 italic text-zinc-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 space-y-2 pl-5 text-zinc-300">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-2 pl-5 text-zinc-300">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-2 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-zinc-500">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-zinc-300">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-sm text-zinc-200">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const img = value as { asset?: object; alt?: string; caption?: string } | undefined;
      if (!img?.asset) return null;
      return (
        <figure className="my-8">
          <div className="relative h-64 w-full overflow-hidden rounded-xl sm:h-80">
            <Image
              src={urlFor(img).width(900).url()}
              alt={img.alt ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          {img.caption != null ? (
            <figcaption className="mt-2 text-center text-xs text-zinc-600">
              {img.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

/* ─── JSON-LD helper ─── */
function buildJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle ?? post.title,
    description: post.seoDescription ?? "",
    author: {
      "@type": "Organization",
      name: "CADRE Solutions",
    },
    publisher: {
      "@type": "Organization",
      name: "CADRE Solutions",
    },
    datePublished: post.publishedAt,
    ...(post.geoTarget
      ? { contentLocation: { "@type": "Place", name: post.geoTarget } }
      : {}),
    ...(post.mainImage?.asset
      ? { image: urlFor(post.mainImage).width(1200).height(630).url() }
      : {}),
  };
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ─── Page ─── */
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postRaw = await client.fetch(
    postBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  );
  const post = postRaw as Post | null;

  if (!post) return notFound();

  const jsonLd = buildJsonLd(post);

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="relative flex min-h-screen flex-col bg-black text-white antialiased overflow-x-hidden">
        {/* Background atmosphere */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-white/[0.025] blur-[120px]" />
          <div className="absolute -top-16 right-0 h-[400px] w-[400px] rounded-full bg-white/[0.018] blur-[100px]" />
          <div className="dot-grid absolute inset-0 opacity-[0.25]" />
        </div>

        <Navbar />

        <div className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-4 pt-32 pb-16 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al blog
          </Link>

          {/* Meta row */}
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-zinc-600">
            {post.geoTarget != null ? (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {post.geoTarget}
              </span>
            ) : null}
            {post.publishedAt != null ? (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.publishedAt)}
              </span>
            ) : null}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Hero image */}
          {post.mainImage?.asset != null ? (
            <div className="relative mt-10 h-56 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-72 lg:h-80">
              <Image
                src={urlFor(post.mainImage).width(1000).height(560).url()}
                alt={post.mainImage.alt ?? post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ) : null}

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Body */}
          <article className="prose-cadre">
            {post.content && (
              <PortableText value={post.content} components={ptComponents} />
            )}
          </article>

          {/* ── CONVERSION CTA ── */}
          <div className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-10">
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-72 rounded-full bg-white/[0.04] blur-[80px]" />
            </div>

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <div className="flex-1">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Diagnóstico Digital · CADRE Solutions
                </p>
                <p className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                  ¿Tu empresa está perdiendo horas en tareas manuales?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Agenda un Diagnóstico Digital y descubre cómo escalar tu operación.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/#diagnostico"
                  className="pulse-ring relative inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white px-6 py-3.5 text-sm font-semibold tracking-wide text-black transition-all duration-300 hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  Solicitar Diagnóstico Digital
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
