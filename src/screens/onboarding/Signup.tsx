import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SignupScreen(): ReactElement {
    return (
    <View style={styles.container}>
      <Text>Signup</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });