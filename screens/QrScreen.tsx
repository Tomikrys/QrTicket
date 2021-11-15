import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, KeyboardAvoidingView, View } from 'react-native';

import QrReader from './components/QrReader';
import { Text, Input } from '@ui-kitten/components';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TicketsScreen from '../screens/TicketsScreen';
import ModalTicketValidator from './components/ModalTicketValidator';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QrScreen({ticketType, markTicketAsUsed}) {
  const [hasPermission, setHasPermission] = useState(false);
  const DrawerR = createDrawerNavigator();
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    let permissionNeeded = true;

    BarCodeScanner.requestPermissionsAsync().then(({status}) => {
      if (permissionNeeded) setHasPermission(status  === 'granted');
    });

    return () => { permissionNeeded = false };
  }, []);

  if (!hasPermission) {
    return (
      <View style={{ height: '100%', justifyContent: 'center' }}>
        <Text category='h4' style={{ textAlign: 'center' }}>Please allow Camera</Text>
      </View>
    );
  }

  const Content = () => (
    <QrScreenContent ticketType={ticketType} markTicketAsUsed={markTicketAsUsed} hasPermission={hasPermission}/>
  )

  function CustomDrawerContent(props) {
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior='height' keyboardVerticalOffset={40}>
        <TicketsScreen onSelectTicket={(t) => console.log(t)} />
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
      <QrReader itemToValidate={ticketType.key} markAsUsed={markTicketAsUsed} hasPermission={hasPermission} />
      <ManualValidation />
      <ModalTicketValidator />
      <Text style={{fontSize: 30, width: '100%', textAlign: 'center', marginBottom: 30}}>{ticketType.title}</Text>
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
        placeholder='Type QR code'
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
    height: '70%',
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
