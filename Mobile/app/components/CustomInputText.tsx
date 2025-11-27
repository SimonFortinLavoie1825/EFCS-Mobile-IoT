import { StyleSheet, TextInput } from "react-native";

type CustomInputTextProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export default function CustomInputText({
  value,
  onChangeText,
  placeholder,
}: CustomInputTextProps) {
  return (
      <TextInput
        style={styles.textInputField}
        placeholder={placeholder}
        placeholderTextColor="grey"
        value={value}
        onChangeText={onChangeText}
      />
  );
}

const styles = StyleSheet.create({
  textInputField: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 2,
    borderColor: "#878181ff",
    backgroundColor: "#ffffff",
    color: "#000000ff",
    textAlign: "center",
  },
});