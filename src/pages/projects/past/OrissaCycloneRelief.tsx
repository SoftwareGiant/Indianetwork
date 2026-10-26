import PastProjectLayout, { type PastProject } from '../../../components/PastProjectLayout'

const project: PastProject = {
  title: 'Orissa Cyclone Relief 1999',
  breadcrumb: 'Orissa Cyclone Relief',
  year: '1999',
  category: 'Disaster Relief',
  heroImage: '/images/inf/orissa-1.jpg',
  overviewImage: '/images/inf/orissa-2.jpg',
  facts: [
    { label: 'Date', value: 'November 1999' },
    { label: 'Location', value: 'Ganjam District & coastal Orissa' },
    { label: 'Beneficiaries', value: '1,000 families in three villages' },
    { label: 'Project Director', value: 'K. Balakrishna' },
    { label: 'Status', value: 'Completed' },
  ],
  challenge: [
    'The super cyclone devastated the lower Orissa coast in late 1999. Reports from our office in India showed that the situation in Orissa villages was far worse than newspapers reported — many villagers had received only two kg of rice, and only once, after the cyclone. Distribution was very limited and villagers were struggling to survive.',
    'Relief trucks faced obstacles on the highways and looting of goods meant for victims became a serious problem for relief agencies. Conditions were so harsh that one volunteer contracted malaria during the distribution.',
  ],
  response: [
    {
      title: 'Rice Distribution',
      desc: 'Under the direction of Project Director K. Balakrishna, INF distributed 10 kg bags of rice to 1,000 families in an orderly fashion in remote tribal villages of Ganjam District, which were not receiving material from the big cities and towns.',
    },
    {
      title: 'Local Volunteers & Staff',
      desc: 'INF staff were assisted by volunteers and revenue staff allocated by the District Collector, West Godavari, with permission from the Village Administrative Officers Association of the AP Government.',
    },
    {
      title: 'Support to Educational Institutions',
      desc: 'Dr. K.V. Rao met Sri Ashok Kumar Tripathi, IAS, Commissioner & Secretary of Mass Education, Government of Orissa, to assess damage to schools and link donors to government high schools needing reconstruction.',
    },
    {
      title: 'Other Aid Efforts',
      desc: 'Further relief work was carried out across Cuttack, Kendrapara, Konark and Paradip, the areas worst hit by the cyclone.',
    },
  ],
  stats: [
    { value: '1,000', label: 'Families Fed' },
    { value: '10 kg', label: 'Rice per Family' },
    { value: '3', label: 'Villages Reached' },
    { value: '1999', label: 'Year of Relief' },
  ],
  gallery: ['/images/inf/orissa-1.jpg', '/images/inf/orissa-3.jpg', '/images/inf/orissa-4.jpg', '/images/inf/orissa-schools.jpg', '/images/inf/orissa-2.jpg'],
  quote: {
    text: 'There is greater need for rice distribution to the cyclone hit remote villages which are not getting the material from big cities and towns.',
    author: 'India Network Foundation',
    role: 'Field report, November 1999',
  },
}

export default function OrissaCycloneReliefPage() {
  return <PastProjectLayout project={project} />
}
