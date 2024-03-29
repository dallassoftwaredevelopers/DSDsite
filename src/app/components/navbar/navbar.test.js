import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Navbar from './navbar';

describe('Navbar', () => {
  test('renders navbar component', () => {
    render(
      <Navbar
        label={{
          lblHome: 'Dallas Software Developers',
          lblCommunity: 'Community Impact',
          lblContact: 'Contact Us',
          lblMeetup: 'Meetups',
        }}
      />
    );
    const navbarElement = screen.getByTestId('navbar');
    expect(navbarElement).toBeInTheDocument();
  });

  test('renders navbar component with label', () => {
    render(
      <Navbar
        label={{
          lblHome: 'Dallas Software Developers',
          lblCommunity: 'Community Impact',
          lblContact: 'Contact Us',
          lblMeetup: 'Meetups',
        }}
      />
    );
    const navbarElement = screen.getByTestId('navbar');
    expect(navbarElement).toHaveTextContent('Dallas Software Developers');
    expect(navbarElement).toHaveTextContent('Community Impact');
    expect(navbarElement).toHaveTextContent('Contact Us');
    expect(navbarElement).toHaveTextContent('Meetups');
  });

  test('navbar toggles when expand/collapse button is pressed', () => {
    const component = render(
      <Navbar
        label={{
          lblHome: 'Dallas Software Developers',
          lblCommunity: 'Community Impact',
          lblContact: 'Contact Us',
          lblMeetup: 'Meetups',
        }}
      />
    );
    expect(component.getByTestId('navbar-expand')).toBeInTheDocument();
    fireEvent.click(component.getByTestId('navbar-expand'));
    expect(component.getByTestId('navbar-collapse')).toBeInTheDocument();
    fireEvent.click(component.getByTestId('navbar-collapse'));
  });
});
