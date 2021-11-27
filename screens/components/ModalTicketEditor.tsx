import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Modal, Card } from '@ui-kitten/components';

export default function ModalTicketEditor({selectedTicket, onClose, visible}: any) {
  const Header = (props: any) => (
    <View {...props}>
      <Text category='h3'>{selectedTicket.name}</Text>
      <Text category='s1'>{selectedTicket.ID}</Text>
    </View>
  );

  const Footer = (props: any) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size='small'
        status='basic'
        onPress={onClose}>
        CANCEL
      </Button>
      <Button
        style={styles.footerControl}
        size='small'
        status='info'
        onPress={onClose}>
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
      visible={visible}
      backdropStyle={styles.backdrop}>
      <CardAccessoriesShowcase />
    </Modal>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});
