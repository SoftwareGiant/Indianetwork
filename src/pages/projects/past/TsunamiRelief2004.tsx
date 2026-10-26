import PastProjectLayout, { type PastProject } from '../../../components/PastProjectLayout'

const project: PastProject = {
  title: 'Tsunami Relief Project 2004',
  breadcrumb: 'Tsunami Relief 2004',
  year: '2004',
  category: 'Disaster Relief',
  heroImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1800&h=800&fit=crop&auto=format',
  overviewImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700&h=500&fit=crop&auto=format',
  facts: [
    { label: 'Disaster', value: 'Indian Ocean tsunami, 26 December 2004' },
    { label: 'Location', value: 'Coastal Andhra Pradesh & Tamil Nadu' },
    { label: 'Focus', value: "Children's education, orphans, livelihoods" },
    { label: 'Funding', value: 'Member donations & employer matching gifts' },
    { label: 'Started', value: 'December 2004' },
  ],
  challenge: [
    'On 26 December 2004, a tsunami struck the nations around the Indian Ocean, killing more than 100,000 people. In India, the Andaman Islands and the coastal areas of Tamil Nadu, Andhra Pradesh and Kerala took a heavy toll.',
    'In Andhra Pradesh, 104 people died and losses reached Rs. 32.5 crores across the districts of Krishna, Guntur and Nellore. In Tamil Nadu, more than 6,200 people died in the coastal areas, with Nagapattinam the worst hit, and damage ran into crores of rupees.',
  ],
  response: [
    { title: 'Education of Children', desc: "The project's focus: helping children in the affected areas continue their education — in keeping with INF's long-standing focus on schools and learning." },
    { title: 'Homes for Orphans', desc: 'Helping adoption agencies find homes for children orphaned by the tsunami.' },
    { title: 'Nets & Equipment for Fishermen', desc: 'Helping fishermen and women replace nets and other equipment necessary for their livelihood.' },
    { title: 'Every Dollar to Victims', desc: "INF pledged that every dollar contributed, or matched by a donor's employer, would be used to help tsunami victims in India. Members were encouraged to request matching gifts from their employers." },
  ],
  stats: [
    { value: '3', label: 'Relief Priorities' },
    { value: '2', label: 'States Supported' },
    { value: '100%', label: 'Of Gifts Pledged to Victims' },
    { value: 'Dec 2004', label: 'Relief Fund Launched' },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&auto=format',
  ],
  quote: {
    text: 'India Network Foundation prides itself in providing direct help to victims and affected areas.',
    author: 'India Network Foundation',
    role: 'Tsunami Relief Project appeal, 2004',
  },
  related: {
    text: 'INF has delivered direct relief after cyclones, earthquakes and floods since 1996.',
    label: 'See all relief efforts',
    to: '/programs/disaster-relief',
  },
}

export default function TsunamiRelief2004Page() {
  return <PastProjectLayout project={project} />
}
