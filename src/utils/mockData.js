/* src/utils/mockData.js */

export const INITIAL_CATEGORIES = [
  'Technology',
  'Business',
  'STEM',
  'Arts',
  'Medicine',
  'Education',
  'Social Sciences'
];

export const INITIAL_USERS = [
  {
    id: 1,
    email: 'student@grantbridge.com',
    password: 'password',
    role: 'student',
    name: 'Jane Doe',
    phone: '+1 (555) 019-2834',
    avatar: 'JD',
    gpa: '3.85',
    education: 'Undergraduate',
    major: 'Computer Science',
    financialNeed: 'High',
    bio: 'Aspiring software engineer passionate about machine learning and its applications in digital healthcare.',
    savedGrants: [1, 3],
    documents: [
      { id: 'd1', name: 'Resume_Jane_Doe.pdf', size: '142 KB', type: 'Resume', date: '2026-06-10' },
      { id: 'd2', name: 'Transcript_Unofficial.pdf', size: '2.1 MB', type: 'Transcript', date: '2026-06-12' }
    ],
    profileCompleted: true
  },
  {
    id: 2,
    email: 'provider@grantbridge.com',
    password: 'password',
    role: 'provider',
    name: 'Sarah Jenkins',
    avatar: 'SJ',
    foundationName: 'Apex Technology Foundation',
    phone: '+1 (555) 043-9812',
    website: 'https://apextech.org',
    verified: true,
    subscription: 'Pro',
    bio: 'Dedicated to fostering diversity and excellence in tech by supporting students globally.'
  },
  {
    id: 3,
    email: 'unverified@foundation.org',
    password: 'password',
    role: 'provider',
    name: 'Marcus Brody',
    avatar: 'MB',
    foundationName: 'Brody Archeological Society',
    phone: '+1 (555) 077-4411',
    website: 'https://brodyarchaeology.org',
    verified: false,
    subscription: 'Free',
    bio: 'Unearthing the past, funding the future of historical research.'
  },
  {
    id: 4,
    email: 'admin@grantbridge.com',
    password: 'password',
    role: 'admin',
    name: 'Alexander Sterling',
    avatar: 'AS'
  }
];

export const INITIAL_GRANTS = [
  {
    id: 1,
    title: 'Apex Women in Tech Scholarship',
    providerId: 2,
    providerName: 'Apex Technology Foundation',
    amount: 10000,
    category: 'Technology',
    deadline: '2026-08-15',
    description: 'Providing financial assistance and mentorship to outstanding female students pursuing undergraduate degrees in Computer Science, Software Engineering, or related technical majors.',
    eligibility: {
      minGPA: '3.5',
      education: 'Undergraduate',
      major: 'Computer Science',
      other: 'Must identify as female'
    },
    status: 'Approved',
    views: 245,
    createdAt: '2026-06-01'
  },
  {
    id: 2,
    title: 'Future Leaders MBA Grant',
    providerId: 2,
    providerName: 'Apex Technology Foundation',
    amount: 15000,
    category: 'Business',
    deadline: '2026-09-01',
    description: 'A prestigious grant designed for first-year MBA students showing exceptional leadership potential and a commitment to utilizing business for social and environmental impact.',
    eligibility: {
      minGPA: '3.2',
      education: 'Graduate',
      major: 'Business',
      other: 'Requires a 500-word essay on social impact.'
    },
    status: 'Approved',
    views: 189,
    createdAt: '2026-06-03'
  },
  {
    id: 3,
    title: 'STEM Excellence Grant',
    providerId: 2,
    providerName: 'Apex Technology Foundation',
    amount: 5000,
    category: 'STEM',
    deadline: '2026-07-31',
    description: 'An annual grant supporting high school seniors and undergraduate college students pursuing degrees in Science, Technology, Engineering, or Mathematics who demonstrate high financial need.',
    eligibility: {
      minGPA: '3.0',
      education: 'Undergraduate',
      major: 'STEM',
      other: 'Demonstrated financial need.'
    },
    status: 'Approved',
    views: 312,
    createdAt: '2026-05-28'
  },
  {
    id: 4,
    title: 'Vanguard Creative Writing Fellowship',
    providerId: 3,
    providerName: 'Brody Archeological Society',
    amount: 7500,
    category: 'Arts',
    deadline: '2026-08-05',
    description: 'A fellowship supporting promising writers who wish to pursue a career in historical writing, historical fiction, or archaeological journalism.',
    eligibility: {
      minGPA: '2.8',
      education: 'Any',
      major: 'Arts',
      other: 'Must submit a 5-page writing sample.'
    },
    status: 'Pending',
    views: 0,
    createdAt: '2026-06-26'
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 101,
    grantId: 1,
    studentId: 1,
    studentName: 'Jane Doe',
    studentGPA: '3.85',
    studentMajor: 'Computer Science',
    status: 'Shortlisted',
    appliedDate: '2026-06-15',
    answers: {
      whyDeserve: 'I want to build AI systems that solve healthcare challenges in underserved areas.',
      futureGoals: 'To complete my Bachelor\'s and work on biomedical machine learning models.'
    },
    feedback: 'Excellent academic record and a very compelling essay. Looking forward to the interview phase.'
  },
  {
    id: 102,
    grantId: 3,
    studentId: 1,
    studentName: 'Jane Doe',
    studentGPA: '3.85',
    studentMajor: 'Computer Science',
    status: 'Applied',
    appliedDate: '2026-06-20',
    answers: {
      whyDeserve: 'Pursuing engineering requires financial support, which this grant would provide to cover my tuition and books.',
      futureGoals: 'Become a tech lead contributing to open-source climate modeling software.'
    },
    feedback: ''
  }
];
