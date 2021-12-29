import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, Button, useTheme, Spinner } from '@ui-kitten/components';
import { getTicketTypes } from '../../components/Database';

type Hidden = { type: 'HIDDEN', isVisible: false };
type Loading = { type: 'LOADING', isVisible: true };
type Data = { type: 'DATA', isVisible: true, data: any[] };

export type ModalState = Hidden | Loading | Data;

export default function QrReader({
  itemToValidate,
  markAsUsed,
  setScanned,
  modalState,
  setModalState,
  scanned,
  handleBarCodeScanned
}: any) {

  return (
    <View style={styles.container}>
      {modalState.isVisible && <ScannedModal setModalState={setModalState}
        setScanned={setScanned} itemToValidate={itemToValidate} markAsUsed={markAsUsed}
        dataToModal={modalState}
      />}
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

function ScannedModal({ setModalState, setScanned, itemToValidate, markAsUsed, dataToModal }: any) {
  const theme = useTheme();
  const ticket_pieces = getTicketTypes();
  // function ScannedModal() {
  // const [modalVisiblity, setModalVisiblity] = useState(false);
  return (
    <View style={styles.modalContainer}>
      {dataToModal.type === 'DATA' &&
        <View style={[styles.modalWindow, { backgroundColor: theme[`color-${dataToModal.data[0]}-200`], borderColor: theme[`color-${dataToModal.data[0]}-default`] }]}>
            <React.Fragment>
              <Text
                category='h2'
                style={[styles.title, { backgroundColor: theme[`color-${dataToModal.data[0]}-default`] }]}
              >{dataToModal.data[1]}</Text>
              <View style={{ paddingStart: 5 }}>
                <Text category='h3' >{dataToModal.data[2]}</Text>
                {ticket_pieces && <Text category='h5'>{ticket_pieces.find(item => item.key === itemToValidate)?.title} - {dataToModal.data[3]}</Text>}
              </View>
              <View style={[styles.spacer, { backgroundColor: theme[`color-${dataToModal.data[0]}-default`] }]}></View>
            </React.Fragment>
            <View style={{ alignItems: 'center' }}>
            <Button
              style={{ marginBottom: 5, width: '60%' }}
              status='primary'
              onPress={() => {
                setModalState({ type: 'HIDDEN', isVisible: false });
                setScanned(false);
              }}>
              Close
            </Button>
          </View>
        </View>
      }
      { dataToModal.type === 'LOADING' && 
        <View style={[styles.modalWindow, { backgroundColor: theme['background-basic-color-1'] }]}>
          <Text category='h2' style={[styles.title, { color: theme['text-basic-color'], textAlign: 'center' }]}>Loading</Text>
          <View style={{ alignItems: 'center', paddingBottom: 10 }}>
            <Spinner size='giant' />
          </View>
        </View>
      }
    </View>
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
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 99,
    top: 0,
    left: 0
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
