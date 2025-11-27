import { useAuth } from '@/hooks/useAuth';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EnableableButton from './components/enableableButton';

export default function Login() {
    const styles = StyleSheet.create({
        title: {
          fontSize: 30,
          margin: 30
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
        link: {
            color: "#0A66C2", 
            includeFontPadding: false,
            textDecorationLine: "underline",
            textDecorationStyle: "solid",
        },
    })
  
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const canLogin = email !== "" && password !== "";
  
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "lightgray",
        }}
      > 
        <Text style={styles.title}>Se connecter</Text>
        <TextInput
          value={email}
          placeholder="Email"
          placeholderTextColor='gray'
          onChangeText={setEmail}
          style={styles.input}/>

        <TextInput
          value={password}
          placeholder="Mot de passe"
          placeholderTextColor='gray'
          onChangeText={setPassword}
          style={styles.input}/>

        <EnableableButton isEnabled={canLogin} onPress={() => login(email, password)}>
            <Text style={styles.buttonText}>Login</Text>
        </EnableableButton>
        <Link style={styles.link} href={'/register'} >Pas de compte? Inscrivez vous!</Link>
      </View>
    );
}
