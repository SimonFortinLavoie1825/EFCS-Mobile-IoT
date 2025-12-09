import { useAuth } from "@/hooks/useAuth";
import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomInputText from "@/app/components/CustomInputText";
import CustomButton from "@/app/components/CustomButton";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const canLogin = email !== "" && password !== "";

  async function handleLogin(
    username: string,
    password: string
  ): Promise<void> {
    try {
      await login(username, password);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      {errorMsg !== "" && <Text style={styles.errorBox}>{errorMsg}</Text>}
      <CustomInputText
        placeholder="Courriel en ligne"
        isPassword={false}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <CustomInputText
        placeholder="Mot de passe"
        isPassword={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <CustomButton
        title="Se connecter"
        isDisabled={!canLogin}
        onPressAction={() => handleLogin(email, password)}
      />
      <Link style={styles.link} href={"/register"}>
        Pas de compte? Inscrivez vous!
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffffff",
    gap: 12,
    margin: 4,
  },
  title: {
    fontSize: 30,
  },
  buttonText: {
    color: "white",
  },
  input: {
    width: "95%",
    padding: 5,
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 7,
    backgroundColor: "white",
  },
  link: {
    color: "#0A66C2",
    includeFontPadding: false,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
    errorBox: {
    color: "red",
    alignSelf: "center",
  },
});
