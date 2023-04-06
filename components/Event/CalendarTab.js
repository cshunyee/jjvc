import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import {
  Calendar,
  CalendarList,
  Agenda,
  CalendarUtils,
  TimelineList,
  TimelineProps,
} from "react-native-calendars";
import Animated, {
  SlideInRight,
  SlideOutRight,
  Layout,
} from "react-native-reanimated";
import * as expoCalendar from "expo-calendar";
import dayjs from "dayjs";
import CheckInList from "./CheckInList";

const INITIAL_DATE = dayjs().format("YYYY-MM-DD");
const INITIAL_TIME = { hour: 9, minutes: 0 };

const getDefaultCalendarSource = async () => {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
};

// const createCalendar = async () => {
//   const defaultCalendarSource =
//     Platform.OS === "ios"
//       ? await getDefaultCalendarSource()
//       : { isLocalAccount: true, name: "Expo Calendar" };
//   const newCalendarID = await Calendar.createCalendarAsync({
//     title: "Expo Calendar",
//     color: "blue",
//     entityType: expoCalendar.EntityTypes.EVENT,
//     sourceId: defaultCalendarSource.id,
//     source: defaultCalendarSource,
//     name: "internalCalendarName",
//     ownerAccount: "personal",
//     accessLevel: Calendar.CalendarAccessLevel.OWNER,
//   });
//   console.log(`Your new calendar ID is: ${newCalendarID}`);
// };

const CalendarTab = () => {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);

  const getDate = (count) => {
    const date = new Date(INITIAL_DATE);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const marked = useMemo(() => {
    return {
      [getDate(0)]: {
        customStyles: {
          container: {
            backgroundColor: "#4d76f0",
          },
          text: {
            color: "white",
            fontWeight: "bold",
          },
        },
      },
      [selected.dateString]: {
        customStyles: {
          container: {
            backgroundColor: "#eeb16b",
          },
          text: {
            color: "white",
          },
        },
      },
    };
  }, [selected]);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await expoCalendar.requestCalendarPermissionsAsync();
  //     if (status === "granted") {
  //       const calendars = await expoCalendar.getCalendarsAsync(
  //         expoCalendar.EntityTypes.EVENT
  //       );
  //       console.log("Here are all your calendars:");
  //       console.log({ calendars });
  //     }
  //   })();
  // }, []);

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutRight}
      layout={Layout.springify()}
      style={styles.container}
    >
      <Calendar
        enableSwipeMonths
        style={styles.calender}
        current={INITIAL_DATE}
        onDayPress={(day) => {
          console.log("selected day", day);
          setSelected(day);
        }}
        theme={{
          calendarBackground: "white",
          textSectionTitleColor: "black",
          textSectionTitleDisabledColor: "gray",
          dayTextColor: "black",
          todayTextColor: "#4d76f0",
          selectedDayTextColor: "white",
          monthTextColor: "black",
          indicatorColor: "#4d76f0",
          selectedDayBackgroundColor: "#4d76f0",
          arrowColor: "#4d76f0",
          // textDisabledColor: 'red',
          stylesheet: {
            calendar: {
              header: {
                week: {
                  marginTop: 30,
                  marginHorizontal: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgoundColor: "#4d76f0",
                  borderColor: "#bbbbbb",
                },
              },
            },
          },
        }}
        markingType={"custom"}
        markedDates={marked}
      />
      <CheckInList />
      {/* <Agenda /> */}
      {/* <Button title="Create a new calendar" onPress={createCalendar} /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calender: {
    borderRadius: 16,
    paddingBottom: 8,
    marginTop: 12,
    marginBottom: 8,
    marginHorizontal: 12,
    borderColor: "#4d76f0",
  },
});

export default CalendarTab;
