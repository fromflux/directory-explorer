import React from 'react';
import { createRoot } from 'react-dom/client';

import DirectoryExplorer from './components/directory-explorer/directory-explorer';

import './theme/reset.css';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl as HTMLElement);

root.render(<DirectoryExplorer />);
