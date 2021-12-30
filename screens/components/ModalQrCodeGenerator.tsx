/*
 *
 * Project: QrTicket mobile app
 * Date: December 2021
 * Authors: Tomas Rysavy, Filip Jerabek, Tomas Vostrejz, Petr Stehlik
 *
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Modal, Card, Layout } from '@ui-kitten/components';
import QRCode from 'react-native-qrcode-svg';

export default function ModalQrCodeGenerator({ modalVisiblity, setModalVisiblity, dataToModal }: any) {
  // function ScannedModal() {
  // const [modalVisiblity, setModalVisiblity] = useState(false);
  // Render the content of modal
  return (
    <Layout style={styles.container} level='1'>
      <Modal visible={modalVisiblity} style={styles.modalContainer}>
        <View style={[styles.modalWindow]}>
          <Text style={styles.title}>
            {dataToModal ? dataToModal.name : "loading"}
          </Text>
          <QRCode
            value={dataToModal ? dataToModal.ID : "loading"}
            size={200}
          />
          <Text style={styles.subtitle}>
            {dataToModal ? dataToModal.ID : "loading"}
          </Text>
          <Button
            style={{ marginTop: 5, width: '60%' }}
            status='primary'
            onPress={() => {
              setModalVisiblity(false);
            }}>
            Close
          </Button>
        </View>
      </Modal>
    </Layout >
  );
}

// Styles
const styles = StyleSheet.create({
  modalWindow: {
    paddingBottom: 10, 
    paddingTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 1)', 
    width: '90%'
  },
  title: {
    fontSize: 42,
    textAlign: 'center',
    paddingBottom: 5, 
    color: 'black'
  },
  subtitle: {
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 5,
    color: 'black'
  },
  modalContainer: { 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    width: '100%', height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
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
  },
  container: {
    flex: 0,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'black'
  }
});
