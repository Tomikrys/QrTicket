import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

//import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import QrReader from './components/QrReader';
import { Drawer, DrawerItem, IndexPath, Button, Layout, Input, MenuItem, OverflowMenu, Icon, BottomNavigation, BottomNavigationTab, Text, Modal, Card, Divider } from '@ui-kitten/components';

//import ModalScreen from '../screens/ModalScreen';

const ticketTypes = ['Breakfast', 'Lunch', 'Dinner']

export default function QrScreen({itemToValidate, markAsUsed}) {
  return (
    <View style={styles.container}>
      {/* <ListButton /> */}
      {/* TODO  tenhle modal bude vzskakovatp o nakenovani nebo po manualni validaci
      <MyModal /> */}
      {/* <MyDrawer /> */}
      <QrReader itemToValidate={itemToValidate} markAsUsed={markAsUsed}/>
      <ManualValidation />

      {/* <ScanType /> */}
      {/* <Input
        placeholder='Place your Text'
      />
      <Button onPress={() => {
        alert("TODO zvalidovat");
      }}>
        VALIDATE
      </Button> */}
      {/* <Divider /> */}
      {/* <ManualValidation /> */}
      {/* <BottomTicketTypeSelector/> */}
    </View>
  );
}

function MyModal(){
  const [visible, setVisible] = React.useState(false);

  return (
    <Layout style={styles.container} level='1'>

      <Button onPress={() => setVisible(true)}>
        TOGGLE MODAL
      </Button>

      <Modal visible={visible}>
        <Card disabled={true}>
          <Text>Welcome to UI Kitten 😻</Text>
          <Button onPress={() => setVisible(false)}>
            DISMISS
          </Button>
        </Card>
      </Modal>

    </Layout>
  );
}

function MyDrawer() {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <DrawerItem title='Users' />
      <DrawerItem title='Orders' />
      <DrawerItem title='Transactions' />
      <DrawerItem title='Settings' />
    </Drawer>
  );
}

// function ScanType() {
//   const [visible, setVisible] = React.useState(false);
//   const [selectedIndex, setSelectedIndex] = React.useState(1);

//   const onItemSelect = (index) => {
//     setSelectedIndex(index);
//     setVisible(false);
//   };

//   const renderToggleButton = () => (
//     <Button onPress={() => setVisible(true)}>
//       Scan type
//     </Button>
//   );

//   return (
//     <Layout style={styles.container} level='1'>
//       <OverflowMenu
//         anchor={renderToggleButton}
//         backdropStyle={styles.backdrop}
//         visible={visible}
//         selectedIndex={selectedIndex}
//         onSelect={onItemSelect}
//         onBackdropPress={() => setVisible(false)}>
//         {Scan_types.map((type, index) =>
//           <MenuItem key={index} title={type} />
//         )}
//       </OverflowMenu>
//     </Layout>
//   )
// };

function ListButton() {
  const MenuIcon = (props) => (
    <Icon {...props} name='menu' />
  );

  return (
    <Button style={styles.button} appearance='ghost' status='basic' accessoryLeft={MenuIcon} />
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
      <Icon {...props} name={'close-outline'} />
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
    minHeight: 144,
  },
  searchBox: {
    backgroundColor: 'transparent',
    height: '70%',
    justifyContent: 'flex-end'
  },
  searchBar: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(80,80,80,0.5)'
  },
  button: {
    alignSelf: 'flex-start',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
