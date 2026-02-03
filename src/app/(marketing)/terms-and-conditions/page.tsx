import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Clinequal",
  description: "Terms and conditions for using Clinequal services.",
};

export default function TermsAndConditionsPage() {
  return (
    <Section background="white">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <h1>Terms and Conditions</h1>
          <p className="text-slate-500 dark:text-slate-400">Last Updated: August 11, 2025</p>

          <h2>1. Introduction</h2>
          <p>
            These Terms govern use of Clinequal services. By purchasing or using
            services, users acknowledge reading, understanding, and agreeing to
            be bound by these Terms.
          </p>

          <h2>2. Services Description</h2>
          <p>
            Clinequal provides bias detection and monitoring in clinical trial
            data, based on staff expertise and research in agentic AI and AI
            tools applied to clinical trial datasets.
          </p>

          <h2>3. Payment Terms</h2>
          <ul>
            <li>
              All payments must be made in advance through Stripe payment
              processing
            </li>
            <li>
              Prices shown exclude Value Added Tax (VAT), applied per
              jurisdiction rates
            </li>
            <li>
              Successful payment generates email confirmation with receipt
            </li>
          </ul>

          <h2>4. Delivery</h2>
          <ul>
            <li>Delivery times vary case-by-case</li>
            <li>
              Working days defined as Monday-Friday, 9:00 AM-5:00 PM CET,
              excluding Italian public holidays
            </li>
            <li>
              Delivery times, if specified anywhere, are estimates and may vary
              based on complexity and volume
            </li>
          </ul>

          <h2>5. Return Policy</h2>
          <ul>
            <li>
              Unsatisfied customers may request refunds through customer support
            </li>
            <li>
              Customers must complete satisfaction surveys before evaluation
            </li>
            <li>
              Legitimate requests receive refunds via original payment method
            </li>
            <li>
              Requests must be submitted within 14 days of service delivery
            </li>
          </ul>

          <h2>6. Disclaimer of Warranties and Limitation of Liability</h2>
          <ul>
            <li>
              Services provided &quot;as is&quot; and &quot;as available&quot;
              without warranties
            </li>
            <li>
              No guarantees regarding accuracy, reliability, or completeness
            </li>
            <li>
              Clinequal not responsible for outcomes resulting from service use
            </li>
            <li>
              No liability for indirect, incidental, special, consequential, or
              punitive damages
            </li>
          </ul>

          <h2>7. User Obligations</h2>
          <ul>
            <li>Provide accurate, complete information when purchasing</li>
            <li>Refrain from illegal or unauthorized service use</li>
            <li>
              Recognize services should not be sole basis for significant
              business decisions
            </li>
          </ul>

          <h2>8. Intellectual Property</h2>
          <p>
            All website content and features remain Clinequal&apos;s exclusive
            property. Upon payment, users receive non-exclusive, non-transferable
            license for internal business use only.
          </p>

          <h2>9. Data Protection and Privacy</h2>
          <p>
            Personal data collection follows our{" "}
            <a href="/privacy-policy">Privacy Policy</a> (incorporated by
            reference). Compliance with applicable data protection laws,
            including GDPR where applicable.
          </p>

          <h2>10. Modifications to Terms</h2>
          <p>
            Clinequal reserves the right to modify Terms without notice. Updated
            Terms posted with revised &quot;Last Updated&quot; date. Continued
            service use indicates acceptance of modifications.
          </p>

          <h2>11. Governing Law and Jurisdiction</h2>
          <p>
            Terms governed by Italian law. Disputes subject to exclusive
            jurisdiction of Italian courts.
          </p>

          <h2>12. Severability</h2>
          <p>
            Unenforceable provisions are eliminated minimally to preserve
            remaining Terms validity.
          </p>

          <h2>13. Entire Agreement</h2>
          <p>
            These Terms constitute the complete agreement between parties,
            superseding prior agreements.
          </p>

          <h2>14. Contact Information</h2>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:support@clinequal.com">support@clinequal.com</a>
            </li>
            <li>
              Website: <a href="https://clinequal.com">https://clinequal.com</a>
            </li>
            <li>Address: Corso Vittorio Emanuele, 167/3, 80121 Naples, Italy</li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
