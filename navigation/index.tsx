import React from 'react';

import QrScreen from '../screens/QrScreen';
import TicketsScreen from '../screens/TicketsScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';

export default function Navigator() {
  const DrawerL = createDrawerNavigator();
  const windowWidth = useWindowDimensions().width;

  // is set from settings screen --- TODO vyresit aby nebylo natvrdo registration ale prvni ze seznamu
  const [itemToValidate, setItemToValidate] = React.useState("registration");
  // bool if the ticked should be marked as used
  const [markAsUsed, setMarkAsUsed] = React.useState(true);

  const QrScreenContent = () => (
    <QrScreen itemToValidate={itemToValidate} markAsUsed={markAsUsed}/>
  )

  const Settings = () => (
    <SettingsScreen itemToValidate={itemToValidate} setItemToValidate={setItemToValidate} setMarkAsUsed={setMarkAsUsed}/>
  )

  return (
  <NavigationContainer onStateChange={(state) => console.log('New state is', state)}>
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
