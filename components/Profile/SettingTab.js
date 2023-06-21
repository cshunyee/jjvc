import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import Modal from "react-native-modal";
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import CardList, { Card } from "../../UI/CardList";
import { AuthContext } from "../../store/auth-context";
import Button from "../../UI/Button";

const SettingTab = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const [isShow, setIsShow] = useState(false);
  const [qrCode, setQRCode] = useState();

  const deviceWidth = Dimensions.get("window").width;
  const qrCodeSize = 300;
  const qrCodePadding = 10;
  const qrcontainerPadding =
    (deviceWidth - qrCodeSize - 2 * qrCodePadding - 25) / 2;
  const actionList = ["QR Generate", "Export"];

  const saveImage = async (uri) => {
    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const filename = FileSystem.documentDirectory + "checkincode.png";
        await FileSystem.writeAsStringAsync(filename, qrCode, {
          encoding: FileSystem.EncodingType.Base64,
        });
        // Save image to media library
        await MediaLibrary.saveToLibraryAsync(filename);

        console.log("Image successfully saved");
        setIsShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <CardList>
        {actionList.map((name) => (
          <Card key={name} header={name} onPress={() => setIsShow(true)} />
        ))}
      </CardList>

      <Button
        label="Logout"
        onPress={() => authCtx.logout()}
      />

      <Modal
        isVisible={isShow}
        onBackdropPress={() => setIsShow(false)}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={[
              styles.qrContainer,
              { paddingHorizontal: qrcontainerPadding },
            ]}
            onPress={saveImage}
          >
            <QRCode
              getRef={(c) => {
                // setQRCode(c);
                c?.toDataURL((data) => setQRCode(data));
              }}
              size={qrCodeSize}
              quietZone={qrCodePadding}
              value={new Date().toUTCString()}
            />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default SettingTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    justifyContent: "center",
    height: 0,
    backgroundColor: "#eeeeee",
    borderRadius: 12,
  },
  modalText: {
    color: "#4d76f0",
    fontSize: 16,
    fontWeight: 500,
    textAlign: "center",
    marginVertical: 20,
  },
  qrContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
