import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, KeyboardAvoidingView, View, Alert } from 'react-native';
import QrReader, { ModalState } from './components/QrReader';
import { Text, Input, Spinner, Button } from '@ui-kitten/components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TicketsScreen from '../screens/TicketsScreen';
import ModalTicketValidator from './components/ModalTicketValidator';
import { BarCodeScanner } from 'expo-barcode-scanner';

type Granted = { type: 'GRANTED' };
type Denied = { type: 'DENIED' };
type Loading = { type: 'LOADING' };

export type CameraState = Granted | Denied | Loading;

export default function QrScreen({ ticketType, markTicketAsUsed, hasPermission, setHasPermission }: any) {
  const DrawerR = createDrawerNavigator();
  const windowWidth = useWindowDimensions().width;

  const manualValidationfromList = (id: string) => {
    fetchAndDisplayModal(id);
  }

  // ######################################################
  // FROM QrReader.tsx
  // ######################################################
  const [scanned, setScanned] = useState(false);
  //data shown in modal
  const [modalState, setModalState] = useState<ModalState>({ type: 'HIDDEN', isVisible: false });

  const itemToValidate = ticketType.key;
  const [manualValidationValue, setManualValidationValue] = React.useState('');

  // handler when bacrode is scanned
  const handleBarCodeScanned = ({ type, data }: any) => {
    setModalState({ type: 'LOADING', isVisible: true });
    fetchAndDisplayModal(data);
  };

  // handler when bacrode is scanned
  const fetchAndDisplayModal = (data: string) => {
    setScanned(true);
    fetchUserData(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned! Chosen ${itemToValidate} doslo zpet ${JSON.stringify(responseToModal)}`);
  };

  //fetch all data about one user - user ID is data scanned from QR code
  const fetchUserData = (user: any) => {
    fetch(`https://sjezd-qr-ticket.herokuapp.com/get/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setModalState({ type: 'DATA', isVisible: true, data: getTextForModal(data.message[0], itemToValidate) });
      })
      .catch(function (error) {
        alert("ERROR: Chyba připojení k databázi při načítání vstupenky." + error);
        setModalState({ type: 'HIDDEN', isVisible: false });
      });
    // .then(data => console.log(data));
  };

  function getTextForModal(user_data: any, ticketInterest: any) {
    let res = validateTicket(user_data, ticketInterest);

    switch (res) {
      case 'used':
        return ["warning", "Ticket has been already used!", user_data?.name, user_data[ticketInterest]]
      case 'ok':
        return ["success", "Ticket checked", user_data?.name, user_data[ticketInterest]]
      case 'not':
        return ["info", "Not purchased!", user_data?.name, user_data[ticketInterest]]
      default:
        return ["danger", "Error", user_data?.name, user_data[ticketInterest]]
    }
  }

  //function gets object from server and checks if the required ticket is valid/used...
  function validateTicket(user_data: any, ticketInterest: any) {
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

  // ######################################################

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

  const clearSearchBar = () => {
    setManualValidationValue('');
  };

  function setValueAndValidate(nextValue: string) {
    setManualValidationValue(nextValue);
    // if (nextValue.length === 6) {
    //   fetchAndDisplayModal(nextValue);
    // }
  }

  const Content = () => (
    <View style={styles.container}>
      <Text style={styles.title}>{ticketType.title}</Text>
      <QrReader
        itemToValidate={ticketType.key}
        markAsUsed={markTicketAsUsed}
        setScanned={setScanned}
        modalState={modalState}
        setModalState={setModalState}
        scanned={scanned}
        handleBarCodeScanned={handleBarCodeScanned}
      />

      {/* Manual Validation */}
      <View style={styles.searchBox}>
        <Input
          value={manualValidationValue}
          autoCapitalize='characters'
          autoCorrect={false}
          placeholder='or Type QR code'
          status='control'
          size='large'
          maxLength={10}
          style={styles.searchBar}
          textStyle={styles.searchBarText}
          // onFocus={clearSearchBar}
          onChangeText={nextValue => setManualValidationValue(nextValue)}
          onSubmitEditing={e => fetchAndDisplayModal(e.nativeEvent.text)}
        />
      </View>

      <ModalTicketValidator />
    </View>
  )

  function CustomDrawerContent(props: any) {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height' keyboardVerticalOffset={40}>
        <TicketsScreen manualValidation={manualValidationfromList} />
      </KeyboardAvoidingView>
    );
  }

  return (
    <DrawerR.Navigator initialRouteName='QRScreen' backBehavior='initialRoute' screenOptions={{ drawerPosition: 'right', drawerStyle: { width: '90%', backgroundColor: 'black' }, headerShown: false }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <DrawerR.Screen
        name='QRScreen'
        component={Content}
        options={{ drawerLabel: 'QRScreen', swipeEdgeWidth: windowWidth / 2 }}
      />
    </DrawerR.Navigator>
  );
}


const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
    fontSize: 30,
    width: '100%',
    textAlign: 'center',
    padding: 7,
    color: 'white',
    backgroundColor: 'black',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    borderRadius: 10
  },
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