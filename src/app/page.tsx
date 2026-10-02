import { DemoNotice } from "@/components/product/DemoNotice";
import { About } from "@/components/sections/About";
import { CategoryList } from "@/components/sections/CategoryList";
import { Hero } from "@/components/sections/Hero";
import { HowToOrder } from "@/components/sections/HowToOrder";
import { InstagramBand } from "@/components/sections/InstagramBand";
import { Location } from "@/components/sections/Location";
import { ProductShelf } from "@/components/sections/ProductShelf";
import { storeConfig } from "@/config/store";
import { getFeaturedProducts, getOffers } from "@/lib/catalog";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryList />
      {/* Só aparece quando há promoções reais cadastradas. */}
      <ProductShelf
        id="ofertas"
        title={`Ofertas da ${storeConfig.name}`}
        products={getOffers().slice(0, 8)}
        href="/produtos?ofertas=1"
        linkLabel="Ver todas as ofertas"
      />
      <ProductShelf
        title="Comece seu pedido"
        products={getFeaturedProducts(8)}
        href="/produtos"
        linkLabel="Ver todos os produtos"
        notice={<DemoNotice />}
      />
      <HowToOrder />
      <About />
      <Location />
      <InstagramBand />
    </>
  );
}
