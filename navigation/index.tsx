import React from 'react';
import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import QrScreen from '../screens/QrScreen';
import TicketsScreen from '../screens/TicketsScreen';
import { Layout, Text, ViewPager } from '@ui-kitten/components';

export default function ViewPagerNavigator() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ViewPager
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
      style={styles.viewpager}>
      <Layout
        style={styles.tab}
        level='1'>
        <TicketsScreen />
      </Layout>
      <Layout
        style={styles.tab}
        level='1'>
        <QrScreen />
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
