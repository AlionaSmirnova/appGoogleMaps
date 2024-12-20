import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTabs from '../../../navigation';
import {Provider} from 'react-redux';
import {store} from '../../redux/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <BottomTabs />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
