import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  SlideInLeft,
  SlideOutLeft,
  Layout,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import Card from "../../UI/Card";
import dayjs from "dayjs";
import { getLocalDateObj } from "../../utils/date";

const CheckInTab = () => {
  const [currentTime, setCurrentTime] = useState(getLocalDateObj());
  const checkInBtnOpacity = useSharedValue(1);
  const checkInBtnAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(checkInBtnOpacity.value),
    };
  });

  useEffect(() => {
    const minuteInterval = setInterval(() => {
      setCurrentTime(getLocalDateObj());
    }, 60000);
    return () => clearInterval(minuteInterval);
  }, []);

  return (
    <View style={[styles.container, styles.detailView]}>
      <Card>
        <View style={styles.detailCardContent}>
          <Text style={[styles.detailText, styles.detailTitle]}>
            纪念耶稣基督荣进圣城 {"\n"}棕树主日 （红色）
          </Text>
          <Text style={styles.detailText}>讲员：XXX</Text>
          <Text style={styles.detailText}>主席：XXX</Text>
          <Text style={styles.detailText}>领唱：XXX</Text>
        </View>
      </Card>
      <Card color="white">
        <View style={styles.dateCardContent}>
          <Text style={styles.dateTitle}>
            {currentTime.format("dddd, DD MMMM YYYY")}
          </Text>
          <Text style={[styles.timeTitle]}>{dayjs().format("HH:MM")}</Text>
        </View>
      </Card>

      <Pressable
        onPressIn={() => (checkInBtnOpacity.value = 0.3)}
        onPressOut={() => (checkInBtnOpacity.value = 1)}
      >
        <Animated.View style={[styles.checkInBtn, checkInBtnAnimatedStyle]}>
          <Text style={styles.btnText}>Check In</Text>
        </Animated.View>
      </Pressable>
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
  detailView: {
    marginTop: 24,
  },
  detailCardContent: {
    paddingVertical: 4,
  },
  detailTitle: {
    marginBottom: 8,
    fontWeight: 700,
  },
  detailText: {
    fontSize: 20,
    fontWeight: 400,
    marginTop: 6,
    textAlign: "center",
  },
  dateCardContent: {
    paddingVertical: 8,
  },
  dateTitle: {
    fontSize: 20,
    fontWeight: 800,
    textAlign: "center",
  },
  timeTitle: {
    marginTop: 5,
    fontSize: 42,
    fontWeight: 800,
    textAlign: "center",
  },
  checkInBtn: {
    marginTop: 10,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "#4d76f0",
  },
  btnText: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
    color: "white",
  },
});

export default CheckInTab;
