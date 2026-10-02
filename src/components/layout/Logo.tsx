import Image from "next/image";
import Link from "next/link";
import { storeConfig } from "@/config/store";

type LogoProps = {
  onClick?: () => void;
  /** Versão para fundo escuro. */
  inverted?: boolean;
};

export function Logo({ onClick, inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex shrink-0 items-center gap-2.5"
      aria-label={`${storeConfig.name}, página inicial`}
    >
      <Image
        src={storeConfig.logo}
        alt=""
        width={44}
        height={44}
        priority
        className="size-10 rounded-full lg:size-11"
      />
      <span className="font-display leading-none">
        <span
          className={`block text-[0.625rem] font-semibold uppercase tracking-[0.18em] ${
            inverted ? "text-white/70" : "text-ink-mute"
          }`}
        >
          Drogaria
        </span>
        <span
          className={`block text-xl font-extrabold tracking-tight ${
            inverted ? "text-white" : "text-ink"
          }`}
        >
          Grama
        </span>
      </span>
    </Link>
  );
}
