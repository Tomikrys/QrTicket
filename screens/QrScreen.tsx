import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, KeyboardAvoidingView, View, Alert } from 'react-native';
import QrReader from './components/QrReader';
import { Text, Input, Spinner, Button } from '@ui-kitten/components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TicketsScreen from '../screens/TicketsScreen';
import ModalTicketValidator from './components/ModalTicketValidator';
import { BarCodeScanner } from 'expo-barcode-scanner';

type Granted = { type: 'GRANTED' };
type Denied = { type: 'DENIED' };
type Loading = { type: 'LOADING' };

type CameraState = Granted | Denied | Loading;


export default function QrScreen({ ticketType, markTicketAsUsed }) {

  const [hasPermission, setHasPermission] = useState<CameraState>({ type: 'LOADING' });
  const DrawerR = createDrawerNavigator();
  const windowWidth = useWindowDimensions().width;
  const [scanned, setScanned] = useState(false);
  const [modalVisiblity, setModalVisiblity] = useState(false);
  //response which is used by modal but not shown
  const [responseToModal, setResponseToModal] = useState(null);
  //data shown in modal
  const [dataToModal, setDataToModal] = useState([""]);

  //  for calling QrReader method => display ticket modal from TicketScreen
  const QrReaderRef = useRef();
  const manualValidationfromList = (id: string) => {
    // QrReaderRef.current.handleManualValidation(id);
    alert(JSON.stringify(QrReaderRef));
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

    switch (res) {
      case 'used':
        return ["warning", "Vstupenka již byla odbavena dříve!", user_data?.name, user_data[ticketInterest]]
      case 'ok':
        return ["success", "Vstupenka odbavena.", user_data?.name, user_data[ticketInterest]]
      case 'not':
        return ["info", "Nezakoupeno!", user_data?.name, user_data[ticketInterest]]
      default:
        return ["danger", "Nastala chyba", user_data?.name, user_data[ticketInterest]]
    }
  }

  //fetch all data about one user - user ID is data scanned from QR code
  const fetchUserData = (user) => {
    fetch(`https://sjezd-qr-ticket.herokuapp.com/get/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setResponseToModal(data.message[0]);
        setDataToModal(getTextForModal(data.message[0], itemToValidate));
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

  useEffect(() => {
    let permissionNeeded = true;

    BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
      if (permissionNeeded) setHasPermission(status === 'granted' ? { type: 'GRANTED' } : { type: 'DENIED' });
    });

    return () => { permissionNeeded = false };
  }, []);

  if (hasPermission.type === 'DENIED') {
    return (
      <View style={{ height: '100%', justifyContent: 'center' }}>
        <Text category='h4' style={{ textAlign: 'center' }}>Please allow Camera</Text>
        <Button onPress={() => {
          BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
            setHasPermission(status === 'granted' ? { type: 'GRANTED' } : { type: 'DENIED' });
          });
        }}>Done</Button>
      </View>
    );
  }

  if (hasPermission.type === 'LOADING') {
    return (
      <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size='giant' />
      </View>
    );
  }

  const Content = () => (
    <View style={styles.container}>
      <Text style={{ position: 'absolute', top: 0, zIndex: 100, fontSize: 30, width: '100%', textAlign: 'center', padding: 7, backgroundColor: 'white' }}>{ticketType.title}</Text>
      <QrReader itemToValidate={ticketType.key} markAsUsed={markTicketAsUsed} hasPermission={hasPermission} QrReaderRef={QrReaderRef} />
      <ManualValidation />
      <ModalTicketValidator />
    </View>
  )

  function CustomDrawerContent(props) {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height' keyboardVerticalOffset={40}>
        <TicketsScreen onSelectTicket={(t) => console.log(t)} manualValidation={manualValidationfromList} />
      </KeyboardAvoidingView>
    );
  }

  return (
    <DrawerR.Navigator initialRouteName='QRScreen' backBehavior='initialRoute' screenOptions={{ drawerPosition: 'right', drawerStyle: { width: '90%' }, headerShown: false }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <DrawerR.Screen
        name='QRScreen'
        component={Content}
        options={{ drawerLabel: 'QRScreen', swipeEdgeWidth: windowWidth / 2 }}
      />
    </DrawerR.Navigator>
  );
}

function ManualValidation() {
  const [value, setValue] = React.useState('');

  const clearSearchBar = () => {
    setValue('');
  };

  return (
    <View style={styles.searchBox}>
      <Input
        value={value}
        autoCapitalize='characters'
        autoCorrect={false}
        placeholder='or Type QR code'
        status='control'
        size='large'
        maxLength={10}
        style={styles.searchBar}
        textStyle={styles.searchBarText}
        onFocus={clearSearchBar}
        onChangeText={nextValue => setValue(nextValue)}
      //onSubmitEditing={}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  searchBox: {
    backgroundColor: 'transparent',
    height: '80%',
    justifyContent: 'flex-end'
  },
  searchBar: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: 'rgba(80,80,80,0.5)'
  },
  searchBarText: {
    textAlign: 'center',
  }
});