import { StyleSheet, View } from "react-native";

const Card = ({ children, color, style }) => {
  const getColorStyle = (color) => {
    if (color === "white") {
      return {
        borderColor: "#f8f8f8",
        backgroundColor: "#f8f8f8",
        shadowColor: "#b5b5b8",
      };
    }
    return {
      borderColor: "#dde1f1",
      backgroundColor: "#dde1f1",
      shadowColor: "#747bbb",
    };
  };
  return (
    <View style={[styles.card, getColorStyle(color), style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default Card;
