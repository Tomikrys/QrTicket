import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon, Text, Divider, TopNavigation, Card, useTheme, Button } from '@ui-kitten/components';
import { ScrollView, StyleSheet, View } from 'react-native';
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

    const theme = useTheme();
    return (
        <View style={styles.container}>
            <TopNavigation
                title={() => <Text style={{flex: 1, textAlign: 'center', fontSize: 20 }}>Choose ticket type to scan</Text>}
            />
            <Divider />
            <ScrollView contentContainerStyle={styles.cardBoxContent}>
            {ticketTypes.map((obj, idx) =>
              <Card key={obj.key} style={[ styles.card, (ticketType.key === obj.key) && { backgroundColor: theme['color-primary-default'] } ]} onPress={() => { setTicketType(obj); }}>
                <Text style={[ styles.cardText, (ticketType.key === obj.key) && { color: 'white' } ]}>{obj.title}</Text>
              </Card>
            )}
            </ScrollView>
            <Divider />
            <BottomNavigation
              selectedIndex={markTicketAsUsed}
              onSelect={setTicketType}
              indicatorStyle={{ backgroundColor: theme['color-primary-200'], height: '130%' }}
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
  }
});
