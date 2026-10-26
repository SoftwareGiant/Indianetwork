import PastProjectLayout, { type PastProject } from '../../../components/PastProjectLayout'
import ApSchoolList, { apSchoolCount } from '../../../components/ApSchoolList'

const project: PastProject = {
  title: 'Andhra Pradesh Cyclone Relief 1996',
  breadcrumb: 'AP Cyclone Relief 1996',
  year: '1996 – 1997',
  category: 'Education & Relief',
  heroImage: '/images/inf/ap-hsduvva1.jpg',
  overviewImage: '/images/inf/ap-school.jpg',
  facts: [
    { label: 'Disaster', value: 'Cyclone, November 1996' },
    { label: 'Location', value: 'East & West Godavari Districts, Andhra Pradesh' },
    { label: 'Focus', value: 'Primary schools and education' },
    { label: 'Led by', value: 'Dr. K.V. Rao, President, INF' },
    { label: 'Status', value: 'Completed' },
  ],
  challenge: [
    'In November 1996, a cyclone caused heavy damage in Andhra Pradesh. In response to a call from the Chief Minister of Andhra Pradesh, India Network Foundation launched a fund-raising campaign to help the victims. As individuals had already been helped by governmental and non-governmental agencies, INF decided to focus on primary education — the most neglected part of the education system in rural India.',
    'The state of primary schools was poor. Many had no proper building, and grades 1 to 5 were often taught in one room by one or two teachers. Schools had no safe place to keep student records, and paper maps supplied by government agencies were destroyed by frequent floods, cyclones and rats.',
  ],
  response: [
    { title: 'Visiting 150 Schools', desc: 'In December 1996, Dr. K.V. Rao spent three and a half weeks in Andhra Pradesh at his own expense, visiting as many as 150 schools and villages in remote areas to assess the damage. Headmasters were asked to list the needs the government might never provide.' },
    { title: 'Steel Almirahs for Records', desc: 'Godrej-type steel almirahs with safes (5.5 ft by 2.5 ft), manufactured locally, giving schools a secure, long-lasting place to keep student records.' },
    { title: 'Laminated Wall Maps', desc: 'Laminated maps of the World, India and Andhra Pradesh to replace paper maps that floods, cyclones and rats had destroyed.' },
    { title: 'Safe Drinking Water', desc: 'Stainless steel water drums with glasses for children, and help obtaining a water tap where a supply existed.' },
    { title: 'Roof Repairs', desc: 'Asbestos sheets to repair school roofs damaged in the cyclone where the government might not provide funds.' },
    { title: 'School Sites & Buildings', desc: 'INF purchased school sites in two villages and provided partial funding for new buildings where the government would match the contribution.' },
  ],
  stats: [
    { value: '150', label: 'Schools & Villages Visited' },
    { value: '~400', label: 'Schools to Be Equipped' },
    { value: String(apSchoolCount), label: 'Schools Listed as Helped' },
    { value: '3½ wks', label: 'Field Visit by Dr. Rao' },
  ],
  gallery: [
    '/images/inf/ap-hsduvva1.jpg', '/images/inf/ap-hsduvva3.jpg', '/images/inf/ap-hsduvva5.jpg',
    '/images/inf/ap-korimilli.jpg', '/images/inf/ap-korimilli4.jpg', '/images/inf/ap-school3.jpg',
    '/images/inf/ap-srinivas.jpg', '/images/inf/ap-pvp.jpg', '/images/inf/ap-godrej1.jpg',
    '/images/inf/ap-c_house.gif', '/images/inf/ap-crane.gif', '/images/inf/ap-tree1.jpg',
  ],
  quote: {
    text: 'The India Network encourages individual members to adopt a school of their own choice and allow India Network to continue these efforts to strengthen primary education in India — the most neglected part of the education system in rural India.',
    author: 'India Network Foundation',
    role: 'First Report on the Andhra Pradesh Cyclone Relief Project, 29 January 1997',
  },
  related: {
    text: 'Several community projects were also presented to INF during this visit and offered for sponsorship.',
    label: 'See the Andhra Pradesh Projects',
    to: '/projects/past/andhra-pradesh-projects',
  },
}

function MeetingsAndSchools() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-2 space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
          <h2 className="text-3xl font-800 mb-2" style={{ color: '#0D2B45' }}>Working with Local Leaders</h2>
          <p>Dr. Rao met Sri D. Ramakrishna, IAS, Collector of West Godavari District, who extended the greatest co-operation to INF's goal of helping primary schools in his district, and Sri J.S.V. Prasad, IAS, Collector of East Godavari District.</p>
          <p>Sri M.V. Krishna Rao, Member of the Legislative Assembly from Tanuku, promised matching grants of up to 100% for funds spent by INF, and Sri Bolla Bulliramaiah, Minister for Commerce, also pledged his support. Elementary school teachers in every village opened their schools and classrooms for the visit.</p>
          <p>Dr. Rao also spent four hours at the Cyclone Warning Center in Visakhapatnam, learning how it helps evacuate people from coastal districts and how upgraded computers could strengthen its work.</p>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-3xl font-800 mb-2" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>Schools That Received Help</h2>
          <p className="text-gray-500 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Schools in the Undrajavaram, Tanuku and Peravali Mandals of West Godavari District, with their number of students and teachers.</p>
          <ApSchoolList />
        </div>
      </div>
    </section>
  )
}

export default function AndhraCycloneRelief1996Page() {
  return (
    <PastProjectLayout project={project}>
      <MeetingsAndSchools />
    </PastProjectLayout>
  )
}
