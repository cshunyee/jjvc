import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  SlideInRight,
  Layout,
} from "react-native-reanimated";
import CalendarTab from "../components/Event/Calendar";
import { useState } from "react";
import CheckInTab from "../components/Event/CheckIn";

const CheckInScreen = () => {
  const [curTab, setCurTab] = useState("Check In");
  //   const randomWidth = useSharedValue(10);
  const tabColor = { active: "#a4b8f2", inactive: "#ebecef" };
  const checkInTabBColor = useSharedValue(tabColor.active);
  const calendarTabBColor = useSharedValue(tabColor.inactive);

  const config = {
    duration: 850,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const checkInAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(checkInTabBColor.value, config),
    };
  });

  const calendarAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(calendarTabBColor.value, config),
    };
  });

  const content = curTab === "Calendar" ? <CalendarTab /> : <CheckInTab />;

  return (
    <View style={styles.container}>
      <View style={[styles.tabContainer]}>
        <Pressable
          onPress={() => {
            checkInTabBColor.value = tabColor.active;
            calendarTabBColor.value = tabColor.inactive;
            setCurTab("Check In");
          }}
        >
          <Animated.View style={[styles.tabItem, checkInAnimatedStyle]}>
            <Text style={styles.tabText}>Check In</Text>
          </Animated.View>
        </Pressable>

        <Pressable
          onPress={() => {
            calendarTabBColor.value = tabColor.active;
            checkInTabBColor.value = tabColor.inactive;
            setCurTab("Calendar");
          }}
        >
          <Animated.View style={[styles.tabItem, calendarAnimatedStyle]}>
            <Text style={styles.tabText}>Calendar</Text>
          </Animated.View>
        </Pressable>
      </View>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  tabItem: {
    marginHorizontal: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#ebecef",
  },
  tabText: {
    fontWeight: 500,
  },
});

export default CheckInScreen;
