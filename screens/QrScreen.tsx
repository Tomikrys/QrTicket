/*
 *
 * Project: QrTicket mobile app
 * Date: December 2021
 * Authors: Tomas Rysavy, Filip Jerabek, Tomas Vostrejz, Petr Stehlik
 *
 */

import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, useWindowDimensions, KeyboardAvoidingView, View, Alert } from 'react-native';
import QrReader, { ModalState } from './components/QrReader';
import { Text, Input, Spinner, Button } from '@ui-kitten/components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TicketsScreen from '../screens/TicketsScreen';
import ModalTicketValidator from './components/ModalTicketValidator';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Switch from 'expo-dark-mode-switch';
import { ThemeContext } from '../components/Themed';

type Granted = { type: 'GRANTED' };
type Denied = { type: 'DENIED' };
type Loading = { type: 'LOADING' };

export type CameraState = Granted | Denied | Loading;

export default function QrScreen({ ticketType, markTicketAsUsed, hasPermission, setHasPermission }: any) {
  const DrawerR = createDrawerNavigator();
  const windowWidth = useWindowDimensions().width;
  const themeContext = useContext(ThemeContext);
  const [lightTheme, setTheme] = useState(themeContext.theme === 'dark');

  const manualValidationfromList = (id: string) => {
    fetchAndDisplayModal(id);
  }

  // ######################################################
  // FROM QrReader.tsx
  // ######################################################
  const [scanned, setScanned] = useState(false);
  // data shown in modal
  const [modalState, setModalState] = useState<ModalState>({ type: 'HIDDEN', isVisible: false });

  const itemToValidate = ticketType.key;
  const [manualValidationInputFocus, setManualValidationInputFocus] = useState('80%');
  const [manualValidationValue, setManualValidationValue] = useState('');

  // handler when barcode is scanned
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

  // fetch all data about one user - user ID is data scanned from QR code
  const fetchUserData = (user: any) => {
    fetch(`https://sjezd-qr-ticket.herokuapp.com/get/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setModalState({ type: 'DATA', isVisible: true, data: getTextForModal(data.message[0], itemToValidate) });
      })
      .catch(function (error) {
        alert("ERROR: Chyba p??ipojen?? k datab??zi p??i na????t??n?? vstupenky." + error);
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

  // function gets object from server and checks if the required ticket is valid/used...
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

  // Camera permission alert
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
  } else if (hasPermission.type === 'LOADING') {
    return (
      <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size='giant' />
      </View>
    );
  }

  // Clear manual validation input
  const clearManualValidationInput = () => {
    setManualValidationValue('');
  };

  function setValueAndValidate(nextValue: string) {
    setManualValidationValue(nextValue);
    // if (nextValue.length === 6) {
    //   fetchAndDisplayModal(nextValue);
    // }
  }

  function toggleTheme(theme) {
    setTheme(theme);
    themeContext.toggleTheme();
  }

  // Function for getting right color scheme styles
  function getThemeStyles() {
    return themeContext.theme === 'light' ? styles.light : styles.dark;
  };

  // Render the screen content
  const Content = () => (
    <View style={[styles.container, getThemeStyles()]}>
      <Text style={[styles.title, getThemeStyles()]}>{ticketType.title}</Text>
      <Switch style={styles.toggle} value={lightTheme} onChange={theme => toggleTheme(theme)} />
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
      <View style={[styles.manualValidationBox, {height: manualValidationInputFocus}]}>
        <Input
          value={manualValidationValue}
          autoCapitalize='characters'
          autoCorrect={false}
          placeholder='or Type QR code'
          status='control'
          size='large'
          maxLength={10}
          style={styles.manualValidationInput}
          textStyle={styles.manualValidationInputText}
          // onFocus={clearManualValidationInput}
          onChangeText={nextValue => setManualValidationValue(nextValue)}
          onSubmitEditing={e => fetchAndDisplayModal(e.nativeEvent.text)}
          onFocus={() => (setManualValidationInputFocus('70%'))}
          onBlur={() => (setManualValidationInputFocus('80%'))}
        />
      </View>

      <ModalTicketValidator />
    </View>
  )

  // Right drawer content
  function CustomDrawerContent(props: any) {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height' keyboardVerticalOffset={40}>
        <TicketsScreen manualValidation={manualValidationfromList} />
      </KeyboardAvoidingView>
    );
  }

  // Render the screen with list of people in right drawer
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

// Styles
const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
    fontSize: 30,
    width: '100%',
    textAlign: 'center',
    padding: 7,
  },
  dark: {
    color: 'white',
    backgroundColor: '#222B45',
  },
  light: {
    color: 'black',
    backgroundColor: 'white',
  },
  toggle: {
    position: 'absolute',
    right: 10,
    top: 5,
    zIndex: 110,
    padding: 7,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  manualValidationBox: {
    backgroundColor: 'transparent',
    height: '80%',
    justifyContent: 'flex-end'
  },
  manualValidationInput: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: 'rgba(80,80,80,0.5)'
  },
  manualValidationInputText: {
    textAlign: 'center',
  }
});
