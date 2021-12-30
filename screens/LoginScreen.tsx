/*
 *
 * Project: QrTicket mobile app
 * Date: December 2021
 * Authors: Tomas Rysavy, Filip Jerabek, Tomas Vostrejz, Petr Stehlik
 *
 */

import React, {useState, useContext}  from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text, Input, Tooltip } from '@ui-kitten/components';
import { validateEntryCode } from '../components/Database';
import { whileStatement } from '@babel/types';
import { ThemeContext } from '../components/Themed';

export default function LoginScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [entryCode, setEntryCode] = useState('');
  const themeContext = useContext(ThemeContext);

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

  // Input for password entry
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
      style={[styles.input, lightThemeBG()]}
      textStyle={[styles.inputText, lightThemeColor()]}
      onFocus={clearEntryCode}
      onChangeText={nextValue => setEntryCode(nextValue)}
      onSubmitEditing={confirmLogIn} />
  );

  // Function for getting right color scheme styles
  function lightThemeBG() {
    return themeContext.theme === 'light' ? styles.whiteBG : styles.blackBG;
  };
  function lightThemeColor() {
    return themeContext.theme === 'light' ? styles.black : styles.white;
  };

  // Render the screen content
  return (
        <View style={[styles.container, lightThemeBG()]}>
          <View>
            <Image style={styles.logoImg} source={require('../assets/images/icon.png')}/>
            <Text style={[styles.title, lightThemeColor()]}>
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

// Styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 100,
    justifyContent: 'center',
    flex: 1,
  },
  blackBG: {
    backgroundColor: 'black',
  },
  whiteBG: {
    backgroundColor: 'white',
  },
  black: {
    color: 'black'
  },
  white: {
    color: 'white'
  },
  title: {
    fontSize: 42,
    textAlign: 'center', 
  },
  input: {
    borderRadius: 40,
    textAlign: 'center'
  },
  inputText: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 7,
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
