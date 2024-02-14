import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DarkModeSwitch from '../DarkModeSwitch';
import MyThemeProvider from '../../theme/MyThemeProvider';

type MyThemeProviderProps = {
    children?: React.ReactNode;
};


const wrapper: React.FC<MyThemeProviderProps> = ({ children }) => (
    <MyThemeProvider>
        {children}
    </MyThemeProvider>
);

describe('DarkModeSwitch', () => {
    it('renders LightModeIcon initially in light mode', () => {

        render(<DarkModeSwitch />, { wrapper });

        expect(screen.getByTestId('LightModeIcon')).toBeInTheDocument();
        expect(screen.queryByTestId('dark-mode-icon')).not.toBeInTheDocument();
    });

    it('toggles to dark mode when clicked', async () => {
        render(<DarkModeSwitch />, { wrapper });
      
        await userEvent.click(screen.getByRole('button'));

       expect(screen.getByTestId('DarkModeIcon')).toBeInTheDocument();
    });

   
});
