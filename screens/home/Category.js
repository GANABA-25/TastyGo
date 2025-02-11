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
    time: "30 minus",
    Category: "Fried-Rice",
  },
  {
    id: "2",
    image: require("../../assets/images/Fried-Rice/rice2.jpg"),
    time: "40 minus",
    Category: "Fried-Rice",
  },
  {
    id: "3",
    image: require("../../assets/images/Fried-Rice/rice3.jpg"),
    time: "40 minus",
    Category: "Fried-Rice",
  },
  {
    id: "4",
    image: require("../../assets/images/Fried-Rice/rice4.jpg"),
    time: "40 minus",
    Category: "Fried-Rice",
  },
  {
    id: "5",
    image: require("../../assets/images/Pizza/pizza1.jpg"),
    time: "30 minus",
    Category: "Pizza",
  },
  {
    id: "6",
    image: require("../../assets/images/Pizza/pizza2.jpg"),
    time: "40 minus",
    Category: "Pizza",
  },
  {
    id: "7",
    image: require("../../assets/images/Pizza/pizza3.jpg"),
    time: "40 minus",
    Category: "Pizza",
  },
  {
    id: "8",
    image: require("../../assets/images/Pizza/pizza4.jpg"),
    time: "40 minus",
    Category: "Pizza",
  },
  {
    id: "9",
    image: require("../../assets/images/Tacos/tacos1.jpg"),
    time: "30 minus",
    Category: "Tacos",
  },
  {
    id: "10",
    image: require("../../assets/images/Tacos/tacos2.jpg"),
    time: "40 minus",
    Category: "Tacos",
  },
  {
    id: "11",
    image: require("../../assets/images/Tacos/tacos3.jpg"),
    time: "40 minus",
    Category: "Tacos",
  },
  {
    id: "12",
    image: require("../../assets/images/Tacos/tacos4.jpg"),
    time: "40 minus",
    Category: "Tacos",
  },
  {
    id: "13",
    image: require("../../assets/images/Burger/burger1.jpg"),
    time: "30 minus",
    Category: "Burger",
  },
  {
    id: "14",
    image: require("../../assets/images/Burger/burger2.jpg"),
    time: "40 minus",
    Category: "Burger",
  },
  {
    id: "15",
    image: require("../../assets/images/Burger/burger3.jpg"),
    time: "40 minus",
    Category: "Burger",
  },
  {
    id: "16",
    image: require("../../assets/images/Burger/burger4.jpg"),
    time: "40 minus",
    Category: "Burger",
  },
];

const Category = () => {
  const [changeCategory, setChangeCategory] = useState("Fried-Rice");

  const selectFoodCategory = (selectedFood) => {
    setChangeCategory(selectedFood);
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
              style={styles.categoryItems}
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
            <View style={styles.foodCard}>
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
            </View>
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
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  food: {
    color: Colors.primary100,
    fontSize: 24,
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
