export const categories = [
  { id: "all", label: "All", emoji: "🍽️" },
  { id: "burger", label: "Burgers", emoji: "🍔" },
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "sushi", label: "Sushi", emoji: "🍣" },
  { id: "ramen", label: "Noodles", emoji: "🍜" },
  { id: "salad", label: "Healthy", emoji: "🥗" },
  { id: "dessert", label: "Dessert", emoji: "🍰" },
];

export const popularFoods = [
  {
    id: "1",
    name: "Double Smash Burger",
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    rating: 4.9,
    price: 13.5,
  },
  {
    id: "2",
    name: "Crispy Chicken Burger",
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    rating: 4.8,
    price: 11.99,
  },
  {
    id: "3",
    name: "Classic Cheeseburger",
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    rating: 4.7,
    price: 10.5,
  },
  {
    id: "4",
    name: "Spicy Beef Burger",
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    rating: 4.6,
    price: 12.75,
  },
  {
    id: "5",
    name: "Bacon BBQ Burger",
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    rating: 4.9,
    price: 14.25,
  },
  {
    id: "6",
    name: "Loaded Beef Burger",
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    rating: 4.8,
    price: 15.0,
  },
];

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

export const restaurants: Restaurant[] = [
  {
    id: "ember",
    name: "Ember & Bun",
    tags: ["Burgers", "American"],
    rating: 4.8,
    reviews: 1284,
    eta: "18–25 min",
    distance: "1.2 km",
    deliveryFee: 0,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    featured: true,
    promo: "Free delivery",
  },
  {
    id: "forno",
    name: "Forno Napoli",
    tags: ["Pizza", "Italian"],
    rating: 4.7,
    reviews: 942,
    eta: "22–30 min",
    distance: "2.0 km",
    deliveryFee: 1.99,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    featured: true,
    promo: "20% off",
  },
  {
    id: "kaisen",
    name: "Kaisen Omakase",
    tags: ["Sushi", "Japanese"],
    rating: 4.9,
    reviews: 613,
    eta: "28–35 min",
    distance: "3.4 km",
    deliveryFee: 2.49,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
  },
  {
    id: "shio",
    name: "Shio Ramen Bar",
    tags: ["Noodles", "Japanese"],
    rating: 4.6,
    reviews: 758,
    eta: "20–28 min",
    distance: "1.8 km",
    deliveryFee: 0.99,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
  },
  {
    id: "verde",
    name: "Verde Kitchen",
    tags: ["Healthy", "Bowls"],
    rating: 4.5,
    reviews: 411,
    eta: "15–22 min",
    distance: "0.9 km",
    deliveryFee: 0,
    image:
      "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
    promo: "Free delivery",
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
