import { View, Text, Button } from "react-native";
import { useContext } from "react";
import React from "react";
import { AuthContext } from "../store/AuthContext";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const logOutHandler = () => {
    authCtx.logout();
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Log out" onPress={logOutHandler} />
    </View>
  );
};

export default Profile;
