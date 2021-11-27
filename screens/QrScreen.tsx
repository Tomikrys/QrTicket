import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, KeyboardAvoidingView, View, Alert } from 'react-native';
import QrReader from './components/QrReader';
import { Text, Input, Spinner, Button } from '@ui-kitten/components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TicketsScreen from '../screens/TicketsScreen';
import ModalTicketValidator from './components/ModalTicketValidator';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ModalQrCodeGenerator from './components/ModalQrCodeGenerator';

type Granted = { type: 'GRANTED' };
type Denied = { type: 'DENIED' };
type Loading = { type: 'LOADING' };

type CameraState = Granted | Denied | Loading;

export default function QrScreen({ticketType, markTicketAsUsed}) {

  const [hasPermission, setHasPermission] = useState<CameraState>({ type: 'LOADING' });
  const DrawerR = createDrawerNavigator();
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    let permissionNeeded = true;

    BarCodeScanner.requestPermissionsAsync().then(({status}) => {
      if (permissionNeeded) setHasPermission(status === 'granted' ? { type: 'GRANTED' } : { type: 'DENIED' } );
    });

    return () => { permissionNeeded = false };
  }, []);

  if (hasPermission.type === 'DENIED') {
    return (
      <View style={{ height: '100%', justifyContent: 'center' }}>
        <Text category='h4' style={{ textAlign: 'center' }}>Please allow Camera</Text>
        <Button onPress={() => {
          BarCodeScanner.requestPermissionsAsync().then(({status}) => {
            setHasPermission(status === 'granted' ? { type: 'GRANTED' } : { type: 'DENIED' } );
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
    <QrScreenContent ticketType={ticketType} markTicketAsUsed={markTicketAsUsed} hasPermission={hasPermission}/>
  )

  function ShowGeneratedQr(person) {
    setQrGeneratorModalVisiblity(true);
  }

  function CustomDrawerContent(props) {
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior='height' keyboardVerticalOffset={40}>
        <TicketsScreen onSelectTicket={ShowGeneratedQr} />
      </KeyboardAvoidingView>
    );
  }

  return (
    <DrawerR.Navigator initialRouteName='QRScreen' backBehavior='initialRoute' screenOptions={{ drawerPosition: 'right', drawerStyle: { width: '90%' }, headerShown: false}} drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <DrawerR.Screen
        name='QRScreen'
        component={Content}
        options={{ drawerLabel: 'QRScreen', swipeEdgeWidth: windowWidth/2 }}
      />
    </DrawerR.Navigator>
  );
}

function QrScreenContent({ticketType, markTicketAsUsed, hasPermission}) {
  return (
    <View style={styles.container}>
      <Text style={{position: 'absolute', top: 0, zIndex: 100, fontSize: 30, width: '100%', textAlign: 'center', padding: 7, backgroundColor: 'white' }}>{ticketType.title}</Text>
      <QrReader itemToValidate={ticketType.key} markAsUsed={markTicketAsUsed} hasPermission={hasPermission} />
      <ManualValidation />
      <ModalTicketValidator />
    </View>
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