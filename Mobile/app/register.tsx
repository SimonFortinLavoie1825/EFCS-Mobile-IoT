import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {
  
  const styles = StyleSheet.create({
      title: {
        fontSize: 30,
        margin: 30
      },
      button: {
          padding: 10,
          marginVertical: 5,
          marginHorizontal: 2,
          backgroundColor: "dodgerblue",
          borderRadius: 5
      },
      buttonText: {
          color: "white"
      },
      input: {
          width: "95%",
          padding: 5,
          paddingVertical: 10,
          marginVertical: 5,
          borderWidth: 2,
          borderColor: "lightgray",
          borderRadius: 7,
          backgroundColor: "white"
      },
      disabledButton: {
          backgroundColor: "dodgerblue",
      },
      enabledButton: {
          backgroundColor: "gray",
      },
  })

  const {register} = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const canLogin = email !== "" && password !== "" && confirmPassword !== "" && name !== "" && lastName !== "";

  async function registerCheck() {
    try {
      if (password === confirmPassword) {
        register(email,password, name, lastName)
      } else {
        throw new Error("Les mots de passes ne correspondent pas");
      }
    } catch(error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
        setPassword("");
        setConfirmPassword("");
      }
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgray",
      }}
    > 
      <Text style={styles.title}>S'inscrire</Text>
      <TextInput
        value={email}
        placeholder="Email"
        placeholderTextColor='gray'
        onChangeText={setEmail}
        style={styles.input}/>
      <TextInput
        value={name}
        placeholder="Prénom"
        placeholderTextColor='gray'
        onChangeText={setName}
        style={styles.input}/>
      <TextInput
        value={lastName}
        placeholder="Nom"
        placeholderTextColor='gray'
        onChangeText={setLastName}
        style={styles.input}/>
      <TextInput
        value={password}
        placeholder="Mot de passe"
        placeholderTextColor='gray'
        onChangeText={setPassword}
        style={styles.input}/>
      <TextInput
        value={confirmPassword}
        placeholder="Confirmation du mot de passe"
        placeholderTextColor='gray'
        onChangeText={setConfirmPassword}
        style={styles.input}/>
      <TouchableOpacity style={[styles.button, canLogin ? styles.enabledButton : styles.disabledButton ]} onPress={canLogin ? registerCheck : undefined}>
          <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );

}
