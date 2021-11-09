import React from 'react';
import { Button, Divider, Input, Icon, List, ListItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

const data = new Array(20).fill({
  title: 'Person',
  description: 'TICKET ID 0000',
});

const BackIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward-outline'/>
);

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

export default function TicketsScreen() {

  const renderItemIcon = (props) => (
    <Icon {...props} name='person'/>
  );

  const renderEditIcon = (props) => (
    <Icon {...props} name='edit'/>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderEditIcon}
      style={styles.listItem}
    />
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );

  return (
    <React.Fragment>
      <TopNavigation
        title='List of tickets'
        accessoryRight={renderBackAction}
      />
      <Divider/>
      <List
        style={styles.list}
        data={data}
        renderItem={renderItem}
      />
      <Divider/>
      <SearchBar/>
    </React.Fragment>
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
