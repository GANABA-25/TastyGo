import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />

      <Stack.Screen
        name="address"
        options={{
          title: "Saved Addresses",
        }}
      />

      <Stack.Screen
        name="location-sheet"
        options={{
          presentation: "formSheet",
          gestureEnabled: false,
          sheetAllowedDetents: [0.4, 0.75, 1],
          sheetInitialDetentIndex: 0,
          sheetCornerRadius: 28,
          sheetLargestUndimmedDetentIndex: 0,
          sheetGrabberVisible: true,
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      />
    </Stack>
  );
}
