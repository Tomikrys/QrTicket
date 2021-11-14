import React from 'react';
import { Button, Divider, Input, Icon, List, ListItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

const Tickets_data = [
    {
        title: 'Karel Novak',
        description: 'TICKET ID 0001'
    },
    {
        title: 'Pavel Mrazek',
        description: 'TICKET ID 0002'
    },
    {
        title: 'Filip Kladňák',
        description: 'TICKET ID 0003'
    }
]

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
          key={index}
        title={item.title}
        description={item.description}
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
              data={Tickets_data}
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
