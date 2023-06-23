import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider,ThemeContext } from '../../../src/components/Theme/ThemeContext';

describe('ThemeProvider', () => {
  test('should toggle the theme from light to dark', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <div>
              <span data-testid="theme-display">{theme}</span>
              <button data-testid="theme-toggle" onClick={toggleTheme}>
                Toggle Theme
              </button>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-display').textContent).toBe('light');
    fireEvent.click(screen.getByTestId('theme-toggle'));
    expect(screen.getByTestId('theme-display').textContent).toBe('dark');
  });

  test('should toggle the theme from dark to light', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <div>
              <span data-testid="theme-display">{theme}</span>
              <button data-testid="theme-toggle" onClick={toggleTheme}>
                Toggle Theme
              </button>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );
    fireEvent.click(screen.getByTestId('theme-toggle'));
    expect(screen.getByTestId('theme-display').textContent).toBe('light');
    fireEvent.click(screen.getByTestId('theme-toggle'));
    expect(screen.getByTestId('theme-display').textContent).toBe('dark');
  });
});
