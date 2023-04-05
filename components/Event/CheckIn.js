import { StyleSheet, Text } from "react-native";
import Animated, {
  SlideInLeft,
  SlideOutLeft,
  Layout,
} from "react-native-reanimated";

const CheckInTab = () => {
  return (
    <Animated.View
      entering={SlideInLeft}
      exiting={SlideOutLeft}
      layout={Layout.springify()}
      style={styles.container}
    >
      <Text>Check In</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CheckInTab;
