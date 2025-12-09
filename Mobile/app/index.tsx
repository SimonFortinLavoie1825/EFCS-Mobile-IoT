import { FlatList, View, StyleSheet } from "react-native";
import PlayerCard from "./components/playerCard";
import { useUserContext } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const [users, setUsers] = useState<User[]>();
  const { getAllUsers } = useUserContext();
  const { user } = useAuth();

  useEffect(() => {
    getAllUsers().then((data) => {
      if (user?.userId) {
        const filtered = data.filter((u) => u.userId !== user.userId);
        setUsers(filtered);
      } else {
        setUsers(data);
      }
    });
  }, [user]);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item: user }) => (
          <PlayerCard
            name={user.firstName}
            opponentId={user.userId}
          ></PlayerCard>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fcfcfcff",
    gap: 12,
    margin: 4,
  },
});
