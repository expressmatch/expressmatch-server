import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
    document.getElementById('app')
);

if(module.hot){
    module.hot.accept();
}