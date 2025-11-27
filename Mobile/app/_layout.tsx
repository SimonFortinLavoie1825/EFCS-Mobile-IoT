import { AuthenticationContextProvider } from "@/context/AuthenticationContext";
import { UserContextProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import DefaultTopBar from "./components/defaultTopBar";

export function MainLayout() {
  return (
    <Stack 
        screenOptions={{
          title: "PokemonApp",
          headerRight: () => <DefaultTopBar/>
        }}>
          
      </Stack>
  )
  
}

export default function RootLayout() {
  return (
    <UserContextProvider>
      <AuthenticationContextProvider>
        <MainLayout/>
      </AuthenticationContextProvider>
    </UserContextProvider>
  )
}
