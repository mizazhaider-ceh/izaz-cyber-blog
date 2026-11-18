import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real projects built by Muhammad Izaz Haider: vulnerable labs, security tooling, teaching sites, and study plans.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div className="mx-auto max-w-[1140px] px-6 py-16 md:py-24">
      <h1 className="font-display text-5xl font-bold leading-tight text-text-primary md:text-6xl">
        Projects
      </h1>
      <p className="mt-8 max-w-[720px] text-xl leading-8 text-text-secondary">
        Things I built to learn, to teach, and to test. Each one is a real repository, with its
        limits stated plainly.
      </p>
      {projects.length === 0 ? (
        <p className="mt-12 text-base leading-7 text-text-muted">
          No projects published yet. Check back soon.
        </p>
      ) : (
        <ul className="mt-12">
          {projects.map((project) => (
            <li key={project.frontmatter.slug} className="border-b border-border py-6 first:pt-0 last:border-b-0">
              <Link href={`/projects/${project.frontmatter.slug}`} className="group block">
                <span className="flex flex-wrap items-baseline justify-between gap-4">
                  <span className="font-display text-xl font-bold leading-8 text-text-primary transition-colors group-hover:text-primary">
                    {project.frontmatter.title}
                  </span>
                  <span className="font-mono text-xs text-text-muted">
                    {project.frontmatter.status}
                  </span>
                </span>
                <span className="mt-2 block max-w-[720px] text-base leading-7 text-text-secondary">
                  {project.frontmatter.description}
                </span>
                <span className="mt-2 block font-mono text-xs text-text-muted">
                  {project.frontmatter.category} | {project.frontmatter.tags.join(", ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
