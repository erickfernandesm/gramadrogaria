import { storeConfig } from "@/config/store";
import { about } from "@/data/content";

export function About() {
  return (
    <section id="sobre" className="container-page grid gap-8 py-12 lg:grid-cols-2 lg:gap-20 lg:py-20">
      <div>
        <p className="eyebrow">Sobre a {storeConfig.name}</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{about.title}</h2>
      </div>
      <div className="space-y-4 text-lg text-ink-soft">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="border-l-2 border-sun pl-4 font-display text-xl font-bold text-ink">
          “{storeConfig.tagline}!”
        </p>
      </div>
    </section>
  );
}
