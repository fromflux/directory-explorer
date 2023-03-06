/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { screen, render, waitFor } from '@testing-library/react';

import DirectoryExplorer from './directory-explorer';

test('renders the directory explorer', async () => {
  render(<DirectoryExplorer />);

  await waitFor(() => expect(screen.getByText('Directory Explorer')).toBeDefined());
});
