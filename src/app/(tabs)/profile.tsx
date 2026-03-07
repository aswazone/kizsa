import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/expo";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { MENU_ITEMS } from "@/constants";
import { COLORS } from "@/lib/theme";
import * as Sentry from "@sentry/react-native"

const ProfileScreen = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-5 py-3">
        <Text className="text-foreground text-2xl font-bold">Profile</Text>
      </View>

      {/* Profile Card */}
      <View className="items-center px-5">
        <View className="mb-3.5 relative">
          <Image
            source={user?.imageUrl}
            style={{ width: 88, height: 88, borderRadius: 44 }}
            contentFit="cover"
          />
          <View className="absolute bottom-0.5 right-0.5 w-[18px] h-[18px] bg-accent-secondary rounded-full border-[3px] border-background"></View>
        </View>
        <Text className="text-2xl font-bold text-foreground">
          {user?.fullName || user?.username || "User"}
        </Text>
        <Text className="mt-0.5 text-base text-foreground-muted">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
        {/* TODO: Add login streak */}
        {/* <View className="rounded-full mt-3 flex-row items-center gap-1.5  bg-[#FDCB6E1E] px-3.5 py-1.5">
          <Ionicons name="flame" size={16} color="#FDCB6E" />
          <Text className="text-sm font-semibold text-[#FDCB6E]">
            7 day login streak
          </Text>
        </View> */}
      </View>

      {/* Stats */}
      {/* <View className="mt-4 mb-6 flex-row gap-3 px-5">
        <View className="flex-1 items-center rounded-2xl border border-border bg-surface px-4 py-4">
          <Text className="text-2xl font-bold text-primary">24</Text>
          <Text className="mt-1 text-xs text-foreground-muted">Sessions</Text>
        </View>
        <View className="flex-1 items-center rounded-2xl border border-border bg-surface px-4 py-4">
          <Text className="text-2xl font-bold text-primary">12</Text>
          <Text className="mt-1 text-xs text-foreground-muted">Partners</Text>
        </View>
        <View className="flex-1 items-center rounded-2xl border border-border bg-surface px-4 py-4">
          <Text className="text-2xl font-bold text-primary">48h</Text>
          <Text className="mt-1 text-xs text-foreground-muted">Study Time</Text>
        </View>
      </View> */}

      {/* MENU ITEMS */}
      <View className="mt-4 gap-1 px-5">
        {MENU_ITEMS.map((item, i) => (
          <Pressable
            key={i}
            className="mb-1.5 flex-row items-center gap-3.5 rounded-xl border border-border bg-surface px-4 py-4"
          >
            <View
              className="h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${item.color}15` }}
            >
              <Ionicons name={item.icon as any} size={22} color={item.color} />
            </View>
            <Text className="flex-1 text-base font-medium text-foreground">{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSubtle} />
          </Pressable>
        ))}
      </View>

      {/* SIGN OUT BTN */}
      <Pressable
        className="mt-6 mx-5 flex-row items-center justify-center gap-2 rounded-xl border border-[#FF6B6B33] bg-surface px-4 py-4"
        onPress={async () => {
          try {
            await signOut();
            Sentry.logger.info("User signed out successfully", { userId: user?.id });
          } catch (error) {
            Sentry.logger.error("Error signing out", { error, userId: user?.id });
            Sentry.captureException(error);
            Alert.alert("Error", "An error occurred while signing out. Please try again.");
          }
        }}
      >
        <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
        <Text className="text-base font-semibold text-danger">Sign Out</Text>
      </Pressable>


    </SafeAreaView>
  );
};

export default ProfileScreen;
