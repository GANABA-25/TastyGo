import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useContext } from "react";
import Colors from "../../constants/Colors";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

import { AuthContext } from "../../store/AuthContext";

import Button from "../../components/Button";

const foodCategory = [
  {
    id: "1",
    icon: <Ionicons name="pizza" size={70} color={Colors.primary200} />,
    name: "Pizza",
  },
  {
    id: "2",
    icon: (
      <MaterialCommunityIcons name="taco" size={70} color={Colors.primary200} />
    ),
    name: "Tacos",
  },
  {
    id: "3",
    icon: <FontAwesome6 name="burger" size={70} color={Colors.primary200} />,
    name: "Burger",
  },
  {
    id: "4",
    icon: <Entypo name="drink" size={70} color={Colors.primary200} />,
    name: "Drinks",
  },
  {
    id: "5",
    icon: <FontAwesome6 name="bowl-food" size={70} color={Colors.primary200} />,
    name: "Spaghetti",
  },
  {
    id: "6",
    icon: (
      <MaterialCommunityIcons
        name="silverware-fork-knife"
        size={70}
        color={Colors.primary200}
      />
    ),
    name: "View all",
  },
];

const FoodCategory = () => {
  const authCtx = useContext(AuthContext);

  const onboardingHandler = () => {
    const OnboardingToken = "12345678910";
    authCtx.OnboardingComplete(OnboardingToken);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select category of food you like</Text>

      <FlatList
        data={foodCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.innerContainer}>
            {item.icon}
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.gridContainer}
      />
      <View style={styles.skipAndGo}>
        <Text onPress={onboardingHandler} style={styles.skip}>
          Skip
        </Text>
        <Pressable style={styles.button}>
          <Button onPress={onboardingHandler} title="Go" />
        </Pressable>
      </View>
    </View>
  );
};

export default FoodCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary300,
    padding: 30,
  },
  headerText: {
    color: Colors.primary100,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  gridContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    marginVertical: 10,
    marginRight: 20,
    backgroundColor: Colors.primary400,
  },
  name: {
    color: Colors.primary100,
    fontSize: 20,
    fontWeight: "bold",
  },
  skipAndGo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skip: {
    fontFamily: "OpenSans-Bold",
    color: Colors.primary100,
    fontSize: 20,
  },
  button: {
    width: "50%",
  },
});
