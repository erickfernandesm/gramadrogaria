import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/lib/catalog";

export function CategoryList() {
  const categories = getCategories();

  return (
    <section id="categorias" className="container-page py-10 lg:py-14">
      <h2 className="text-2xl font-bold sm:text-3xl">O que você procura?</h2>

      <ul className="mt-6 grid border-t border-line sm:grid-cols-2 sm:border-l lg:grid-cols-5">
        {categories.map((category) => (
          <li key={category.slug} className="border-b border-line sm:border-r">
            <Link
              href={`/produtos?categoria=${category.slug}`}
              className="group flex h-full items-start justify-between gap-3 py-4 transition-colors hover:bg-sand sm:flex-col sm:p-5 lg:min-h-40"
            >
              <span>
                <span className="block font-display text-lg font-bold tracking-tight">
                  {category.name}
                </span>
                <span className="mt-1 block text-sm text-ink-soft">{category.description}</span>
              </span>
              <ArrowUpRight
                className="mt-1 size-5 shrink-0 text-line-strong transition-colors group-hover:text-brand sm:mt-auto"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
