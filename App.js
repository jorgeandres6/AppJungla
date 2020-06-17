import React from 'react';
import MyStack from './AppNavigator';
import {Provider} from 'react-redux';
import configureStore from './store/store'

export default function App() {

  return (
    <Provider store={configureStore()}>
      <MyStack/>
    </Provider>
  );
} 