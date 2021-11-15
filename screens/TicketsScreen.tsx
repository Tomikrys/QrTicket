import React from 'react';
import { getListOfTickets, isAdmin } from '../components/Database';
import { Button, Text, Divider, Input, Icon, List, ListItem, TopNavigation } from '@ui-kitten/components';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

import ModalTicketEditor from './components/ModalTicketEditor';

export default function TicketsScreen({onSelectTicket}) {

  const [editorVisible, setEditorVisible] = React.useState(false);
  const [selectedTicket, selectTicket] = React.useState(null);
  const allTickets = getListOfTickets();
  const [searchedTickets, setSearchedTickets] = React.useState(allTickets);

  const renderItemIcon = (props) => (
    <Icon {...props} name='person'/>
  );

  const renderItemEdit = (props, item) => (
    <Button size='medium' status='info' style={styles.editButton} onPress={() => {selectTicket(item); setEditorVisible(true);}}>Open in editor</Button>
  );

  const renderItem = ({ item, index }) => (
      <ListItem
        key={index}
        title={() => <Text style={styles.listItemTitle}>{item.name}</Text>}
        description={item.ID}
        accessoryLeft={renderItemIcon}
        accessoryRight={(props) => isAdmin() ? renderItemEdit(props, item) : <></>}
        onPress={() => {selectTicket(item); onSelectTicket(item);}}
        style={styles.listItem}
      />
  );

  return (
    <View style={{flex:1}}>
      <TopNavigation 
        title={() => <Text style={{flex: 1, textAlign: 'center', fontSize: 20}}>List of tickets</Text>}
      />
      <Divider/>
      <List
              style={styles.list}
              data={searchedTickets}
              renderItem={renderItem}
              ListEmptyComponent={<Text style={styles.emptyListText}>No tickets found!</Text>}
      />
      {(isAdmin() && selectedTicket != null) ? <ModalTicketEditor selectedTicket={selectedTicket} onClose={() => setEditorVisible(false)} visible={editorVisible} /> : <></>}
      <Divider/>
      <SearchBar setSearchedTickets={setSearchedTickets} allTickets={allTickets} />
    </View>
  );
};

function SearchBar({setSearchedTickets, allTickets}) {
    const [value, setValue] = React.useState('');

    const clearSearchBar = () => {
      setValue('');
      setSearchedTickets(allTickets);
    };

    const renderIcon = (props) => (
      <TouchableWithoutFeedback onPress={clearSearchBar}>
        <Icon {...props} name={'close-outline'}/>
      </TouchableWithoutFeedback>
    );

    const onChangeText = (nextValue) => {
      setValue(nextValue);
      if(nextValue == '') {
        setSearchedTickets(allTickets);
      } else {
        setSearchedTickets(allTickets.filter(ticket => ticket.name.toLowerCase().includes(nextValue.toLowerCase()) || ticket.ID.toLowerCase().includes(nextValue.toLowerCase())));
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
    backgroundColor: '#f4f4f4',
    padding: 15,
  },
  listItem: {
    margin: 5,
    borderRadius: 15,
  },
  listItemTitle: {
    fontSize: 20
  },
  editButton: {
    borderRadius: 40,
  },
  emptyListText: {
    fontSize: 40,
    marginTop: '20%',
    alignSelf: 'center'
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    color: '#000',
    borderColor: '#aaa',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
