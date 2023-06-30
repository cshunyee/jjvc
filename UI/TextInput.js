import { useState } from "react";
import { StyleSheet, Text, TextInput as TextInputRN, View } from "react-native";

const TextInput = ({
  value,
  placeholder,
  onChangeText,
  errorText,
  style = [],
  hasError = false,
  ...props
}) => {
  const [initValue, setInitValue] = useState(value || "");
  const [firstTyping, setFirstTyping] = useState(true);
  const [isValid, setIsValid] = useState(true);

  const handlerOnChange = (text) => {
    if (firstTyping) setFirstTyping(false);
    onChangeText(text);
  };

  const handlerOnFocus = () => {
    setIsValid(true);
  };

  const handlerOnEndEditing = () => {
    if (!firstTyping && hasError) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    return;
  };

  return (
    <View>
      <TextInputRN
        style={[styles.textInput, !isValid && styles.error, ...style]}
        placeholder={placeholder}
        value={value}
        onFocus={handlerOnFocus}
        onChangeText={handlerOnChange}
        onEndEditing={handlerOnEndEditing}
        {...props}
      />
      {!isValid && errorText && (
        <Text style={styles.errorText}>{errorText}</Text>
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    padding: 20,
    backgroundColor: "#e7e7e7",
    color: "#000000",
    width: 350,
    borderRadius: 6,
    fontSize: 16,
    fontWeight: "400",
  },
  error: {
    backgroundColor: "#f2a7a7",
    color: "#a73333",
    fontWeight: "600",
  },
  errorText: {
    fontSize: 14,
    color: "#a73333",
    fontWeight: "600",
    marginLeft: 4,
    marginTop: 2,
  },
});
