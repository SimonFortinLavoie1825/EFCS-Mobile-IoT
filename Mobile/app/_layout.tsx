import { AuthenticationContextProvider } from "@/context/AuthenticationContext";
import { UserContextProvider } from "@/context/UserContext";
import { ChallengeContextProvider } from "@/context/ChallengeContext";
import { Stack, useRouter, useSegments } from "expo-router";
import DefaultTopBar from "./components/defaultTopBar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import AvatarMenu from "./components/avatarMenu";

// MainLayout:
// - Composant qui orchestre la navigation principale (Stack) de l'application.
// - Utilise useSegments() pour connaître le segment actuel de la route (structure expo-router).
// - useEffect : redirige vers la racine (tabs) si authentifié et n'est pas déjà sur (tabs).
//               si non authentifié, pousse vers la page d'accueil (login/index selon routing).
export function MainLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated === undefined) return;
    const currentSegment = segments[0];
    
    if (isAuthenticated && currentSegment !== "(tabs)") router.replace("/");
    else if (!isAuthenticated) router.push("/");
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

// RootLayout:
// - Fournit les Context Providers : AuthenticationContextProvider, UserContextProvider, ChallengeContextProvider.
// - Assure que tous les composants enfants ont accès aux contextes pour l'authentification, l'utilisateur et les défis.
// - MainLayout est rendu comme enfant pour garder la séparation concernée entre providers et UI.
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
