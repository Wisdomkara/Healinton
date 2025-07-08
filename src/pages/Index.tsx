
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Users, Stethoscope, Calendar, MessageCircle, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '@/components/TestimonialsSection';
import DrugStore from '@/components/DrugStore';

const Index = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health Tracking",
      description: "Monitor your vital signs, symptoms, and overall health progress with our advanced tracking system."
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Smart Scheduling",
      description: "Book appointments with healthcare providers and set medication reminders effortlessly."
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "AI Health Assistant",
      description: "Get instant health advice and personalized recommendations from our AI-powered assistant."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-grade security and privacy measures."
    }
  ];

  const conditions = [
    "Cancer", "Diabetes (Type 1 & 2)", "Hypertension", "Heart Disease", 
    "Chronic Kidney Disease", "HIV/AIDS", "COPD", "Asthma", "Epilepsy", 
    "Multiple Sclerosis", "Liver Cirrhosis", "Parkinson's Disease", 
    "Stroke", "Sickle Cell Disease", "Lupus", "Rheumatoid Arthritis", 
    "Crohn's Disease", "Tuberculosis", "Alzheimer's Disease", "Cystic Fibrosis"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background with Multiple Blobs */}
      <div className="absolute inset-0 -z-10">
        {/* Background Image with Transparency */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(/lovable-uploads/28fa4c6a-e383-4c64-905c-130b84bf1e79.png)'
          }}
        />
        
        {/* Multiple Green Blobs with Slow Random Movement */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-green-400/70 to-emerald-500/70 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-20 w-80 h-80 bg-gradient-to-br from-green-300/60 to-teal-400/60 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-emerald-400/65 to-green-500/65 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-gradient-to-br from-green-500/55 to-emerald-600/55 rounded-full blur-2xl animate-float-gentle" />
        <div className="absolute bottom-1/3 right-1/3 w-88 h-88 bg-gradient-to-br from-teal-400/60 to-green-400/60 rounded-full blur-3xl animate-float-diagonal" />
        <div className="absolute top-3/4 left-1/6 w-56 h-56 bg-gradient-to-br from-green-600/50 to-emerald-700/50 rounded-full blur-2xl animate-float-orbit" />
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 relative">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
            <Heart className="h-4 w-4 mr-2" />
            Your Health, Our Priority
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Transform Your Health
            </span>
            <br />
            <span className="text-gray-800 dark:text-white">Journey Today</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Comprehensive health management platform supporting 20+ medical conditions with personalized care, AI insights, and expert guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
              <Link to="/auth">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
              <Link to="/premium">
                View Plans
                <Star className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Supported Conditions */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-16 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Supporting 20+ Medical Conditions</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {conditions.slice(0, 8).map((condition, index) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                  {condition}
                </Badge>
              ))}
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                +12 more...
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              Everything You Need for Better Health
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to manage your health effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <div className="text-green-600 dark:text-green-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Drug Store Section */}
      <DrugStore />

      {/* Stats Section */}
      <section className="py-16 px-4 bg-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600" />
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-green-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-green-100">Conditions Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-green-100">Health Records</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-green-100">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who have transformed their health journey with Healington.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
            <Link to="/auth">
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
