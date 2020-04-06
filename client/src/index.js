import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/configureStore';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
    document.getElementById('app')
);

if(module.hot){
    module.hot.accept();
}