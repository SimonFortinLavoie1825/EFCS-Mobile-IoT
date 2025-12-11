// Layout des onglets de l'application (Tabs).
// - Définit les 4 onglets principaux : Défis reçus, Défis complétés, Classement, Profil.
// - Chaque onglet a une icône FontAwesome et un titre affiché dans la barre d'onglets.
// - screenOptions global : personnalisation de la couleur active (tabBarActiveTintColor).

import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// TabLayout: Composant principal retournant <Tabs>.
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="challengeReceived"
        options={{
          title: "Défis reçus",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="credit-card" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="challengeCompleted"
        options={{
          title: "Défis complétés",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="exchange" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Classement des meilleurs",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="map" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
