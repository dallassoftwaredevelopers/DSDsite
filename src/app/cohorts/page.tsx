'use client';

import React, {
  useMemo,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import styles from './cohorts.module.css';
import CohortCard from '../components/cohortCard/cohortCard';
import NotificationForm from './notificationForm';
import { useQuery } from '@tanstack/react-query';
import Button from '../components/button/button';
import { useGlobalState } from '../hooks/useGlobalState/useGlobalState';
import Spinner from '../components/spinner/spinner';
import BackgroundPattern from '../components/decorative/backgroundPattern';
import FloatingShapes from '../components/decorative/floatingShapes';
import Image from 'next/image';
import { LABELS } from '../labels';

interface Group {
  id: number;
  cohortName?: string;
  youtubeLink?: string;
  githubLink?: string;
  imageUrl?: string;
  projectName?: string;
  projectDescription?: string;
}

interface CohortStatus {
  documentId: number;
  statusType: string;
  message: string;
  active: boolean;
}

type CohortData = {
  [year: number]: Group[];
};

const defaultCohortStatusMessage = {
  documentId: 0,
  statusType: 'closed',
  message: LABELS.cohorts.apply.defaultStatusMessage,
  active: false,
} as CohortStatus;

const cohortData: CohortData = {
  2022: [
    {
      id: 1,
      cohortName: 'Cohort 5',
      youtubeLink:
        'https://www.youtube.com/embed/0Z7K9sv5Hcc?si=XymSUESq1layFazc',
      projectName: 'DevConnect',
      projectDescription:
        'A platform connecting junior developers with mentors in the Dallas tech community',
    },
    {
      id: 2,
      cohortName: 'Cohort 6',
      youtubeLink:
        'https://www.youtube.com/embed/hfGrR_IPHdw?si=h9kzQpNhIALvNOet',
      projectName: 'EventHub',
      projectDescription:
        'A community event management system for local tech meetups',
    },
  ],
  2023: [
    {
      id: 1,
      cohortName: 'Cohort 7',
      youtubeLink:
        'https://www.youtube.com/embed/hs26g7qAy5A?si=Ps5Rr7SdCFkn8HX8',
      projectName: 'SkillTracker',
      projectDescription:
        'A tool for developers to track their learning progress and showcase skills',
    },
    {
      id: 2,
      cohortName: 'Cohort 8',
      youtubeLink:
        'https://www.youtube.com/embed/5tRtqQ1PRZs?si=s9Ltw__Wdgky7_YR',
      projectName: 'CodeCollab',
      projectDescription:
        'A collaborative coding platform for remote pair programming sessions',
    },
  ],
  2024: [
    {
      id: 1,
      cohortName: 'Cohort 9',
      youtubeLink:
        'https://www.youtube.com/embed/jQL0k_4vUJQ?si=0cvsqz3hH87XNCLl',
      projectName: 'TechTalent',
      projectDescription:
        'A job board connecting Dallas tech companies with local developer talent',
    },
  ],
};

const programFeatures = [
  {
    title: 'Real-World Experience',
    description:
      'Build a deployable MVP that you can showcase in your portfolio. Past projects include job boards, community platforms, and developer tools that solve actual problems in the Dallas tech ecosystem.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 2.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5-4.25-9.5-9.5-9.5zm-1 14.5v-4h-3l4-7v4h3l-4 7z' />
      </svg>
    ),
  },
  {
    title: 'Agile Workflow Exposure',
    description:
      'Experience real sprint planning, daily standups, and retrospectives just like professional teams. Learn to use industry tools like GitHub, Jira, and Figma in a collaborative environment.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z' />
      </svg>
    ),
  },
  {
    title: 'Peer Community',
    description:
      'Connect with a diverse cohort of developers from across DFW and beyond. Many participants have formed lasting professional relationships and even landed jobs through connections made during the program.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M17.997 18h-.998c0-1.552.06-1.775-.88-1.993-1.438-.332-2.797-.645-3.293-1.729-.18-.396-.301-1.048.155-1.907 1.021-1.929 1.277-3.583.702-4.538-.672-1.115-2.707-1.12-3.385.017-.576.968-.316 2.613.713 4.512.465.856.348 1.51.168 1.908-.49 1.089-1.836 1.4-3.262 1.728-.982.227-.92.435-.92 2.002h-.995l-.002-.623c0-1.259.1-1.985 1.588-2.329 1.682-.389 3.344-.736 2.545-2.209-2.366-4.365-.676-6.839 1.865-6.839 2.492 0 4.227 2.383 1.867 6.839-.775 1.464.824 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.81-2.214c-1.289-.298-2.489-.559-1.908-1.657 1.77-3.342.47-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.325 0 1.269.574 2.175.904 2.925h1.048c-.17-.75-1.466-2.562-.766-3.736.412-.692 1.704-.693 2.114-.012.38.631.181 1.812-.534 3.161-.388.733-.28 1.301-.121 1.648.305.666.977.987 1.737 1.208 1.507.441 1.368.042 1.368 1.48h.997l.002-.463c0-.945-.074-1.492-1.193-1.75zm-22.805 2.214h.997c0-1.438-.139-1.039 1.368-1.48.761-.221 1.433-.542 1.737-1.208.159-.348.267-.915-.121-1.648-.715-1.349-.914-2.53-.534-3.161.41-.682 1.702-.681 2.114.012.7 1.175-.596 2.986-.766 3.736h1.048c.33-.75.904-1.656.904-2.925.001-1.509-.982-2.326-2.247-2.326-1.87 0-3.17 1.787-1.4 5.129.581 1.099-.619 1.359-1.908 1.657-1.12.258-1.194.805-1.194 1.751l.002.463z' />
      </svg>
    ),
  },
];

const weeklyStructure = [
  {
    week: 'Week 1',
    title: 'Onboarding & Project Kick-off',
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
      'Attend weekly "office hours" with industry mentors from the Dallas tech scene',
      'Participate in code reviews and pair programming sessions',
    ],
  },
  {
    week: 'Week 6',
    title: 'Final Demo & Next Steps',
    activities: [
      'Present your completed project to the DSD community at our monthly meetup',
      'Receive feedback on code, design, and career trajectory from senior developers',
      'Join the DSD alumni network for ongoing support and job opportunities',
      'Add your project to your portfolio with professional documentation',
    ],
  },
];

const whoShouldJoin = [
  {
    title: 'Early-Career or Transitioning',
    description:
      "Whether you're a recent bootcamp grad, CS student, or professional changing careers, our cohorts provide the real-world experience that employers in Dallas-Fort Worth are looking for.",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M5.495 2h16.505v-2h-17c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h17v-20h-16.505c-1.375 0-1.375-2 0-2zm.505 4h14v16h-14v-16z' />
      </svg>
    ),
  },
  {
    title: 'Time Commitment',
    description:
     LABELS.cohorts.requirements.items.timeCommitment.description,
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z' />
      </svg>
    ),
  },
  {
    title: 'Technical Foundation',
    description:
      "You should be comfortable with core web or mobile technologies (e.g., JavaScript, React, C#, .NET, Java, Swift) and eager to work with tools like GitHub, Figma, Jira, and VS Code. We don't expect mastery, just a willingness to learn.",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z' />
      </svg>
    ),
  },
];

const programDetails = [
  {
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z' />
      </svg>
    ),
    title: LABELS.cohorts.details.items.duration.title,
    description: LABELS.cohorts.details.items.duration.description,
  },
  {
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z' />
      </svg>
    ),
    title: LABELS.cohorts.details.items.format.title,
    description: LABELS.cohorts.details.items.format.description,
  },
  {
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12.324 7.021l.154.345c.237-.041.52-.055.847-.025l.133.577c-.257-.032-.53-.062-.771-.012l-.092.023c-.218.054-.377.201-.377.425 0 .01.011.025.011.035 0 .108.034.171.114.217.06.035.126.06.206.071.257.033.53.004.771-.12.218-.015.389.096.389.333l-.028.139c-.069.257-.236.416-.505.416-.055 0-.116-.012-.183-.023-.309-.047-.635.036-.864.24-.16.145-.258.35-.258.577 0 .19.056.368.153.53.126.202.32.351.298.684-.012.183-.103.355-.252.48-.19.17-.388.294-.679.294-.151 0-.291-.036-.416-.082l.034-.695c.056.035.126.058.195.058.151 0 .252-.082.275-.232.011-.094-.023-.17-.126-.232-.115-.07-.229-.151-.309-.252-.195-.241-.275-.576-.172-.912.092-.284.252-.458.481-.556.217-.092.459-.092.709-.058l.058-.231c-.252-.058-.561-.07-.858-.035l-.149-.6c.252.035.531.07.858.035l.126-.267.631.267zm-1.858 10.205c-.172-.207-.247-.481-.247-.794 0-.184.035-.356.092-.53.172.207.252.486.252.8 0 .183-.035.355-.097.524zm.988-1.735c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm1.93-8.186l-.218.929-.929-.218.218-.929.929.218zm-3.839 2.559l-.218.929-.929-.218.218-.929.929.218zm-.988 4.24c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm1.988-2.559c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm-1 1.729c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm1.988-5.118l-.218.929-.929-.218.218-.929.929.218zm-3.839 2.559l-.218.929-.929-.218.218-.929.929.218zm-1.988 8.186c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm1.988-2.559c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm6.816-8.186c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm-1.988 2.559c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm-2.64-1.912l.919.246-.246.919-.918-.246.245-.919zm3.629 3.47l.919.246-.246.919-.918-.246.245-.919zm-.989 4.131c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm1.988-2.559c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm-1 1.729c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm1.988-5.118l-.246.919-.918-.246.245-.919.919.246zm-3.629 3.47l-.246.919-.918-.246.245-.919.919.246zm-1.72-5.789l.919.246-.246.919-.918-.246.245-.919zm3.629 3.47l.919.246-.246.919-.918-.246.245-.919zm-1.989 8.186c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm1.988-2.559c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm-1 1.729c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm1.988-5.118l-.246.919-.918-.246.245-.919.919.246zm-3.629 3.47l-.246.919-.918-.246.245-.919.919.246zm-1.72-5.789l.919.246-.246.919-.918-.246.245-.919zm3.629 3.47l.919.246-.246.919-.918-.246.245-.919zm-1.989 8.186c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm1.988-2.559c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm-1 1.729c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm1.988-5.118l-.246.919-.918-.246.245-.919.919.246zm-3.629 3.47l-.246.919-.918-.246.245-.919.919.246zm-8.186-5.118l-.246.919-.918-.246.245-.919.919.246zm3.629 3.47l-.246.919-.918-.246.245-.919.919.246zm-1.989 8.186c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm1.988-2.559c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm-1 1.729c-.172-.207-.252-.486-.252-.8 0-.183.035-.355.097-.524.172.207.247.481.247.794 0 .184-.035.356-.092.53zm1.988-5.118l-.246.919-.918-.246.245-.919.919.246zm-3.629 3.47l-.246.919-.918-.246.245-.919.919.246zm12-14.039c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0-2c7.732 0 14 6.268 14 14s-6.268 14-14 14-14-6.268-14-14 6.268-14 14-14z' />
      </svg>
    ),
    title: LABELS.cohorts.details.items.cost.title,
    description: LABELS.cohorts.details.items.cost.description,
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Aaryan Das',
    role: 'Software Engineer',
    company: 'Bank Of America',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    cohort: 'Cohort 8',
    image: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/people/aaryanDas.jpg',
    linkedIn: 'https://linkedin.com',
  },
  {
    id: 2,
    name: 'Yoo Jin Bae',
    role: 'Software Engineer',
    company: 'NBC Universal',
    quote:
      'The cohort provided invaluable guidance from professionals actively working in the industry and taught me how to collaborate effectively within a team. It played a pivotal role in helping me break into tech. Now, as a professional developer, I’ve had the privilege of returning as a lead to mentor and support others who are now on the same journey I once was.',
    image: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/yoonJinBae.jpg',
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
    image: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/people/davidOgden.jpg',
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
    image: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/staciSoutherland.jpg',
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
    image: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/tatianaBertazoli.jpg',
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
    image: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/andrewSmith.jpg',
    linkedIn: 'https://www.linkedin.com/in/andrew-sm1th/',
  },
];

// Fisher-Yates shuffle algorithm for randomizing array order
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function CohortPage() {
  const [selectedYear, setSelectedYear] = React.useState<number>(2024);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const { actionLinks } = useGlobalState();

  // Randomize testimonials once when component mounts
  const shuffledTestimonials = useMemo(() => shuffleArray(testimonials), []);

  const { data: cohortStatusResponse, isLoading } = useQuery({
    queryKey: ['cohortStatus'],
    queryFn: async () => {
      const response = await fetch('/api/cohort', { cache: 'no-store' });
      return response.json();
    },
  });

  const currentCohortStatusData = useMemo(() => {
    if (!cohortStatusResponse) {
      return defaultCohortStatusMessage;
    }
    return cohortStatusResponse ?? defaultCohortStatusMessage;
  }, [cohortStatusResponse]);

  useEffect(() => {
    if (isLoading) return;
    let observer: IntersectionObserver | null = null;
    let raf1 = 0;
    let raf2 = 0;
    let onFirstScroll: (() => void) | null = null;

    const setup = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const key = (entry.target as HTMLElement).dataset.key;
              if (key) {
                setVisibleSections((prev) => {
                  if (prev.has(key)) return prev;
                  const next = new Set(prev);
                  next.add(key);
                  return next;
                });
              }
              observer?.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0 }
      );

      Object.entries(sectionRefs.current).forEach(([key, el]) => {
        if (el) {
          (el as HTMLElement).dataset.key = key;
          observer!.observe(el);
        }
      });

      const checkVisibleNow = () => {
        const viewportH = window.innerHeight;
        Object.entries(sectionRefs.current).forEach(([key, el]) => {
          if (el) {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < viewportH * 0.9 && rect.bottom > 0;
            if (isVisible) {
              setVisibleSections((prev) => {
                if (prev.has(key)) return prev;
                const next = new Set(prev);
                next.add(key);
                return next;
              });
              observer!.unobserve(el);
            }
          }
        });
      };
      checkVisibleNow();
      setTimeout(checkVisibleNow, 800);
      onFirstScroll = () => {
        checkVisibleNow();
        if (onFirstScroll) window.removeEventListener('scroll', onFirstScroll);
        onFirstScroll = null;
      };
      window.addEventListener('scroll', onFirstScroll, { passive: true });
    };

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(setup);
    });

    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      if (onFirstScroll) window.removeEventListener('scroll', onFirstScroll);
      observer?.disconnect();
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <section
        className={styles.hero}
        ref={heroRef}
        aria-label={LABELS.cohorts.hero.ariaLabel}
      >
        <div className={styles.heroBackground} aria-hidden='true'>
          <div className={styles.gradientOverlay}></div>
          <div className={styles.shapesContainer}>
            <div className={styles.shape + ' ' + styles.shape1}></div>
            <div className={styles.shape + ' ' + styles.shape2}></div>
            <div className={styles.shape + ' ' + styles.shape3}></div>
            <div className={styles.shape + ' ' + styles.shape4}></div>
          </div>
          <div className={styles.gridPattern}></div>
          <BackgroundPattern variant='dots' opacity={0.19} />
          <FloatingShapes />
          <div className={styles.dallasOutline}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroTextContent}>
            <h1 className={styles.heroHeading}>
              {LABELS.cohorts.hero.tagline} <span className={styles.highlight}>{LABELS.cohorts.hero.heading}</span>
            </h1>

            <div className={styles.heroDescription}>
              <p>{LABELS.cohorts.hero.description}</p>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>6</span>
                <span className={styles.statLabel}>
                  {LABELS.cohorts.hero.stats.weeks}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>
                  {LABELS.cohorts.hero.stats.free}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4-6</span>
                <span className={styles.statLabel}>
                  {LABELS.cohorts.hero.stats.teamSize}
                </span>
              </div>
            </div>

            <div className={styles.heroHighlights}>
              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon} aria-hidden='true'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                  </svg>
                </div>
                <div className={styles.highlightText}>
                  <h3>{LABELS.cohorts.hero.highlights.realWorld.title}</h3>
                  <p>{LABELS.cohorts.hero.highlights.realWorld.description}</p>
                </div>
              </div>

              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon} aria-hidden='true'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h2v-2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2zM18 12.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zM7 9c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z' />
                  </svg>
                </div>
                <div className={styles.highlightText}>
                  <h3>{LABELS.cohorts.hero.highlights.mentorship.title}</h3>
                  <p>{LABELS.cohorts.hero.highlights.mentorship.description}</p>
                </div>
              </div>

              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon} aria-hidden='true'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                  </svg>
                </div>
                <div className={styles.highlightText}>
                  <h3>{LABELS.cohorts.hero.highlights.free.title}</h3>
                  <p>{LABELS.cohorts.hero.highlights.free.description}</p>
                </div>
              </div>
            </div>

            <div className={styles.heroCTA}>
              <Button
                buttonText={LABELS.cohorts.hero.applyNow}
                onClick={() => {
                  const applySection = document.getElementById('apply-section');
                  applySection?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator} aria-hidden='true'>
          <div className={styles.mouse}>
            <div className={styles.mouseWheel}></div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.sectionContainer} ${styles.gradientBackground} ${styles.sectionVisible}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {LABELS.cohorts.overview.title}
            </h2>
            <p className={styles.sectionDescription}>
              {LABELS.cohorts.overview.description}
            </p>
          </div>

          <div className={styles.overviewImageContainer}>
            <div className={styles.overviewImage}>
              <Image
                src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohortPresentations.png'
                alt={LABELS.cohorts.overview.imageAlt}
                width={900}
                height={512}
                className={styles.roundedImage}
              />
              <div className={styles.imageCaption}>
                {LABELS.cohorts.overview.imageCaption}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current['requirements'] = el)}
        className={`${styles.sectionContainer} ${styles.altBackground} ${visibleSections.has('requirements') ? styles.sectionVisible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {LABELS.cohorts.requirements.title}
            </h2>
            <p className={styles.sectionDescription}>
              {LABELS.cohorts.requirements.description}
            </p>
          </div>

          <div className={styles.requirementsList}>
            {whoShouldJoin.map((requirement, index) => (
              <div key={index} className={styles.requirementCard}>
                <div className={styles.requirementIcon}>{requirement.icon}</div>
                <div className={styles.requirementContent}>
                  <h3>{requirement.title}</h3>
                  <p>{requirement.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.dallasCallout}>
            <div className={styles.calloutIcon}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z' />
              </svg>
            </div>
            <div className={styles.calloutContent}>
              <h3>{LABELS.cohorts.requirements.dallasCallout.title}</h3>
              <p>{LABELS.cohorts.requirements.dallasCallout.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current['details'] = el)}
        className={`${styles.sectionContainer} ${styles.primaryBackground} ${visibleSections.has('details') ? styles.sectionVisible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {LABELS.cohorts.details.title}
            </h2>
          </div>

          <div className={styles.detailsGrid}>
            {programDetails.map((detail, index) => (
              <div key={index} className={styles.detailCard}>
                <div className={styles.detailIcon}>{detail.icon}</div>
                <h3>{detail.title}</h3>
                <p>{detail.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.programHighlightsGrid}>
            <div className={styles.programHighlightItem}>
              <h3>{LABELS.cohorts.details.highlights.whatYouBuild.title}</h3>
              <p>
                {LABELS.cohorts.details.highlights.whatYouBuild.description}
              </p>
            </div>
            <div className={styles.programHighlightItem}>
              <h3>{LABELS.cohorts.details.highlights.whoYouMeet.title}</h3>
              <p>{LABELS.cohorts.details.highlights.whoYouMeet.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current['structure'] = el)}
        className={`${styles.sectionContainer} ${styles.altBackground} ${visibleSections.has('structure') ? styles.sectionVisible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {LABELS.cohorts.structure.title}
            </h2>
            <p className={styles.sectionDescription}>
              {LABELS.cohorts.structure.description}
            </p>
          </div>

          <div className={styles.timeline}>
            {weeklyStructure.map((week, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <span>{week.week}</span>
                </div>
                <div className={styles.timelineContent}>
                  <h3>
                    <span className={styles.weekLabel}>{week.week}:</span>{' '}
                    {week.title}
                  </h3>
                  <ul>
                    {week.activities.map((activity, idx) => (
                      <li key={idx}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.scheduleNote}>
            <h3>{LABELS.cohorts.structure.scheduleNote.title}</h3>
            <p>{LABELS.cohorts.structure.scheduleNote.description}</p>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current['features'] = el)}
        className={`${styles.sectionContainer} ${styles.accentBackground} ${visibleSections.has('features') ? styles.sectionVisible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {LABELS.cohorts.features.title}
            </h2>
          </div>

          <div className={styles.featuresGrid}>
            {programFeatures.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current['cohortVideos'] = el)}
        className={`${styles.sectionContainer} ${styles.primaryBackground} ${visibleSections.has('cohortVideos') ? styles.sectionVisible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {LABELS.cohorts.projects.title}
            </h2>
            <p className={styles.sectionDescription}>
              {LABELS.cohorts.projects.description}
            </p>
          </div>

          <div className={styles.yearSelector}>
            {Object.keys(cohortData).map((year) => (
              <button
                key={year}
                className={`${styles.yearButton} ${selectedYear === parseInt(year) ? styles.activeYear : ''}`}
                onClick={() => setSelectedYear(parseInt(year))}
              >
                {year}
              </button>
            ))}
          </div>

          <div className={styles.cohortGrid}>
            {cohortData[selectedYear]?.map((group) => (
              <CohortCard
                key={group.id}
                cohortName={group.cohortName}
                youtubeLink={group.youtubeLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cohort Photos Gallery Section */}
      <section
        className={`${styles.sectionContainer} ${styles.gradientBackground} ${
          visibleSections.has('photos') ? styles.sectionVisible : ''
        }`}
        ref={(el) => {
          sectionRefs.current['photos'] = el;
        }}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Cohort Community</h2>
            <p className={styles.sectionDescription}>
              Capturing moments of collaboration, learning, and growth. These photos showcase the vibrant community
              of developers who have participated in our cohort programs, working together to build real-world projects
              and forge lasting professional connections.
            </p>
          </div>
          
          <div className={styles.photoGallery}>
            <div className={styles.photoGrid}>
              <div className={styles.photoCard}>
                <div className={styles.photoWrapper}>
                  <Image
                    src="https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohort%20group%201.jpg"
                    alt="Cohort Group 1 - Developers collaborating on projects"
                    width={600}
                    height={400}
                    className={styles.galleryImage}
                  />
                  <div className={styles.photoOverlay}>
                    <div className={styles.photoCaption}>
                      <h3>Cohort Collaboration</h3>
                      <p>Teams working together on innovative solutions</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.photoCard}>
                <div className={styles.photoWrapper}>
                  <Image
                    src="https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohortGroup2.jpg"
                    alt="Cohort Group 2 - Presentation and demo day"
                    width={600}
                    height={400}
                    className={styles.galleryImage}
                  />
                  <div className={styles.photoOverlay}>
                    <div className={styles.photoCaption}>
                      <h3>Demo Day Presentations</h3>
                      <p>Showcasing completed projects to the community</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.photoCard}>
                <div className={styles.photoWrapper}>
                  <Image
                    src="https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohortGroup3.jpg"
                    alt="Cohort Group 3 - Networking and community building"
                    width={600}
                    height={400}
                    className={styles.galleryImage}
                  />
                  <div className={styles.photoOverlay}>
                    <div className={styles.photoCaption}>
                      <h3>Community Connections</h3>
                      <p>Building lasting professional relationships</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.photoStats}>
              <div className={styles.photoStat}>
                <span className={styles.photoStatNumber}>100+</span>
                <span className={styles.photoStatLabel}>Developers Trained</span>
              </div>
              <div className={styles.photoStat}>
                <span className={styles.photoStatNumber}>15+</span>
                <span className={styles.photoStatLabel}>Projects Completed</span>
              </div>
              <div className={styles.photoStat}>
                <span className={styles.photoStatNumber}>85%</span>
                <span className={styles.photoStatLabel}>Job Placement Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current['testimonials'] = el)}
        className={`${styles.sectionContainer} ${styles.altBackground} ${visibleSections.has('testimonials') ? styles.sectionVisible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {LABELS.cohorts.testimonials.title}
            </h2>
            <p className={styles.sectionDescription}>
              {LABELS.cohorts.testimonials.description}
            </p>
          </div>

          <TestimonialsCarousel testimonials={shuffledTestimonials} />

          <div className={styles.careerOutcomes}>
            <h3>{LABELS.cohorts.testimonials.careerOutcomes.title}</h3>
            <div className={styles.outcomesStats}>
              <div className={styles.outcomeStat}>
                <span className={styles.outcomeNumber}>
                  {
                    LABELS.cohorts.testimonials.careerOutcomes.stats.jobSuccess
                      .percentage
                  }
                </span>
                <span className={styles.outcomeLabel}>
                  {
                    LABELS.cohorts.testimonials.careerOutcomes.stats.jobSuccess
                      .label
                  }
                </span>
              </div>
              <div className={styles.outcomeStat}>
                <span className={styles.outcomeNumber}>
                  {
                    LABELS.cohorts.testimonials.careerOutcomes.stats
                      .interviewConfidence.percentage
                  }
                </span>
                <span className={styles.outcomeLabel}>
                  {
                    LABELS.cohorts.testimonials.careerOutcomes.stats
                      .interviewConfidence.label
                  }
                </span>
              </div>
              <div className={styles.outcomeStat}>
                <span className={styles.outcomeNumber}>
                  {
                    LABELS.cohorts.testimonials.careerOutcomes.stats
                      .recommendation.percentage
                  }
                </span>
                <span className={styles.outcomeLabel}>
                  {
                    LABELS.cohorts.testimonials.careerOutcomes.stats
                      .recommendation.label
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id='apply-section'
        ref={(el) => (sectionRefs.current['apply'] = el)}
        className={`${styles.applySectionContainer} ${styles.darkBackground} ${visibleSections.has('apply') ? styles.sectionVisible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.applicationSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {LABELS.cohorts.apply.title}
              </h2>
              <p className={styles.sectionDescription}>
                {LABELS.cohorts.apply.description}
              </p>
            </div>

            <div className={styles.statusCard}>
              <div className={styles.statusIcon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='48'
                  height='48'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z' />
                </svg>
              </div>
              <div className={styles.statusMessage}>
                <p>{currentCohortStatusData.message}</p>
              </div>

              {currentCohortStatusData.statusType === 'open' && (
                <div className={styles.applySteps}>
                  <h3>{LABELS.cohorts.apply.applicationProcess.title}</h3>
                  <ol className={styles.stepsList}>
                    <li>
                      <span className={styles.stepNumber}>
                        {
                          LABELS.cohorts.apply.applicationProcess.steps.submit
                            .number
                        }
                      </span>
                      <div className={styles.stepContent}>
                        <h4>
                          {
                            LABELS.cohorts.apply.applicationProcess.steps.submit
                              .title
                          }
                        </h4>
                        <p>
                          {
                            LABELS.cohorts.apply.applicationProcess.steps.submit
                              .description
                          }
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className={styles.stepNumber}>
                        {
                          LABELS.cohorts.apply.applicationProcess.steps
                            .assessment.number
                        }
                      </span>
                      <div className={styles.stepContent}>
                        <h4>
                          {
                            LABELS.cohorts.apply.applicationProcess.steps
                              .assessment.title
                          }
                        </h4>
                        <p>
                          {
                            LABELS.cohorts.apply.applicationProcess.steps
                              .assessment.description
                          }
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className={styles.stepNumber}>
                        {
                          LABELS.cohorts.apply.applicationProcess.steps
                            .interview.number
                        }
                      </span>
                      <div className={styles.stepContent}>
                        <h4>
                          {
                            LABELS.cohorts.apply.applicationProcess.steps
                              .interview.title
                          }
                        </h4>
                        <p>
                          {
                            LABELS.cohorts.apply.applicationProcess.steps
                              .interview.description
                          }
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className={styles.stepNumber}>
                        {
                          LABELS.cohorts.apply.applicationProcess.steps
                            .placement.number
                        }
                      </span>
                      <div className={styles.stepContent}>
                        <h4>
                          {
                            LABELS.cohorts.apply.applicationProcess.steps
                              .placement.title
                          }
                        </h4>
                        <p>
                          {
                            LABELS.cohorts.apply.applicationProcess.steps
                              .placement.description
                          }
                        </p>
                      </div>
                    </li>
                  </ol>
                  <Button
                    buttonText={LABELS.cohorts.apply.applyNow}
                    onClick={() => {
                      if (!actionLinks) return;
                      const cohortSignupLink = actionLinks.find(
                        (x: any) => x.linkName === 'cohortSignup'
                      )?.link;
                      window.open(cohortSignupLink, '_blank');
                    }}
                  />
                </div>
              )}

              {currentCohortStatusData.statusType === 'closed' && (
                <div className={styles.notificationFormWrapper}>
                  <h3>{LABELS.cohorts.apply.notification.title}</h3>
                  <p className={styles.notificationDescription}>
                    {LABELS.cohorts.apply.notification.description}
                  </p>
                  <NotificationForm />
                  <div className={styles.joinDiscord}>
                    <p>{LABELS.cohorts.apply.notification.discordPrompt}</p>
                    <a
                      href='https://discord.gg/dallassoftwaredevs'
                      target='_blank'
                      rel='noopener noreferrer'
                      className={styles.discordButton}
                    >
                      <span className={styles.discordIcon}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                        >
                          <path d='M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z' />
                        </svg>
                      </span>
                      <span>
                        {LABELS.cohorts.apply.notification.joinDiscord}
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TestimonialsCarousel({ testimonials }: { testimonials: any[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    const calculateMaxIndex = () => {
      if (!carouselRef.current) return;

      const containerWidth = carouselRef.current.clientWidth;
      const cardWidth = containerWidth > 768 ? 450 : containerWidth - 64;
      const visibleCards = Math.floor(containerWidth / cardWidth);
      setMaxIndex(Math.max(0, testimonials.length - visibleCards));
    };

    calculateMaxIndex();
    window.addEventListener('resize', calculateMaxIndex);

    return () => {
      window.removeEventListener('resize', calculateMaxIndex);
    };
  }, [testimonials.length]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!carouselRef.current) return;

      const newIndex = Math.max(0, Math.min(index, testimonials.length - 1));
      setCurrentIndex(newIndex);

      const cardWidth =
        carouselRef.current.querySelector(`.${styles.testimonialCard}`)
          ?.clientWidth || 0;
      const scrollPosition = newIndex * (cardWidth + 32);

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    },
    [testimonials.length]
  );

  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;

    const scrollPosition = carouselRef.current.scrollLeft;
    const cardWidth =
      carouselRef.current.querySelector(`.${styles.testimonialCard}`)
        ?.clientWidth || 0;
    const gap = 32;

    const newIndex = Math.round(scrollPosition / (cardWidth + gap));
    setCurrentIndex(newIndex);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const handlePrev = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

  return (
    <div className={styles.testimonialsContainer}>
      <div className={styles.testimonialsCarousel} ref={carouselRef}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={styles.testimonialCard}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className={styles.testimonialQuote}>
              <span className={styles.quoteIcon}>&ldquo;</span>
              <p>{testimonial.quote}</p>
            </div>
            <div className={styles.testimonialAuthor}>
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={96}
                height={96}
                className={styles.authorImage}
              />
              <div className={styles.authorInfo}>
                <h4>{testimonial.name}</h4>
                <p>
                  {testimonial.role} at {testimonial.company}
                </p>
                <span className={styles.cohortBadge}>{testimonial.cohort}</span>
              </div>
            </div>
            <a
              href={testimonial.linkedIn}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.linkedinLink}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
              </svg>
              <span>{LABELS.cohorts.testimonials.connect}</span>
            </a>
          </div>
        ))}
      </div>

      <div className={styles.carouselNavigation}>
        <button
          className={styles.carouselButton}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label={LABELS.cohorts.testimonials.previousTestimonial}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='15 18 9 12 15 6'></polyline>
          </svg>
        </button>
        <button
          className={styles.carouselButton}
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          aria-label={LABELS.cohorts.testimonials.nextTestimonial}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='9 18 15 12 9 6'></polyline>
          </svg>
        </button>
      </div>

      <div className={styles.carouselIndicators}>
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`${styles.carouselIndicator} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => scrollToIndex(index)}
            aria-label={`${LABELS.cohorts.testimonials.goToTestimonial} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
