import { AuthenticationContextProvider } from "@/context/AuthenticationContext";
import { UserContextProvider } from "@/context/UserContext";
import { ChallengeContextProvider } from "@/context/ChallengeContext";
import { Stack, useRouter, useSegments } from "expo-router";
import DefaultTopBar from "./components/defaultTopBar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import AvatarMenu from "./components/avatarMenu";

export function MainLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated === undefined) return;
    const currentSegment = segments[0];
    
    if (isAuthenticated && currentSegment !== "(tabs)") router.replace("/");
    else if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated]);

  return (
    <Stack
      screenOptions={{
        headerBackVisible: false,
        headerRight: () => (isAuthenticated ? <AvatarMenu /> : <DefaultTopBar />),
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: true,
          headerTitle: "SimonApp",
        }}
      />
      <Stack.Screen
        name="opponent/[id]"
        options={{
          headerTitle: "Créer un défi",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          headerTitle: "Se connecter",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: true,
          headerTitle: "S'inscrire",
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Accueil | Défiez-vous !",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthenticationContextProvider>
      <UserContextProvider>
        <ChallengeContextProvider>
        <MainLayout />
        </ChallengeContextProvider>
      </UserContextProvider>
    </AuthenticationContextProvider>
  );
}
