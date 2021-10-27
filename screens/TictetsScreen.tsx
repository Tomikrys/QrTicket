import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import QrCamera from './components/QrCamera';
import { Layout, Text, ViewPager } from '@ui-kitten/components';
import SettingsScreen from './SettingsScreen';
import QrScreen from './QrScreen';


export default function TictetsScreen() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Database update</Text>
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Layout
          style={ViewPagerstyles.tab}
          level='2'>
          <SettingsScreen ></SettingsScreen>
        </Layout>
        <Layout
          style={ViewPagerstyles.tab}
          level='2'>
          <QrScreen></QrScreen>
        </Layout>
      </ViewPager>
    </View>
  );
}

const ViewPagerstyles = StyleSheet.create({
  tab: {
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
