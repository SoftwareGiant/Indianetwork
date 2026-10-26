import PastProjectLayout, { type PastProject } from '../../../components/PastProjectLayout'

const project: PastProject = {
  title: 'Andhra Pradesh Community Projects',
  breadcrumb: 'Andhra Pradesh Projects',
  year: '1996 – 1997',
  category: 'Education & Community',
  heroImage: '/images/inf/andhra-duvva-1.jpg',
  overviewImage: '/images/inf/andhra-komaravalli.jpg',
  facts: [
    { label: 'Location', value: 'West & East Godavari Districts, Andhra Pradesh' },
    { label: 'Focus', value: 'Schools, community centers & cyclone recovery' },
    { label: 'Oversight', value: 'INF Project Director in India' },
    { label: 'Admin Cost', value: '10% retained for accounting & IRS filing' },
    { label: 'Status', value: 'Proposed for sponsorship, 1996–97' },
  ],
  challenge: [
    'During our visit to cyclone-affected areas of Andhra Pradesh, community members presented several worthy projects. Schools were operating in rented buildings that were falling apart, and many roofs were lost to the cyclone — putting teachers and students at real risk.',
    'These projects do not involve huge funds and are target oriented, making them ideal for individual donors and NRI sponsors.',
  ],
  response: [
    {
      title: 'Elementary School, Relangi',
      desc: 'A new school site and building near Attili, West Godavari, to replace a rented house made unsafe by the cyclone. Estimated cost: Rs. 5,00,000, with possible matching support from the Panchayat.',
    },
    {
      title: 'Community Development Center, Attili',
      desc: 'A Brahmin Seva Sadan community center offering free medical services, adult education, English and Sanskrit classes, yoga, eye camps and student counseling. Estimated cost: Rs. 6,00,000.',
    },
    {
      title: 'School Building, Korimelli',
      desc: 'Reconstruction for an award-winning aided school near Bhimavaram running a Balvadi, an orphanage, a Mahila Mandal and a high school — all free to the community. Estimated cost: Rs. 3,00,000.',
    },
    {
      title: 'Girls High School, Amalapuram',
      desc: 'Urgent repairs and construction of restrooms and facilities, at the appeal of District Collector Sri JSV Prasad. Estimated cost of repairs: Rs. 7,00,000.',
    },
  ],
  stats: [
    { value: '4', label: 'Projects Proposed' },
    { value: 'Rs. 21L', label: 'Total Estimated Cost' },
    { value: '10%', label: 'Admin Overhead' },
    { value: '$250+', label: 'Gifts Receive Tax Letter' },
  ],
  gallery: ['/images/inf/andhra-duvva-1.jpg', '/images/inf/andhra-duvva-2.jpg', '/images/inf/andhra-komaravalli.jpg', '/images/inf/andhra-cyclone96.jpg'],
  related: {
    text: 'These projects were presented to INF during its 1996 cyclone relief visit to Andhra Pradesh.',
    label: 'Read about the 1996 Cyclone Relief',
    to: '/projects/past/andhra-pradesh-cyclone-relief-1996',
  },
  quote: {
    text: 'The India Network Foundation has a Project Director in India who takes personal responsibility in overseeing the implementation of the project according to the donor wishes and reports back what has been done.',
    author: 'India Network Foundation',
    role: 'Sponsor a Project in Andhra Pradesh',
  },
}

export default function AndhraProjectsPage() {
  return <PastProjectLayout project={project} />
}
