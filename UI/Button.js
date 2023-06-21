import { Pressable, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const Button = ({
  label,
  style: propStyles,
  onPress,
  disabled = false,
  icon
}) => {
  const btnOpacity = useSharedValue(1);
  const btnAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(btnOpacity.value),
    };
  });

  const onPressIn = () => {
    btnOpacity.value = 0.3;
  };

  const onPressOut = () => {
    btnOpacity.value = 1;
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
    >
      <Animated.View style={[styles.btn, btnAnimatedStyle, propStyles]}>
        {icon}
        <Text style={styles.btnText}> {label}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
    color: "white",
  },
  btn: {
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
});
