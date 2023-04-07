import { Pressable, StyleSheet, Text, View } from "react-native";
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

const CheckInTab = () => {
  const checkInBtnOpacity = useSharedValue(1);

  const checkInBtnAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(checkInBtnOpacity.value),
    };
  });

  return (
    <Animated.View
      entering={SlideInLeft}
      exiting={SlideOutLeft}
      layout={Layout.springify()}
      style={styles.container}
    >
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
              {dayjs().format("dddd, DD MMMM YYYY")}
            </Text>
            <Text style={[styles.timeTitle]}>{dayjs().format("HH:MM")}</Text>
          </View>
        </Card>

        <Pressable onPress={() => (checkInBtnOpacity.value = 0.5)}>
          <Animated.View style={[styles.checkInBtn, checkInBtnAnimatedStyle]}>
            <Text style={styles.btnText}>Check In</Text>
          </Animated.View>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
