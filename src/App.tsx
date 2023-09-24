import '@mantine/core/styles.css';
import { memo } from 'react';
import { MantineProvider } from '@mantine/core';
import { Router } from './router';
import { theme } from './theme';

const App = memo(() => (
  <MantineProvider theme={theme}>
    <Router />
  </MantineProvider>
));

export default App;
