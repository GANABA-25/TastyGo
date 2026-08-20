import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="address"
        options={{
          title: "Saved Addresses",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
