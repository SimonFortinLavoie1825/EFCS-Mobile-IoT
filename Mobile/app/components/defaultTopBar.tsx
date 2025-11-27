import { useAuth } from '@/hooks/useAuth';
import { useUserContext } from '@/hooks/useUser';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter, useSegments } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AvatarMenu from './avatarMenu';

export default function DefaultTopBar () {
    const styles = StyleSheet.create({
        optionListView: {
            alignItems: "flex-end",
            justifyContent: "flex-start",
        },
        optionsListItem: {
            padding: 5,
            margin: 5,
        },
        optionList: {
            backgroundColor: "white",
        },
    })

    function goToLogin() {
        router.push("/login")
    }

    const router = useRouter();
    const segments = useSegments();
    const {isAuthenticated} = useAuth();

    return(
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            {segments.length > 0 && (
                <TouchableOpacity onPress={()=>{router.dismissAll()}}>
                    <FontAwesome style={{margin:10}} size={28} name="home" />
                </TouchableOpacity>
            )}
            {!isAuthenticated ? (
                segments[0] != "register" && segments[0] != "login" && (
                    <TouchableOpacity onPress={goToLogin}>
                        <Text style={{margin:10}}>Se connecter</Text>
                    </TouchableOpacity>
                )) : (
                    <View>
                        <AvatarMenu/>
                    </View>
                )
            } 
        </View>
    )
}