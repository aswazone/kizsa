import { useAuth } from "@clerk/expo";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { signOut } = useAuth();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-5xl text-emerald-600">Kizsa</Text>
      <Pressable
        onPress={() => signOut()}
        className="mt-4 p-4 bg-gray-200 rounded"
      >
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
}
