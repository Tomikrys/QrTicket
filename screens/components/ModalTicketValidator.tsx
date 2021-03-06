/*
 *
 * Project: QrTicket mobile app
 * Date: December 2021
 * Authors: Tomas Rysavy, Filip Jerabek, Tomas Vostrejz, Petr Stehlik
 *
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Modal, Card } from '@ui-kitten/components';

export default function ModalTicketValidator(properties: any) {
  const Header = (props: any) => (
    <View {...props} style={styles.text}>
      <Text category='h3'>{properties.user}</Text>
      <Text category='s1'>{properties.desc}</Text>
    </View>
  );

  const Footer = (props: any) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size='small'
        status='basic'
        onPress={() => properties.setVisible(false)}>
        CANCEL
      </Button>
      <Button
        style={styles.footerControl}
        size='small'
        onPress={() => properties.setVisible(false)}>
        UPDATE
      </Button>
    </View>
  );

  function CardAccessoriesShowcase() {
    return (
      <Card style={styles.card} header={Header} footer={Footer}>
        <Text>
          The Text
        </Text>
      </Card>
    );
  }

  return (
    <Modal
      visible={properties.visible}
      backdropStyle={styles.backdrop}>
      <CardAccessoriesShowcase />
    </Modal>
  );
}

// Styles
const styles = StyleSheet.create({
  text: {
    color: 'black'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});
