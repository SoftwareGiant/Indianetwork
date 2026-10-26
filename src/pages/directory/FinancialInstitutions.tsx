import { useState } from 'react';
import { Link } from 'react-router';

type InstitutionType = 'State Bank Group' | 'Nationalised Bank' | 'Co-operative & Rural' | 'Financial Institution' | 'Insurance' | 'Securities & Exchanges' | 'Other';
type Category = 'All' | InstitutionType;

interface Institution {
  name: string;
  type: InstitutionType;
  website: string;
}

const institutions: Institution[] = [
  { name: "Reserve Bank of India (RBI)", type: "Financial Institution", website: "http://www.rbi.org.in/" },
  { name: "State Bank of Bikaner and Jaipur (SBBJ)", type: "State Bank Group", website: "http://www.sbbjbank.com/" },
  { name: "State Bank of Hyderabad (SBH)", type: "State Bank Group", website: "http://www.sbhyd.com/" },
  { name: "State Bank of India (SBI)", type: "State Bank Group", website: "http://www.sbi.co.in/" },
  { name: "State Bank of Indore (SBIR)", type: "State Bank Group", website: "http://www.indorebank.org/" },
  { name: "State Bank of Mysore (SBM)", type: "State Bank Group", website: "http://www.mysorebank.com/" },
  { name: "State Bank of Patiala (SBP)", type: "State Bank Group", website: "http://www.sbp.co.in/" },
  { name: "State Bank of Saurashtra (SBS)", type: "State Bank Group", website: "http://www.sbsbank.com/" },
  { name: "State Bank of Travancore (SBT)", type: "State Bank Group", website: "http://www.statebankoftravancore.com/" },
  { name: "Allahabad Bank", type: "Nationalised Bank", website: "http://www.allahabadbank.com/" },
  { name: "Andhra Bank", type: "Nationalised Bank", website: "http://www.andhrabank-india.com/" },
  { name: "Bank of Baroda", type: "Nationalised Bank", website: "http://www.bankofbaroda.com/" },
  { name: "Bank of India", type: "Nationalised Bank", website: "http://www.bankofindia.com/" },
  { name: "Bank of Maharashtra", type: "Nationalised Bank", website: "http://www.maharashtrabank.com/" },
  { name: "Canara Bank", type: "Nationalised Bank", website: "http://www.canbankindia.com/" },
  { name: "Central Bank of India", type: "Nationalised Bank", website: "http://www.centralbankofindia.co.in/" },
  { name: "Corporation Bank", type: "Nationalised Bank", website: "http://www.corpbank.com/" },
  { name: "Dena Bank", type: "Nationalised Bank", website: "http://www.denabank.com/" },
  { name: "Indian Bank", type: "Nationalised Bank", website: "http://www.indian-bank.com/" },
  { name: "Indian Overseas Bank", type: "Nationalised Bank", website: "http://www.iob.com/" },
  { name: "Oriental Bank of Commerce (OBC)", type: "Nationalised Bank", website: "http://www.obcindia.com/" },
  { name: "Punjab and Sind Bank", type: "Nationalised Bank", website: "http://www.psbindia.com/" },
  { name: "Punjab National Bank (PNB)", type: "Nationalised Bank", website: "http://www.pnbindia.com/" },
  { name: "Syndicate Bank", type: "Nationalised Bank", website: "http://www.syndicatebank.com/" },
  { name: "UCO Bank", type: "Nationalised Bank", website: "http://www.ucobank.com/" },
  { name: "Union Bank of India", type: "Nationalised Bank", website: "http://www.unionbankofindia.com/" },
  { name: "United Bank of India (UBI)", type: "Nationalised Bank", website: "http://www.unitedbankofindia.com/" },
  { name: "Vijaya Bank", type: "Nationalised Bank", website: "http://www.vijayabank.com/" },
  { name: "Bihar State Co-operative Bank Limited (BSCB)", type: "Co-operative & Rural", website: "http://biharbank.bih.nic.in/" },
  { name: "District Co-operative Central Bank Limited, Bidar, Karnataka", type: "Co-operative & Rural", website: "http://dccbank.com/" },
  { name: "Haryana State Co-operative Apex Bank Limited (HARCOBANK)", type: "Co-operative & Rural", website: "http://harcobank.nic.in/" },
  { name: "National Federation of State Co-operative Banks Limited (NAFSCOB)", type: "Co-operative & Rural", website: "http://www.nafscob.org/" },
  { name: "Orissa State Co-operative Bank Limited (OSCB)", type: "Co-operative & Rural", website: "http://www.oscb.coop/" },
  { name: "Repatriates Co-operative Finance and Development Bank Limited", type: "Co-operative & Rural", website: "http://mha.nic.in/REPCO%20BANK.htm" },
  { name: "Agriculture Planning and Information Bank (APIB)", type: "Co-operative & Rural", website: "http://megapib.nic.in/" },
  { name: "National Bank for Agriculture and Rural Development (NABARD)", type: "Co-operative & Rural", website: "http://www.nabard.org/" },
  { name: "Andhra Pradesh State Financial Corporation (APSFC)", type: "Financial Institution", website: "http://www.apsfc.com/" },
  { name: "Andhra Pradesh State Minorities Finance Corporation Limited (APMFC)", type: "Financial Institution", website: "http://www.apsmfc.com/" },
  { name: "Credit Guarantee Fund Trust for Small Industries (CGTSI)", type: "Financial Institution", website: "http://www.cgtsi.org.in/" },
  { name: "Delhi SC/ST/OBC, Minorities and Handicapped Finance and Development Corporation Limited (DSFDC)", type: "Financial Institution", website: "http://dsfdc.delhigovt.nic.in/" },
  { name: "Economic Development Corporation Limited, Goa", type: "Financial Institution", website: "http://www.edc-goa.com/" },
  { name: "Export-Import Bank of India", type: "Financial Institution", website: "http://www.eximbankindia.com/" },
  { name: "Himachal Pradesh Financial Corporation (HPFC)", type: "Financial Institution", website: "http://hpfc.nic.in/" },
  { name: "Indian Railway Finance Corporation Limited (IRFC)", type: "Financial Institution", website: "http://irfc.nic.in/" },
  { name: "Indian Renewable Energy Development Agency Limited (IREDA)", type: "Financial Institution", website: "http://ireda.nic.in/" },
  { name: "Industrial Development Bank of India (IDBI)", type: "Financial Institution", website: "http://www.idbi.com/" },
  { name: "Industrial Investment Bank of India Limited (IIBI)", type: "Financial Institution", website: "http://www.iibiltd.com/" },
  { name: "Madhya Pradesh Financial Corporation (MPFC)", type: "Financial Institution", website: "http://www.mpfc.org/" },
  { name: "National Minorities Development and Finance Corporation (NMDFC)", type: "Financial Institution", website: "http://www.nmdfc.org/" },
  { name: "National Safai Karamcharis Finance and Development Corporation (NSKFDC)", type: "Financial Institution", website: "http://nskfdc.nic.in/" },
  { name: "National Scheduled Castes Finance and Development Corporatioin (NSFDC)", type: "Financial Institution", website: "http://nsfdc.nic.in/" },
  { name: "North Eastern Development Finance Corporation (NEDFI)", type: "Financial Institution", website: "http://www.nedfi.com/" },
  { name: "Power Finance Corporation Limited", type: "Financial Institution", website: "http://pfc.gov.in/" },
  { name: "Rajasthan Finance Corporation (RFC)", type: "Financial Institution", website: "http://www.rfconline.org/" },
  { name: "Rural Electrification Corporation Limited", type: "Financial Institution", website: "http://recindia.nic.in/" },
  { name: "Scheduled Caste/Scheduled Tribes, Other Backward Classes, Minorities and Handicapped Financial and Development Corporation Limited, Dadra and Nagar Haveli, Daman and Diu", type: "Financial Institution", website: "http://www.scstcorpndddnh.com/" },
  { name: "Small Industries Development Bank of India (SIDBI)", type: "Financial Institution", website: "http://www.sidbi.com/" },
  { name: "Tamil Nadu Industrial Investment Corporation Limited", type: "Financial Institution", website: "http://www.tiic.org/" },
  { name: "Unit Trust of India (UTI)", type: "Financial Institution", website: "http://www.unittrustofindia.com/" },
  { name: "Uttar Pradesh Financial Corporation (UPFC)", type: "Financial Institution", website: "http://www.upfcindia.com/" },
  { name: "Agriculture Insurance Company of India Limited", type: "Insurance", website: "http://aicofindia.nic.in/" },
  { name: "Employees’ State Insurance Corporation (ESIC)", type: "Insurance", website: "http://esic.nic.in/" },
  { name: "Export Credit Guarantee Corporation of India Limited (ECGC)", type: "Insurance", website: "http://www.ecgcindia.com/" },
  { name: "General Insurance Corporation of India (GIC)", type: "Insurance", website: "http://www.gicofindia.com/" },
  { name: "Insurance Regulatory and Development Authority", type: "Insurance", website: "http://www.irdaindia.org/" },
  { name: "Life Insurance Corporation of India (LIC)", type: "Insurance", website: "http://www.licindia.com/" },
  { name: "National Insurance Company Limited (NICL)", type: "Insurance", website: "http://www.nationalinsuranceindia.com/" },
  { name: "New India Assurance Company Limited (NIACL)", type: "Insurance", website: "http://www.niacl.com/" },
  { name: "Oriental Insurance Company Limited (OICL)", type: "Insurance", website: "http://orientalinsurance.nic.in/" },
  { name: "SBI Life Insurance Company Limited (SBI LIFE)", type: "Insurance", website: "http://www.sbilife.co.in/" },
  { name: "United India Insurance Company Limited", type: "Insurance", website: "http://www.uiic.co.in/" },
  { name: "Central Depository Services (India) Limited (CDSL)", type: "Securities & Exchanges", website: "http://www.cdslindia.com/" },
  { name: "Inter-connected Stock Exchange of India Limited (ISE)", type: "Securities & Exchanges", website: "http://www.iseindia.com/" },
  { name: "National Securities Depository Limited (NSDL)", type: "Securities & Exchanges", website: "http://www.nsdl.co.in/" },
  { name: "National Stock Exchange (NSE), India", type: "Securities & Exchanges", website: "http://www.nse-india.com/" },
  { name: "Securities and Exchange Board of India (SEBI)", type: "Securities & Exchanges", website: "http://www.sebi.gov.in/" },
  { name: "Stock Exchange, Kolkata", type: "Securities & Exchanges", website: "http://www.cse-india.com/" },
  { name: "Stock Exchange, Mumbai (BSE)", type: "Securities & Exchanges", website: "http://www.bseindia.com/" },
  { name: "Stock Exchange, Pune", type: "Securities & Exchanges", website: "http://www.punestockexchange.com/" },
  { name: "Stock Holding Corporation of India Limited (SHCIL)", type: "Securities & Exchanges", website: "http://www.shcil.com/" },
  { name: "Asian Development Bank (ADB)", type: "Other", website: "http://www.adb.org/India" },
  { name: "Chit Fund Department, Delhi", type: "Other", website: "http://chitfund.delhigovt.nic.in/" },
  { name: "Directorate of Institutional Finance (DIF), Chhattisgarh", type: "Other", website: "http://cgdif.nic.in/" },
  { name: "Financial Intelligence Unit – India (FIU-IND)", type: "Other", website: "http://fiuindia.gov.in/" },
  { name: "INMB Bank Limited, Lagos, Nigeria", type: "Other", website: "http://www.inmb.net/" },
  { name: "Institute for Development and Research in Banking Technology (IDRBT)", type: "Other", website: "http://www.idrbt.ac.in/" },
  { name: "National Housing Bank (NHB)", type: "Other", website: "http://nhb.org.in/" },
  { name: "SBI Commercial and International Bank Limited (SBICI)", type: "Other", website: "http://www.sbici.com/" },
  { name: "SBI Discount and Finance House of India Limited (SBI DFHI)", type: "Other", website: "http://www.sbidfhi.com/" },
  { name: "SBI Factors and Commercial Services Private Limited (SBI FACTORS)", type: "Other", website: "http://www.sbifactors.com/" },
  { name: "SBI Funds Management Private Limited (SBI FUNDS)", type: "Other", website: "http://www.sbimf.com/" },
  { name: "SME Rating Agency of India Limited (SMERA)", type: "Other", website: "http://www.smera.in/" },
  { name: "State Bank of India (California)", type: "Other", website: "http://www.sbical.com/" },
  { name: "State Bank of India (Canada)", type: "Other", website: "http://www.sbicanada.com/" },
  { name: "World Bank", type: "Other", website: "http://www.worldbank.org.in/" },
];

const typeBadgeColors: Record<string, string> = {
  "State Bank Group": "bg-blue-100 text-blue-700",
  "Nationalised Bank": "bg-indigo-100 text-indigo-700",
  "Co-operative & Rural": "bg-green-100 text-green-700",
  "Financial Institution": "bg-orange-100 text-orange-700",
  Insurance: "bg-teal-100 text-teal-700",
  "Securities & Exchanges": "bg-purple-100 text-purple-700",
  Other: "bg-gray-100 text-gray-700",
};

const categories: Category[] = ['All', 'State Bank Group', 'Nationalised Bank', 'Co-operative & Rural', 'Financial Institution', 'Insurance', 'Securities & Exchanges', 'Other'];

export default function FinancialInstitutionsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = institutions.filter((inst) => {
    const matchesSearch = inst.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || inst.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF9F3" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#0D2B45" }} className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-blue-200 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/directory" className="hover:text-white transition-colors">
              Directory
            </Link>
            <span>/</span>
            <span className="text-white">Indian Financial Institutions</span>
          </nav>
          <span
            className="inline-block rounded-full text-xs font-semibold px-4 py-1 mb-4"
            style={{ backgroundColor: "#F47C20", color: "#fff" }}
          >
            Directory
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Indian Financial Institutions
          </h1>
          <p className="text-blue-200 text-base max-w-xl">
            Banks, financial institutions, insurance companies and exchanges in India.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search institutions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                style={
                  activeCategory === cat
                    ? { backgroundColor: "#F47C20", color: "#fff" }
                    : { backgroundColor: "#fff", color: "#0D2B45", border: "1px solid #e5e7eb" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-16">No institutions found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((inst) => (
              <div
                key={inst.name}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-bold text-base leading-tight" style={{ color: "#0D2B45" }}>
                    {inst.name}
                  </h3>
                  <span
                    className={`rounded-full text-xs font-semibold px-3 py-1 whitespace-nowrap ${typeBadgeColors[inst.type]}`}
                  >
                    {inst.type}
                  </span>
                </div>
                <a
                  href={inst.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto rounded-full text-sm font-semibold px-4 py-2 transition-colors self-start"
                  style={{ backgroundColor: "#0D2B45", color: "#fff" }}
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-10">Source: Government of India information web sites.</p>
      </div>
    </div>
  );
}
