
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, Ear, Hand, Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <Eye className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Accessibility Statement</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Carevital is committed to ensuring digital accessibility for all users
          </p>
        </div>

        <Card className="p-8 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Commitment</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We are committed to ensuring that Carevital is accessible to all users, including those with disabilities. 
                We continuously work to improve the user experience for everyone and apply relevant accessibility standards.
              </p>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Visual Accessibility</h2>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• High contrast color schemes for better readability</li>
                <li>• Scalable fonts and responsive text sizing</li>
                <li>• Alternative text for all images and icons</li>
                <li>• Dark mode support for reduced eye strain</li>
                <li>• Focus indicators for keyboard navigation</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Hand className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Motor Accessibility</h2>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Large clickable areas for buttons and links</li>
                <li>• Keyboard navigation support throughout the app</li>
                <li>• No time-based interactions that cannot be extended</li>
                <li>• Drag and drop alternatives where applicable</li>
                <li>• Voice control compatibility</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cognitive Accessibility</h2>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Clear and simple language throughout the interface</li>
                <li>• Consistent navigation and layout patterns</li>
                <li>• Error messages that are easy to understand</li>
                <li>• Progress indicators for multi-step processes</li>
                <li>• Contextual help and tooltips where needed</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Ear className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Auditory Accessibility</h2>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Visual alternatives for audio alerts</li>
                <li>• Captions for any video content</li>
                <li>• Visual indicators for sound-based notifications</li>
                <li>• Text-based alternatives for audio instructions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Standards Compliance</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Carevital aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
                These guidelines explain how to make web content more accessible to people with disabilities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Assistive Technology</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Carevital is designed to be compatible with the following assistive technologies:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Screen readers (JAWS, NVDA, VoiceOver)</li>
                <li>• Voice recognition software</li>
                <li>• Screen magnification software</li>
                <li>• Alternative keyboards and pointing devices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Feedback and Contact</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We welcome your feedback on the accessibility of Carevital. Please let us know if you encounter 
                accessibility barriers or have suggestions for improvement:
              </p>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>Email: accessibility@carevital.com</p>
                <p>Phone: +1-800-CAREVITAL</p>
                <p>We aim to respond to accessibility feedback within 5 business days.</p>
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

export default Accessibility;
