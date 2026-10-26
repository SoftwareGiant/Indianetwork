import PastProjectLayout, { type PastProject } from '../../../components/PastProjectLayout'

const project: PastProject = {
  title: 'Map Set Donation Project',
  breadcrumb: 'Maps Project',
  year: '1998 – 1999',
  category: 'Education',
  heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1800&h=800&fit=crop&auto=format',
  overviewImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=700&h=500&fit=crop&auto=format',
  facts: [
    { label: 'Duration', value: 'December 1998 – July 1999' },
    { label: 'Location', value: 'Schools across India' },
    { label: 'Map Set', value: 'World, India & State wall maps (laminated)' },
    { label: 'Cost per Set', value: '$20 including all expenses' },
    { label: 'Status', value: 'All ordered sets delivered' },
  ],
  challenge: [
    'Many elementary schools in rural India lacked even basic teaching aids such as classroom wall maps. India Network received many requests to help schools that had received similar gifts earlier, as well as new requests from across the country.',
    'Delivering to remote schools was hard — in some instances nothing worked and sending a person with the maps was the only way.',
  ],
  response: [
    {
      title: 'Government-Approved Maps',
      desc: 'Each set had three laminated wall maps — World, India and State — approved by the Government of India and available in English, Hindi, Kannada, Tamil, Telugu, Malayalam, Oriya, Bengali and Gujarati.',
    },
    {
      title: 'Donor-Chosen Schools',
      desc: 'Donors specified the school to receive the maps, or INF allocated them to schools in need. Each school was asked to send an acknowledgment directly to the donor.',
    },
    {
      title: 'Volunteer Delivery',
      desc: 'India Network volunteers travelled to remote villages in Maharashtra, Gujarat and Karnataka to hand-deliver map sets and keep our promise to schools anywhere in India.',
    },
    {
      title: 'Letters of Appreciation',
      desc: 'Schools from Tamil Nadu to Rajasthan — including Kendriya Vidyalaya IIT Mumbai and Sri Aurobindo Integral School — wrote back to thank donors for the maps.',
    },
  ],
  stats: [
    { value: '$20', label: 'Per Map Set' },
    { value: '9', label: 'Languages' },
    { value: '3', label: 'Maps per Set' },
    { value: '25+', label: 'Thank-you Letters' },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1760454634741-14469ef82f4f?w=400&h=300&fit=crop&auto=format',
  ],
  list: {
    title: 'Letters of Appreciation',
    intro: 'Letters from schools that received map sets donated through India Network Foundation.',
    items: [
      'M.R. Model High School',
      'Project High School, Srisailam Dam East',
      'Central School (Kendriya Vidyalaya), IIT Mumbai',
      'Panchayat Union Elementary School',
      'Vickramasingapuram School, Tamil Nadu',
      'Sovereign English School, Bangalore',
      'MPPUP School, Kakinada',
      'A school in Pune',
      'ZP School, Moolapeta',
      'Shri Jamnabai Sarvajanik Kanya Vidyalaya',
      'Sri Venkateswara Bala Kuteer, Syamalanagar, Guntur',
      'Sri Venkateswara Bala Kuteer, Brodiepet, Guntur',
      'T.M. Rao High School, Bhattiprolu',
      'Ananthady Higher Primary School',
      'Schools in Valsad, Gujarat',
      'A school in Rajasthan',
      'Sri Aurobindo Integral School',
      'Swami Nirmalananda Memorial Balabhavan, Kerala',
      'Kodalipeda Raghavaiah Elementary School',
      'Villagers and Headmaster of Middavaripalem',
    ],
  },
  quote: {
    text: 'We are excited and very pleased with the grassroots level effort to help elementary education in India with our limited resources and members assistance.',
    author: 'India Network Foundation',
    role: 'Maps Project',
  },
}

export default function MapsProjectPage() {
  return <PastProjectLayout project={project} />
}
