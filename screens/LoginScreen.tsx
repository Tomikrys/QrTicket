import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text, Input, Tooltip } from '@ui-kitten/components';
import { validateEntryCode } from '../components/Database';
import { whileStatement } from '@babel/types';

export default function LoginScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const [entryCode, setEntryCode] = React.useState('');

  function clearEntryCode() {
    setEntryCode('');
  };

  function confirmLogIn() {
    if(validateEntryCode(entryCode)) {
      clearEntryCode();
      setVisible(false);
      navigation.navigate('QrScreen');
    } else
      setVisible(true);
  }

  const renderEntryInput = () => (
    <Input
      placeholder='Entry code'
      value={entryCode}
      autoCapitalize='characters'
      autoFocus={true}
      autoCorrect={false}
      status='info'
      maxLength={10}
      size='large'
      style={styles.input}
      textStyle={styles.inputText}
      onFocus={clearEntryCode}
      onChangeText={nextValue => setEntryCode(nextValue)}
      onSubmitEditing={confirmLogIn} />
  );

  return (
        <View style={styles.container}>
          <View>
            <Image style={styles.logoImg} source={require('../assets/images/icon.png')}/>
            <Text style={styles.title}>
              QR Ticket
            </Text>
          </View>
          <View>
            <Tooltip
              anchor={renderEntryInput}
              visible={visible}
              placement='top'
              onBackdropPress={() => setVisible(false)}>
              Bad entry code!
            </Tooltip>
          </View>
          <View>
            <Button style={styles.button} size='large' status='info' onPress={() => confirmLogIn()}>LOG IN</Button>
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 100,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'black'
  },
  title: {
    fontSize: 42,
    textAlign: 'center', 
    color: 'white'
  },
  input: {
    borderRadius: 40,
    backgroundColor: 'black',
    textAlign: 'center'
  },
  inputText: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 7,
    color: 'white'
  },
  logoImg: {
    alignSelf: 'center',
    width: '70%',
    height: '45%',
    borderRadius: 100,
    resizeMode: 'contain'
  },
  button: {
    marginTop: 20,
    marginBottom: '50%',
    paddingVertical: 17,
    borderRadius: 40
  }
});
