import { StyleSheet, View } from "react-native";
import CalendarTab from "../components/Event/CalendarTab";
import { useState } from "react";
import CheckInTab from "../components/Event/CheckInTab";
import TabViewCS from "../UI/Tab";

const CheckInScreen = () => {
  const [routes, setRoutes] = useState([
    { key: "checkIn", title: "Check In" },
    { key: "calendar", title: "Calendar" },
  ]);

  const renderTab = {
    checkIn: CheckInTab,
    calendar: CalendarTab,
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

export default CheckInScreen;
