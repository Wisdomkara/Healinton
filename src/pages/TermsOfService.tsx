
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <Card className="p-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  By accessing or using Healinton ("the Service"), you agree to be bound by these Terms of Service ("Terms"). 
                  If you disagree with any part of these terms, then you may not access the Service. These Terms apply to all 
                  visitors, users, and others who access or use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Healinton is a digital health management platform designed to help individuals manage chronic health conditions. 
                  The Service provides tools for health tracking, meal planning, medication reminders, symptom logging, and 
                  AI-powered health insights. The Service is intended for informational and educational purposes and is not a 
                  substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Medical Disclaimer</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  <strong>IMPORTANT:</strong> Healinton is not a medical device and does not provide medical advice. The information 
                  provided through the Service is for educational purposes only and should not replace consultation with qualified 
                  healthcare professionals. Always seek the advice of your physician or other qualified health provider with any 
                  questions you may have regarding a medical condition. Never disregard professional medical advice or delay in 
                  seeking it because of something you have read on Healinton.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. User Accounts and Registration</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To access certain features of the Service, you must create an account. You are responsible for maintaining the 
                  confidentiality of your account credentials and for all activities that occur under your account. You agree to 
                  provide accurate, current, and complete information during registration and to update such information to keep 
                  it accurate, current, and complete.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Privacy and Data Protection</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Your privacy is important to us. We collect, use, and protect your personal health information in accordance 
                  with our Privacy Policy and applicable laws, including HIPAA where applicable. By using the Service, you consent 
                  to the collection and use of your information as outlined in our Privacy Policy. We implement appropriate 
                  technical and organizational measures to protect your personal data against unauthorized access, alteration, 
                  disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Acceptable Use</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Use the Service for any unlawful purpose or to solicit others to engage in unlawful conduct</li>
                  <li>Violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>Submit false or misleading health information</li>
                  <li>Use the Service to transmit or distribute viruses, malware, or other harmful code</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Subscription and Payment Terms</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Healinton offers both free and paid subscription tiers. Paid subscriptions are billed on a recurring basis. 
                  You may cancel your subscription at any time through your account settings. Cancellation will take effect at 
                  the end of your current billing period. All fees are non-refundable except as required by law or as specifically 
                  stated in these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Intellectual Property Rights</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  The Service and its original content, features, and functionality are owned by Healinton and are protected by 
                  international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not 
                  reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, 
                  download, store, or transmit any of the material on our Service without prior written consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL HEALINTON, ITS AFFILIATES, OFFICERS, 
                  DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, 
                  OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE 
                  LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Emergency Situations</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Healinton is not designed for use in emergency situations. If you are experiencing a medical emergency, 
                  immediately call your local emergency services (such as 911 in the United States) or go to the nearest 
                  emergency room. Do not rely on Healinton for emergency medical assistance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Modifications to Terms</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide 
                  at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be 
                  determined at our sole discretion. Your continued use of the Service after such modifications constitutes 
                  acceptance of the updated Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Governing Law</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Healinton 
                  operates, without regard to its conflict of law provisions. Any legal action or proceeding arising under these 
                  Terms will be brought exclusively in the courts of such jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-300">
                    Email: support@healinton.com<br />
                    Address: Healinton Health Solutions<br />
                    Legal Department<br />
                    [Your Business Address]
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. Severability</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions 
                  of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our 
                  Service and supersede and replace any prior agreements we might have had between us regarding the Service.
                </p>
              </section>

              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  By using Healinton, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
