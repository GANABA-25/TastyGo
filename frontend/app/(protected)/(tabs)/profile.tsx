import SettingsCard from "@/src/components/settingsCard";
import DarkMode from "@/src/features/darkMode";
import { useAuth } from "@/src/store/AuthContext";
import { getInitials } from "@/src/util/string";
import {
  BadgeQuestionMark,
  Bell,
  CreditCard,
  LogOut,
  MapPin,
  Pencil,
  TicketPercent,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { userData, logout } = useAuth();
  const [pressed, setPressed] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-primary-light" edges={["top"]}>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="pb-8 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="overflow-hidden gap-4 bg-primary-light rounded-b-[28px] p-4 elevation-sm">
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-4 items-center">
              <View className="justify-center items-center w-20 h-20 rounded-full bg-primary elevation-sm">
                <Text className="text-xl text-white font-inter-bold">
                  {getInitials(userData?.fullName)}
                </Text>
              </View>
              <View>
                <Text className="text-2xl font-inter-bold">
                  {userData?.fullName}
                </Text>
                <Text className="font-inter">{userData?.email}</Text>
              </View>
            </View>
            <Pressable className="justify-center items-center w-16 h-16 bg-white rounded-full elevation-sm">
              <Pencil size={20} />
            </Pressable>
          </View>

          <View className="flex-row gap-4 justify-around items-center">
            <View className="justify-center items-center px-8 py-4 bg-white rounded-3xl">
              <Text className="text-2xl font-inter-bold">3</Text>
              <Text className="text-gray-500 font-inter">Orders</Text>
            </View>

            <View className="justify-center items-center px-8 py-4 bg-white rounded-3xl">
              <Text className="text-2xl font-inter-bold">2</Text>
              <Text className="text-gray-500 font-inter">address</Text>
            </View>

            <View className="justify-center items-center px-8 py-4 bg-white rounded-3xl">
              <Text className="text-2xl font-inter-bold">3</Text>
              <Text className="text-gray-500 font-inter">Offers</Text>
            </View>
          </View>
        </View>

        <View className="gap-4 px-4">
          <Text className="text-gray-500 font-inter-bold">Account</Text>

          <View className="bg-white rounded-3xl border border-gray-100 elevation-sm">
            <SettingsCard
              route="/address"
              icon={MapPin}
              label="Saved address"
              data="2 saved"
            />

            <View className="bg-gray-200 w-full h-[2px]" />

            <SettingsCard
              route="/payment-methods"
              icon={CreditCard}
              label="Payment methods"
              data="Visa .... 4291"
            />

            <View className="bg-gray-200 w-full h-[2px]" />

            <SettingsCard
              route="/offers"
              icon={TicketPercent}
              label="Offers & coupons"
              data="3 active"
            />
          </View>

          <Text className="text-gray-500 font-inter-bold">Preferences</Text>

          <View className="bg-white rounded-3xl border border-gray-100 elevation-sm">
            <SettingsCard
              route="/help-center"
              icon={Bell}
              label="Notifications"
              data="on"
            />
            <View className="bg-gray-200 w-full h-[2px]" />
            <SettingsCard
              route="/help-center"
              icon={BadgeQuestionMark}
              label="Help center"
            />
          </View>

          <View className="gap-4">
            <DarkMode />

            <Pressable
              onPress={logout}
              onPressIn={() => setPressed(true)}
              onPressOut={() => setPressed(false)}
              className={`flex-row bg-white border border-gray-100 rounded-full justify-center items-center gap-4 elevation-sm p-4 ${
                pressed ? "opacity-60 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <LogOut size={20} color="red" />
              <Text className="text-red-600 font-inter-bold">Log out</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
