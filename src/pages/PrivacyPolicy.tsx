import { Link } from 'react-router';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect personal information you provide directly, including your name, email address, and phone number when you register, donate, or contact us. We also collect donation information such as payment details processed securely through our payment partners. Usage data including IP addresses, browser type, and pages visited is collected automatically to improve our services.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "Your information is used to process donations and issue tax receipts, send newsletters and program updates you have opted into, communicate about specific programs and events relevant to your interests, and continuously improve our website and services. We do not use your information for purposes unrelated to INF's mission without your explicit consent.",
    },
    {
      title: "3. Information Sharing",
      content:
        "INF does not sell, trade, or rent your personal information to third parties. We may share data with payment processors (such as Stripe or PayPal) solely to complete donation transactions, and with program partners under strict confidentiality agreements. Any such sharing is limited to what is necessary to fulfill the stated purpose.",
    },
    {
      title: "4. Data Security",
      content:
        "We implement SSL/TLS encryption across our website to protect data in transit. Payment processing is fully PCI-DSS compliant. We conduct annual security audits and limit access to personal data to authorized personnel only. Despite these measures, no method of transmission over the internet is 100% secure, and we encourage users to safeguard their account credentials.",
    },
    {
      title: "5. Cookies",
      content:
        "INF uses essential cookies required for basic site functionality such as session management and security. With your consent, we also use analytics cookies (e.g., Google Analytics) to understand how visitors interact with our site. You may disable non-essential cookies through your browser settings or our cookie consent banner without affecting core functionality.",
    },
    {
      title: "6. Your Rights",
      content:
        "You have the right to access, correct, or request deletion of your personal information held by INF. To exercise any of these rights, please email us at info@indianetwork.org. We will respond to verified requests within 30 days. You may also opt out of marketing communications at any time using the unsubscribe link in our emails.",
    },
    {
      title: "7. Children's Privacy",
      content:
        "INF does not knowingly collect personal information from children under the age of 13. If we become aware that a child under 13 has provided us with personal data, we will promptly delete such information. Parents or guardians who believe their child has submitted information to us should contact us at info@indianetwork.org.",
    },
    {
      title: "8. Contact Us",
      content:
        "If you have questions, concerns, or requests regarding this Privacy Policy, please contact us at info@indianetwork.org. Our mailing address is India Network Foundation, 7065 Westpointe Blvd, Suite 208, Orlando, FL 32835, USA. We are committed to addressing your concerns promptly and transparently.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-4xl font-extrabold mb-3"
            style={{ color: "#0D2B45" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Last updated: October 26, 2026
          </p>
          <p className="text-gray-600 text-base leading-relaxed max-w-2xl">
            India Network Foundation (INF) is committed to protecting your
            privacy. This policy explains how we collect, use, and safeguard
            your personal information when you visit our website or engage with
            our programs.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2
                className="text-xl font-bold mb-3"
                style={{
                  color: "#0D2B45",
                  borderLeft: "3px solid #F47C20",
                  paddingLeft: "1rem",
                }}
              >
                {section.title}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed pl-4">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
