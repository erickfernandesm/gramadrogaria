"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** Nome acessível do painel. */
  label: string;
  /** Classes de posição e tamanho do painel. */
  className?: string;
  children: ReactNode;
};

/**
 * Painel modal sobre o <dialog> nativo: o navegador cuida do foco preso,
 * da tecla Esc e de tornar o resto da página inerte.
 */
export function Modal({ open, onClose, label, className = "", children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      // showModal foca o primeiro controle; campos marcados têm prioridade.
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Trava a rolagem da página enquanto o painel está aberto.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === ref.current) onClose();
  }

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={`fixed m-0 max-h-none max-w-none overflow-hidden bg-paper p-0 text-ink shadow-panel backdrop:bg-ink/45 ${className}`}
    >
      {open ? children : null}
    </dialog>
  );
}
