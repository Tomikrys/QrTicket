import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Card, Layout, Modal, Button } from '@ui-kitten/components';

export default function QrReader({ itemToValidate, markAsUsed }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [modalVisiblity, setModalVisiblity] = useState(false);
  //response which is used by modal but not shown
  const [responseToModal, setResponseToModal] = useState(null);
  //data shown in modal
  const [dataToModal, setDataToModal] = useState([""]);

  useEffect(() => {
    let permissionNeeded = true;

    BarCodeScanner.requestPermissionsAsync().then(({status}) => {
      if (permissionNeeded) setHasPermission(status  === 'granted');
    });

    return () => { permissionNeeded = false };
  }, []);


  //fetch all data about one user - user ID is data scanned from QR code
  const fetchUserData = (user) => {
    fetch(`https://sjezd-qr-ticket.herokuapp.com/get/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setResponseToModal(data.message[0]);
        setDataToModal(getTextForModal(responseToModal, itemToValidate));
      })
      .catch(function (error) {
        alert("ERROR: Chyba připojení k databázi při načítání vstupenky." + error);
      });
    // .then(data => console.log(data));
  };

  // handler when bacrode is scanned
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setModalVisiblity(true)
    fetchUserData(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned! Chosen ${itemToValidate} doslo zpet ${JSON.stringify(responseToModal)}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={styles.container}>
      <ScannedModal modalVisiblity={modalVisiblity} setModalVisiblity={setModalVisiblity}
        setScanned={setScanned} responseToModal={responseToModal} itemToValidate={itemToValidate} markAsUsed={markAsUsed}
        dataToModal={dataToModal} />
      {/* <ScannedModal /> */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.camera]}>
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
    </View>
  );
}

//function gets object from server and checks if the required ticket is valid/used...
function validateTicket(user_data, ticketInterest) {
  if (!user_data) {
    return "error";
  } else if (user_data && user_data.hasOwnProperty("timestamp_" + ticketInterest) && user_data["timestamp_" + ticketInterest] !== null) {
    return "used";
  } else if (user_data && user_data.hasOwnProperty(ticketInterest) && ["true", "all", "sobota", "maso", "bezmaso"].includes(user_data[ticketInterest])) {
    { // if (dataToModal) {
      //TODO fetch na oznaceni vstupenky
      //}
      return "ok";
    }
  } else if (user_data && user_data.hasOwnProperty(ticketInterest) && [null, "", false].includes(user_data[ticketInterest])) {
    return "not";
  } else {
    return "error";
  }
}


function getTextForModal(user_data, ticketInterest) {
  let res = validateTicket(user_data, ticketInterest);
  if (res == "used") {
    return ["yellow", "Vstupenka již byla odbavena dříve!"]
  } else if (res == "ok") {
    return ["green", "Vstupenka odbavena."]
  } else if (res == "not") {
    return ["orange", "Nezakoupeno!"]
  } else {
    return ["red", "Nastala chyba"]
  }
}

function ScannedModal({ modalVisiblity, setModalVisiblity, setScanned, responseToModal, itemToValidate, markAsUsed, dataToModal }) {
  // function ScannedModal() {
  // const [modalVisiblity, setModalVisiblity] = useState(false);
  return (
    <Layout style={styles.container} level='1'>
      <Modal visible={modalVisiblity}>
        <Card disabled={true}>
          {dataToModal ?
            <React.Fragment>
              <Text>{itemToValidate}</Text>
              <Text>TODO Barva ma byt - {dataToModal[0]} </Text>
              <Text>{dataToModal[1]} </Text>
              {/* <Text>Barva ma byt {dataToModal[0]} </Text> */}
            </React.Fragment>
            :
            <Text>Loading</Text>
          }
          <Button onPress={() => {
            setModalVisiblity(false);
            setScanned(false);
          }}>
            CLOSE
          </Button>
        </Card>
      </Modal>

    </Layout>
  );
}

// {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
const opacity = 'rgba(0, 0, 0, .4)';
const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  camera: {
    flex: 1,
    width: '100%',
    flexDirection: 'column'
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 3,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
});
