import { useState } from 'react';
import { Link } from 'react-router';

type InstitutionType = 'State Bank Group' | 'Nationalised Bank' | 'Co-operative & Rural' | 'Financial Institution' | 'Insurance' | 'Securities & Exchanges' | 'Other';
type Category = 'All' | InstitutionType;

interface Institution {
  name: string;
  type: InstitutionType;
  website: string;
  note: string;
}

const institutions: Institution[] = [
  { name: "Reserve Bank of India (RBI)", type: "Financial Institution", website: "https://www.rbi.org.in/", note: "" },
  { name: "State Bank of Bikaner and Jaipur (SBBJ)", type: "State Bank Group", website: "https://sbi.bank.in/", note: "Merged into State Bank of India (2017)" },
  { name: "State Bank of Hyderabad (SBH)", type: "State Bank Group", website: "https://sbi.bank.in/", note: "Merged into State Bank of India (2017)" },
  { name: "State Bank of India (SBI)", type: "State Bank Group", website: "https://sbi.bank.in/", note: "" },
  { name: "State Bank of Indore (SBIR)", type: "State Bank Group", website: "https://sbi.bank.in/", note: "Merged into State Bank of India (2010)" },
  { name: "State Bank of Mysore (SBM)", type: "State Bank Group", website: "https://sbi.bank.in/", note: "Merged into State Bank of India (2017)" },
  { name: "State Bank of Patiala (SBP)", type: "State Bank Group", website: "https://sbi.bank.in/", note: "Merged into State Bank of India (2017)" },
  { name: "State Bank of Saurashtra (SBS)", type: "State Bank Group", website: "https://sbi.bank.in/", note: "Merged into State Bank of India (2008)" },
  { name: "State Bank of Travancore (SBT)", type: "State Bank Group", website: "https://sbi.bank.in/", note: "Merged into State Bank of India (2017)" },
  { name: "Allahabad Bank", type: "Nationalised Bank", website: "https://indianbank.in/", note: "Merged into Indian Bank (2020)" },
  { name: "Andhra Bank", type: "Nationalised Bank", website: "https://www.unionbankofindia.bank.in/", note: "Merged into Union Bank of India (2020)" },
  { name: "Bank of Baroda", type: "Nationalised Bank", website: "https://bankofbaroda.bank.in/", note: "" },
  { name: "Bank of India", type: "Nationalised Bank", website: "https://bankofindia.co.in/", note: "" },
  { name: "Bank of Maharashtra", type: "Nationalised Bank", website: "https://bankofmaharashtra.bank.in/", note: "" },
  { name: "Canara Bank", type: "Nationalised Bank", website: "https://canarabank.bank.in/", note: "" },
  { name: "Central Bank of India", type: "Nationalised Bank", website: "https://centralbank.bank.in/", note: "" },
  { name: "Corporation Bank", type: "Nationalised Bank", website: "https://www.unionbankofindia.bank.in/", note: "Merged into Union Bank of India (2020)" },
  { name: "Dena Bank", type: "Nationalised Bank", website: "https://bankofbaroda.bank.in/", note: "Merged into Bank of Baroda (2019)" },
  { name: "Indian Bank", type: "Nationalised Bank", website: "https://indianbank.in/", note: "" },
  { name: "Indian Overseas Bank", type: "Nationalised Bank", website: "https://www.iob.bank.in/", note: "" },
  { name: "Oriental Bank of Commerce (OBC)", type: "Nationalised Bank", website: "https://pnb.bank.in/", note: "Merged into Punjab National Bank (2020)" },
  { name: "Punjab and Sind Bank", type: "Nationalised Bank", website: "https://punjabandsindbank.co.in/", note: "" },
  { name: "Punjab National Bank (PNB)", type: "Nationalised Bank", website: "https://pnb.bank.in/", note: "" },
  { name: "Syndicate Bank", type: "Nationalised Bank", website: "https://canarabank.bank.in/", note: "Merged into Canara Bank (2020)" },
  { name: "UCO Bank", type: "Nationalised Bank", website: "https://uco.bank.in/", note: "" },
  { name: "Union Bank of India", type: "Nationalised Bank", website: "https://www.unionbankofindia.bank.in/", note: "" },
  { name: "United Bank of India (UBI)", type: "Nationalised Bank", website: "https://pnb.bank.in/", note: "Merged into Punjab National Bank (2020)" },
  { name: "Vijaya Bank", type: "Nationalised Bank", website: "https://bankofbaroda.bank.in/", note: "Merged into Bank of Baroda (2019)" },
  { name: "Bihar State Co-operative Bank Limited (BSCB)", type: "Co-operative & Rural", website: "https://biharscb.bank.in/", note: "" },
  { name: "District Co-operative Central Bank Limited, Bidar, Karnataka", type: "Co-operative & Rural", website: "", note: "Website not available" },
  { name: "Haryana State Co-operative Apex Bank Limited (HARCOBANK)", type: "Co-operative & Rural", website: "https://harcobank.org.in/", note: "" },
  { name: "National Federation of State Co-operative Banks Limited (NAFSCOB)", type: "Co-operative & Rural", website: "https://nafscob.org/", note: "" },
  { name: "Orissa State Co-operative Bank Limited (OSCB)", type: "Co-operative & Rural", website: "https://odishascb.com/", note: "Now the Odisha State Co-operative Bank" },
  { name: "Repatriates Co-operative Finance and Development Bank Limited", type: "Co-operative & Rural", website: "https://repcobank.com/", note: "Repco Bank" },
  { name: "Agriculture Planning and Information Bank (APIB)", type: "Co-operative & Rural", website: "", note: "Website not available" },
  { name: "National Bank for Agriculture and Rural Development (NABARD)", type: "Co-operative & Rural", website: "https://www.nabard.org/", note: "" },
  { name: "Andhra Pradesh State Financial Corporation (APSFC)", type: "Financial Institution", website: "https://www.apsfc.com/", note: "" },
  { name: "Andhra Pradesh State Minorities Finance Corporation Limited (APMFC)", type: "Financial Institution", website: "https://apsmfc.ap.gov.in/", note: "" },
  { name: "Credit Guarantee Fund Trust for Small Industries (CGTSI)", type: "Financial Institution", website: "https://www.cgtmse.in/", note: "Now CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises)" },
  { name: "Delhi SC/ST/OBC, Minorities and Handicapped Finance and Development Corporation Limited (DSFDC)", type: "Financial Institution", website: "https://dsfdc.delhi.gov.in/", note: "" },
  { name: "Economic Development Corporation Limited, Goa", type: "Financial Institution", website: "https://edc-goa.com/", note: "" },
  { name: "Export-Import Bank of India", type: "Financial Institution", website: "https://www.eximbankindia.in/", note: "" },
  { name: "Himachal Pradesh Financial Corporation (HPFC)", type: "Financial Institution", website: "", note: "Website not available" },
  { name: "Indian Railway Finance Corporation Limited (IRFC)", type: "Financial Institution", website: "https://irfc.co.in/", note: "" },
  { name: "Indian Renewable Energy Development Agency Limited (IREDA)", type: "Financial Institution", website: "https://www.ireda.in/", note: "" },
  { name: "Industrial Development Bank of India (IDBI)", type: "Financial Institution", website: "https://www.idbi.bank.in/", note: "Now IDBI Bank" },
  { name: "Industrial Investment Bank of India Limited (IIBI)", type: "Financial Institution", website: "", note: "No longer operating" },
  { name: "Madhya Pradesh Financial Corporation (MPFC)", type: "Financial Institution", website: "https://www.mpfc.org/", note: "" },
  { name: "National Minorities Development and Finance Corporation (NMDFC)", type: "Financial Institution", website: "https://www.nmdfc.org/", note: "" },
  { name: "National Safai Karamcharis Finance and Development Corporation (NSKFDC)", type: "Financial Institution", website: "https://nskfdc.nic.in/", note: "" },
  { name: "National Scheduled Castes Finance and Development Corporation (NSFDC)", type: "Financial Institution", website: "https://nsfdc.nic.in/", note: "" },
  { name: "North Eastern Development Finance Corporation (NEDFI)", type: "Financial Institution", website: "https://www.nedfi.com/", note: "" },
  { name: "Power Finance Corporation Limited", type: "Financial Institution", website: "https://www.pfcindia.com/", note: "" },
  { name: "Rajasthan Finance Corporation (RFC)", type: "Financial Institution", website: "https://rfc.rajasthan.gov.in/", note: "" },
  { name: "Rural Electrification Corporation Limited", type: "Financial Institution", website: "https://recindia.nic.in/", note: "Now REC Limited" },
  { name: "Scheduled Caste/Scheduled Tribes, Other Backward Classes, Minorities and Handicapped Financial and Development Corporation Limited, Dadra and Nagar Haveli, Daman and Diu", type: "Financial Institution", website: "", note: "Website not available" },
  { name: "Small Industries Development Bank of India (SIDBI)", type: "Financial Institution", website: "https://www.sidbi.in/", note: "" },
  { name: "Tamil Nadu Industrial Investment Corporation Limited", type: "Financial Institution", website: "https://www.tiic.org/", note: "" },
  { name: "Unit Trust of India (UTI)", type: "Financial Institution", website: "https://www.utimf.com/", note: "Now UTI Mutual Fund" },
  { name: "Uttar Pradesh Financial Corporation (UPFC)", type: "Financial Institution", website: "https://www.upfcindia.com/", note: "" },
  { name: "Agriculture Insurance Company of India Limited", type: "Insurance", website: "https://www.aicofindia.com/", note: "" },
  { name: "Employees’ State Insurance Corporation (ESIC)", type: "Insurance", website: "https://www.esic.gov.in/", note: "" },
  { name: "Export Credit Guarantee Corporation of India Limited (ECGC)", type: "Insurance", website: "https://www.ecgc.in/", note: "" },
  { name: "General Insurance Corporation of India (GIC)", type: "Insurance", website: "https://www.gicre.in/", note: "Now GIC Re" },
  { name: "Insurance Regulatory and Development Authority", type: "Insurance", website: "https://irdai.gov.in/", note: "Now IRDAI" },
  { name: "Life Insurance Corporation of India (LIC)", type: "Insurance", website: "https://licindia.in/", note: "" },
  { name: "National Insurance Company Limited (NICL)", type: "Insurance", website: "https://nationalinsurance.nic.co.in/", note: "" },
  { name: "New India Assurance Company Limited (NIACL)", type: "Insurance", website: "https://www.newindia.co.in/", note: "" },
  { name: "Oriental Insurance Company Limited (OICL)", type: "Insurance", website: "https://orientalinsurance.org.in/", note: "" },
  { name: "SBI Life Insurance Company Limited (SBI LIFE)", type: "Insurance", website: "https://www.sbilife.co.in/", note: "" },
  { name: "United India Insurance Company Limited", type: "Insurance", website: "https://uiic.co.in/", note: "" },
  { name: "Central Depository Services (India) Limited (CDSL)", type: "Securities & Exchanges", website: "https://www.cdslindia.com/", note: "" },
  { name: "Inter-connected Stock Exchange of India Limited (ISE)", type: "Securities & Exchanges", website: "", note: "No longer operating as a stock exchange" },
  { name: "National Securities Depository Limited (NSDL)", type: "Securities & Exchanges", website: "https://nsdl.co.in/", note: "" },
  { name: "National Stock Exchange (NSE), India", type: "Securities & Exchanges", website: "https://www.nseindia.com/", note: "" },
  { name: "Securities and Exchange Board of India (SEBI)", type: "Securities & Exchanges", website: "https://www.sebi.gov.in/", note: "" },
  { name: "Stock Exchange, Kolkata", type: "Securities & Exchanges", website: "https://www.cse-india.com/", note: "" },
  { name: "Stock Exchange, Mumbai (BSE)", type: "Securities & Exchanges", website: "https://www.bseindia.com/", note: "" },
  { name: "Stock Exchange, Pune", type: "Securities & Exchanges", website: "", note: "No longer operating" },
  { name: "Stock Holding Corporation of India Limited (SHCIL)", type: "Securities & Exchanges", website: "https://www.stockholding.com/", note: "" },
  { name: "Asian Development Bank (ADB)", type: "Other", website: "https://www.adb.org/where-we-work/india", note: "" },
  { name: "Chit Fund Department, Delhi", type: "Other", website: "", note: "Website not available" },
  { name: "Directorate of Institutional Finance (DIF), Chhattisgarh", type: "Other", website: "https://cgdif.nic.in/", note: "" },
  { name: "Financial Intelligence Unit – India (FIU-IND)", type: "Other", website: "https://fiuindia.gov.in/", note: "" },
  { name: "INMB Bank Limited, Lagos, Nigeria", type: "Other", website: "", note: "Website not available" },
  { name: "Institute for Development and Research in Banking Technology (IDRBT)", type: "Other", website: "https://www.idrbt.ac.in/", note: "" },
  { name: "National Housing Bank (NHB)", type: "Other", website: "https://nhb.org.in/", note: "" },
  { name: "SBI Commercial and International Bank Limited (SBICI)", type: "Other", website: "https://sbi.bank.in/", note: "Merged into State Bank of India" },
  { name: "SBI Discount and Finance House of India Limited (SBI DFHI)", type: "Other", website: "https://www.sbidfhi.co.in/", note: "" },
  { name: "SBI Factors and Commercial Services Private Limited (SBI FACTORS)", type: "Other", website: "https://www.sbiglobal.in/", note: "Now SBI Global Factors" },
  { name: "SBI Funds Management Private Limited (SBI FUNDS)", type: "Other", website: "https://www.sbimf.com/", note: "SBI Mutual Fund" },
  { name: "SME Rating Agency of India Limited (SMERA)", type: "Other", website: "https://www.acuite.in/", note: "Now Acuité Ratings & Research" },
  { name: "State Bank of India (California)", type: "Other", website: "https://sbic.bank/", note: "" },
  { name: "State Bank of India (Canada)", type: "Other", website: "https://ca.statebank/", note: "" },
  { name: "World Bank", type: "Other", website: "https://www.worldbank.org/en/country/india", note: "" },
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
      <div style={{ backgroundColor: "#0D2B45" }} className="pt-32 lg:pt-44 pb-16 px-6">
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
                {inst.note && (
                  <p className="text-xs leading-relaxed" style={{ color: inst.website ? '#2E8B57' : '#9ca3af' }}>{inst.note}</p>
                )}
                {inst.website && (
                  <a
                    href={inst.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto rounded-full text-sm font-semibold px-4 py-2 transition-colors self-start"
                    style={{ backgroundColor: "#0D2B45", color: "#fff" }}
                  >
                    {inst.note.startsWith('Merged into') ? `Visit ${inst.note.replace(/^Merged into /, '').replace(/ \(\d{4}\)$/, '')}` : 'Visit Website'}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-10">Source: Government of India information web sites. Links updated in 2026; banks that have since merged link to the bank that took them over.</p>
      </div>
    </div>
  );
}
