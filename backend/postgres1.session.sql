-- create DATABASE TastyGO

-- DELETE FROM "User"
-- WHERE id = 6;

-- INSERT INTO "Restaurant"
-- (
--   "id",
--   "name",
--   "rating",
--   "reviews",
--   "eta",
--   "distance",
--   "deliveryFee",
--   "image",
--   "featured",
--   "promo",
--   "createdAt",
--   "updatedAt"
-- )
-- VALUES
-- (
--   gen_random_uuid()::text,
--   'KFC',
--   4.7,
--   2841,
--   '15–25 min',
--   '1.2 km',
--   0,
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg',
--   true,
--   'Free delivery',
--   NOW(),
--   NOW()
-- ),
-- (
--   gen_random_uuid()::text,
--   'Papaye',
--   4.8,
--   2156,
--   '18–28 min',
--   '1.8 km',
--   10,
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720701/rice4_mf5jxj.jpg',
--   true,
--   'Free delivery',
--   NOW(),
--   NOW()
-- ),
-- (
--   gen_random_uuid()::text,
--   'Pizzaman Chickenman',
--   4.7,
--   1934,
--   '20–30 min',
--   '2.1 km',
--   12,
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720727/pizza3_dqemoz.jpg',
--   true,
--   '20% off',
--   NOW(),
--   NOW()
-- ),
-- (
--   gen_random_uuid()::text,
--   'Papa''s Pizza',
--   4.6,
--   1687,
--   '22–32 min',
--   '2.5 km',
--   10,
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720727/pizza3_dqemoz.jpg',
--   false,
--   'none',
--   NOW(),
--   NOW()
-- ),
-- (
--   gen_random_uuid()::text,
--   'RocoMamas',
--   4.8,
--   1248,
--   '20–30 min',
--   '2.8 km',
--   15,
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg',
--   false,
--   'Free delivery',
--   NOW(),
--   NOW()
-- ),
-- (
--   gen_random_uuid()::text,
--   'Chicken Inn',
--   4.6,
--   1125,
--   '18–27 min',
--   '2.4 km',
--   10,
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720701/rice4_mf5jxj.jpg',
--   false,
--   'none',
--   NOW(),
--   NOW()
-- ),
-- (
--   gen_random_uuid()::text,
--   'Burger King',
--   4.6,
--   987,
--   '20–30 min',
--   '3.1 km',
--   15,
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg',
--   false,
--   'none',
--   NOW(),
--   NOW()
-- ),
-- (
--   gen_random_uuid()::text,
--   'Pizza Inn',
--   4.5,
--   876,
--   '22–35 min',
--   '3.4 km',
--   12,
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720727/pizza3_dqemoz.jpg',
--   false,
--   '15% off',
--   NOW(),
--   NOW()
-- ),
-- (
--   gen_random_uuid()::text,
--   'Bistro 22',
--   4.7,
--   0,
--   '20–30 min',
--   '2.0 km',
--   10,
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720754/tacos3_dgedfi.jpg',
--   false,
--   'none',
--   NOW(),
--   NOW()
-- );

-- INSERT INTO "Food"
-- (
--   "id",
--   "restaurantId",
--   "name",
--   "description",
--   "image",
--   "rating",
--   "price",
--   "createdAt",
--   "updatedAt"
-- )
-- VALUES
-- (
--   gen_random_uuid()::text,
--   (SELECT "id" FROM "Restaurant" WHERE "name" = 'RocoMamas'),
--   'Classic Beef Smashburger',
--   'A juicy flame-grilled beef patty with cheese, lettuce, tomato, onions and signature RocoMayo in a fresh bun.',
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg',
--   4.8,
--   65,
--   NOW(),
--   NOW()
-- ),
-- (
--   gen_random_uuid()::text,
--   (SELECT "id" FROM "Restaurant" WHERE "name" = 'Papaye'),
--   'Broasted Chicken & Fried Rice',
--   'Crispy broasted chicken served with flavorful Ghanaian-style fried rice, coleslaw and pepper.',
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720701/rice4_mf5jxj.jpg',
--   4.9,
--   80,
--   NOW(),
--   NOW()
-- ),
-- (
--   gen_random_uuid()::text,
--   (SELECT "id" FROM "Restaurant" WHERE "name" = 'Papa''s Pizza'),
--   'Papa''s Special Pizza',
--   'A loaded pizza with mozzarella, tomato sauce, beef, chorizo, ham, onion, green pepper and sweet corn.',
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720727/pizza3_dqemoz.jpg',
--   4.7,
--   99,
--   NOW(),
--   NOW()
-- ),
-- (
--   gen_random_uuid()::text,
--   (SELECT "id" FROM "Restaurant" WHERE "name" = 'Bistro 22'),
--   'Beef Carnitas Tacos',
--   'Tender beef carnitas wrapped in soft tortillas with fresh toppings and flavorful Mexican-inspired sauce.',
--   'https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720754/tacos3_dgedfi.jpg',
--   4.7,
--   85,
--   NOW(),
--   NOW()
-- );


INSERT INTO "FoodExtra"
(
  "id",
  "foodId",
  "name",
  "price",
  "createdAt"
)
VALUES

-- Classic Beef Smashburger
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Classic Beef Smashburger'),
  'Extra cheese',
  15,
  NOW()
),
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Classic Beef Smashburger'),
  'Bacon',
  25,
  NOW()
),
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Classic Beef Smashburger'),
  'Fried egg',
  13,
  NOW()
),
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Classic Beef Smashburger'),
  'Extra beef patty',
  45,
  NOW()
),

-- Broasted Chicken & Fried Rice
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Broasted Chicken & Fried Rice'),
  'Extra chicken',
  25,
  NOW()
),
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Broasted Chicken & Fried Rice'),
  'Extra fried rice',
  15,
  NOW()
),
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Broasted Chicken & Fried Rice'),
  'Coleslaw',
  10,
  NOW()
),
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Broasted Chicken & Fried Rice'),
  'Shito',
  5,
  NOW()
),

-- Papa's Special Pizza
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Papa''s Special Pizza'),
  'Extra cheese',
  21,
  NOW()
),
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Papa''s Special Pizza'),
  'Chicken',
  22,
  NOW()
),
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Papa''s Special Pizza'),
  'Beef',
  22,
  NOW()
),
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Papa''s Special Pizza'),
  'Mushrooms',
  8,
  NOW()
),

-- Beef Carnitas Tacos
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Beef Carnitas Tacos'),
  'Extra beef',
  25,
  NOW()
),
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Beef Carnitas Tacos'),
  'Extra cheese',
  15,
  NOW()
),
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Beef Carnitas Tacos'),
  'Guacamole',
  20,
  NOW()
),
(
  gen_random_uuid()::text,
  (SELECT "id" FROM "Food" WHERE "name" = 'Beef Carnitas Tacos'),
  'Extra salsa',
  8,
  NOW()
);