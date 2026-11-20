export const getRecaptchaSiteUrl = (token: string) =>
  `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`;

export const siteOrigin = 'https://www.dallassoftwaredevelopers.org';
export const contactEmail = 'dallassoftwaredevelopersdsd@gmail.com';
export const sponsorshipEmail = `mailto:${contactEmail}?subject=Meetup%20Sponsorship%20Inquiry`;

export const externalLinks = {
  projectRepo: 'https://github.com/dallassoftwaredevelopers/DSDsite',
  githubUrl: 'https://github.com/dallassoftwaredevelopers',
  discordUrl: 'https://discord.gg/pWGt6JMV9t',
  linkedinUrl: 'https://www.linkedin.com/company/dallas-software-developers',
  meetupUrl: 'https://www.meetup.com/dallas-software-developers-meetup/',
  cycSite: 'https://www.commityourcode.com',
};
