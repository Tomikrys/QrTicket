/*
 *
 * Project: QrTicket mobile app
 * Date: December 2021
 * Authors: Tomas Rysavy, Filip Jerabek, Tomas Vostrejz, Petr Stehlik
 *
 */

import React, {useState, useContext} from 'react';
import { getListOfTickets, isAdmin } from '../components/Database';
import { Button, Text, Divider, Input, Icon, List, ListItem, TopNavigation, useTheme } from '@ui-kitten/components';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../components/Themed';

import ModalTicketEditor from './components/ModalTicketEditor';
import ModalQrCodeGenerator from './components/ModalQrCodeGenerator';

export default function TicketsScreen({ manualValidation }: any) {

  const [editorVisible, setEditorVisible] = useState(false);
  const [selectedTicket, selectTicket] = useState(null);
  const allTickets = getListOfTickets();
  const [searchedTickets, setSearchedTickets] = useState(allTickets);
  const [qrGeneratorModalVisiblity, setQrGeneratorModalVisiblity] = useState(false);
  const [person, setPerson] = useState(null);
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();

  // Icons
  const renderItemIcon = (props: any) => (
    <Icon {...props} name='person' />
  );
  const EditIcon = (props: any) => (
    <Icon {...props} name='edit-outline' />
  );
  const ValidateIcon = (props: any) => (
    <Icon {...props} name='person-done-outline' />
  );

  // Render the options buttons for item 
  const renderItemEditAndValidate = (props: any, item: any) => (
    <>
      <Button size='small' status='info' accessoryLeft={EditIcon} style={styles.editButton} onPress={() => { selectTicket(item); setEditorVisible(true); }}></Button>
      <Button size='small' status='success' accessoryLeft={ValidateIcon} style={styles.editButton} onPress={() => { manualValidation(item.ID); }}></Button>
    </>
  );
  const renderItemOnlyValidate = (props: any, item: any) => (
    <Button size='small' status='success' accessoryLeft={ValidateIcon} style={styles.editButton} onPress={() => { manualValidation(item.ID); }}></Button>
  );

  function onSelectTicketShowQr(item: any) {
    setPerson(item);
    setQrGeneratorModalVisiblity(true);
  }

  // Function for getting right color scheme styles
  function lightThemeBG() {
    return themeContext.theme === 'light' ? styles.whiteBG : styles.blackBG;
  };

  // Render the item with person informations and options in the list
  const renderItem = ({ item, index }: any) => (
    <ListItem
      key={index}
      title={() => <Text style={styles.listItemTitle}>{item.name}</Text>}
      description={item.ID}
      accessoryLeft={renderItemIcon}
      accessoryRight={(props) => isAdmin() ? renderItemEditAndValidate(props, item) : renderItemOnlyValidate(props, item)}
      onPress={() => { selectTicket(item); onSelectTicketShowQr(item); }}
      style={[styles.listItem, themeContext.theme === 'light' ? styles.listItemWhiteBorder : null]}
    />
  );

  // Render the screen content
  return (
    <>
      <View style={styles.content}>
        <TopNavigation
          style={{ elevation: 5 }}
          title={() => <Text style={{ flex: 1, textAlign: 'center', fontSize: 25 }}>List of tickets</Text>}
        />
        <Divider />
        <List
          style={[styles.list, lightThemeBG()]}
          data={searchedTickets}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyListText}>No tickets found!</Text>}
        />
        {(isAdmin() && selectedTicket != null) ? <ModalTicketEditor selectedTicket={selectedTicket} onClose={() => setEditorVisible(false)} visible={editorVisible} /> : <></>}
        <Divider />
        <View style={[{ elevation: 5 }, lightThemeBG()]}>
          <SearchBar setSearchedTickets={setSearchedTickets} allTickets={allTickets} />
        </View>
      </View>
      <ModalQrCodeGenerator modalVisiblity={qrGeneratorModalVisiblity} setModalVisiblity={setQrGeneratorModalVisiblity} dataToModal={person} />
    </>
  );
};

// Search bar element constructor
function SearchBar({ setSearchedTickets, allTickets }: any) {
  const [value, setValue] = React.useState('');

  const clearSearchBar = () => {
    setValue('');
    setSearchedTickets(allTickets);
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={clearSearchBar}>
      <Icon {...props} name={'close-outline'} />
    </TouchableWithoutFeedback>
  );

  const onChangeText = (nextValue: any) => {
    setValue(nextValue);
    if (nextValue == '') {
      setSearchedTickets(allTickets);
    } else {
      setSearchedTickets(allTickets.filter(
        // ticket => removeDiacritics(ticket.name.toLowerCase()).includes(removeDiacritics(nextValue.toLowerCase())) ||
        (ticket: any) => removeDiacritics(ticket.name.toLowerCase()).includes(removeDiacritics(nextValue.toLowerCase())) ||
          ticket.ID.toLowerCase().includes(nextValue.toLowerCase()))
      );
    }
  };

  // Render the element
  return (
    <Input
      value={value}
      autoCapitalize='none'
      autoCorrect={false}
      placeholder='Search'
      style={styles.searchBar}
      clearButtonMode='while-editing'
      accessoryRight={renderIcon}
      onChangeText={onChangeText}
    />
  );
}

// Styles
const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  list: {
    width: '100%',
    padding: 15,
    // paddingBottom: 60
  },
  blackBG: {
    backgroundColor: 'black',
  },
  whiteBG: {
    backgroundColor: 'white',
  },
  listItem: {
    margin: 5,
    borderRadius: 15,
  },
  listItemWhiteBorder: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listItemTitle: {
    fontSize: 20
  },
  editButton: {
    borderRadius: 12,
    width: 15,
    marginLeft: 5
  },
  emptyListText: {
    fontSize: 40,
    marginTop: '20%',
    alignSelf: 'center'
  },
  searchBar: {
    padding: 10,
    color: '#000',
    borderColor: '#aaa',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

// Helper function for removing the diacritics from search user-text-content
function removeDiacritics(str: any) {
  var defaultDiacriticsRemovalMap = [
    { 'base': 'a', 'letters': /[áä]/g },
    { 'base': 'c', 'letters': /[č]/g },
    { 'base': 'd', 'letters': /[ď]/g },
    { 'base': 'e', 'letters': /[ěé]/g },
    { 'base': 'i', 'letters': /[í]/g },
    { 'base': 'l', 'letters': /[ĺľ]/g },
    { 'base': 'n', 'letters': /[ň]/g },
    { 'base': 'o', 'letters': /[óô]/g },
    { 'base': 'r', 'letters': /[řŕ]/g },
    { 'base': 's', 'letters': /[š]/g },
    { 'base': 't', 'letters': /[ť]/g },
    { 'base': 'u', 'letters': /[ůú]/g },
    { 'base': 'y', 'letters': /[ý]/g },
    { 'base': 'z', 'letters': /[ž]/g },
  ];
  for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
    str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
  }
  return str;
}
