import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { WhatsappIcon } from "@/components/WhatsappIcon";
import type { MenuItem } from "@/data/menu";

export type CartLine = { item: MenuItem; qty: number };

export type CheckoutDetails = {
  name: string;
  phone: string;
  address: string;
  payment: "Cash on Delivery" | "Bank Transfer";
  notes: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  onSetQty: (id: string, qty: number) => void;
  onBrowseMenu: () => void;
  onSubmit: (details: CheckoutDetails) => void;
};

export function CartDrawer({
  open,
  onOpenChange,
  lines,
  subtotal,
  deliveryFee,
  total,
  onSetQty,
  onBrowseMenu,
  onSubmit,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [touched, setTouched] = useState<{ name?: boolean; phone?: boolean; address?: boolean }>(
    {},
  );
  const [details, setDetails] = useState<CheckoutDetails>({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
    notes: "",
  });

  const errors = {
    name: details.name.trim() ? "" : "Full name is required",
    phone: details.phone.trim() ? "" : "WhatsApp number is required",
    address: details.address.trim() ? "" : "Delivery address is required",
  };
  const canSubmit = !errors.name && !errors.phone && !errors.address && lines.length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-md"
      >
        <SheetHeader className="pb-2">
          <SheetTitle className="font-display text-2xl">Your Order</SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
            <p className="text-lg font-medium">Your cart is empty</p>
            <Button
              variant="hero"
              onClick={() => {
                onOpenChange(false);
                onBrowseMenu();
              }}
            >
              Browse the menu
            </Button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-6 pb-8">
            <ul className="flex flex-col gap-4">
              {lines.map(({ item, qty }) => (
                <li key={item.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Rs {item.price} each</p>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-border bg-secondary p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full"
                        aria-label={`Decrease ${item.name}`}
                        onClick={() => onSetQty(item.id, qty - 1)}
                      >
                        {qty === 1 ? <Trash2 /> : <Minus />}
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold" aria-live="polite">
                        {qty}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full"
                        aria-label={`Increase ${item.name}`}
                        onClick={() => onSetQty(item.id, qty + 1)}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                  <p className="whitespace-nowrap font-semibold">Rs {item.price * qty}</p>
                </li>
              ))}
            </ul>

            <Separator />

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rs {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>{deliveryFee === 0 ? "FREE" : `Rs ${deliveryFee}`}</span>
              </div>
              <div className="mt-1 flex justify-between text-base font-bold">
                <span>Total</span>
                <span>Rs {total}</span>
              </div>
            </div>

            {!showForm ? (
              <Button variant="hero" size="xl" onClick={() => setShowForm(true)}>
                Checkout
              </Button>
            ) : (
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!canSubmit) return;
                  onSubmit(details);
                  setShowForm(false);
                  setTouched({});
                  setDetails({
                    name: "",
                    phone: "",
                    address: "",
                    payment: "Cash on Delivery",
                    notes: "",
                  });
                }}
              >
                <Separator />
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={details.name}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    onChange={(e) => setDetails((d) => ({ ...d, name: e.target.value }))}
                  />
                  {touched.name && errors.name ? (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">WhatsApp Number *</Label>
                  <Input
                    id="phone"
                    inputMode="tel"
                    placeholder="03001234567"
                    value={details.phone}
                    onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                    onChange={(e) => setDetails((d) => ({ ...d, phone: e.target.value }))}
                  />
                  {touched.phone && errors.phone ? (
                    <p className="text-xs text-destructive">{errors.phone}</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    rows={3}
                    value={details.address}
                    onBlur={() => setTouched((t) => ({ ...t, address: true }))}
                    onChange={(e) => setDetails((d) => ({ ...d, address: e.target.value }))}
                  />
                  {touched.address && errors.address ? (
                    <p className="text-xs text-destructive">{errors.address}</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Payment Method</Label>
                  <RadioGroup
                    value={details.payment}
                    onValueChange={(v) =>
                      setDetails((d) => ({ ...d, payment: v as CheckoutDetails["payment"] }))
                    }
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Cash on Delivery" id="pay-cash" />
                      <Label htmlFor="pay-cash" className="font-normal">
                        Cash on Delivery
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Bank Transfer" id="pay-bank" />
                      <Label htmlFor="pay-bank" className="font-normal">
                        Bank Transfer
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    rows={2}
                    value={details.notes}
                    onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
                  />
                </div>

                <Button type="submit" variant="whatsapp" size="xl" disabled={!canSubmit}>
                  <WhatsappIcon className="size-5" />
                  Send Order on WhatsApp
                </Button>
              </form>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
