import { createBrowserRouter } from 'react-router'
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
import ExplorerBasicPage from './pages/projects/insurance/ExplorerBasic'
import IndiaTravelerPage from './pages/projects/insurance/IndiaTraveler'
import EliteProtectionPage from './pages/projects/insurance/EliteProtection'
import CertificatePage from './pages/projects/insurance/Certificate'

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

// Membership
import MembersPage from './pages/Members'

export const router = createBrowserRouter([
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
      { path: 'projects/insurance/explorer-basic', Component: ExplorerBasicPage },
      { path: 'projects/insurance/india-traveler', Component: IndiaTravelerPage },
      { path: 'projects/insurance/elite-protection', Component: EliteProtectionPage },
      { path: 'projects/insurance/certificate', Component: CertificatePage },
      { path: 'projects/nyu-scholarship', Component: NyuScholarshipPage },
      { path: 'projects/academic-travel-grants', Component: AcademicTravelGrantsPage },

      // Past project detail pages
      { path: 'projects/past/orissa-cyclone-relief', Component: OrissaCycloneReliefPage },
      { path: 'projects/past/gujarat-earthquake-relief', Component: GujaratEarthquakeReliefPage },
      { path: 'projects/past/gujarat-cyclone-relief', Component: GujaratCycloneReliefPage },
      { path: 'projects/past/kargil-operation-care', Component: KargilOperationCarePage },
      { path: 'projects/past/andhra-pradesh-projects', Component: AndhraProjectsPage },
      { path: 'projects/past/maps-project', Component: MapsProjectPage },

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
