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
            <View className="flex-row items-center gap-4">
              <View className="h-20 w-20 items-center justify-center rounded-full bg-primary elevation-sm">
                <Text className="text-white font-inter-bold text-xl">
                  {getInitials(userData?.fullName)}
                </Text>
              </View>
              <View>
                <Text className="font-inter-bold text-2xl">
                  {userData?.fullName}
                </Text>
                <Text className="font-inter">{userData?.email}</Text>
              </View>
            </View>
            <Pressable className="h-16 w-16 items-center justify-center rounded-full bg-white elevation-sm">
              <Pencil size={20} />
            </Pressable>
          </View>

          <View className="flex-row justify-around items-center gap-4">
            <View className="bg-white rounded-3xl justify-center items-center py-4 px-8">
              <Text className="font-inter-bold text-2xl">3</Text>
              <Text className="font-inter text-gray-500">Orders</Text>
            </View>

            <View className="bg-white rounded-3xl justify-center items-center py-4 px-8">
              <Text className="font-inter-bold text-2xl">2</Text>
              <Text className="font-inter text-gray-500">address</Text>
            </View>

            <View className="bg-white rounded-3xl justify-center items-center py-4 px-8">
              <Text className="font-inter-bold text-2xl">3</Text>
              <Text className="font-inter text-gray-500">Offers</Text>
            </View>
          </View>
        </View>

        <View className="gap-4 px-4">
          <Text className="font-inter-bold text-gray-500">Account</Text>

          <View className="bg-white border border-gray-100 rounded-3xl elevation-sm">
            <SettingsCard icon={MapPin} label="Saved address" data="2 saved" />

            <View className="bg-gray-200 w-full h-[2px]" />

            <SettingsCard
              icon={CreditCard}
              label="Payment methods"
              data="Visa .... 4291"
            />

            <View className="bg-gray-200 w-full h-[2px]" />

            <SettingsCard
              icon={TicketPercent}
              label="Offers & coupons"
              data="3 active"
            />
          </View>

          <Text className="font-inter-bold text-gray-500">Preferences</Text>

          <View className="bg-white border border-gray-100 rounded-3xl elevation-sm">
            <SettingsCard icon={Bell} label="Notifications" data="on" />
            <View className="bg-gray-200 w-full h-[2px]" />
            <SettingsCard icon={BadgeQuestionMark} label="Help center" />
          </View>

          <View className="gap-4">
            <DarkMode />

            <Pressable
              onPress={logout}
              onPressIn={() => setPressed(true)}
              onPressOut={() => setPressed(false)}
              className={`flex-row bg-white border border-gray-100 rounded-full justify-center items-center gap-4 elevation-sm p-4 ${
                pressed ? "scale-95 opacity-60" : "scale-100 opacity-100"
              }`}
            >
              <LogOut size={20} color="red" />
              <Text className="font-inter-bold text-red-600">Log out</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
