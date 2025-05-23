import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const app = document.querySelector('#app');
const root = createRoot(app);
root.render(<App />);
