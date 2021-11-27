import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, Card, Layout, Modal, Button, useTheme } from '@ui-kitten/components';
import { getTicketTypes } from '../../components/Database';

export default function QrReader({
  itemToValidate,
  markAsUsed,
  hasPermission,
  setScanned,
  modalVisiblity,
  setModalVisiblity,
  responseToModal,
  dataToModal,
  scanned,
  handleBarCodeScanned
}: any) {

  return (
    <View style={styles.container}>
      <ScannedModal modalVisiblity={modalVisiblity} setModalVisiblity={setModalVisiblity}
        setScanned={setScanned} responseToModal={responseToModal} itemToValidate={itemToValidate} markAsUsed={markAsUsed}
        dataToModal={dataToModal} />
      {/* <ScannedModal /> */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.camera]}>
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
    </View>
  );
}

function ScannedModal({ modalVisiblity, setModalVisiblity, setScanned, responseToModal, itemToValidate, markAsUsed, dataToModal }: any) {
  const theme = useTheme();
  const ticket_pieces = getTicketTypes();
  // function ScannedModal() {
  // const [modalVisiblity, setModalVisiblity] = useState(false);
  return (
    <Layout style={styles.container} level='1'>
      <Modal visible={modalVisiblity} style={styles.modalContainer}>
        <View style={[styles.modalWindow, { backgroundColor: theme[`color-${dataToModal[0]}-200`], borderColor: theme[`color-${dataToModal[0]}-default`] }]}>
          {dataToModal ?
            <React.Fragment>
              <Text
                category='h2'
                style={[styles.title, { backgroundColor: theme[`color-${dataToModal[0]}-default`] }]}
              >{dataToModal[1]}</Text>
              <View style={{ paddingStart: 5 }}>
                <Text category='h3' >{dataToModal[2]}</Text>
                {ticket_pieces && <Text category='h5'>{ticket_pieces.find(item => item.key === itemToValidate)?.title} - {dataToModal[3]}</Text>}
              </View>
            </React.Fragment>
            :
            <Text>Loading</Text>
          }
          <View style={[styles.spacer, { backgroundColor: theme[`color-${dataToModal[0]}-default`] }]}></View>
          <View style={{ alignItems: 'center' }}>
            <Button
              style={{ marginBottom: 5, width: '60%' }}
              status='primary'
              onPress={() => {
                setModalVisiblity(false);
                setScanned(false);
              }}>
              Close
            </Button>
          </View>
        </View>
      </Modal>

    </Layout>
  );
}

// {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
const opacity = 'rgba(0, 0, 0, .4)';
const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  camera: {
    flex: 1,
    width: '100%',
    flexDirection: 'column'
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 3,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
  modalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%', height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalWindow: {
    borderWidth: 2,
    borderRadius: 5,
    width: '90%'
  },
  spacer: {
    height: 2,
    width: '95%',
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 5
  },
  title: {
    color: 'white',
    padding: 3,
    paddingStart: 10
  }
});
