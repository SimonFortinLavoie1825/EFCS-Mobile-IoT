import React, { ReactNode } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'

type EnableableButtonProps = {
    isEnabled: boolean | undefined,
    onPress: () => void,
    children: ReactNode
}

export default function EnableableButton({isEnabled, onPress, children} : EnableableButtonProps) {
    const styles = StyleSheet.create({
        button: {
            padding: 10,
            marginVertical: 5,
            marginHorizontal: 2,
            borderRadius: 5,
            flexDirection: "row",
        },
        enabledButton: {
            backgroundColor: "dodgerblue",
        },
        disabledButton: {
            backgroundColor: "gray",
        },
    })

  return (
    <View>
        <TouchableOpacity style={[styles.button, isEnabled ? styles.enabledButton : styles.disabledButton ]} onPress={isEnabled ? onPress : undefined}>
            {children}
        </TouchableOpacity>
    </View>
  )
}
