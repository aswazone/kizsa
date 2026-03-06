import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Alert } from "react-native";

// Preloads the browser for Android devices to reduce authentication load time
// Handle any pending authentication sessions outside of the hook
WebBrowser.maybeCompleteAuthSession();

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_github" | "oauth_apple",
  ) => {
    if (loadingStrategy) return; // its a guard to prevent multiple clicks

    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        // If sign in was successful, set the active session
        await setActive!({
          session: createdSessionId,
          // Handle session tasks
          // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
          navigate: async ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
          },
        });
      } else {
        const provider =
          strategy === "oauth_google"
            ? "Google"
            : strategy === "oauth_github"
              ? "GitHub"
              : "Apple";

        // There are missing requirements such as MFA, but for simple SSO we display an alert.
        Alert.alert(
          "Sign-in Incomplete !",
          `Additional steps may be required to sign in with ${provider}.`,
        );
      }
    } catch (error) {
      console.log("Error during social sign-in", error);
      const provider =
        strategy === "oauth_google"
          ? "Google"
          : strategy === "oauth_github"
            ? "GitHub"
            : "Apple";

      Alert.alert(
        "Sign-in Failed !",
        `Failed to sign in with ${provider}. Please try again.`,
      );
    } finally {
      setLoadingStrategy(null);
    }
  };

  return {
    handleSocialAuth,
    loadingStrategy,
  };
};

export default useSocialAuth;
