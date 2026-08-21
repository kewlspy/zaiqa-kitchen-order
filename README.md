# Zaiqa Kitchen Order

Build a single-page ordering website for a Karachi home-kitchen called "Zaiqa Kitchen".

NO BACKEND: no database, no Supabase, no auth, no Stripe, no email, no API calls.

All state in React useState only, nothing persisted. Orders go out via a

pre-filled WhatsApp message. Build only what's below.

HEADER: "Zaiqa Kitchen" wordmark left; cart button with item-count badge right, opens cart drawer.

HERO: Headline "Ghar ka khana. Delivered." Subline "Fresh Karachi home cooking, 12pm to 11pm. Free delivery over Rs 1500." One button "Order Now" scrolls to menu. Warm appetising background, no stock photos.

MENU: Filter chips (All / Biryani & Rice / Karahi & Handi / Burgers & Rolls / Sides / Drinks / Desserts), default All. Card grid: 1 col mobile / 2 tablet / 3 desktop. Each card: name, one-line description, price as "Rs 450", Add button → becomes [−][qty][+] stepper, 0 removes it. Use these exact items/prices, don't invent or change any:

Biryani & Rice: Chicken Biryani 450 (Karachi-style, raita & salad) · Beef Pulao 520 (yakhni pulao, kachumber) · Chicken Fried Rice 380 (wok-tossed, egg, spring onion)

Karahi & Handi: Chicken Karahi Half 950 (tomato-based, green chilli) · Chicken White Handi Half 1050 (creamy, cashew) · Daal Makhani 420 (black lentils, butter)

Burgers & Rolls: Zinger Burger 480 (crispy fillet, brioche) · Beef Paratha Roll 320 (seekh kebab, chutney) · Chicken Cheese Roll 350 (malai boti, cheddar, garlic mayo)

Sides: Garlic Naan 90 (tandoor-fresh) · Masala Fries 220 (chaat masala, garlic aioli)

Drinks: Fresh Lime Soda 150 (mint/salt/sweet) · Mango Lassi 200 (Sindhri mango) · Soft Drink 500ml 120 (Coke/Sprite/Fanta)

Desserts: Gulab Jamun (2 pieces) 180 (warm, in syrup) · Kheer 200 (pistachio, chilled)

CART DRAWER (right slide-in, full-screen sheet on mobile): line items with steppers + line totals, subtotal, delivery Rs 150 (Rs 0 shown as "FREE" when subtotal ≥ 1500), bold grand total. Empty state: "Your cart is empty" + "Browse the menu" button. "Checkout" button reveals the form in the same drawer — no page navigation.

CHECKOUT FORM (in drawer, below totals): Full Name*, WhatsApp Number*, Delivery Address* (textarea), Payment Method (radio: Cash on Delivery / Bank Transfer, default Cash), Notes (optional textarea). Inline validation — submit disabled until the 3 required fields are filled and cart isn't empty. Submit label: "Send Order on WhatsApp" with WhatsApp icon.

FLOATING WHATSAPP BUTTON: fixed bottom-right, green circle, opens

https://wa.me/${WHATSAPP_NUMBER}?text=Assalam%20o%20Alaikum%2C%20menu%20bhej%20dein

in a new tab. Tooltip "Chat with us".

FOOTER: timings 12pm–11pm, "Delivery across Karachi", the WhatsApp number, "Built at the NexusBerry AI School".

WHATSAPP HANDOFF — the most important part:

Declare `const WHATSAPP_NUMBER = "923332654514";` (digits only, no + or spaces) at the top of the main component.

On "Send Order on WhatsApp": do NOT submit anywhere. Build the message below with real "\n" newlines, encodeURIComponent() it, then window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank"). Then clear the cart, close the drawer, show: "Order sent on WhatsApp. Please press send in WhatsApp to confirm."

Message template — reproduce exactly, including asterisks/emoji, another system reads this text:

*NEW ORDER — Zaiqa Kitchen*

*Items*

2 x Chicken Biryani — Rs 900

1 x Mango Lassi — Rs 200

Subtotal: Rs 1100

Delivery: Rs 150

*Total: Rs 1250*

*Name:* Ali Raza

*Phone:* 03001234567

*Address:* House 12, Street 4, DHA Phase 5, Karachi

*Payment:* Cash on Delivery

*Notes:* less spicy please

Rules: one line per item as "{qty} x {name} — Rs {qty*price}"; omit *Notes:* line entirely if empty; write Delivery as "FREE" when fee is 0; no trailing blank lines.

LOOK: warm, not corporate. Charcoal text on warm off-white, saffron/turmeric accent for buttons/badge, WhatsApp green reserved for WhatsApp actions only. Generous whitespace, rounded cards, soft hover shadows. One confident display font for headings, clean sans for body. Mobile-first, fully responsive, keyboard accessible, no dark mode toggle.

DO NOT add: login, hero carousel, testimonials, About Us, newsletter signup, blog, chatbot widget, or animations beyond hovers and the drawer slide.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1593c508-78c7-40bb-a659-572715eacea4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
