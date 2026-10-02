import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/catalog";
import { categoryImage, categoryTint } from "@/lib/categoryTheme";

export function CategoryList() {
  const categories = getCategories();

  return (
    <section id="categorias" className="container-page py-12 lg:py-16">
      <h2 className="text-2xl font-bold sm:text-3xl">O que você procura?</h2>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {categories.map((category, index) => (
          <li
            key={category.slug}
            // Com cinco categorias, a última ocupa a linha inteira no celular.
            className={index === categories.length - 1 ? "col-span-2 sm:col-span-1" : ""}
          >
            <Link
              href={`/produtos?categoria=${category.slug}`}
              className={`group relative flex h-full flex-col overflow-hidden rounded-xl ${categoryTint[category.slug]} ${
                index === categories.length - 1 ? "max-sm:flex-row max-sm:items-center" : ""
              }`}
            >
              <span className="block p-4 pb-0 sm:p-5 sm:pb-0">
                <span className="block font-display text-lg font-bold leading-tight tracking-tight">
                  {category.name}
                </span>
                <span className="mt-1 hidden text-sm text-ink-soft lg:block">
                  {category.description}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                  Ver
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </span>
              <Image
                src={categoryImage(category.slug)}
                alt=""
                width={200}
                height={200}
                className={`mt-auto size-32 self-end transition-transform duration-300 group-hover:scale-105 sm:size-36 lg:size-40 ${
                  index === categories.length - 1 ? "max-sm:ml-auto max-sm:size-28" : ""
                }`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
