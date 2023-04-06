import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
  Easing,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
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

  const onSwitchTab = (tab) => {
    if (tab === "Check In") {
      checkInTabBColor.value = tabColor.active;
      calendarTabBColor.value = tabColor.inactive;
      setCurTab("Check In");
    } else if (tab === "Calendar") {
      calendarTabBColor.value = tabColor.active;
      checkInTabBColor.value = tabColor.inactive;
      setCurTab("Calendar");
    }
  };

  const onSwipeScreenHandler = (direction) => {
    if (direction === "left") {
      onSwitchTab("Calendar");
    } else if (direction === "right") {
      onSwitchTab("Check In");
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
    },
    onEnd: (_) => {
      x.value = withSpring(0);
    },
  });

  const content = curTab === "Calendar" ? <CalendarTab /> : <CheckInTab />;

  const END_POSITION = 200;
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (onLeft.value) {
        position.value = e.translationX;
      } else {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd((e) => {
      if (position.value > END_POSITION / 2) {
        position.value = withTiming(END_POSITION, { duration: 100 });
        onLeft.value = false;
      } else {
        position.value = withTiming(0, { duration: 100 });
        onLeft.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.tabContainer]}>
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
      </View>
      <GestureDetector gesture={panGesture}>
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
      </GestureDetector>
      {/* <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </GestureDetector> */}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 20,
    height: 20,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  tabItem: {
    marginHorizontal: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#ebecef",
  },
  tabText: {
    fontWeight: 700,
  },
});

export default CheckInScreen;
