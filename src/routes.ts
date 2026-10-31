import { createBrowserRouter, redirect } from 'react-router'
import Root from './components/Root'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ProgramsPage from './pages/Programs'
import ImpactPage from './pages/Impact'
import VolunteerPage from './pages/Volunteer'
import NewsPage from './pages/News'
import DonatePage from './pages/Donate'
import ContactPage from './pages/Contact'

// Program pages
import EducationPage from './pages/programs/Education'
import HealthcarePage from './pages/programs/Healthcare'
import CommunityPage from './pages/programs/Community'
import DisasterReliefPage from './pages/programs/DisasterRelief'
import CulturalPreservationPage from './pages/programs/CulturalPreservation'
import TravelGrantsPage from './pages/programs/TravelGrants'
import SeniorSupportPage from './pages/programs/SeniorSupport'
import YouthDevelopmentPage from './pages/programs/YouthDevelopment'

// Project pages
import InfProjectsPage from './pages/projects/InfProjects'
import MemberProjectsPage from './pages/projects/MemberProjects'
import PastProjectsPage from './pages/projects/PastProjects'
import TravelInsurancePage from './pages/projects/TravelInsurance'
import NyuScholarshipPage from './pages/projects/NyuScholarship'
import AcademicTravelGrantsPage from './pages/projects/AcademicTravelGrants'
import PlanDetailsPage from './pages/projects/insurance/PlanDetails'
import CheckoutPage from './pages/projects/insurance/Checkout'
import VoucherLookupPage from './pages/projects/insurance/VoucherLookup'

// Policy pages
import PrivacyPolicyPage from './pages/PrivacyPolicy'
import TermsOfUsePage from './pages/TermsOfUse'

// Directory pages
import DirectoryIndexPage from './pages/directory/DirectoryIndex'
import FinancialInstitutionsPage from './pages/directory/FinancialInstitutions'
import EmbassiesPage from './pages/directory/Embassies'
import FacultyPage from './pages/directory/Faculty'
import NitpuSitesPage from './pages/directory/NitpuSites'

// Past project detail pages
import OrissaCycloneReliefPage from './pages/projects/past/OrissaCycloneRelief'
import GujaratEarthquakeReliefPage from './pages/projects/past/GujaratEarthquakeRelief'
import GujaratCycloneReliefPage from './pages/projects/past/GujaratCycloneRelief'
import KargilOperationCarePage from './pages/projects/past/KargilOperationCare'
import AndhraProjectsPage from './pages/projects/past/AndhraProjects'
import MapsProjectPage from './pages/projects/past/MapsProject'
import AndhraCycloneRelief1996Page from './pages/projects/past/AndhraCycloneRelief1996'
import TsunamiRelief2004Page from './pages/projects/past/TsunamiRelief2004'

// Archive pages (Projects submenu)
import InfInitiativesPage from './pages/projects/InfInitiatives'
import CulturePage from './pages/projects/Culture'
import IndianStampsPage from './pages/projects/IndianStamps'
import PioCardPage from './pages/projects/PioCard'
import PressReleasesPage from './pages/projects/PressReleases'

// Membership
import MembersPage from './pages/Members'

// Admin panel (outside the site layout)
import AdminPage from './pages/admin/Admin'

export const router = createBrowserRouter([
  { path: '/admin', Component: AdminPage },
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },

      // Programs
      { path: 'programs', Component: ProgramsPage },
      { path: 'programs/education', Component: EducationPage },
      { path: 'programs/healthcare', Component: HealthcarePage },
      { path: 'programs/community', Component: CommunityPage },
      { path: 'programs/disaster-relief', Component: DisasterReliefPage },
      { path: 'programs/cultural-preservation', Component: CulturalPreservationPage },
      { path: 'programs/travel-grants', Component: TravelGrantsPage },
      { path: 'programs/senior-support', Component: SeniorSupportPage },
      { path: 'programs/youth-development', Component: YouthDevelopmentPage },

      // Projects
      { path: 'projects/inf-projects', Component: InfProjectsPage },
      { path: 'projects/member-projects', Component: MemberProjectsPage },
      { path: 'projects/past-projects', Component: PastProjectsPage },
      { path: 'projects/past', Component: PastProjectsPage },
      { path: 'projects/travel-insurance', Component: TravelInsurancePage },
      { path: 'projects/insurance/plan', Component: PlanDetailsPage },
      { path: 'projects/insurance/checkout', Component: CheckoutPage },
      { path: 'voucher', Component: VoucherLookupPage },
      // Old placeholder plan pages now go to the live quote
      { path: 'projects/insurance/:old', loader: () => redirect('/projects/travel-insurance') },
      { path: 'projects/nyu-scholarship', Component: NyuScholarshipPage },
      { path: 'projects/academic-travel-grants', Component: AcademicTravelGrantsPage },
      { path: 'projects/inf-initiatives', Component: InfInitiativesPage },
      { path: 'projects/culture', Component: CulturePage },
      { path: 'projects/indian-stamps', Component: IndianStampsPage },
      { path: 'projects/pio-card', Component: PioCardPage },
      { path: 'projects/press-releases', Component: PressReleasesPage },

      // Past project detail pages
      { path: 'projects/past/orissa-cyclone-relief', Component: OrissaCycloneReliefPage },
      { path: 'projects/past/gujarat-earthquake-relief', Component: GujaratEarthquakeReliefPage },
      { path: 'projects/past/gujarat-cyclone-relief', Component: GujaratCycloneReliefPage },
      { path: 'projects/past/kargil-operation-care', Component: KargilOperationCarePage },
      { path: 'projects/past/andhra-pradesh-projects', Component: AndhraProjectsPage },
      { path: 'projects/past/maps-project', Component: MapsProjectPage },
      { path: 'projects/past/andhra-pradesh-cyclone-relief-1996', Component: AndhraCycloneRelief1996Page },
      { path: 'projects/past/tsunami-relief-2004', Component: TsunamiRelief2004Page },

      // Directory pages
      { path: 'directory', Component: DirectoryIndexPage },
      { path: 'directory/financial-institutions', Component: FinancialInstitutionsPage },
      { path: 'directory/embassies', Component: EmbassiesPage },
      { path: 'directory/faculty', Component: FacultyPage },
      { path: 'directory/nitpu-sites', Component: NitpuSitesPage },

      // Policy pages
      { path: 'privacy-policy', Component: PrivacyPolicyPage },
      { path: 'terms-of-use', Component: TermsOfUsePage },

      // Other pages
      { path: 'members', Component: MembersPage },
      { path: 'impact', Component: ImpactPage },
      { path: 'volunteer', Component: VolunteerPage },
      { path: 'news', Component: NewsPage },
      { path: 'donate', Component: DonatePage },
      { path: 'contact', Component: ContactPage },
    ],
  },
])
