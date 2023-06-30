import { useContext, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AuthContext } from "../store/auth-context";

const SignUp = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onSaveInfo = async () => {
    const userInfo = {
      displayName: fullname,
    };
    const response = await authCtx.updateUser(userInfo);
    if (response) {
      navigation.navigate("");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.formContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Text style={styles.title}>Signup Form</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Full Name"
              value={fullname}
              onChangeText={setFullname}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Email (Account)"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
              ]}
              onPress={onSaveInfo}
            >
              <View>
                <Text style={styles.buttonText}>Save</Text>
              </View>
            </Pressable>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  formContainer: {
    flex: 5,
    alignItems: "center",
    // justifyContent: "center",
    gap: 12,
    backgroundColor: "white",
    paddingVertical: 36,
    width: "100%",
  },
  title: {
    fontSize: 24,
    marginTop: 32,
    marginBottom: 42,
  },
  button: {
    alignItems: "center",
    width: 350,
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginTop: 12,
    backgroundColor: "#4d76f0",
    borderRadius: 6,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  pressed: {
    opacity: 0.7,
  },
  textInput: {
    padding: 20,
    backgroundColor: "#e7e7e7",
    color: "#000000",
    width: 350,
    marginBottom: 10,
    borderRadius: 6,
    fontSize: 16,
  },
});
