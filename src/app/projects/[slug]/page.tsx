import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { openGraphSite, rssFeedAlternate, twitterCard } from "@/lib/metadata";
import { site } from "@/lib/site";
import { MdxContent } from "@/components/MdxContent";

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found", alternates: { ...rssFeedAlternate } };
  }
  const fm = project.frontmatter;
  return {
    title: fm.title,
    description: fm.description,
    alternates: {
      canonical: `/projects/${fm.slug}`,
      ...rssFeedAlternate,
    },
    openGraph: {
      ...openGraphSite,
      type: "website",
      url: `${site.url}/projects/${fm.slug}`,
      title: `${fm.title} | ${site.brand}`,
      description: fm.description,
    },
    twitter: {
      ...twitterCard,
      title: `${fm.title} | ${site.brand}`,
      description: fm.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  const fm = project.frontmatter;
  const others = getAllProjects().filter((entry) => entry.frontmatter.slug !== slug);

  return (
    <div className="mx-auto max-w-[1140px] px-6 py-16 md:py-24">
      <article className="mx-auto max-w-[760px]">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-text-muted">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <Link href="/projects" className="transition-colors hover:text-primary">
            Projects
          </Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-text-secondary">
            {fm.title}
          </span>
        </nav>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-primary">
          {fm.category}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl">
          {fm.title}
        </h1>
        <p className="mt-6 text-xl leading-8 text-text-secondary">{fm.description}</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-8 font-mono text-xs text-text-muted">
          <span>Status: {fm.status}</span>
          <span aria-hidden="true">|</span>
          <Link
            href={fm.repo}
            target="_blank"
            rel="noreferrer"
            className="text-secondary underline underline-offset-4 transition-colors hover:text-primary"
          >
            View the repository on GitHub
          </Link>
        </div>

        <div className="mt-8">
          <MdxContent source={project.content} />
        </div>

        <div className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
          {fm.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-4 py-1 font-mono text-xs text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>

      {others.length > 0 && (
        <section aria-labelledby="more-projects" className="mx-auto mt-16 max-w-[760px] border-t border-border pt-8">
          <h2 id="more-projects" className="font-display text-2xl font-bold text-text-primary">
            More projects
          </h2>
          <ul className="mt-8">
            {others.map((entry) => (
              <li key={entry.frontmatter.slug} className="border-b border-border py-6 first:pt-0 last:border-b-0">
                <Link href={`/projects/${entry.frontmatter.slug}`} className="group block">
                  <span className="font-display text-lg font-bold leading-7 text-text-primary transition-colors group-hover:text-primary">
                    {entry.frontmatter.title}
                  </span>
                  <span className="mt-1 block text-base leading-7 text-text-muted">
                    {entry.frontmatter.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
