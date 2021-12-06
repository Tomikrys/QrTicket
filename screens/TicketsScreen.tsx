import React from 'react';
import { getListOfTickets, isAdmin } from '../components/Database';
import { Button, Text, Divider, Input, Icon, List, ListItem, TopNavigation } from '@ui-kitten/components';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

import ModalTicketEditor from './components/ModalTicketEditor';
import ModalQrCodeGenerator from './components/ModalQrCodeGenerator';

export default function TicketsScreen({ manualValidation }: any) {

  const [editorVisible, setEditorVisible] = React.useState(false);
  const [selectedTicket, selectTicket] = React.useState(null);
  const allTickets = getListOfTickets();
  const [searchedTickets, setSearchedTickets] = React.useState(allTickets);
  const [qrGeneratorModalVisiblity, setQrGeneratorModalVisiblity] = React.useState(false);
  const [person, setPerson] = React.useState(null);

  const renderItemIcon = (props: any) => (
    <Icon {...props} name='person' />
  );
  const EditIcon = (props: any) => (
    <Icon {...props} name='edit-outline' />
  );

  const ValidateIcon = (props: any) => (
    <Icon {...props} name='person-done-outline' />
  );


  const renderItemEditAndValidate = (props: any, item: any) => (
    <>
      <Button size='small' status='info' accessoryLeft={EditIcon} style={styles.editButton} onPress={() => { selectTicket(item); setEditorVisible(true); }}></Button>
      <Button size='small' status='success' accessoryLeft={ValidateIcon} style={styles.editButton} onPress={() => { manualValidation(item.ID); }}></Button>
    </>
  );
  const renderItemValidate = (props: any, item: any) => (
    <Button size='small' status='success' accessoryLeft={ValidateIcon} style={styles.editButton} onPress={() => { manualValidation(item.ID); }}></Button>
  );

  function onSelectTicketShowQr(item: any) {
    setPerson(item);
    setQrGeneratorModalVisiblity(true);

  }

  const renderItem = ({ item, index }: any) => (
    <ListItem
      key={index}
      title={() => <Text style={styles.listItemTitle}>{item.name}</Text>}
      description={item.ID}
      accessoryLeft={renderItemIcon}
      accessoryRight={(props) => isAdmin() ? renderItemEditAndValidate(props, item) : renderItemValidate(props, item)}
      onPress={() => { selectTicket(item); onSelectTicketShowQr(item); }}
      style={styles.listItem}
    />
  );

  return (
    <>
      <View style={{
        flex: 1,
        backgroundColor: 'black'
      }}>
        <TopNavigation
          style={{ elevation: 5 }}
          title={() => <Text style={{ flex: 1, textAlign: 'center', fontSize: 25 }}>List of tickets</Text>}
        />
        <Divider />
        <List
          style={styles.list}
          data={searchedTickets}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyListText}>No tickets found!</Text>}
        />
        {(isAdmin() && selectedTicket != null) ? <ModalTicketEditor selectedTicket={selectedTicket} onClose={() => setEditorVisible(false)} visible={editorVisible} /> : <></>}
        <Divider />
        <View style={{ elevation: 5, backgroundColor: 'black' }}>
          <SearchBar setSearchedTickets={setSearchedTickets} allTickets={allTickets} />
        </View>
      </View>
      <ModalQrCodeGenerator modalVisiblity={qrGeneratorModalVisiblity} setModalVisiblity={setQrGeneratorModalVisiblity} dataToModal={person} />
    </>
  );
};

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

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: 'black',
    padding: 15,
    // paddingBottom: 60
  },
  listItem: {
    margin: 5,
    borderRadius: 15,
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
    backgroundColor: 'black',
    padding: 10,
    color: '#000',
    borderColor: '#aaa',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
});


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
