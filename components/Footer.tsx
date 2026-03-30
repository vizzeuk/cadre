import Link from "next/link";
import { Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 px-4 py-10 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="font-display font-semibold tracking-[0.2em] text-zinc-300">
            CADRE SOLUTIONS
          </p>
          <p>Estructurando la inteligencia digital</p>
        </div>

        {/* Center */}
        <p className="text-zinc-600">
          © {new Date().getFullYear()} CADRE Solutions. Todos los derechos reservados.
        </p>

        {/* Blog link */}
        <Link
          href="/blog"
          className="flex items-center gap-1.5 transition-colors hover:text-white"
        >
          Blog
        </Link>

        {/* Social */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:soluciones@cadre.cl"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-500 transition-colors hover:border-white/20 hover:text-white"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-500 transition-colors hover:border-white/20 hover:text-white"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
