import React from 'react';
import { getListOfTickets } from '../components/Database';
import { Button, Divider, Input, Icon, List, ListItem, TopNavigation } from '@ui-kitten/components';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

import ModalTicketEditor from './components/ModalTicketEditor';

export default function TicketsScreen() {

  const [visible, setVisible] = React.useState(false);

  const renderItemIcon = (props) => (
    <Icon {...props} name='person'/>
  );

  const renderItemEdit = (props) => (
    <Button size='tiny' onPress={() => setVisible(true)}>EDIT</Button>
  );

  const renderItem = ({ item, index }) => (
      <ListItem
          key={index}
        title={item.title}
        description={item.description}
        accessoryLeft={renderItemIcon}
        accessoryRight={renderItemEdit}
        style={styles.listItem}
    />
  );

  const tickets = getListOfTickets();

  function SearchBar() {
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
      <Input
        value={value}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder='Search'
        style={styles.searchBar}
        clearButtonMode='while-editing'
        accessoryRight={renderIcon}
        onChangeText={nextValue => setValue(nextValue)}
      />
    );
  }

  return (
    <View style={{flex:1}}>
      <TopNavigation title='List of tickets' />
      <Divider/>
      <List
              style={styles.list}
              data={tickets}
              renderItem={renderItem}
      />
      <ModalTicketEditor user={tickets[0].title} desc={tickets[0].description} setVisible={setVisible} visible={visible} />
      <Divider/>
      <SearchBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#f4f4f4',
  },
  listItem: {
    backgroundColor: '#f4f4f4',
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    color: '#000',
    borderColor: '#aaa',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
