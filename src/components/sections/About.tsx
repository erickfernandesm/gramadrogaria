import Image from "next/image";
import { storeConfig } from "@/config/store";
import { about } from "@/data/content";

export function About() {
  return (
    <section
      id="sobre"
      className="container-page grid items-center gap-10 py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-24"
    >
      {/* Painel com a assinatura da drogaria: a logo e a frase que ela usa. */}
      <div className="relative overflow-hidden rounded-2xl bg-brand px-7 py-10 text-white sm:px-10 sm:py-14">
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="absolute -bottom-16 -right-14 size-64 text-brand-dark/60"
        >
          <path d="M36 0h28v36h36v28H64v36H36V64H0V36h36z" fill="currentColor" />
        </svg>
        <div className="relative">
          <Image
            src={storeConfig.logo}
            alt={`Logo da ${storeConfig.name}`}
            width={88}
            height={88}
            className="size-20 rounded-full ring-4 ring-white/15 sm:size-[5.5rem]"
          />
          <p className="mt-7 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Nós cuidamos
            <br />
            de{" "}
            <span className="relative inline-block">
              você
              <svg
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-3 w-full text-sun"
              >
                <path
                  d="M3 4c58 9 136 9 194 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            !
          </p>
          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
            {storeConfig.address.neighborhood} · {storeConfig.address.city}
          </p>
        </div>
      </div>

      <div>
        <p className="eyebrow">Sobre a {storeConfig.name}</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{about.title}</h2>
        <div className="mt-6 space-y-4 text-lg text-ink-soft">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
