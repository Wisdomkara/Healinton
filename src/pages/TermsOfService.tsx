
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertTriangle, Users, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Please read these terms carefully before using Carevital
          </p>
        </div>

        <Card className="p-8 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300">
                By accessing and using Carevital, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Disclaimer</h2>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 mb-4">
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  IMPORTANT: Carevital is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Always consult with qualified healthcare professionals</li>
                <li>• Never disregard professional medical advice</li>
                <li>• Seek immediate medical attention for emergencies</li>
                <li>• Do not delay seeking treatment based on app information</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Responsibilities</h2>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Provide accurate and complete health information</li>
                <li>• Keep your account credentials secure</li>
                <li>• Use the service only for lawful purposes</li>
                <li>• Respect other users' privacy and rights</li>
                <li>• Report any security breaches immediately</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Premium Services</h2>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Premium subscriptions are billed monthly or annually</li>
                <li>• Payments are processed securely through Stripe</li>
                <li>• Cancellation takes effect at the end of the billing period</li>
                <li>• Refunds are provided according to our refund policy</li>
                <li>• Premium features are immediately available upon payment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Prohibited Uses</h2>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Sharing false or misleading health information</li>
                <li>• Attempting to breach security measures</li>
                <li>• Using the service for commercial purposes without permission</li>
                <li>• Harassing or threatening other users</li>
                <li>• Violating any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Carevital provides information and tools for educational purposes only. We are not liable for any decisions made based on the information provided through our service. Users assume full responsibility for their health decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or app notification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>Email: legal@carevital.com</p>
                <p>Phone: +1-800-CAREVITAL</p>
                <p>Address: 123 Healthcare Ave, Medical District, NY 10001</p>
              </div>
            </section>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: December 28, 2024
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
