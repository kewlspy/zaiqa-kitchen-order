import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CartDrawer, type CartLine, type CheckoutDetails } from "@/components/CartDrawer";
import { WhatsappIcon } from "@/components/WhatsappIcon";
import { CATEGORIES, DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, MENU, type Category } from "@/data/menu";
import heroImage from "@/assets/hero-food.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zaiqa Kitchen — Karachi Home Cooking, Delivered" },
      {
        name: "description",
        content:
          "Order fresh Karachi home-cooked biryani, karahi, rolls and desserts from Zaiqa Kitchen. Open 12pm–11pm. Free delivery over Rs 1500.",
      },
      { property: "og:title", content: "Zaiqa Kitchen — Karachi Home Cooking, Delivered" },
      {
        property: "og:description",
        content:
          "Ghar ka khana, delivered across Karachi. Order on WhatsApp — free delivery over Rs 1500.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const WHATSAPP_NUMBER = "923332654514";

  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [cartOpen, setCartOpen] = useState(false);

  const setQty = (id: string, qty: number) =>
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const lines: CartLine[] = useMemo(
    () =>
      MENU.filter((item) => cart[item.id]).map((item) => ({ item, qty: cart[item.id] as number })),
    [cart],
  );
  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.item.price * l.qty, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const visibleItems =
    activeCategory === "All" ? MENU : MENU.filter((i) => i.category === activeCategory);

  const scrollToMenu = () =>
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = (details: CheckoutDetails) => {
    const itemLines = lines
      .map((l) => `${l.qty} x ${l.item.name} — Rs ${l.qty * l.item.price}`)
      .join("\n");

    let message =
      `*NEW ORDER — Zaiqa Kitchen*\n\n*Items*\n${itemLines}\n\n` +
      `Subtotal: Rs ${subtotal}\n` +
      `Delivery: ${deliveryFee === 0 ? "FREE" : `Rs ${deliveryFee}`}\n` +
      `*Total: Rs ${total}*\n\n` +
      `*Name:* ${details.name}\n` +
      `*Phone:* ${details.phone}\n` +
      `*Address:* ${details.address}\n` +
      `*Payment:* ${details.payment}`;

    if (details.notes.trim()) message += `\n*Notes:* ${details.notes.trim()}`;

    try {
      window.top.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    } catch {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    }
    setCart({});
    setCartOpen(false);
    toast.success("Order sent on WhatsApp. Please press send in WhatsApp to confirm.");
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <span className="font-display text-2xl font-semibold tracking-tight">
              Zaiqa Kitchen
            </span>
            <Button
              variant="outline"
              className="relative rounded-full"
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart, ${itemCount} items`}
            >
              <ShoppingBag />
              Cart
              {itemCount > 0 ? (
                <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {itemCount}
                </span>
              ) : null}
            </Button>
          </div>
        </header>

        <main>
          <section className="relative overflow-hidden">
            <img
              src={heroImage}
              alt="Home-cooked Karachi chicken karahi, pulao and garlic naan served in brass dishes"
              width={1600}
              height={1008}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
            <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
              <div className="max-w-xl">
                <h1 className="font-display text-4xl leading-tight sm:text-6xl">
                  Ghar ka khana. Delivered.
                </h1>
                <p className="mt-5 text-base text-muted-foreground sm:text-lg">
                  Fresh Karachi home cooking, 12pm to 11pm. Free delivery over Rs 1500.
                </p>
                <Button variant="hero" size="xl" className="mt-8" onClick={scrollToMenu}>
                  Order Now
                </Button>
              </div>
            </div>
          </section>

          <section id="menu" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
            <h2 className="text-3xl sm:text-4xl">Our Menu</h2>

            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Menu categories">
              {(["All", ...CATEGORIES] as const).map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleItems.map((item) => {
                const qty = cart[item.id] ?? 0;
                return (
                  <li
                    key={item.id}
                    className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-warm)] transition-shadow hover:shadow-[var(--shadow-lift)]"
                  >
                    <div>
                      <h3 className="text-xl">{item.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <span className="font-semibold">Rs {item.price}</span>
                      {qty === 0 ? (
                        <Button variant="hero" onClick={() => setQty(item.id, 1)}>
                          Add
                        </Button>
                      ) : (
                        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            aria-label={`Decrease ${item.name}`}
                            onClick={() => setQty(item.id, qty - 1)}
                          >
                            <Minus />
                          </Button>
                          <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            aria-label={`Increase ${item.name}`}
                            onClick={() => setQty(item.id, qty + 1)}
                          >
                            <Plus />
                          </Button>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>

        <footer className="border-t border-border bg-secondary/50">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-12 text-sm text-muted-foreground sm:px-6">
            <span className="font-display text-lg text-foreground">Zaiqa Kitchen</span>
            <span>Open daily 12pm – 11pm</span>
            <span>Delivery across Karachi</span>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="w-fit hover:text-foreground">
              +92 333 2654514
            </a>
            <span className="mt-4">Built at the NexusBerry AI School</span>
          </div>
        </footer>

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Assalam%20o%20Alaikum%2C%20menu%20bhej%20dein`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-[var(--shadow-lift)] transition-colors hover:bg-whatsapp/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <WhatsappIcon className="size-7" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="left">Chat with us</TooltipContent>
        </Tooltip>

        <CartDrawer
          open={cartOpen}
          onOpenChange={setCartOpen}
          lines={lines}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
          onSetQty={setQty}
          onBrowseMenu={scrollToMenu}
          onSubmit={handleSubmit}
        />
      </div>
    </TooltipProvider>
  );
}
