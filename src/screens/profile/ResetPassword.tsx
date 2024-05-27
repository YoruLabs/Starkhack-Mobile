import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "../../navigation/Router";

export default function ResetPasswordScreen({
  navigation,
  route,
}: ScreenProps<"ResetPassword">): ReactElement {

  // Access props like this  
  const { email } = route.params;

  return (
    <View style={styles.container}>
      <Text>Reset Password</Text>
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
