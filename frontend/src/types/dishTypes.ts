export type DishExtra = {
  id: string;
  foodId: string;
  name: string;
  price: number | string;
  createdAt: string;
};

export type DishReview = {
  id: string;
  foodId: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
};

export type DishTypes = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  price: number | string;
  category: string;
  popular: boolean;
  createdAt: string;
  updatedAt: string;
  extras: DishExtra[];
  reviews: DishReview[];
};
