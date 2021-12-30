/*
 *
 * Project: QrTicket mobile app
 * Date: December 2021
 * Authors: Tomas Rysavy, Filip Jerabek, Tomas Vostrejz, Petr Stehlik
 *
 */

import React, {useContext} from 'react';
import { BottomNavigation, BottomNavigationTab, Icon, Text, Divider, TopNavigation, Card, useTheme, Button } from '@ui-kitten/components';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../components/Themed';

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
  const themeContext = useContext(ThemeContext);

  // Function for getting right color scheme styles
  function lightThemeBG() {
    return themeContext.theme === 'light' ? styles.whiteBG : styles.blackBG;
  };

  // Render the screen content
  return (
        <View style={[styles.container, lightThemeBG()]}>
            <TopNavigation
                style={{ elevation: 5 }}
                title={() => <Text style={{flex: 1, textAlign: 'center', fontSize: 25 }}>Choose ticket type to scan</Text>}
            />
            <Divider />
            <ScrollView contentContainerStyle={[styles.cardBoxContent, lightThemeBG()]}>
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  blackBG: {
    backgroundColor: 'black',
  },
  whiteBG: {
    backgroundColor: 'white',
  },
  cardBoxContent: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
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
