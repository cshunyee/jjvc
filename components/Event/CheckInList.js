import { FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import dayjs from "dayjs";
import Card from "../../UI/Card";
import checkInData from "../../data/checkin";

const CheckInList = () => {
  return (
    <FlatList
      style={styles.container}
      data={checkInData}
      keyExtractor={(item) => item.key}
      renderItem={(itemData) => (
        <Card>
          <View style={styles.contentView}>
            <FontAwesome5 name="calendar-check" size={24} color="#3852a8" />
            <View style={styles.contentItem}>
              <Text style={[styles.title, styles.text]}>
                {itemData.item.title}
              </Text>
            </View>
            <View style={[styles.contentItem, styles.dateView]}>
              <Text style={styles.date}>
                {dayjs(itemData.item.date).format("dddd MM-DD")} {"\n"}
                {dayjs(itemData.item.date).format("hh:mm a")}
              </Text>
            </View>
          </View>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  contentView: {
    flexDirection: "row",
    alignItems: "center"
  },
  contentItem: {
    flex: 3,
    marginLeft: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 8,
  },
  text: {
    color: "black",
  },
  dateView: {
    flex: 2,
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    marginLeft: "auto",
  },
});

export default CheckInList;
