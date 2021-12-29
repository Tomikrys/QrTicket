import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'react-native';

import Navigator from './navigation/';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    <>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <StatusBar hidden={false} backgroundColor='gray'/>
        <IconRegistry icons={EvaIconsPack} />
        <SafeAreaProvider>
          <Navigator />
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
    );
  }
}
