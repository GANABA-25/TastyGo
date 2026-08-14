import { queryClient } from "@/src/lib/queryClient";
import AppContextProvider from "@/src/store/AppContextProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </AppContextProvider>
    </QueryClientProvider>
  );
}
