import PastProjectLayout, { type PastProject } from '../../../components/PastProjectLayout'

const project: PastProject = {
  title: 'Gujarat Cyclone Relief 1998',
  breadcrumb: 'Gujarat Cyclone Relief',
  year: '1998',
  category: 'Disaster Relief',
  heroImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1800&h=800&fit=crop&auto=format',
  overviewImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&h=500&fit=crop&auto=format',
  facts: [
    { label: 'Date', value: 'June 1998' },
    { label: 'Location', value: 'Cyclone-affected areas of Gujarat' },
    { label: 'Fund', value: 'Gujarat Cyclone Relief Fund' },
    { label: 'Partners', value: 'Sri Ramakrishna Mission & Vivekananda Memorial' },
    { label: 'Status', value: 'Completed' },
  ],
  challenge: [
    'In June 1998, Gujarat was hit by a severe cyclone. The storm devastated many areas and killed thousands of people. The Government of Gujarat was doing all it could with the resources available, but the situation was very grave.',
  ],
  response: [
    {
      title: 'Relief Fund Launched',
      desc: 'At the request of several members, India Network Foundation launched the "Gujarat Cyclone Relief Fund" to assist government efforts to provide immediate relief to families.',
    },
    {
      title: 'Basic Infrastructure',
      desc: 'Funds were directed to establishing basic facilities such as water, food, medical care and shelter in the affected areas.',
    },
    {
      title: 'Matching Grants',
      desc: 'Members were encouraged to request matching grant contributions from their employers. All contributions to the fund were tax-exempt in the United States.',
    },
    {
      title: 'Trusted Partners',
      desc: 'With contributions from our members, INF donated funds to Sri Ramakrishna Mission and Vivekananda Memorial, Gujarat, to help cyclone victims in 1998–1999.',
    },
  ],
  stats: [
    { value: '1998', label: 'Year of Relief' },
    { value: '100%', label: 'Tax-Exempt Gifts' },
    { value: '4', label: 'Relief Priorities' },
    { value: 'Members', label: 'Funded the Effort' },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop&auto=format',
  ],
  quote: {
    text: 'The situation is very grave and your timely support is vital to bring this region of India back to normal.',
    author: 'India Network Foundation',
    role: 'Appeal to members, June 1998',
  },
}

export default function GujaratCycloneReliefPage() {
  return <PastProjectLayout project={project} />
}
