import { useContext, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AuthContext } from "../store/auth-context";
import TextInput from "../UI/TextInput";
import Button from "../UI/Button";
import { isEmail } from "../utils/validator";

const SignUp = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onSubmit = async () => {
    const response = await authCtx.signUpUser(email, passowrd);
    if (response) {
      authCtx.updateUser({ displayName: fullname });
      navigation.navigate("");
    }
    return Alert.alert("System Error");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.formContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Text style={styles.title}>Sign Up Form</Text>
            <TextInput
              placeholder="Full Name"
              value={fullname}
              onChangeText={setFullname}
              hasError={fullname === ""}
            />
            <TextInput
              placeholder="Email (Account)"
              value={email}
              onChangeText={setEmail}
              hasError={!isEmail(email)}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              hasError={password === ""}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              hasError={confirmPassword !== password}
              secureTextEntry={true}
            />
            <Button label="Submit" style={styles.button} onPress={onSubmit} />
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
    gap: 22,
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
    paddingVertical: 16,
    marginTop: 24,
  },
});
