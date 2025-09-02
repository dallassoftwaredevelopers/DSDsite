import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createEvent, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock data for testing
export const mockCohortsData = [
  {
    id: '1',
    title: 'React Development Cohort',
    description: 'Learn React from the ground up',
    videoUrl: 'https://example.com/video1',
    groupName: 'Group 1',
    participants: 10,
    duration: '6 weeks',
    difficulty: 'Beginner'
  },
  {
    id: '2',
    title: 'Node.js Backend Cohort',
    description: 'Build scalable backend applications',
    videoUrl: 'https://example.com/video2',
    groupName: 'Group 2',
    participants: 8,
    duration: '8 weeks',
    difficulty: 'Intermediate'
  }
];

export const mockSocialData = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/dallassoftwaredevelopers',
    icon: 'FaGithub'
  },
  {
    id: 'discord',
    name: 'Discord', 
    url: 'https://discord.gg/pWGt6JMV9t',
    icon: 'FaDiscord'
  },
  {
    id: 'meetup',
    name: 'Meetup',
    url: 'https://www.meetup.com/dallas-software-developers-meetup/',
    icon: 'FaMeetup'
  }
];

export const mockLabels = {
  lblHero: 'Welcome to Dallas Software Developers',
  lblHeroSubheading: 'Join Dallas premier community of passionate developers',
  lblWorkshopsTitle: 'Technical Workshops',
  lblWorkshopsContent: 'Hands-on workshops on cutting-edge technologies',
  lblSupportTitle: 'Community Support',
  lblSupportContent: 'Get help from experienced developers',
  btnTextMeetup: 'Join Our Meetup',
  btnTextCommunity: 'Join Community'
};

export const mockTeamMembers = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Lead Developer',
    bio: 'Full-stack developer with 10 years experience',
    image: 'https://example.com/john.jpg',
    social: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'UI/UX Designer',
    bio: 'Creative designer passionate about user experience',
    image: 'https://example.com/jane.jpg',
    social: {
      github: 'https://github.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith'
    }
  }
];

// Custom render function with common providers
function render(ui, options = {}) {
  const { 
    initialProps = {},
    ...renderOptions 
  } = options;

  // Create a new QueryClient for each test to ensure isolation
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

  function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        <div data-testid="test-wrapper">
          {children}
        </div>
      </QueryClientProvider>
    );
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
  };
}

// Helper functions for common test patterns
export const waitForElementToBeRemoved = async (element) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
};

export const createMockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
};

export const createMockResizeObserver = () => {
  const mockResizeObserver = jest.fn();
  mockResizeObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  window.ResizeObserver = mockResizeObserver;
  return mockResizeObserver;
};

// Assertions helpers
export const expectElementToHaveRole = (element, role) => {
  expect(element).toHaveAttribute('role', role);
};

export const expectElementToBeAccessible = (element) => {
  expect(element).toBeInTheDocument();
  expect(element).toBeVisible();
  expect(element).not.toHaveAttribute('aria-hidden', 'true');
};

// Mock component props generators
export const generateButtonProps = (overrides = {}) => ({
  buttonText: 'Test Button',
  variant: 'primary',
  onClick: jest.fn(),
  disabled: false,
  showIcon: false,
  ...overrides
});

export const generateCardProps = (overrides = {}) => ({
  title: 'Test Card Title',
  description: 'Test card description',
  imageUrl: 'https://example.com/image.jpg',
  imageAlt: 'Test image',
  buttonText: 'Learn More',
  buttonHref: '/test',
  ...overrides
});

export const generateModalProps = (overrides = {}) => ({
  isOpen: true,
  onClose: jest.fn(),
  title: 'Test Modal',
  children: <div>Modal content</div>,
  ...overrides
});

// Re-export everything
export * from '@testing-library/react';
export { render };
export { default as userEvent } from '@testing-library/user-event';
