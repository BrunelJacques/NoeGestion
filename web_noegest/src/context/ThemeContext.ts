
import { createContext } from 'react';

import type { ThemeContextValue } from './types';

export const ThemeContext = createContext(undefined as unknown as ThemeContextValue);