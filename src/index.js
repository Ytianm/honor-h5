import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 浏览器样式初始化
import 'normalize.css/normalize.css';
import 'lib-flexible'
import './css/base.less'
// import 'antd-mobile/lib/date-picker/style';  
import 'antd-mobile/dist/antd-mobile.css';

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

