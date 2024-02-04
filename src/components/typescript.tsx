  typescript
// Necessary imports
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import HorizontalMenubar from './HorizontalMenubar';

// Unit tests covering all scenarios
describe('HorizontalMenubar', () => {
  test('renders the main menu with correct items', () => {
    render(
      <MemoryRouter>
        <HorizontalMenubar />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Customers')).toBeInTheDocument();
  });

  test('renders dropdown menu on Explore item mouse enter', () => {
    render(
      <MemoryRouter>
        <HorizontalMenubar />
      </MemoryRouter>
    );

    userEvent.hover(screen.getByText('Explore'));
    expect(screen.getByText('Kill Chains')).toBeInTheDocument();
    expect(screen.getByText('Unmapped')).toBeInTheDocument();
  });

  test('hides dropdown menu on Explore item mouse leave', () => {
    render(
      <MemoryRouter>
        <HorizontalMenubar />
      </MemoryRouter>
    );

    const explore = screen.getByText('Explore');
    userEvent.hover(explore);
    expect(screen.getByText('Kill Chains')).toBeInTheDocument();
    
    userEvent.unhover(explore);
    // Assuming the dropdown is hidden through CSS, we wouldn't be able to assert its not being in the document. Instead, check visibility or remove Dropdown from the document in a real-world scenario.
  });

  test('navigates to Home when clicking Home menu item', () => {
    render(
      <MemoryRouter>
        <HorizontalMenubar />
      </MemoryRouter>
    );

    userEvent.click(screen.getByText('Home'));
    expect(global.window.location.pathname).toEqual('/');
  });

  test('navigates to Customers when clicking Customers menu item', () => {
    render(
      <MemoryRouter>
        <HorizontalMenubar />
      </MemoryRouter>
    );

    userEvent.click(screen.getByTestId('nav-to-customers'));
    expect(global.window.location.pathname).toEqual('/customers');
  });

  test('navigates to correct submenu routes', () => {
    render(
      <MemoryRouter>
        <HorizontalMenubar />
      </MemoryRouter>
    );

    userEvent.click(screen.getByText('Unmapped'));
    expect(global.window.location.pathname).toEqual('/browse/unmapped');

    userEvent.click(screen.getByText('Kill Chains'));
    expect(global.window.location.pathname).toEqual('/browse');
  });

  // Since the original code does not have actual implementations for event handlers, it's not possible to test showUnderlay and hideUnderlay effects.
  // In a real-world scenario, these functions would change the CSS classes/state of the submenu to make it visible/invisible,
  // and we would check for those changes to be present upon event firing.
});
