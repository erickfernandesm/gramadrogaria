"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "@/lib/catalog";
import type { OrderLine } from "@/lib/whatsapp";
import type { CartItem } from "@/types";

const STORAGE_KEY = "drogaria-grama:pedido";
const MAX_QUANTITY = 99;

type CartContextValue = {
  /** Itens do pedido já resolvidos com os dados do produto. */
  lines: OrderLine[];
  /** Soma das quantidades. */
  count: number;
  /** Subtotal em reais, ou `null` se algum item não tem preço cadastrado. */
  subtotal: number | null;
  /** `false` até o pedido salvo no navegador ser carregado. */
  ready: boolean;
  quantityOf: (productId: string) => number;
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CartItem).productId === "string" &&
        Number.isInteger((item as CartItem).quantity) &&
        (item as CartItem).quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(readStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Navegação privada ou armazenamento cheio: o pedido vale só nesta visita.
    }
  }, [items, ready]);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const next = Math.min(Math.max(Math.trunc(quantity), 0), MAX_QUANTITY);
    setItems((current) => {
      if (next === 0) return current.filter((item) => item.productId !== productId);
      const exists = current.some((item) => item.productId === productId);
      if (!exists) return [...current, { productId, quantity: next }];
      return current.map((item) =>
        item.productId === productId ? { ...item, quantity: next } : item,
      );
    });
  }, []);

  const add = useCallback((productId: string, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (!existing) return [...current, { productId, quantity }];
      return current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_QUANTITY) }
          : item,
      );
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    // Itens cujo produto saiu do catálogo são ignorados.
    const lines: OrderLine[] = [];
    for (const item of items) {
      const product = getProductById(item.productId);
      if (product) lines.push({ product, quantity: item.quantity });
    }

    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const allPriced = lines.every((line) => line.product.price !== undefined);
    const subtotal =
      lines.length > 0 && allPriced
        ? lines.reduce((sum, line) => sum + (line.product.price ?? 0) * line.quantity, 0)
        : null;

    return {
      lines,
      count,
      subtotal,
      ready,
      quantityOf: (productId) =>
        items.find((item) => item.productId === productId)?.quantity ?? 0,
      add,
      setQuantity,
      remove,
      clear,
      isOpen,
      open,
      close,
    };
  }, [items, ready, isOpen, add, setQuantity, remove, clear, open, close]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa estar dentro de <CartProvider>.");
  return context;
}
