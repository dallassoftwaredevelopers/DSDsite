export interface AboutSection {
  id: string;
  title: string;
  description: string;
}

export const descriptions = {
  aboutDescription: `
    Explore what Dallas Software Developers as to offer and become an integral part of our dynamic community. Whether you're passionate about coding, eager to contribute to open-source projects, or simply looking to connect with like-minded individuals, there's a place for you here.

    Dive into our various programs, from collaborative projects on Discord to hands-on developer placement initiatives, and discover how you can make a meaningful impact while honing your skills and expanding your network.
    `,
  opensourceDescription: `
    Join the dynamic community of [organization] on Discord, where you'll find an array of collaborative projects aimed at enhancing teamwork, learning opportunities, and hands-on contributions to open-source code. Our Discord serves as the central hub for developers eager to engage in meaningful discussions, seek advice from peers, and actively participate in real-world coding projects.

    On our Discord there are a selection of collaborative projects, each offering a unique chance to learn and contribute. With project codebases hosted on GitHub, you'll have easy access to the tools and resources necessary to get started. Simply head over to [x] channel to explore current projects and find one that aligns with your interests and expertise. Whether you're passionate about web development, mobile apps, or AI, there's a project waiting for you to make your mark. Join us on Discord and be part of a vibrant community dedicated to fostering collaboration and growth in the world of coding.
    `,
};

export const aboutData: AboutSection[] = [
  {
    id: 'about',
    title: 'About Dallas Software Developers',
    description: descriptions.aboutDescription,
  },
  {
    id: 'opensource',
    title: 'Open Source Projects',
    description: descriptions.opensourceDescription,
  },
];
