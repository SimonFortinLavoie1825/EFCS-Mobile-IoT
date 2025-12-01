import { FlatList, View } from "react-native";
import PlayerCard from "./components/playerCard";
import { useUserContext } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const [userList, setUserList] = useState<User[]>([])
  const {uid, getAllUsers} = useUserContext();

  useEffect(()=>{
    setUserList([]);

    getAllUsers().then((data) => {
      let foundUsers: User[] = []
      data.forEach(user => {
        if (user.userId !== uid) {
          foundUsers = [...foundUsers, user];
        }
      });
      setUserList(foundUsers);
    });
  }, [uid])

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
