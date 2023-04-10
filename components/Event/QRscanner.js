import { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";

const QRScanner = ({ handleBarCodeScanned, isScanned, isShow }) => {
  if (!isShow) return "";

  const [hasPermission, setHasPermission] = useState(null);

  const verifyCameraPermission = async () => {
    const permissionRes = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(permissionRes.status === PermissionStatus.GRANTED);
  };

  useEffect(() => {
    verifyCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
});
