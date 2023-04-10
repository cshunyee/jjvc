import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import Modal from "react-native-modal";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Card from "../../UI/Card";
import dayjs from "dayjs";
import { getLocalDateObj } from "../../utils/date";
import QRScanner from "./QRscanner";

const CheckInTab = () => {
  const [scanned, setScanned] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const [currentTime, setCurrentTime] = useState(getLocalDateObj());
  const checkInBtnOpacity = useSharedValue(1);
  const checkInBtnAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(checkInBtnOpacity.value),
    };
  });

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setChecked(true);
    setIsShow(false);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  useEffect(() => {
    const minuteInterval = setInterval(() => {
      setCurrentTime(getLocalDateObj());
    }, 60000);
    return () => clearInterval(minuteInterval);
  }, []);

  return (
    <View style={[styles.container, styles.detailView]}>
      <View style={styles.dateCardContent}>
        <Text style={styles.dateTitle}>
          {currentTime.format("dddd, DD MMMM YYYY")}
        </Text>
        <Text style={[styles.timeTitle]}>{dayjs().format("HH:mm")}</Text>
      </View>
      <Card>
        <View style={styles.detailCardContent}>
          <Text style={[styles.detailText, styles.detailTitle]}>
            纪念耶稣基督荣进圣城 {"\n"}棕树主日 （红色）
          </Text>
        </View>
      </Card>
      <Card color="white">
        <View style={[styles.detailCardContent, styles.avatarCard]}>
          <View>
            <Avatar
              size="large"
              rounded
              title="CR"
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              containerStyle={styles.avatar}
            />
            <Text style={styles.detailText}>讲员</Text>
            <Text style={styles.detailText}>XXX</Text>
          </View>
          <View>
            <Avatar
              size="large"
              rounded
              title="CR"
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              containerStyle={styles.avatar}
            />
            <Text style={styles.detailText}>主席</Text>
            <Text style={styles.detailText}>XXX</Text>
          </View>
          <View>
            <Avatar
              size="large"
              rounded
              title="CR"
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              containerStyle={styles.avatar}
            />
            <Text style={styles.detailText}>领唱</Text>
            <Text style={styles.detailText}>XXX</Text>
          </View>
        </View>
      </Card>

      {checked ? (
        <View>
          <View style={[styles.checkInBtn, styles.checkedIn]}>
            <FontAwesome5 name="calendar-check" size={24} color="#f7f7f7" />
            <Text style={styles.btnText}> Check In</Text>
          </View>
          <Text style={styles.checkedText}>
            Checked: Today {dayjs().format("HH:mm")}
          </Text>
        </View>
      ) : (
        <Pressable
          onPressIn={() => (checkInBtnOpacity.value = 0.3)}
          onPressOut={() => (checkInBtnOpacity.value = 1)}
          onPress={() => setIsShow(true)}
          disabled={checked}
        >
          <Animated.View style={[styles.checkInBtn, checkInBtnAnimatedStyle]}>
            <Ionicons name="scan" size={24} color="#f7f7f7" />
            <Text style={styles.btnText}> Check In</Text>
          </Animated.View>
        </Pressable>
      )}

      <Modal
        isVisible={isShow}
        onBackdropPress={() => setIsShow(false)}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Scanner the QR code provided by staff
          </Text>
          <View style={styles.scannerContainer}>
            <QRScanner
              handleBarCodeScanned={handleBarCodeScanned}
              isScanned={scanned}
              setIsShow={setIsShow}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  container: {
    flex: 1,
  },
  detailView: {
    marginTop: 12,
  },
  detailCardContent: {
    paddingVertical: 4,
  },
  detailTitle: {
    marginBottom: 8,
    fontWeight: 700,
    fontSize: 20,
  },
  detailText: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 8,
    textAlign: "center",
  },
  avatarCard: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  avatar: {
    backgroundColor: "grey",
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "#4d76f0",
  },
  checkedIn: {
    backgroundColor: "#afd7b6",
  },
  btnText: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
    color: "white",
  },
  modalContainer: {
    justifyContent: "center",
    height: 500,
    backgroundColor: "#eeeeee",
    borderRadius: 12,
  },
  modalText: {
    color: "#4d76f0",
    fontSize: 16,
    fontWeight: 500,
    textAlign: "center",
    marginVertical: 20,
  },
  scannerContainer: {
    flex: 1,
    borderRadius: 16,
  },
  checkedText: {
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 8,
    opacity: 0.7,
  },
});

export default CheckInTab;
