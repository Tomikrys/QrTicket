import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon, Text, Divider, TopNavigation, Card, useTheme, Button } from '@ui-kitten/components';
import { ScrollView, StyleSheet, View } from 'react-native';

export interface TicketType {
  key: string,
  title: string
}

export default function SettingsScreen({ticketType, markTicketAsUsed, setTicketType, setMarkTicketAsUsed, ticketTypes}: any) {

    const ValidateIcon = (props: any) => (
      <Icon {...props} name='eye-outline'/>
    );

    const CheckInIcon = (props: any) => (
      <Icon {...props} name='checkmark-circle-2-outline'/>
    );

    const theme = useTheme();
    return (
        <View style={styles.container}>
            <TopNavigation
                style={{ elevation: 5 }}
                title={() => <Text style={{flex: 1, textAlign: 'center', fontSize: 25 }}>Choose ticket type to scan</Text>}
            />
            <Divider />
            <ScrollView contentContainerStyle={styles.cardBoxContent}>
            {ticketTypes.map((obj: TicketType, idx: number) =>
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
              style={{ elevation: 5 }}
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
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  cardBoxContent: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: 'black'
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
