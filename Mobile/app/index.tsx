import { FlatList, View } from "react-native";
import PlayerCard from "./components/playerCard";
import { useUserContext } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { User } from "@/types/User";

export default function Index() {
  const [users, setUsers] = useState<User[]>()
  const { getAllUsers} = useUserContext()

  useEffect(()=>{
    getAllUsers().then((data) => {
      setUsers(data);
    });
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={users}
        renderItem={({item : user}) => 
            <PlayerCard name={user.name}></PlayerCard>
        }/>
    </View>
  );
}
