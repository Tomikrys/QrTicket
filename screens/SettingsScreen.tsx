import { Select, SelectItem, Toggle } from '@ui-kitten/components';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import QrTicket from './components/QrReader';

export default function SettingsScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>What to check</Text>
      <Select>
        <SelectItem title='Dinner Fri'/>
        <SelectItem title='Lunch Sat'/>
        <SelectItem title='Dinner Sat'/>
      </Select>
      <Text>Validate</Text>
      <Toggle></Toggle>
      <Text>Autohide</Text>
      <Toggle></Toggle>
      <Text>Show data</Text>
      <Toggle></Toggle>
      <Text>Toggle camera</Text>
      <Toggle></Toggle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
