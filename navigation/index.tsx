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

  const [ticketType, setTicketType] = React.useState({key: null, title: 'No selected ticket type'});
  const [markTicketAsUsed, setMarkTicketAsUsed] = React.useState(0);

  const QrScreenContent = () => (
    <QrScreen ticketType={ticketType} markTicketAsUsed={markTicketAsUsed}/>
  )

  const Settings = () => (
    <SettingsScreen ticketType={ticketType} markTicketAsUsed={markTicketAsUsed} setTicketType={setTicketType} setMarkTicketAsUsed={setMarkTicketAsUsed}/>
  )

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
