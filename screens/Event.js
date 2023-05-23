import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
  Easing,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import CalendarTab from "../components/Event/CalendarTab";
import { useState } from "react";
import CheckInTab from "../components/Event/CheckInTab";

const CheckInScreen = () => {
  var touchX;
  const [curTab, setCurTab] = useState("Check In");
  //   const randomWidth = useSharedValue(10);
  const tabColor = { active: "#cbd6f5", inactive: "#ebecef" };
  const checkInTabBColor = useSharedValue(tabColor.active);
  const calendarTabBColor = useSharedValue(tabColor.inactive);
  const x = useSharedValue(0);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "checkIn", title: "Check In" },
    { key: "calendar", title: "Calendar" },
  ]);

  const CheckInRoute = () => <CheckInTab />;

  const CalendarRoute = () => <CalendarTab />;

  const renderScene = SceneMap({
    checkIn: CheckInRoute,
    calendar: CalendarRoute,
  });

  const config = {
    duration: 800,
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

  // const onSwitchTab = (tab) => {
  //   if (tab === "Check In") {
  //     checkInTabBColor.value = tabColor.active;
  //     calendarTabBColor.value = tabColor.inactive;
  //     setCurTab("Check In");
  //   } else if (tab === "Calendar") {
  //     calendarTabBColor.value = tabColor.active;
  //     checkInTabBColor.value = tabColor.inactive;
  //     setCurTab("Calendar");
  //   }
  // };

  // const onSwipeScreenHandler = (direction) => {
  //   if (direction === "left") {
  //     onSwitchTab("Calendar");
  //   } else if (direction === "right") {
  //     onSwitchTab("Check In");
  //   }
  // };

  // const content = curTab === "Calendar" ? <CalendarTab /> : <CheckInTab />;

  // const END_POSITION = 200;
  // const onLeft = useSharedValue(true);
  // const position = useSharedValue(0);

  // const panGesture = Gesture.Pan()
  //   .onUpdate((e) => {
  //     if (onLeft.value) {
  //       position.value = e.translationX;
  //     } else {
  //       position.value = END_POSITION + e.translationX;
  //     }
  //   })
  //   .onEnd((e) => {
  //     position.value = withTiming(0, { duration: 200 });
  //   });

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateX: position.value }],
  // }));

  return (
    <View style={styles.container}>
      {/* <View style={[styles.tabContainer]}>
        <Pressable onPress={() => onSwitchTab("Check In")}>
          <Animated.View style={[styles.tabItem, checkInAnimatedStyle]}>
            <Text style={styles.tabText}>Check In</Text>
          </Animated.View>
        </Pressable>

        <Pressable onPress={() => onSwitchTab("Calendar")}>
          <Animated.View style={[styles.tabItem, calendarAnimatedStyle]}>
            <Text style={styles.tabText}>Calendar</Text>
          </Animated.View>
        </Pressable>
      </View> */}
      <TabView
        style={styles.tabContainer}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            // android_ripple={false}
            pressColor="#f0f0f0"
            indicatorStyle={{ display: "none" }}
            // tabStyle={styles.tabContainer}
            style={[styles.tabBar, { marginHorizontal: layout.width / 5 }]}
            renderLabel={({ route, focused, color }) => (
              <View style={[styles.tabItem, focused && styles.activeTabItem]}>
                <Text style={styles.tabText}>{route.title}</Text>
              </View>
            )}
          />
        )}
        // renderTabBar={() => null}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      {/* <GestureDetector gesture={panGesture}>
        <View
          style={styles.container}
          onTouchStart={(e) => (touchX = e.nativeEvent.pageX)}
          onTouchEnd={(e) => {
            if (touchX - e.nativeEvent.pageX > 100)
              onSwipeScreenHandler("left");
            else if (touchX - e.nativeEvent.pageX < -100)
              onSwipeScreenHandler("right");
          }}
        >
          <Animated.View style={[styles.container, animatedStyle]}>
            {content}
          </Animated.View>
        </View>
      </GestureDetector> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    marginTop: 16,
    paddingBottom: 8,
  },
  tabBar: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  tabItem: {
    marginHorizontal: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#ebecef",
  },
  activeTabItem: {
    backgroundColor: "#cbd6f5",
  },
  tabText: {
    fontWeight: 700,
  },
});

export default CheckInScreen;
