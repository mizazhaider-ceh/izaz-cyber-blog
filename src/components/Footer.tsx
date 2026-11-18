import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 py-8 text-center font-mono text-xs leading-8 text-text-muted">
        <p className="flex flex-wrap items-baseline justify-center">
          <Link href="/" className="text-text-secondary transition-colors hover:text-primary">
            {site.brand}
          </Link>
          {site.footerLinks.map((item) => (
            <span key={item.href} className="flex items-baseline">
              <span aria-hidden="true" className="mx-2 text-text-subtle">
                /
              </span>
              <Link
                href={item.href}
                className="transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            </span>
          ))}
        </p>
        <p>
          &copy; {new Date().getFullYear()} {site.fullName}. {site.tagline}
        </p>
      </div>
    </footer>
  );
}
