import { Minus, Plus } from "lucide-react";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  /** Nome do produto, usado nos rótulos acessíveis. */
  label: string;
  min?: number;
  size?: "sm" | "md";
  full?: boolean;
};

export function QuantityStepper({
  value,
  onChange,
  label,
  min = 0,
  size = "md",
  full = false,
}: QuantityStepperProps) {
  const height = size === "sm" ? "h-9" : "h-11";
  const button = `${height} flex w-10 shrink-0 items-center justify-center text-ink transition-colors hover:bg-sand disabled:opacity-35`;

  return (
    <div
      role="group"
      aria-label={`Quantidade de ${label}`}
      className={`${height} ${full ? "flex w-full" : "inline-flex"} items-stretch overflow-hidden rounded-md border border-line-strong bg-paper`}
    >
      <button
        type="button"
        className={button}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span
        aria-live="polite"
        className="flex min-w-8 flex-1 items-center justify-center text-sm font-semibold tabular-nums"
      >
        {value}
      </span>
      <button
        type="button"
        className={button}
        onClick={() => onChange(value + 1)}
        aria-label="Aumentar quantidade"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
