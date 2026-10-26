import PastProjectLayout, { type PastProject } from '../../../components/PastProjectLayout'

const project: PastProject = {
  title: 'Operation Care — Kargil 1999',
  breadcrumb: 'Operation Care (Kargil)',
  year: '1999',
  category: 'Relief to Soldiers & Families',
  heroImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1800&h=800&fit=crop&auto=format',
  overviewImage: 'https://images.unsplash.com/photo-1593113630400-ea4288922559?w=700&h=500&fit=crop&auto=format',
  facts: [
    { label: 'Date', value: 'June – August 1999' },
    { label: 'Location', value: 'Karnataka, New Delhi, Srinagar & Udhampur' },
    { label: 'Beneficiaries', value: 'Families of fallen soldiers & wounded jawans' },
    { label: 'Led by', value: 'Dr. K.V. Rao, President, INF' },
    { label: 'Status', value: 'Completed' },
  ],
  challenge: [
    'In response to several member requests, India Network Foundation launched a fund raising drive in June 1999 to help the families of soldiers in the Kargil action. It is the firm belief of the INF that immediate and direct assistance to beneficiaries is the only way to reach the real people.',
    'Identifying next of kin and getting cooperation from authorities was difficult — some families in remote areas had received nothing from the Government except paper statements.',
  ],
  response: [
    {
      title: 'Direct Aid to Families — Karnataka',
      desc: 'On July 17–18, 1999, INF distributed direct relief to all soldier families in Belgaum District, and provided financial support to families of soldiers from Karnataka, Kerala and Goa.',
    },
    {
      title: 'Army Base Hospital, New Delhi',
      desc: 'Checks were personally delivered to wounded soldiers. INF also donated 30 pedestal fans, a slit lamp, vacuum suction apparatus and funds to strengthen diagnosis and record keeping.',
    },
    {
      title: 'Research & Referral Hospital',
      desc: 'Dr. Rao handed over checks to about 35 critically wounded soldiers and donated two air-conditioning units to aid their recovery. Discharged soldiers also received assistance.',
    },
    {
      title: 'Udhampur Base Hospital',
      desc: '50 bags of fresh fruit were prepared and distributed to all wounded soldiers and officers at the Northern Command base hospital in Udhampur.',
    },
  ],
  stats: [
    { value: '35', label: 'Critically Wounded Aided' },
    { value: '30', label: 'Fans Donated' },
    { value: '50', label: 'Fruit Bags Delivered' },
    { value: '4', label: 'States Visited' },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1593113630400-ea4288922559?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop&auto=format',
  ],
  quote: {
    text: 'Writing checks to various relief organizations is very easy but no one can be sure how, when and in what shape the target beneficiary receives the help. Direct help is the only way to reach as many as we can quickly and efficiently.',
    author: 'Dr. K.V. Rao',
    role: 'Report on Operation Care, July 1999',
  },
}

export default function KargilOperationCarePage() {
  return <PastProjectLayout project={project} />
}
