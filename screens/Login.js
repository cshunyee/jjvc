import { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AuthContext } from "../store/auth-context";

const windowWidth = Dimensions.get("window").width;

const LoginScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onLogin = () => {
    authCtx.login(username, password);
  };

  const onSignUp = () => {
    navigation.navigate("signUp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: "https://images.unsplash.com/photo-1472905981516-5ac09f35b7f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNodXJjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          }}
        />
      </View>
      <KeyboardAvoidingView behavior={"padding"} style={styles.formContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Text style={styles.title}>JJVC</Text>
            <Text style={styles.description}>Johor Jaya Vision Church</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
              ]}
              onPress={onLogin}
            >
              <View>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </Pressable>
          </>
        </TouchableWithoutFeedback>

        <Pressable
          style={({ pressed }) => [pressed && styles.pressed]}
          onPress={onSignUp}
        >
          <Text style={styles.createAccText}>Create Account</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#386ee3",
  },
  imageContainer: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  formContainer: {
    flex: 5,
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 36,
    width: "100%",
    borderTopRightRadius: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  image: {
    width: windowWidth,
    height: 400,
    // opacity: 0.8,
    // borderRadius: 100,
    marginBottom: -30,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
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
  createAccText: {
    marginTop: 16,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    color: "#4753b2",
  },
});
