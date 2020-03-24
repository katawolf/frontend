import React from 'react';
import TakeDecisionComponent from './components/decision/TakeDecisionComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/configureStore'

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <TakeDecisionComponent />
      </Provider>
    </div>
  );
}

export default App;
