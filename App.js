import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import SignUpScreen from "./screens/SignUp";
import CheckInScreen from "./screens/Event";
import ProfileScreen from "./screens/Profile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signUp" component={SignUpScreen} />
      </Stack.Navigator>
    );
  };

  const TabStack = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#4d76f0",
          backgroundColor: "#4d76f0",
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="event"
          component={CheckInScreen}
          options={{
            title: "Event",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            title: "Profile Setting",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const MainAppStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={TabStack}
          headerShown={false}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };

  const Navigation = () => {
    const authCtx = useContext(AuthContext);
    return (
      <NavigationContainer>
        {authCtx.isLoggedIn && <MainAppStack />}
        {!authCtx.isLoggedIn && <AuthStack />}
      </NavigationContainer>
    );
  };

  const Root = () => {
    // const [isTryingLogin, setIsTryingLogin] = useState(true);

    // const authCtx = useContext(AuthContext);

    // useEffect(() => {
    //   async function fetchToken() {
    //     const storedToken = await AsyncStorage.getItem("token");

    //     if (storedToken) {
    //       authCtx.login(storedToken);
    //     }

    //     setIsTryingLogin(false);
    //   }

    //   fetchToken();
    // }, []);

    // if (isTryingLogin) {
    //   return <AppLoading />;
    // }

    return <Navigation />;
  };

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
});
