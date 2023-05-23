import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const UserProfileTab = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "cshunyee",
    });
  });

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
};

export default UserProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
