import PastProjectLayout, { type PastProject } from '../../../components/PastProjectLayout'

const project: PastProject = {
  title: 'Gujarat Earthquake Relief 2001',
  breadcrumb: 'Gujarat Earthquake Relief',
  year: '2001',
  category: 'Education & Relief',
  heroImage: '/images/inf/gujarat-quake-3.jpg',
  overviewImage: '/images/inf/gujarat-quake-1.jpg',
  facts: [
    { label: 'Date', value: 'January 2001 onwards' },
    { label: 'Location', value: 'Bhuj, Kutch & affected areas of Gujarat' },
    { label: 'Funds Raised', value: 'Over $100,000' },
    { label: 'Focus', value: 'Construction of new school houses' },
    { label: 'Status', value: 'Completed' },
  ],
  challenge: [
    'At least 20,000 people were killed and more than 50,000 injured when a devastating earthquake measuring 7.9 on the Richter scale flattened Gujarat in the early hours of Republic Day, 2001. Bhuj, nearest to the epicenter, alone accounted for 3,000 deaths, while 700 were killed in Ahmedabad.',
    'Homes and schools collapsed without warning, and government agencies were overburdened with requests for help.',
  ],
  response: [
    {
      title: 'Rebuilding Schools',
      desc: 'India Network Foundation raised over $100,000 to construct new school houses in affected areas, including the India Network Foundation Primary School at Bhairdi.',
    },
    {
      title: 'Community Donations',
      desc: 'Clothes, food and other resources were contributed by the community to help villagers return to normalcy in their lives.',
    },
    {
      title: 'Supporting Education',
      desc: 'The Foundation focused its support on education, helping children return to classrooms while government resources were stretched.',
    },
    {
      title: 'Member Fundraising',
      desc: 'Members and donors across the United States contributed generously to the relief effort through the Foundation.',
    },
  ],
  stats: [
    { value: '$100K+', label: 'Raised for Schools' },
    { value: '7.9', label: 'Magnitude Quake' },
    { value: '2001', label: 'Year of Relief' },
    { value: 'Schools', label: 'Rebuilt in Gujarat' },
  ],
  gallery: ['/images/inf/gujarat-quake-3.jpg', '/images/inf/gujarat-quake-1.jpg', '/images/inf/gujarat-quake-2.jpg', '/images/inf/gujarat-quake-4.jpg'],
}

export default function GujaratEarthquakeReliefPage() {
  return <PastProjectLayout project={project} />
}
