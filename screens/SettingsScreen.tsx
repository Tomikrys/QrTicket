import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon, Text, Divider, TopNavigation, Card } from '@ui-kitten/components';
import { ScrollView, View, StyleSheet } from 'react-native';
import { getTicketTypes } from '../components/Database';

export default function SettingsScreen({ticketType, markTicketAsUsed, setTicketType, setMarkTicketAsUsed}) {

    const ticketTypes = getTicketTypes();

    if (ticketType.key == null && ticketTypes.length) {
      setTicketType(ticketTypes[0]);
    }

    const ValidateIcon = (props) => (
      <Icon {...props} name='eye-outline'/>
    );

    const CheckInIcon = (props) => (
      <Icon {...props} name='checkmark-circle-2-outline'/>
    );

    return (
        <View style={styles.container}>
            <TopNavigation
                title={() => <Text style={{flex: 1, textAlign: 'center', fontSize: 20}}>Choose ticket type to scan</Text>}
            />
            <Divider />
            <ScrollView contentContainerStyle={styles.cardBoxContent}>
            {ticketTypes.map((obj, idx) =>
              <Card key={obj.key} style={[styles.card, ticketType.key == obj.key ? styles.cardSelected : null]} onPress={() => { setTicketType(obj); }}>
                <Text style={styles.cardText}>{obj.title}</Text>
              </Card>
            )}
            </ScrollView>
            <Divider />
            <BottomNavigation
              selectedIndex={markTicketAsUsed}
              onSelect={setTicketType}
              indicatorStyle={{backgroundColor: '#cdf', color: 'white', height: '130%'}}
            >
              <BottomNavigationTab title='Only validate' icon={ValidateIcon}/>
              <BottomNavigationTab title='Also mark as used' icon={CheckInIcon}/>
            </BottomNavigation>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
  cardBoxContent: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: '#eee'
  },
  cardText: {
    textAlign: 'center',
    fontSize: 25
  },
  card: {
    width: '90%',
    margin: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15
  },
  cardSelected: {
    backgroundColor: '#cdf'
  }
});
