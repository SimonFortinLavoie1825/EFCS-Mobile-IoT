import { Text, StyleSheet, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  title: string | undefined;
  isDisabled: boolean;
  onPressAction: () => void;
};
export default function CustomButton({
  title,
  isDisabled,
  onPressAction,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.disabledButton]}
      disabled={isDisabled}
      onPress={onPressAction}
    >
      <Text style={[styles.buttonText, isDisabled && styles.disabledText]}>
        {title === undefined ? "" : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 6,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 16,
  },
  disabledText: {
    color: "#e0e0e0",
  },
});
