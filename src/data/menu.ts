export type Category =
  | "Biryani & Rice"
  | "Karahi & Handi"
  | "Burgers & Rolls"
  | "Sides"
  | "Drinks"
  | "Desserts";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
};

export const CATEGORIES: Category[] = [
  "Biryani & Rice",
  "Karahi & Handi",
  "Burgers & Rolls",
  "Sides",
  "Drinks",
  "Desserts",
];

export const MENU: MenuItem[] = [
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    description: "Karachi-style, raita & salad",
    price: 450,
    category: "Biryani & Rice",
  },
  {
    id: "beef-pulao",
    name: "Beef Pulao",
    description: "Yakhni pulao, kachumber",
    price: 520,
    category: "Biryani & Rice",
  },
  {
    id: "chicken-fried-rice",
    name: "Chicken Fried Rice",
    description: "Wok-tossed, egg, spring onion",
    price: 380,
    category: "Biryani & Rice",
  },
  {
    id: "chicken-karahi-half",
    name: "Chicken Karahi Half",
    description: "Tomato-based, green chilli",
    price: 950,
    category: "Karahi & Handi",
  },
  {
    id: "chicken-white-handi-half",
    name: "Chicken White Handi Half",
    description: "Creamy, cashew",
    price: 1050,
    category: "Karahi & Handi",
  },
  {
    id: "daal-makhani",
    name: "Daal Makhani",
    description: "Black lentils, butter",
    price: 420,
    category: "Karahi & Handi",
  },
  {
    id: "zinger-burger",
    name: "Zinger Burger",
    description: "Crispy fillet, brioche",
    price: 480,
    category: "Burgers & Rolls",
  },
  {
    id: "beef-paratha-roll",
    name: "Beef Paratha Roll",
    description: "Seekh kebab, chutney",
    price: 320,
    category: "Burgers & Rolls",
  },
  {
    id: "chicken-cheese-roll",
    name: "Chicken Cheese Roll",
    description: "Malai boti, cheddar, garlic mayo",
    price: 350,
    category: "Burgers & Rolls",
  },
  {
    id: "garlic-naan",
    name: "Garlic Naan",
    description: "Tandoor-fresh",
    price: 90,
    category: "Sides",
  },
  {
    id: "masala-fries",
    name: "Masala Fries",
    description: "Chaat masala, garlic aioli",
    price: 220,
    category: "Sides",
  },
  {
    id: "fresh-lime-soda",
    name: "Fresh Lime Soda",
    description: "Mint / salt / sweet",
    price: 150,
    category: "Drinks",
  },
  {
    id: "mango-lassi",
    name: "Mango Lassi",
    description: "Sindhri mango",
    price: 200,
    category: "Drinks",
  },
  {
    id: "soft-drink-500ml",
    name: "Soft Drink 500ml",
    description: "Coke / Sprite / Fanta",
    price: 120,
    category: "Drinks",
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun (2 pieces)",
    description: "Warm, in syrup",
    price: 180,
    category: "Desserts",
  },
  {
    id: "kheer",
    name: "Kheer",
    description: "Pistachio, chilled",
    price: 200,
    category: "Desserts",
  },
];

export const DELIVERY_FEE = 150;
export const FREE_DELIVERY_THRESHOLD = 1500;
