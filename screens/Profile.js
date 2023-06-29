import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import TabViewCS from "../UI/Tab";
import UserProfileTab from "../components/Profile/UserProfileTab";
import SettingTab from "../components/Profile/SettingTab";
import { AuthContext } from "../store/auth-context";

const ProfileScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [routes, setRoutes] = useState([
    { key: "profile", title: "Profile" },
    { key: "relationship", title: "Relation" },
    { key: "setting", title: "Setting" },
  ]);

  const renderTab = {
    profile: UserProfileTab,
    relationship: UserProfileTab,
    setting: SettingTab,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: authCtx.user.displayName,
    });
  });

  return (
    <View style={styles.container}>
      <TabViewCS routes={routes} renderTab={renderTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
