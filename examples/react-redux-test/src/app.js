import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);