import React from 'react';

import QrScreen from '../screens/QrScreen';
import TicketsScreen from '../screens/TicketsScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { KeyboardAvoidingView } from 'react-native';

/*const RootNavigator = createStackNavigator({
  Login: { screen: QrScreen ,
           navigationBarStyle : {navBarHidden: true },
           navigationOptions: {
           headerShown: false,
           }
  },
  AfterLogin: { screen: MyDrawerNavigator,
    navigationBarStyle : {navBarHidden: true },
    navigationOptions: {
      headerShown: false,
    } },
});*/


export default function Navigator() {
  const Drawer = createDrawerNavigator();

  // is set from settings screen --- TODO vyresit aby nebylo natvrdo registration ale prvni ze seznamu
  const [itemToValidate, setItemToValidate] = React.useState("registration");
  // bool if the ticked should be marked as used
  const [markAsUsed, setMarkAsUsed] = React.useState(true);

  const screen = () => (
    <QrScreen itemToValidate={itemToValidate} markAsUsed={markAsUsed}/>
  )

  function CustomDrawerContent(props) {
  /*
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
  */
// <TicketsScreen />
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior='height' keyboardVerticalOffset={40}>
        <SettingsScreen itemToValidate={itemToValidate} setItemToValidate={setItemToValidate} setMarkAsUsed={setMarkAsUsed}/>
      </KeyboardAvoidingView>
    );
  }

  return (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName='LoginScreen' backBehavior='initialRoute' drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ drawerStyle: { width: '90%' },
    header: ({ navigation, route, options }) => {
  return (<></>); // TODO
} }}>
      <Drawer.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ drawerLabel: 'LoginScreen', swipeEdgeWidth: 0 }}
      />
      <Drawer.Screen
        name="QrScreen"
        component={screen}
        options={{ drawerLabel: 'QrScreen', swipeEdgeWidth: 10000 }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}
