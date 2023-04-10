import { StyleSheet, View } from "react-native";
import { useState } from "react";
import TabViewCS from "../UI/Tab";
import UserProfileTab from "../components/Profile/UserProfileTab";

const ProfileScreen = () => {
  const [routes, setRoutes] = useState([
    { key: "profile", title: "Profile" },
    { key: "relationship", title: "Relation" },
  ]);

  const renderTab = {
    profile: UserProfileTab,
    relationship: UserProfileTab,
  };

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
