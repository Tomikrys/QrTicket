import React from 'react';
import { StyleSheet, useWindowDimensions, KeyboardAvoidingView, View } from 'react-native';

import QrReader from './components/QrReader';
import { Input } from '@ui-kitten/components';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TicketsScreen from '../screens/TicketsScreen';
import ModalTicketValidator from './components/ModalTicketValidator';

export default function QrScreen({itemToValidate, markAsUsed}) {
  const DrawerR = createDrawerNavigator();
  const windowWidth = useWindowDimensions().width;

  const Content = () => (
    <QrScreenContent itemToValidate={itemToValidate} markAsUsed={markAsUsed}/>
  )

  function CustomDrawerContent(props) {
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior='height' keyboardVerticalOffset={40}>
        <TicketsScreen />
      </KeyboardAvoidingView>
    );
  }

  return (
    <DrawerR.Navigator initialRouteName='QRScreen' backBehavior='initialRoute' screenOptions={{ drawerPosition: 'right', drawerStyle: { width: '90%' } }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <DrawerR.Screen
        name='QRScreen'
        component={Content}
        options={{ drawerLabel: 'QRScreen', swipeEdgeWidth: windowWidth/2 }}
      />
    </DrawerR.Navigator>
  );
}

function QrScreenContent({itemToValidate, markAsUsed}) {
  return (
    <View style={styles.container}>
      <QrReader itemToValidate={itemToValidate} markAsUsed={markAsUsed}/>
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
        placeholder='Scan QR'
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
