
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What is Healinton and how does it help manage chronic conditions?",
      answer: "Healinton is a comprehensive health management platform designed specifically for people with chronic conditions like diabetes, hypertension, and heart disease. We provide personalized meal plans, medication reminders, symptom tracking, and AI-powered health insights to help you better manage your condition and improve your quality of life."
    },
    {
      question: "Is my health data secure and private?",
      answer: "Yes, absolutely. We use enterprise-grade encryption and follow strict HIPAA compliance standards to protect your health information. Your data is stored securely and is never shared with third parties without your explicit consent. We implement multiple layers of security including end-to-end encryption and regular security audits."
    },
    {
      question: "How much does Healinton cost?",
      answer: "We offer three plans: Basic ($3.99/month), Premium ($10.99/month), and Enterprise (custom pricing). All plans are currently FREE until the end of August 2025 as part of our launch promotion. After that, you can choose the plan that best fits your needs. The Basic plan includes essential health tracking, while Premium adds AI insights and telehealth consultations."
    },
    {
      question: "Can I use Healinton with my existing healthcare providers?",
      answer: "Yes! Healinton is designed to complement your existing healthcare team. You can easily share your health data, reports, and progress with your doctors. Our platform integrates with many healthcare systems and allows you to store your hospital information for easy appointment booking."
    },
    {
      question: "What chronic conditions does Healinton support?",
      answer: "Healinton supports a wide range of chronic conditions including diabetes, hypertension, heart disease, obesity, high cholesterol, asthma, arthritis, kidney disease, liver disease, thyroid disorders, anxiety/depression, and chronic pain. Our meal plans and health advice are tailored to each specific condition."
    },
    {
      question: "How does the AI health assistant work?",
      answer: "Our AI assistant analyzes your health data, symptoms, and lifestyle patterns to provide personalized insights and recommendations. It can identify potential health trends, suggest meal plans, remind you about medications, and alert you to concerning patterns that may need medical attention. The AI learns from your data to provide increasingly personalized advice."
    },
    {
      question: "Can I track multiple health conditions at once?",
      answer: "Yes, many of our users manage multiple chronic conditions simultaneously. Healinton allows you to track different conditions, medications, symptoms, and receive tailored advice for each condition. Our platform understands the interconnected nature of chronic conditions and provides holistic health management."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, Healinton is fully mobile-optimized and works seamlessly on all devices including smartphones, tablets, and desktops. You can access all features through your mobile browser, and we're currently developing dedicated iOS and Android apps for an even better mobile experience."
    },
    {
      question: "How do meal plans work and can I customize them?",
      answer: "Our meal plans are created by nutritionists and tailored to your specific health conditions. Each plan includes options for different budgets (low, medium, high) and considers your dietary restrictions. You can track your meal compliance, mark meals as completed, and see your progress over time through our analytics dashboard."
    },
    {
      question: "What should I do if I experience a medical emergency?",
      answer: "Healinton is not a replacement for emergency medical care. If you're experiencing a medical emergency, please call 911 immediately or go to your nearest emergency room. Our platform is designed for ongoing health management and monitoring, not for emergency situations."
    },
    {
      question: "How do I get started with Healinton?",
      answer: "Getting started is easy! Simply sign up for a free account, complete your health profile including your chronic conditions, and start exploring the features. You'll immediately get access to personalized meal plans, can start tracking your health metrics, and begin using our AI health assistant."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time without any cancellation fees. If you cancel, you'll continue to have access to premium features until the end of your billing period, after which you'll revert to the free basic features. Your health data will always remain accessible to you."
    }
  ];

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
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about Healinton and how we can help you manage your health better.
            </p>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <Minus className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12 p-8 text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/about">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Contact Support
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline">
                Get Started Now
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
