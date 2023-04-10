import { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";
import { Entypo } from "@expo/vector-icons";

const QRScanner = ({ handleBarCodeScanned, isScanned, setIsShow }) => {
  const [hasPermission, setHasPermission] = useState(null);

  const verifyCameraPermission = async () => {
    const permissionRes = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(permissionRes.status === PermissionStatus.GRANTED);
    setIsShow(true);
  };

  useEffect(() => {
    setIsShow(false);
    verifyCameraPermission();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.errorContainer}>
        <Entypo name="circle-with-cross" size={24} color="red" />
        <Text> Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.errorContainer}>
        <Entypo name="circle-with-cross" size={24} color="#d34747" />
        <Text> Application has no access to camera</Text>
      </View>
    );
  }

  // console.log("render", isShow);

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={isScanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {isScanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  errorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
