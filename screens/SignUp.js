import { StyleSheet, Text, View } from "react-native";

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text>Sign up page</Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
