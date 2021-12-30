/*
 *
 * Project: QrTicket mobile app
 * Date: December 2021
 * Authors: Tomas Rysavy, Filip Jerabek, Tomas Vostrejz, Petr Stehlik
 *
 */

import React, { useEffect, useState } from 'react';
import QrScreen, { CameraState } from '../screens/QrScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions, View } from 'react-native';
import { getTicketTypes } from '../components/Database';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Navigator() {
  const DrawerL = createDrawerNavigator();
  const windowWidth = useWindowDimensions().width;

  const ticketTypes = getTicketTypes();
  const [ticketType, setTicketType] = React.useState(ticketTypes[0]);
  const [markTicketAsUsed, setMarkTicketAsUsed] = React.useState(0);
  const [hasPermission, setHasPermission] = useState<CameraState>({ type: 'LOADING' });

  // Getting the camera permission
  useEffect(() => {
    let permissionNeeded = true;

    BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
      if (permissionNeeded) setHasPermission(status === 'granted' ? { type: 'GRANTED' } : { type: 'DENIED' });
    });

    return () => { permissionNeeded = false };
  }, []);

  // Scanning screen content
  const QrScreenContent = () => (
    <QrScreen ticketType={ticketType} markTicketAsUsed={markTicketAsUsed} hasPermission={hasPermission} setHasPermission={setHasPermission} />
  )

  // Left drawer content
  const Settings = () => (
    <SettingsScreen ticketType={ticketType} markTicketAsUsed={markTicketAsUsed} setTicketType={setTicketType} setMarkTicketAsUsed={setMarkTicketAsUsed} ticketTypes={ticketTypes}/>
  )

  // Make the left drawer and login/scanning screen navigation
  return (
  //  onStateChange={(state) => console.log('New state is', state)}
  <NavigationContainer>
    <DrawerL.Navigator initialRouteName='LoginScreen' backBehavior='initialRoute' drawerContent={Settings} screenOptions={{ drawerPosition: 'left', drawerStyle: { width: '90%' }, headerShown: false}}>
      <DrawerL.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{ drawerLabel: 'LoginScreen', swipeEdgeWidth: 0, gestureEnabled: false }}
      />
      <DrawerL.Screen
        name='QrScreen'
        component={QrScreenContent}
        options={{ drawerLabel: 'QrScreen', swipeEdgeWidth: windowWidth/2 }}
      />
    </DrawerL.Navigator>
  </NavigationContainer>
  );
}
