import { StyleSheet, Text, View } from "react-native";

const Divider = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  divider: {
    flex: 1,
    height: 1,
    marginHorizontal: 16,
    backgroundColor: "#e8e8e8",
  },
  text: {
    width: 50,
    textAlign: "center",
    fontWeight: 500,
  },
});

export default Divider;
