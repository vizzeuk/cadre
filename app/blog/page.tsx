import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { client, sanityIsConfigured } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog · CADRE Solutions — Automatización y Transformación Digital",
  description:
    "Artículos sobre automatización de procesos, transformación digital y productividad para PYMEs en Latinoamérica.",
  openGraph: {
    title: "Blog CADRE Solutions",
    description: "Automatización, IA y productividad para empresas en crecimiento.",
    type: "website",
  },
};

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  seoDescription?: string;
  geoTarget?: string;
  publishedAt?: string;
  mainImage?: { asset: object; alt?: string };
};

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts: Post[] = sanityIsConfigured
    ? await client.fetch(allPostsQuery, {}, { next: { revalidate: 60 } })
    : [];

  return (
    <main className="relative flex min-h-screen flex-col bg-black text-white antialiased overflow-x-hidden">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-white/[0.025] blur-[120px]" />
        <div className="absolute -top-16 right-0 h-[400px] w-[400px] rounded-full bg-white/[0.018] blur-[100px]" />
        <div className="dot-grid absolute inset-0 opacity-[0.25]" />
      </div>

      <Navbar />

      <div className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Blog & Recursos
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Conocimiento que
            <br />
            <span className="text-zinc-400">transforma operaciones.</span>
          </h1>
          <p className="mt-5 max-w-xl text-zinc-400">
            Artículos sobre automatización, IA y estrategia digital para empresas que buscan escalar sin fricciones.
          </p>
        </div>

        {/* Grid */}
        {posts.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-zinc-500">
            Próximamente los primeros artículos.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-1"
              >
                {/* Image */}
                {post.mainImage?.asset ? (
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={urlFor(post.mainImage).width(600).height(352).url()}
                      alt={post.mainImage.alt ?? post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                ) : (
                  <div className="h-44 w-full bg-white/[0.03]" />
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h2 className="font-display text-base font-semibold leading-snug text-white group-hover:text-zinc-100 sm:text-lg line-clamp-2">
                    {post.title}
                  </h2>

                  {post.seoDescription && (
                    <p className="text-sm leading-relaxed text-zinc-500 line-clamp-2">
                      {post.seoDescription}
                    </p>
                  )}

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-3 text-xs text-zinc-600 border-t border-white/[0.06]">
                    {post.geoTarget && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {post.geoTarget}
                      </span>
                    )}
                    {post.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt)}
                      </span>
                    )}
                    <span className="ml-auto flex items-center gap-1 text-zinc-500 transition-colors group-hover:text-white">
                      Leer
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
