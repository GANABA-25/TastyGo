export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  restaurantId: string;
  popular?: boolean;
};

export type Restaurant = {
  id: string;
  name: string;
  tags: string[];
  rating: number;
  reviews: number;
  eta: string;
  distance: string;
  deliveryFee: number;
  image: string;
  featured?: boolean;
  promo?: string;
};

export const categories = [
  { id: "all", label: "All", emoji: "🍽️" },
  { id: "chicken", label: "Chicken", emoji: "🍗" },
  { id: "burger", label: "Burgers", emoji: "🍔" },
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "rice", label: "Rice", emoji: "🍚" },
  { id: "local-dishes", label: "Local Dishes", emoji: "🇬🇭" },
  { id: "tacos", label: "Tacos", emoji: "🌮" },
  { id: "drinks", label: "Drinks", emoji: "🥤" },
];

export const popularFoods = [
  {
    id: "1",
    name: "Classic Beef Smashburger",
    vendor: "RocoMamas",
    description:
      "A juicy flame-grilled beef patty with cheese, lettuce, tomato, onions and signature RocoMayo in a fresh bun.",
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    rating: 4.8,
    price: 65,
    extra: [
      {
        type: "Extra cheese",
        price: 15,
      },
      {
        type: "Bacon",
        price: 25,
      },
      {
        type: "Fried egg",
        price: 13,
      },
      {
        type: "Extra beef patty",
        price: 45,
      },
    ],
  },

  {
    id: "2",
    name: "Broasted Chicken & Fried Rice",
    vendor: "Papaye",
    description:
      "Crispy broasted chicken served with flavorful Ghanaian-style fried rice, coleslaw and pepper.",
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720701/rice4_mf5jxj.jpg",
    rating: 4.9,
    price: 80,
    extra: [
      {
        type: "Extra chicken",
        price: 25,
      },
      {
        type: "Extra fried rice",
        price: 15,
      },
      {
        type: "Coleslaw",
        price: 10,
      },
      {
        type: "Shito",
        price: 5,
      },
    ],
  },

  {
    id: "3",
    name: "Papa's Special Pizza",
    vendor: "Papa's Pizza",
    description:
      "A loaded pizza with mozzarella, tomato sauce, beef, chorizo, ham, onion, green pepper and sweet corn.",
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720727/pizza3_dqemoz.jpg",
    rating: 4.7,
    price: 99,
    extra: [
      {
        type: "Extra cheese",
        price: 21,
      },
      {
        type: "Chicken",
        price: 22,
      },
      {
        type: "Beef",
        price: 22,
      },
      {
        type: "Mushrooms",
        price: 8,
      },
    ],
  },

  {
    id: "4",
    name: "Beef Carnitas Tacos",
    vendor: "Bistro 22",
    description:
      "Tender beef carnitas wrapped in soft tortillas with fresh toppings and flavorful Mexican-inspired sauce.",
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720754/tacos3_dgedfi.jpg",
    rating: 4.7,
    price: 85,
    extra: [
      {
        type: "Extra beef",
        price: 25,
      },
      {
        type: "Extra cheese",
        price: 15,
      },
      {
        type: "Guacamole",
        price: 20,
      },
      {
        type: "Extra salsa",
        price: 8,
      },
    ],
  },
];

export const restaurants: Restaurant[] = [
  {
    id: "kfc",
    name: "KFC",
    tags: ["Chicken", "Fast Food", "Burgers"],
    rating: 4.7,
    reviews: 2841,
    eta: "15–25 min",
    distance: "1.2 km",
    deliveryFee: 0,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    featured: true,
    promo: "Free delivery",
  },

  {
    id: "papaye",
    name: "Papaye",
    tags: ["Ghanaian", "Chicken", "Rice"],
    rating: 4.8,
    reviews: 2156,
    eta: "18–28 min",
    distance: "1.8 km",
    deliveryFee: 10,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720701/rice4_mf5jxj.jpg",
    featured: true,
    promo: "Free delivery",
  },

  {
    id: "pizzaman-chickenman",
    name: "Pizzaman Chickenman",
    tags: ["Pizza", "Chicken", "Fast Food"],
    rating: 4.7,
    reviews: 1934,
    eta: "20–30 min",
    distance: "2.1 km",
    deliveryFee: 12,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720727/pizza3_dqemoz.jpg",
    featured: true,
    promo: "20% off",
  },

  {
    id: "papas-pizza",
    name: "Papa's Pizza",
    tags: ["Pizza", "Fast Food", "Italian"],
    rating: 4.6,
    reviews: 1687,
    eta: "22–32 min",
    distance: "2.5 km",
    deliveryFee: 10,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720727/pizza3_dqemoz.jpg",
    promo: "none",
  },

  {
    id: "rocomamas",
    name: "RocoMamas",
    tags: ["Burgers", "Chicken", "Ribs"],
    rating: 4.8,
    reviews: 1248,
    eta: "20–30 min",
    distance: "2.8 km",
    deliveryFee: 15,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    promo: "Free delivery",
  },

  {
    id: "chicken-inn",
    name: "Chicken Inn",
    tags: ["Chicken", "Fast Food", "Burgers"],
    rating: 4.6,
    reviews: 1125,
    eta: "18–27 min",
    distance: "2.4 km",
    deliveryFee: 10,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720701/rice4_mf5jxj.jpg",
    promo: "none",
  },

  {
    id: "burger-king",
    name: "Burger King",
    tags: ["Burgers", "Fast Food", "American"],
    rating: 4.6,
    reviews: 987,
    eta: "20–30 min",
    distance: "3.1 km",
    deliveryFee: 15,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    promo: "none",
  },

  {
    id: "pizza-inn",
    name: "Pizza Inn",
    tags: ["Pizza", "Fast Food", "Chicken"],
    rating: 4.5,
    reviews: 876,
    eta: "22–35 min",
    distance: "3.4 km",
    deliveryFee: 12,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720727/pizza3_dqemoz.jpg",
    promo: "15% off",
  },
];

// export const dishes: Dish[] = [
//   {
//     id: "double-smash",
//     name: "Double Smash Burger",
//     description:
//       "Two aged beef patties, molten cheddar, house pickles and smoked aioli in a brioche bun.",
//     price: 13.5,
//     image:
//       "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
//     rating: 4.9,
//     category: "burger",
//     restaurantId: "ember",
//     popular: true,
//   },
//   {
//     id: "margherita",
//     name: "Margherita Fumo",
//     description:
//       "72-hour dough, San Marzano tomato, fior di latte and basil from the wood oven.",
//     price: 15.0,
//     image:
//       "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
//     rating: 4.8,
//     category: "pizza",
//     restaurantId: "forno",
//     popular: true,
//   },
//   {
//     id: "omakase-set",
//     name: "Chef's Nigiri Set",
//     description:
//       "Twelve pieces of seasonal nigiri, cut to order and finished with aged soy.",
//     price: 28.0,
//     image:
//       "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
//     rating: 4.9,
//     category: "sushi",
//     restaurantId: "kaisen",
//     popular: true,
//   },
//   {
//     id: "tonkotsu",
//     name: "Spicy Tonkotsu Ramen",
//     description:
//       "18-hour pork broth, chili oil, ajitama egg and thin Hakata noodles.",
//     price: 16.5,
//     image:
//       "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
//     rating: 4.7,
//     category: "ramen",
//     restaurantId: "shio",
//     popular: true,
//   },
//   {
//     id: "green-bowl",
//     name: "Avocado Grain Bowl",
//     description:
//       "Farro, baby spinach, avocado, toasted seeds and a lemon-tahini dressing.",
//     price: 12.0,
//     image:
//       "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
//     rating: 4.6,
//     category: "salad",
//     restaurantId: "verde",
//   },
//   {
//     id: "truffle-fries",
//     name: "Truffle Parmesan Fries",
//     description: "Hand-cut fries, black truffle oil, parmesan and chive.",
//     price: 6.5,
//     image:
//       "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
//     rating: 4.7,
//     category: "burger",
//     restaurantId: "ember",
//   },
// ];

// export const addOns = [
//   { id: "cheese", label: "Extra cheese", price: 1.5 },
//   { id: "bacon", label: "Smoked bacon", price: 2.5 },
//   { id: "egg", label: "Fried egg", price: 1.0 },
//   { id: "jalapeno", label: "Pickled jalapeños", price: 0.8 },
// ];

// export const reviews = [
//   {
//     id: "1",
//     name: "Amara P.",
//     rating: 5,
//     time: "2 days ago",
//     text: "Arrived hot in 19 minutes. The smash burger is genuinely the best in the city.",
//   },
//   {
//     id: "2",
//     name: "Leo M.",
//     rating: 4,
//     time: "1 week ago",
//     text: "Great flavours and packaging. Would love a bigger portion of fries.",
//   },
//   {
//     id: "3",
//     name: "Sofia K.",
//     rating: 5,
//     time: "2 weeks ago",
//     text: "Driver was lovely and the live tracking was spot on the whole way.",
//   },
// ];

// export const orderHistory = [
//   {
//     id: "QB-48213",
//     restaurant: "Ember & Bun",
//     date: "Today · 19:04",
//     total: 27.4,
//     status: "On the way" as const,
//     image: burger,
//   },
//   {
//     id: "QB-47990",
//     restaurant: "Kaisen Omakase",
//     date: "Fri · 20:15",
//     total: 31.2,
//     status: "Delivered" as const,
//     image: sushi,
//   },
//   {
//     id: "QB-47712",
//     restaurant: "Shio Ramen Bar",
//     date: "Tue · 12:40",
//     total: 18.5,
//     status: "Delivered" as const,
//     image: ramen,
//   },
// ];
