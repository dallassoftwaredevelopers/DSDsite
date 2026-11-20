export const LABELS = {
  app: {
    orgName: 'Dallas Software Developers',
  },
  hero: {
    subheading:
      'Free tech talks, project demos, and conversations with Dallas–Fort Worth software developers at every experience level.',
  },
  community: {
    topics: [
      'JavaScript',
      'Java',
      'Cloud',
      'AI',
      'C#',
      'Mobile Development',
      'CSS',
      'UI/UX',
      'Software Architecture',
      'Cyber Security',
      'Career Growth',
    ],
  },
  pages: {
    meetups: {
      hero: {
        subtitle:
          'Join DFW developers twice a month for free tech talks, pizza, and Q&A. Find the next event, see the evening’s schedule, and check how to attend.',
      },
      eventTypes: {
        fullLength: {
          title: 'Full-Length Talks',
        },
      },
      schedule: {
        items: [
          { time: '6:00 PM', activity: 'Doors open, networking & pizza' },
          { time: '6:30 PM', activity: 'Welcome & announcements' },
          { time: '6:45 PM', activity: 'Main presentation(s)' },
          { time: '7:45 PM', activity: 'Q&A and wrap-up' },
          { time: '8:00 PM', activity: 'More networking & goodbyes' },
        ],
      },
    },
  },
  speak: {
    guidelines: {
      equipment: {
        description:
          'We provide projector, HDMI connection, speaker system, and a clicker. Bring your laptop with your presentation ready to go.',
      },
      topics: {
        description:
          'Web, mobile, DevOps, AI, careers, and working on a team are all fair game. Tell us what you tried and what another developer could take away.',
      },
    },
  },
  speakerForm: {
    labels: {
      full_name: 'Full Name',
      email: 'Email',
      linked_in_url: 'LinkedIn URL',
      topic: 'Topic',
      brief_description: 'Brief Description',
      submit: 'Submit',
      cancel: 'Cancel',
      in_person_notice_line1:
        'DSD speakers present in person in Dallas–Fort Worth. You can send more than one proposal. The organizers review each one and will follow up about available speaking slots.',
      in_person_notice_line2:
        'In your description, tell us what you’ll show and what people will be able to try after your talk.',
    },
    errors: {
      linked_in_invalid: 'LinkedIn URL is invalid',
      recaptcha_required: 'Please complete the reCAPTCHA!',
      submit_success: 'Your submission was successful!',
      submit_error:
        'There was an error submitting your form. Please try again.',
    },
  },
  cohorts: {
    status: {
      open: 'Now Accepting Applications',
      inProgress: 'Cohort In Progress',
      closed: 'Applications Closed',
    },
    photos: {
      stats: {
        developersTrained: { number: '100+', label: 'Cohort participants' },
        projectsCompleted: { number: '15+', label: 'Projects Completed' },
        jobPlacement: { number: '85%', label: 'Job Placement Rate' },
      },
    },
    testimonials: {
      careerOutcomes: {
        stats: {
          jobSuccess: {
            percentage: '70%',
            label:
              'of participants reported that the cohort experience helped them land a job or promotion',
          },
          interviewConfidence: {
            percentage: '85%',
            label:
              'said the cohort gave them confidence in technical interviews',
          },
          recommendation: {
            percentage: '90%',
            label: 'would recommend the program to other developers',
          },
        },
      },
    },
    faq: {
      items: [
        {
          question: 'What should I be able to do before applying?',
          answer:
            'You should be comfortable writing code in a web or mobile stack and ready to contribute to a shared project. Early-career developers and career changers are welcome.',
        },
        {
          question: 'How much time do I need to commit each week?',
          answer:
            'Plan for approximately 15-20 hours per week. This includes team meetings, coding sessions, and independent work. Most activities happen in evenings and weekends, and your team will establish a schedule that works for everyone.',
        },
        {
          question: 'Is the program really free?',
          answer:
            'Yes. The six-week program is free and run by community volunteers.',
        },
        {
          question: 'Do I need to be located in Dallas?',
          answer:
            'While priority is given to Dallas-Fort Worth area participants, the program is fully remote and open to anyone. You will need to be available during US Central Time zone hours for team meetings.',
        },
        {
          question: 'What kind of projects will I work on?',
          answer:
            'Past teams have built a tenant portal, practice management software for a dentist, and a booking system for local contractors. Watch a project demo to see what a team can deliver in six weeks.',
        },
        {
          question: 'What happens after the cohort ends?',
          answer:
            'You can stay in touch through the alumni network and share the project you built. Some alumni return to lead a future cohort.',
        },
      ],
    },
    apply: {
      defaultStatusMessage:
        'Cohorts are currently closed and registration will be announced in Discord when the next one opens.',
      applicationProcess: {
        steps: {
          submit: {
            number: '1',
            title: 'Submit Application',
            description:
              'Fill out a brief form telling us about your background and why you want to join',
          },
          assessment: {
            number: '2',
            title: 'Technical Assessment',
            description:
              'Complete a small coding challenge to demonstrate your current skill level',
          },
          interview: {
            number: '3',
            title: 'Brief Interview',
            description:
              'Chat with a cohort lead about your goals and expectations',
          },
          placement: {
            number: '4',
            title: 'Team Placement',
            description:
              "If selected, you'll be matched with a team based on your skills and interests",
          },
        },
      },
    },
    weeklyStructureArray: [
      {
        week: 'Week 1',
        title: 'Onboarding & Project Kickoff',
        activities: [
          'Meet your cohort lead and teammates on Zoom',
          'Select a project theme aligned to real industry needs',
          'Set up your development environment and project repositories',
        ],
      },
      {
        week: 'Week 2-5',
        title: 'Sprint Cycles',
        activities: [
          'Define user stories and wireframes using Figma and Miro',
          'Develop features in iterative sprints with daily check-ins',
          'Discuss open questions and implementation decisions during team office hours',
          'Participate in code reviews and pair programming sessions',
        ],
      },
      {
        week: 'Week 6',
        title: 'Final Demo & Next Steps',
        activities: [
          'Present your project and answer questions at a DSD meetup',
          'Discuss code and design decisions with developers at the demo',
          'Stay in touch with other cohort alumni and share where the project goes next',
          'Add your project to your portfolio with professional documentation',
        ],
      },
    ],
    testimonialsArray: [
      {
        id: 1,
        name: 'Aaryan Das',
        role: 'Software Engineer',
        company: 'Bank Of America',
        quote:
          "The biggest benefit of the cohort was providing an environment to practice development in a collaborative team setting, which was something I couldn't get from just working on small projects alone. Working with others on a large project over 6 weeks gave me the confidence and skills I needed to excel during my internship, which eventually led to a full-time offer. I've since had the opportunity to return as a cohort lead, continuing to build my leadership skills while giving back to the community that helped launch my career.",
        cohort: 'Cohort 8',
        image:
          'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/people/aaryanDas.jpg',
        linkedIn: 'https://linkedin.com',
      },
      {
        id: 2,
        name: 'Yoo Jin Bae',
        role: 'Software Engineer',
        company: 'NBC Universal',
        quote:
          'The cohort provided invaluable guidance from professionals actively working in the industry and taught me how to collaborate effectively within a team. It played a pivotal role in helping me break into tech. Now, as a professional developer, I have had the privilege of returning as a lead to mentor and support others who are now on the same journey I once was.',
        image:
          'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/yoonJinBae.jpg',
        linkedIn: 'https://www.linkedin.com/in/bae-yoojin/',
      },
      {
        id: 3,
        name: 'David Ogden III',
        role: 'Associate Software Engineer',
        company: 'L3Harris Technologies',
        quote:
          'Thanks to the DSD Cohort I was able to gain experience working in a team environment, showcase my skills, and catch a glimpse of what developer life is actually like. The experience I gained from the cohort resulted in a job offer shortly after.',
        cohort: 'Cohort 9',
        image:
          'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/people/davidOgden.jpg',
        linkedIn: 'https://linkedin.com',
      },
      {
        id: 4,
        name: 'Staci Southerland',
        role: 'Software Developer',
        company: 'Onix Media',
        quote:
          'The DSD Cohort program transformed my career trajectory. After being laid off, the 6-week program pushed me outside my comfort zone, working on a team to build a full-stack project that I showcased in interviews, helping me land my new developer role.',
        cohort: 'Cohort 9',
        image:
          'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/staciSoutherland.jpg',
        linkedIn: 'https://www.linkedin.com/in/stacisoutherland/',
      },
      {
        id: 5,
        name: 'Tatiana Bertazoli',
        role: 'Backend Developer',
        company: 'uMode',
        quote:
          'I highly recommend the DSD cohort program. It gave me the opportunity to collaborate with a team of talented developers on a real project and boosted my confidence to continue pursuing a career in software development, ultimately helping me land my first job as a software developer',
        cohort: 'Cohort 9',
        image:
          'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/tatianaBertazoli.jpg',
        linkedIn: 'https://www.linkedin.com/in/tatibertazoli/',
      },
      {
        id: 6,
        name: 'Andrew Smith',
        role: 'Software Developer',
        company: 'Nautilus Architects',
        quote:
          'Going from building projects on my own to working with a team in the DSD cohort was a game-changer. It pushed me to grow faster as a developer, get more involved in the Boston tech community, and land my first client.',
        cohort: 'Cohort 9',
        image:
          'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/andrewSmith.jpg',
        linkedIn: 'https://www.linkedin.com/in/andrew-sm1th/',
      },
    ],
  },
  errorHandling: {
    somethingWentWrongTitle: 'Something went wrong',
    unexpectedErrorMessage: "We're sorry, but something unexpected happened.",
    tryAgainButtonText: 'Try again',
    genericErrorMessage: 'An error occurred',
  },
  accessibility: {
    skipToMainContentText: 'Skip to main content',
    closeModalText: 'Close modal',
  },
  validation: {
    fieldRequiredSuffix: ' is required',
    invalidFormatSuffix: ' format is invalid',
    tooLongPrefix: ' must be under ',
    charactersText: ' characters',
  },
};
