import React from 'react';
import { render } from 'react-dom';

import { App } from './App/App.js';

// setup fake backend
import { configureFakeBackend } from './_helpers/fake-backend.js';
configureFakeBackend();

render(
    <App />,
    document.getElementById('app')
);