import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import App from './App';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
