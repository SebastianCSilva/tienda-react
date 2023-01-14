import { Provider, provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={ store }>
    <div className="App">
      app
    </div>
    </Provider>
  );
}

export default App;
