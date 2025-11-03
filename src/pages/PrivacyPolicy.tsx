
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react';
import { Card } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your privacy and data security are our top priorities
          </p>
        </div>

        <Card className="p-8 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="space-y-8">
            <section>
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Protection</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                At Healinton, we implement enterprise-grade security measures to protect your health information:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• End-to-end encryption for all health data</li>
                <li>• HIPAA-compliant data storage and transmission</li>
                <li>• Regular security audits and penetration testing</li>
                <li>• Multi-factor authentication for account access</li>
                <li>• Secure backup and disaster recovery systems</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We collect only the information necessary to provide you with personalized healthcare management:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Basic profile information (name, email, age)</li>
                <li>• Health metrics and vital signs</li>
                <li>• Medication and treatment history</li>
                <li>• Symptom tracking data</li>
                <li>• App usage analytics (anonymized)</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Provide personalized health recommendations</li>
                <li>• Generate custom meal plans and exercise routines</li>
                <li>• Send medication and appointment reminders</li>
                <li>• Facilitate communication with healthcare providers</li>
                <li>• Improve our services through anonymized analytics</li>
                <li>• Comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Sharing</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We never sell your personal health information. We may share your data only in these circumstances:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• With your healthcare providers (with your explicit consent)</li>
                <li>• With emergency services in life-threatening situations</li>
                <li>• When required by law or court order</li>
                <li>• With service providers under strict confidentiality agreements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Access and download your personal data</li>
                <li>• Correct inaccurate information</li>
                <li>• Delete your account and all associated data</li>
                <li>• Opt-out of non-essential communications</li>
                <li>• Request data portability to other services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about this Privacy Policy or your data rights, please contact us at:
              </p>
              <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                <p>Email: privacy@healinton.com</p>
                <p>Phone: +1-800-HEALINTON</p>
                <p>Address: 123 Healthcare Ave, Medical District, NY 10001</p>
              </div>
            </section>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: November 3, 2025
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                This Privacy Policy is HIPAA compliant and adheres to all applicable healthcare data protection regulations.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
