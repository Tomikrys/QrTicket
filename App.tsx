/*
 *
 * Project: QrTicket mobile app
 * Date: December 2021
 * Authors: Tomas Rysavy, Filip Jerabek, Tomas Vostrejz, Petr Stehlik
 *
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'react-native';
import { ThemeContext } from './components/Themed';

import Navigator from './navigation/';

export default function App() {
  const isLoadingComplete = useCachedResources();

  const [theme, setTheme] = React.useState('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <StatusBar hidden={false} backgroundColor='gray'/>
          <IconRegistry icons={EvaIconsPack} />
          <SafeAreaProvider>
            <Navigator />
          </SafeAreaProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
    );
  }
}
