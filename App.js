import React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import axios from 'axios';
import {LogBox } from 'react-native';

import store from './src/Redux/Store';
import StackNavigation from './src/Component/Navigation/NavigationStack';
import DrawerNavigation from './src/Component/Navigation/DrawerNavigation';
// ff7a59
// 0e1e25
// yarn cache clean --force
// .\gradlew clean
// 31C6AE
// 33475b
// 0e1e25

LogBox.ignoreLogs(['Reanimated 2']);

function App() {
    const persistor = persistStore(store);
    axios.defaults.baseURL = 'https://finderht.herokuapp.com';
    
    return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <View style={{ flex: 1 }}>
              <StatusBar barStyle="dark-content" backgroundColor="#fff" />
              <DrawerNavigation />
            </View>
          </PersistGate>
        </Provider>
    );
}

export default App;