import React from 'react';
import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import QrScreen from '../screens/QrScreen';
import TicketsScreen from '../screens/TicketsScreen';
import ManualValidationScreen from '../screens/ManualValidationScreen'
import { IndexPath, Layout, Text, ViewPager } from '@ui-kitten/components';
import SettingsScreen from '../screens/SettingsScreen';

export default function ViewPagerNavigator() {
  // index for pageviewer
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // is set from settings screen --- TODO vyresit aby nebylo natvrdo registration ale prvni ze seznamu
  const [itemToValidate, setItemToValidate] = React.useState("registration");
  // bool if the ticked should be marked as used
  const [markAsUsed, setMarkAsUsed] = React.useState(true);

  return (
    <ViewPager
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
      style={styles.viewpager}>
      <Layout
        // style={styles.tab}
        level='1'>
        <SettingsScreen itemToValidate={itemToValidate} setItemToValidate={setItemToValidate} setMarkAsUsed={setMarkAsUsed}/>
      </Layout>
      <Layout
        style={styles.tab}
        level='1'>
        <QrScreen itemToValidate={itemToValidate} markAsUsed={markAsUsed}/>
      </Layout>
      <Layout
        style={styles.tab}
        level='1'>
        <TicketsScreen />
      </Layout>
      <Layout
        style={styles.tab}
        level='1'>
        <ManualValidationScreen />
      </Layout>
    </ViewPager>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewpager: {
    flex: 1,
  },
});
