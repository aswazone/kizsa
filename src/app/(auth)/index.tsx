import useSocialAuth from "@/hooks/useSocialAuth";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

const AuthScreen = () => {
  useWarmUpBrowser();
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();
  const isLoading = !!loadingStrategy;

  return (
    // <ScrollView contentInsetAdjustmentBehavior="automatic"> // another way
    // one way - to make the layout inside the best view
    <View className="flex-1 bg-background">
      {/* Gradient Background */}
      <View className="absolute inset-0">
        <LinearGradient
          // Dark Blue -> Deep Navy -> Persian Blue highlight -> Deep Navy -> Dark Blue
          colors={["#0F161A", "#1C293D", "#345E85", "#1C293D", "#0F161A"]} // 090D0F also good for top and bottom
          locations={[0, 0.25, 0.5, 0.75, 1]}
          style={{ width: "100%", height: "100%" }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>
      <SafeAreaView className="flex-1 justify-between">
        {/* Top Section: Logo + Hero */}
        <View>
          <View className="items-center pt-10 pb-16">
            {/* <View className="w-16 h-16 bg-primary/15 rounded-[20px] items-center justify-center border-2 border-primary/5">
              <Ionicons name="sparkles" size={30} color="#5CBDE7" />
            </View> */}
            <View className="w-40 h-40 items-center justify-center">
              <Image
                source={require("@/assets/images/kizsa-logo.png")}
                style={{ width: 125, height: 125 }}
                contentFit="cover"
              />
            </View>
            <Text className="text-[#70ace4bf] tracking-wide text-[18px] -mt-8 text-center px-8">
              Wₕₑᵣₑ ₜₕₑ ₗₒᵤₙgₑ cₒₘₑₛ ₜₒ ₗᵢfₑ !
            </Text>
          </View>
          <View className="items-center px-6">
            <Image
              source={require("@/assets/images/auth.png")}
              style={{ width: 320, height: 350 }}
              contentFit="cover"
            />
          </View>
          {/* feature chips */}
          <View className="flex-row flex-wrap justify-center gap-3 px-6 mt-5">
            {[
              {
                icon: "videocam" as const,
                label: "Video Calls",
                color: "#5aa8f0bf",
                bg: "bg-[#5aa8f0bf]/12 border-[#5aa8f0bf]/20",
              },
              {
                icon: "chatbubbles" as const,
                label: "Rooms",
                color: "#ff6b6b",
                bg: "bg-[#ff6b6b]/12 border-[#ff6b6b]/20",
              },
              {
                icon: "people" as const,
                label: "Find Partners",
                color: "#00B894",
                bg: "bg-[#00B894]/12 border-[#00B894]/20",
              },
            ].map((chip) => (
              <View
                key={chip.label}
                className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-full border ${chip.bg}`}
              >
                <Ionicons name={chip.icon} size={14} color={chip.color} />
                <Text className="text-foreground-muted text-xs font-semibold tracking-wide">
                  {chip.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View className="px-8 pb-10">
          <View className="flex-row items-center gap-3 mb-6">
            <View className="flex-1 h-px bg-border" />
            <Text
              className="text-foreground-subtle text-xs
font-medium tracking-widest uppercase"
            >
              Continue with
            </Text>
            <View className="flex-1 h-px bg-border" />
          </View>
          <View />

          <View className="flex-row justify-center items-center gap-4 mb-5">
            {/* GOOGLE btn */}
            <Pressable
              className="size-20 rounded-2xl bg-white items-center justify-center active:scale-95 shadow-lg shadow-white/10"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Sign in with Google"
              onPress={() => !isLoading && handleSocialAuth("oauth_google")}
            >
              {isLoading && loadingStrategy === "oauth_google" ? (
                <ActivityIndicator size={"small"} color={"#6C5CE7"} />
              ) : (
                <Image
                  source={require("../../../assets/images/google.png")}
                  style={{ width: 28, height: 28 }}
                  contentFit="contain"
                />
              )}
            </Pressable>
            {/* Apple btn */}
            <Pressable
              className="size-20 rounded-2xl bg-surface border border-border-light items-center justify-center active:scale-95 shadow-lg shadow-white/10"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Sign in with Apple"
              onPress={() => !isLoading && handleSocialAuth("oauth_apple")}
            >
              {isLoading && loadingStrategy === "oauth_apple" ? (
                <ActivityIndicator size={"small"} color={"#5aa8f0bf"} />
              ) : (
                <Ionicons name="logo-apple" size={28} color={"#fffffe"} />
              )}
            </Pressable>
            {/* GitHub btn */}
            <Pressable
              className="size-20 rounded-2xl bg-surface border border-border-light items-center justify-center active:scale-95 shadow-lg shadow-white/10"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Sign in with GitHub"
              onPress={() => !isLoading && handleSocialAuth("oauth_github")}
            >
              {isLoading && loadingStrategy === "oauth_github" ? (
                <ActivityIndicator size={"small"} color={"#5aa8f0bf"} />
              ) : (
                <Ionicons name="logo-github" size={28} color={"#fffffe"} />
              )}
            </Pressable>
          </View>
          <Text className="text-foreground-subtle text-[11px] text-center leading-4">
            By continuing, you agree to our{" "}
            <Text className="text-primary-light">Terms of Service</Text> and{" "}
            <Text className="text-primary-light">Privacy Policy</Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
    // </ScrollView>
  );
};

export default AuthScreen;
