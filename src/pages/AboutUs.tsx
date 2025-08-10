import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Users, Award, Target, Shield, Stethoscope, Star, ArrowLeft } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { Link } from "react-router-dom";
const AboutUs = () => {
  const team = [{
    name: "Favor Loolo",
    role: "Chief Medical Officer",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    description: "Health care Specialist",
    expertise: "Internal Medicine • Diabetes Care"
  }, {
    name: "Wisdom Kara",
    role: "Head of Technology",
    image: "/wisdom.jpeg",
    description: "Kanel Technologies Engineer, healthcare tech expert",
    expertise: "Healthcare IT • AI/ML • Security"
  }, {
    name: "Dr. Emily Rodriguez",
    role: "Nutrition Specialist",
    image: "https://images.unsplash.com/photo-1594824694996-f4f6c2d2a9e5?w=400&h=400&fit=crop&crop=face",
    description: "Registered dietitian with diabetes specialization",
    expertise: "Clinical Nutrition • Metabolic Health"
  }, {
    name: "Sunday Idoko",
    role: "Chief Operations Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    description: "Logistic professional",
    expertise: "Healthcare Operations • Patient Experience"
  }];
  const values = [{
    icon: <Heart className="h-10 w-10 text-rose-500" />,
    title: "Patient-Centered Care",
    description: "Every feature we build is designed with real patient needs in mind, ensuring practical solutions for everyday health management.",
    highlight: "Real solutions for real people"
  }, {
    icon: <Shield className="h-10 w-10 text-blue-500" />,
    title: "Privacy & Security",
    description: "Your health data is protected with enterprise-grade security and encryption, meeting all healthcare privacy standards.",
    highlight: "HIPAA compliant • SOC 2 certified"
  }, {
    icon: <Users className="h-10 w-10 text-purple-500" />,
    title: "Community Support",
    description: "We believe in the power of community. Our platform connects you with others on similar health journeys.",
    highlight: "Peer support • Expert guidance"
  }, {
    icon: <Target className="h-10 w-10 text-emerald-500" />,
    title: "Evidence-Based",
    description: "All our recommendations are backed by the latest medical research and clinical guidelines.",
    highlight: "Clinically validated • Research-driven"
  }];
  const stats = [{
    number: "25,000+",
    label: "Active Users",
    sublabel: "Growing monthly"
  }, {
    number: "47%",
    label: "Reduction in ER Visits",
    sublabel: "Proven outcomes"
  }, {
    number: "96%",
    label: "User Satisfaction",
    sublabel: "5-star rating"
  }, {
    number: "24/7",
    label: "Support Available",
    sublabel: "Always here"
  }];
  const achievements = [{
    icon: <Award className="h-6 w-6" />,
    text: "Healthcare Innovation Award 2024"
  }, {
    icon: <Star className="h-6 w-6" />,
    text: "Top-rated Health App"
  }, {
    icon: <Shield className="h-6 w-6" />,
    text: "HIPAA Compliant Platform"
  }, {
    icon: <CheckCircle className="h-6 w-6" />,
    text: "Clinically Validated Results"
  }];
  return <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button onClick={() => window.history.back()} className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group">
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0">
          <img src="/health.jpg" alt="Healthcare" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/50 to-blue-900/70"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
              Transforming
              <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 bg-clip-text text-transparent"> Healthcare</span>
              <br />One Life at a Time
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-12 leading-relaxed">
              Empowering people with chronic conditions through innovative technology, 
              evidence-based care, and a supportive community. 
            </p>
            
            {/* Achievement badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {achievements.map((achievement, index) => <div key={index} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/20">
                  <span className="text-blue-200">{achievement.icon}</span>
                  <span className="text-sm font-medium text-white">{achievement.text}</span>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 group-hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.sublabel}</div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  <Heart className="h-4 w-4" />
                  Our Mission
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Making Health Management 
                  <span className="text-blue-600"> Effortless</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Managing chronic conditions like diabetes, hypertension, and heart disease shouldn't feel overwhelming. We created Healinton to bridge the gap between medical care and daily life.
                </p>
                <p>
                  Founded by healthcare professionals and patients who understand the challenges firsthand, we're committed to making health management accessible, personalized, and effective for everyone.
                </p>
              </div>

              <Link to="/">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start Your Journey
                </Button>
              </Link>

              <Link to="/">
                <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all">
                  Learn More
                </Button>
              </Link>

            </div>
            <div className="relative">
              <div className="relative group">
                <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop" alt="Healthcare team collaboration" className="rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 rounded-2xl"></div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Live Health Monitoring</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Expert Care Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="h-4 w-4" />
              Our Core Values
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Principles That Drive Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide every decision we make, from product development to patient care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {values.map((value, index) => <Card key={index} className="group p-8 hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50">
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300">
                    {value.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {value.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle className="h-4 w-4" />
                      {value.highlight}
                    </div>
                  </div>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              Our Team
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Meet the Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Healthcare professionals, technologists, and patient advocates united in improving lives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => <Card key={index} className="group p-6 text-center hover:shadow-2xl transition-all duration-500 border-0 bg-white">
                <div className="relative mb-6">
                  <img src={member.image} alt={member.name} className="w-32 h-32 rounded-2xl mx-auto object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent rounded-2xl"></div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {member.description}
                </p>
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <p className="text-xs text-gray-500 font-medium">
                    {member.expertise}
                  </p>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center text-white px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Health Journey?
          </h2>
          <p className="text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed">
            Join thousands of people who are already managing their chronic conditions with confidence and support.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 px-10 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              Start Free Today
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-4 text-lg font-bold rounded-xl backdrop-blur-sm hover:scale-105 transition-all">
              Explore Premium
            </Button>
          </div>
          
          <div className="mt-12 flex justify-center items-center gap-8 text-sm opacity-75">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              No Credit Card Required
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              4.9/5 User Rating
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default AboutUs;