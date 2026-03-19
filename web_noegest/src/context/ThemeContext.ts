
import { createContext } from 'react';

import type { ThemeContextValue } from './types';

export const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', toggleTheme: () => {} });


export default ThemeContext;


