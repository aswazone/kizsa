import { Text, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Index() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-5xl text-emerald-600">Kizsa</Text>
    </View>
  );
}