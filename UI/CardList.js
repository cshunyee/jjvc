import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";

const CardList = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
    marginVertical: 16,
  },
});

export const Card = ({
  direction,
  image,
  header,
  subheader,
  content,
  button,
  onPress,
}) => {
  const cardGap = 24;
  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;

  const cardWidthStyle = () => {
    return {
      width: cardWidth,
    };
  };

  return (
    <Pressable
      style={({ pressed }) => [
        cardStyles.card,
        pressed && cardStyles.cardPressed,
        cardWidthStyle(),
      ]}
      onPress={onPress}
    >
      <Text style={cardStyles.title}>{header}</Text>
    </Pressable>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: 106,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#cecece",
    backgroundColor: "#fffefe",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.1,
  },
  cardPressed: {
    opacity: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: "#484848",
  },
});
