import { FlatList, View } from "react-native";
import PlayerCard from "./components/playerCard";
import { useUserContext } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { User } from "@/types/User";

export default function Index() {
  const [userList, setUserList] = useState<User[]>([])
  const {getAllUsers, isCurrentUser} = useUserContext()

  useEffect(()=>{
    getAllUsers().then((data) => {
      data.forEach(user => {
        if(!isCurrentUser(user)) {
          setUserList([...userList, user])
        }
      });
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
        data={userList}
        renderItem={({item : user}) => 
            <PlayerCard name={user.name}></PlayerCard>
        }/>
    </View>
  );
}
