import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { useState, useMemo } from "react";
import Colors from "../../constants/Colors";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const categoryData = [
  {
    id: "1",
    food: "Fried-Rice",
    icon: <FontAwesome6 name="bowl-rice" size={24} color={Colors.primary200} />,
  },
  {
    id: "2",
    food: "Pizza",
    icon: (
      <FontAwesome5 name="pizza-slice" size={24} color={Colors.primary200} />
    ),
  },

  {
    id: "3",
    food: "Tacos",
    icon: (
      <MaterialCommunityIcons name="taco" size={24} color={Colors.primary200} />
    ),
  },
  {
    id: "4",
    food: "Burger",
    icon: <FontAwesome6 name="burger" size={24} color={Colors.primary200} />,
  },
];

const foodData = [
  {
    id: "1",
    image: require("../../assets/images/Fried-Rice/rice1.jpg"),
    Category: "Fried-Rice",
    name: "Fried Rice",
    price: 100,
    time: "50 minutes",
    description:
      "Fried rice is a stir-fried dish made with cooked rice, vegetables, eggs, and meat, seasoned with soy sauce and spices. It’s flavorful, versatile, and popular worldwide.",
    item1: "Sausage",
    item2: "Turkey",
    item3: "Chicken wings",
  },
  {
    id: "2",
    image: require("../../assets/images/Fried-Rice/rice2.jpg"),
    Category: "Fried-Rice",
    name: "Fried Rice",
    price: 300,
    time: "35 minutes",
    description:
      "A delicious and savory rice dish stir-fried with a mix of fresh vegetables, eggs, and tender meat, infused with aromatic spices.",
    item1: "Beef",
    item2: "Shrimp",
    item3: "Grilled Chicken",
  },
  {
    id: "3",
    image: require("../../assets/images/Fried-Rice/rice3.jpg"),
    Category: "Fried-Rice",
    name: "Fried Rice",
    price: 180,
    time: "25 minutes",
    description:
      "This flavorful fried rice is a perfect balance of protein and veggies, making it a hearty and satisfying meal.",
    item1: "Lamb",
    item2: "Fish",
    item3: "Tofu",
  },
  {
    id: "4",
    image: require("../../assets/images/Fried-Rice/rice4.jpg"),
    Category: "Fried-Rice",
    name: "Fried Rice",
    price: 200,
    time: "40 minutes",
    description:
      "A classic favorite, stir-fried rice combined with fresh veggies, proteins, and a special blend of seasonings.",
    item1: "Grilled Pork",
    item2: "Duck",
    item3: "Mushrooms",
  },
  {
    id: "5",
    image: require("../../assets/images/Pizza/pizza1.jpg"),
    Category: "Pizza",
    name: "Pepperoni Pizza",
    price: 200,
    time: "30 minutes",
    description:
      "A classic pizza topped with spicy pepperoni, gooey cheese, and a rich tomato sauce.",
    item1: "Extra Cheese",
    item2: "Olives",
    item3: "Jalapeños",
  },
  {
    id: "6",
    image: require("../../assets/images/Pizza/pizza2.jpg"),
    Category: "Pizza",
    name: "Margherita Pizza",
    price: 180,
    time: "40 minutes",
    description:
      "A simple yet delicious pizza topped with fresh mozzarella, basil, and rich tomato sauce.",
    item1: "Extra Cheese",
    item2: "Tomatoes",
    item3: "Basil",
  },
  {
    id: "7",
    image: require("../../assets/images/Pizza/pizza3.jpg"),
    Category: "Pizza",
    name: "BBQ Chicken Pizza",
    price: 220,
    time: "40 minutes",
    description:
      "A smoky, tangy delight with BBQ sauce, grilled chicken, and caramelized onions.",
    item1: "Bacon",
    item2: "Cheddar Cheese",
    item3: "Onions",
  },
  {
    id: "8",
    image: require("../../assets/images/Pizza/pizza4.jpg"),
    Category: "Pizza",
    name: "Veggie Supreme",
    price: 190,
    time: "40 minutes",
    description:
      "A wholesome pizza loaded with fresh bell peppers, mushrooms, olives, and tomatoes.",
    item1: "Spinach",
    item2: "Feta Cheese",
    item3: "Bell Peppers",
  },
  {
    id: "9",
    image: require("../../assets/images/Tacos/tacos1.jpg"),
    Category: "Tacos",
    name: "Chicken Tacos",
    price: 150,
    time: "30 minutes",
    description:
      "Soft corn tortillas filled with juicy grilled chicken, fresh salsa, and a drizzle of sour cream.",
    item1: "Guacamole",
    item2: "Sour Cream",
    item3: "Cilantro",
  },
  {
    id: "10",
    image: require("../../assets/images/Tacos/tacos2.jpg"),
    Category: "Tacos",
    name: "Beef Tacos",
    price: 160,
    time: "40 minutes",
    description:
      "Seasoned ground beef, topped with lettuce, cheese, and salsa, wrapped in a crispy taco shell.",
    item1: "Cheese",
    item2: "Lettuce",
    item3: "Salsa",
  },
  {
    id: "11",
    image: require("../../assets/images/Tacos/tacos3.jpg"),
    Category: "Tacos",
    name: "Fish Tacos",
    price: 170,
    time: "40 minutes",
    description:
      "Crispy battered fish, topped with zesty slaw and creamy sauce, served in a soft tortilla.",
    item1: "Lime",
    item2: "Avocado",
    item3: "Cabbage Slaw",
  },
  {
    id: "12",
    image: require("../../assets/images/Tacos/tacos4.jpg"),
    Category: "Tacos",
    name: "Veggie Tacos",
    price: 140,
    time: "40 minutes",
    description:
      "Loaded with fresh grilled veggies, black beans, and a tangy lime dressing.",
    item1: "Black Beans",
    item2: "Avocado",
    item3: "Corn Salsa",
  },
  {
    id: "13",
    image: require("../../assets/images/Burger/burger1.jpg"),
    Category: "Burger",
    name: "Classic Beef Burger",
    price: 180,
    time: "30 minutes",
    description:
      "A juicy beef patty served in a soft bun with fresh lettuce, tomatoes, and a special sauce.",
    item1: "Cheese",
    item2: "Bacon",
    item3: "Onions",
  },
  {
    id: "14",
    image: require("../../assets/images/Burger/burger2.jpg"),
    Category: "Burger",
    name: "Chicken Burger",
    price: 170,
    time: "40 minutes",
    description:
      "Crispy fried chicken patty with lettuce, mayo, and pickles on a toasted bun.",
    item1: "Coleslaw",
    item2: "Extra Mayo",
    item3: "Cheddar Cheese",
  },
  {
    id: "15",
    image: require("../../assets/images/Burger/burger3.jpg"),
    Category: "Burger",
    name: "BBQ Bacon Burger",
    price: 200,
    time: "40 minutes",
    description:
      "A smoky BBQ burger with crispy bacon, cheddar cheese, and caramelized onions.",
    item1: "BBQ Sauce",
    item2: "Jalapeños",
    item3: "Onion Rings",
  },
  {
    id: "16",
    image: require("../../assets/images/Burger/burger4.jpg"),
    Category: "Burger",
    name: "Veggie Burger",
    price: 160,
    time: "40 minutes",
    description:
      "A plant-based burger patty with fresh toppings and a zesty sauce on a whole wheat bun.",
    item1: "Avocado",
    item2: "Lettuce",
    item3: "Tomato",
  },
];

const Category = () => {
  const [changeCategory, setChangeCategory] = useState("Fried-Rice");
  const navigation = useNavigation();

  const selectFoodCategory = (selectedFood) => {
    setChangeCategory(selectedFood);
  };

  const foodDetailsHandler = (item) => {
    navigation.navigate("FoodDetails", { foodItem: item });
  };

  const filteredFoodData = useMemo(
    () => foodData.filter((item) => item.Category === changeCategory),
    [foodData, changeCategory]
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Category</Text>
        <FlatList
          data={categoryData}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => selectFoodCategory(item.food)}
              style={({ pressed }) => [
                styles.categoryItems,
                pressed && styles.categoryItemsPressed,
              ]}
            >
              {item.icon}
              <Text style={styles.food}>{item.food}</Text>
            </Pressable>
          )}
        />
      </View>

      <View style={styles.foodListContainer}>
        <FlatList
          data={filteredFoodData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.gridWrapper}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => foodDetailsHandler(item)}
              style={({ pressed }) => [
                styles.foodCard,
                pressed && styles.foodCardItemsPressed,
              ]}
            >
              <Image source={item.image} style={styles.image} />
              <View style={styles.overlay} />

              <View style={styles.timeBadge}>
                <Ionicons
                  name="time-outline"
                  size={18}
                  color={Colors.primary100}
                />
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.foodTitle}>Delicious Meal</Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  innerContainer: {
    gap: 10,
  },
  title: {
    marginHorizontal: 10,
    color: Colors.primary100,
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
    textTransform: "capitalize",
  },
  categoryItems: {
    borderColor: Colors.primary200,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 8,
  },
  categoryItemsPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  food: {
    color: Colors.primary100,
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
  },
  foodListContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  gridWrapper: {
    justifyContent: "space-between",
  },
  foodCard: {
    flex: 1,
    margin: 8,
    backgroundColor: Colors.primaryBackground,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  foodCardItemsPressed: {
    opacity: 0.8,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
  },
  timeBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    backdropFilter: "blur(5px)",
  },
  timeText: {
    color: Colors.primary100,
    fontSize: 12,
    marginLeft: 5,
    fontFamily: "OpenSans-Bold",
  },
  detailsContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 12,
  },
  foodTitle: {
    color: Colors.primary100,
    fontSize: 16,
    fontFamily: "OpenSans-Bold",
    textAlign: "center",
  },
});
