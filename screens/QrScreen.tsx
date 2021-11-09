import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import QrReader from './components/QrReader';
import { Button, Input, Icon, BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components';

import ModalScreen from '../screens/ModalScreen';

const ticketTypes = ['Breakfast', 'Lunch', 'Dinner']

export default function QrScreen() {
  return (
    <View style={styles.container}>
      <QrReader />
      <ListButton />
      <ManualValidation />
      <BottomTicketTypeSelector />
    </View>
  );
}

function ListButton() {
  const MenuIcon = (props) => (
    <Icon {...props} name='menu'/>
  );

  return (
    <Button style={styles.button} appearance='ghost' status='basic' accessoryLeft={MenuIcon}/>
  );
}

function BottomTicketTypeSelector() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
      style={{}}>
      {ticketTypes.map(item => (
           <BottomNavigationTab title={item} />
         )
      )}
    </BottomNavigation>
  );
}

function ManualValidation() {
  const [value, setValue] = React.useState('');

  const clearSearchBar = () => {
    setValue('');
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearSearchBar}>
      <Icon {...props} name={'close-outline'}/>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.searchBox}>
      <Input
        value={value}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder='Scan QR'
        status='control'
        size='large'
        style={styles.searchBar}
        clearButtonMode='while-editing'
        accessoryRight={renderIcon}
        onChangeText={nextValue => setValue(nextValue)}
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
  },
  searchBox: {
    backgroundColor: 'transparent',
    height: '70%',
    justifyContent: 'flex-end'
  },
  searchBar: {
    width: '50%',
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(80,80,80,0.5)'
  },
  button: {
    alignSelf: 'flex-start',
  }
});
