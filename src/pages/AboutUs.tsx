
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Users, Award, Target, Shield, Stethoscope, Star, ArrowLeft } from 'lucide-react';

const AboutUs = () => {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      description: "15+ years in chronic disease management"
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "Former Google engineer, healthcare tech expert"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Nutrition Specialist",
      image: "https://images.unsplash.com/photo-1594824694996-f4f6c2d2a9e5?w=400&h=400&fit=crop&crop=face",
      description: "Registered dietitian with diabetes specialization"
    },
    {
      name: "James Wilson",
      role: "Patient Experience Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "Living with Type 2 diabetes for 10+ years"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-green-600" />,
      title: "Patient-Centered Care",
      description: "Every feature we build is designed with real patient needs in mind, ensuring practical solutions for everyday health management."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Privacy & Security",
      description: "Your health data is protected with enterprise-grade security and encryption, meeting all healthcare privacy standards."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Community Support",
      description: "We believe in the power of community. Our platform connects you with others on similar health journeys."
    },
    {
      icon: <Target className="h-8 w-8 text-orange-600" />,
      title: "Evidence-Based",
      description: "All our recommendations are backed by the latest medical research and clinical guidelines."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "40%", label: "Reduction in ER Visits" },
    { number: "95%", label: "User Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center text-white mb-6 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Healinton</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Empowering people with chronic conditions to live healthier, more confident lives through technology and community support.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Managing chronic conditions like diabetes, hypertension, and heart disease shouldn't feel overwhelming. 
                We created Healinton to bridge the gap between medical care and daily life, providing the tools, 
                knowledge, and community support you need to thrive.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Founded by healthcare professionals and patients who understand the challenges firsthand, 
                we're committed to making health management accessible, affordable, and effective for everyone.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop" 
                alt="Healthcare team" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-blue-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do, from product development to customer support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Healthcare professionals, technologists, and patient advocates working together to improve lives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Health Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of people who are already managing their chronic conditions with confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all">
                Get Started Free
              </Button>
            </Link>
            <Link to="/premium">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all">
                Learn About Premium
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
