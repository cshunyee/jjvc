import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";
import * as expoCalendar from "expo-calendar";
import dayjs from "dayjs";
import CheckInList from "./CheckInList";
import Divider from "../../UI/Divider";
import checkInData from "../../data/checkin";

const INITIAL_DATE = dayjs().format("YYYY-MM-DD");
const INITIAL_MONTH = dayjs().format("MM");
const INITIAL_TIME = { hour: 9, minutes: 0 };

const CalendarTab = () => {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_MONTH);

  const getDate = (count) => {
    const date = new Date(INITIAL_DATE);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const formatDate = (input) => {
    const date = new Date(input);
    const newDate = date.setDate(date.getDate());
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const marked = useMemo(() => {
    let markObj = {
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
            // backgroundColor: "#eeb16b",
          },
          text: {
            // color: "white",
          },
        },
      },
    };
    checkInData.map((item) => {
      markObj[formatDate(item.date)] = {
        customStyles: {
          container: {
            backgroundColor: "#8adb86",
          },
          text: {
            color: "white",
            fontWeight: "bold",
          },
        },
      };
    });

    return markObj;
  }, [selected]);

  return (
    <ScrollView>
      <Calendar
        style={styles.calender}
        current={INITIAL_DATE}
        onDayPress={(day) => {
          console.log("selected day", day);
          setSelected(day);
        }}
        onMonthChange={({ dateString }) => {
          setCurrentMonth(dayjs(dateString).format("MM"));
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
      <Divider text="Events" />
      <CheckInList month={currentMonth} />
      {/* <Button title="Create a new calendar" onPress={createCalendar} /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  agenda: {
    borderRadius: 16,
  },
  calender: {
    borderRadius: 16,
    paddingBottom: 8,
    marginTop: 12,
    marginBottom: 8,
    marginHorizontal: 12,
    borderColor: "#4d76f0",
  },
  text: {
    marginTop: 8,
    marginHorizontal: 12,
    textAlign: "center",
  },
});

export default CalendarTab;
