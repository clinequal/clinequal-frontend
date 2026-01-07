import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Clinequal",
  description: "How Clinequal collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <Section background="white">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1>Privacy Policy</h1>

          <h2>1. Introduction</h2>
          <p>
            Clinequal outlines how it collects, uses, and discloses your
            personal information through its website and services, demonstrating
            commitment to transparent data handling practices.
          </p>

          <h2>2. Information We Collect</h2>

          <h3>2.1 User-Provided Information</h3>
          <p>
            The company gathers contact details, billing information (processed
            via Stripe), account credentials, survey responses, and
            communication records from customers.
          </p>

          <h3>2.2 Automatically Collected Information</h3>
          <p>
            Technical data including IP addresses, browser information, and
            device details are collected. The site employs cookies and similar
            tracking technologies to monitor browsing activities.
          </p>

          <h2>3. How We Use Your Information</h2>

          <h3>3.1 Service Delivery</h3>
          <p>
            Data supports survey service provision, payment processing, customer
            support, and refund handling.
          </p>

          <h3>3.2 Service Improvement</h3>
          <p>
            Information enables usage analysis, feature development, and
            marketing campaign measurement.
          </p>

          <h3>3.3 Legal & Security</h3>
          <p>
            The company uses data to comply with legal obligations and prevent
            fraud and protect the security.
          </p>

          <h2>4. Legal Basis for Processing</h2>
          <p>
            Processing occurs under contract performance, legitimate business
            interests, legal obligations, or explicit consent from users.
          </p>

          <h2>5. Data Sharing and Disclosure</h2>

          <h3>5.1 Service Providers</h3>
          <p>
            Data transfers to payment processors (Stripe), email providers,
            hosting services, and support software vendors.
          </p>

          <h3>5.2 Legal Requirements</h3>
          <p>
            Data may be shared with regulatory and law enforcement authorities
            when legally required. The company explicitly states it does not
            sell, rent, or trade your personal information for marketing.
          </p>

          <h2>6. International Data Transfers</h2>
          <p>
            Data may be processed internationally, with protections including
            European Commission-approved contractual clauses for EEA transfers.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            Information is retained as long as necessary to fulfill the purposes
            for which we collected it, considering sensitivity, risk, purpose,
            and legal requirements.
          </p>

          <h2>8. Data Security</h2>
          <p>
            Implemented measures include encryption, security assessments,
            access controls, staff training, and secure architecture. The
            company acknowledges no method is 100% secure.
          </p>

          <h2>9. Your Data Protection Rights</h2>
          <p>
            Users may request access, correction, deletion, processing
            restrictions, data portability, objection to processing, and consent
            withdrawal, with instructions provided via contact information.
          </p>

          <h2>10. Cookies and Tracking Technologies</h2>
          <p>
            Browser-controllable cookies gather browsing information, with
            detailed information in the Cookie Policy.
          </p>

          <h2>11. Children&apos;s Privacy</h2>
          <p>
            Services aren&apos;t directed toward individuals under 16, with
            immediate contact required if child information is discovered.
          </p>

          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            Updates occur in response to legal, technical, or business changes,
            with appropriate notification provided to users.
          </p>

          <h2>13. Contact Us</h2>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:privacy@clinequal.com">privacy@clinequal.com</a>
            </li>
            <li>Address: Corso Vittorio Emanuele, 167/3, Naples, Italy</li>
          </ul>

          <h2>14. Data Protection Officer</h2>
          <p>
            Email: <a href="mailto:dpo@clinequal.com">dpo@clinequal.com</a>
          </p>

          <h2>15. Complaints</h2>
          <p>
            EU residents may contact the European Data Protection Board; UK
            residents can reach the Information Commissioner&apos;s Office.
          </p>
        </div>
      </Container>
    </Section>
  );
}
