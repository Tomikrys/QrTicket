import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import QrReader from './components/QrReader';
import { Button, Layout, Input, MenuItem, OverflowMenu, Icon, BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components';

const ticketTypes = ['Breakfast', 'Lunch', 'Dinner']

const Scan_types = [
    'Diner',
    'Lunch',
    'Breakfast',
    'Another',
];

export default function QrScreen() {
  return (
      <View style={styles.container}>
          <QrReader />
          
      <ListButton />
          {<ManualValidation />
              }
          <ScanType />
          { //<BottomTicketTypeSelector/>
              }
    </View>
  );
}

function ScanType() {
    const [visible, setVisible] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const onItemSelect = (index) => {
        setSelectedIndex(index);
        setVisible(false);
    };

    const renderToggleButton = () => (
        <Button onPress={() => setVisible(true)}>
            Scan type
        </Button>
    );

    return (
        <Layout style={styles.container} level='1'>
            <OverflowMenu
                anchor={renderToggleButton}
                backdropStyle={styles.backdrop}
                visible={visible}
                selectedIndex={selectedIndex}
                onSelect={onItemSelect}
                onBackdropPress={() => setVisible(false)}>
                {Scan_types.map((type, index) =>
                    <MenuItem key={index} title={type} />
                    )}
            </OverflowMenu>
        </Layout>
    )
};

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
        textStyle={styles.searchBarText}
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
    minHeight: 144,
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
  },
  button: {
    alignSelf: 'flex-start',
    },
  backdrop: { 
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
