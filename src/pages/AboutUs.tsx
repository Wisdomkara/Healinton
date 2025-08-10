
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Shield, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      bio: "Board-certified physician with 15+ years in digital health",
      image: "/lovable-uploads/28fa4c6a-e383-4c64-905c-130b84bf1e79.png"
    },
    {
      name: "Michael Chen",
      role: "Co-Founder & CEO",
      bio: "Logistic professional",
      image: "/lovable-uploads/28fa4c6a-e383-4c64-905c-130b84bf1e79.png"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Research",
      bio: "PhD in Health Informatics, passionate about preventive care",
      image: "/lovable-uploads/28fa4c6a-e383-4c64-905c-130b84bf1e79.png"
    },
    {
      name: "David Kim",
      role: "Head of Technology",
      bio: "Former Google engineer, expert in healthcare AI systems",
      image: "/lovable-uploads/28fa4c6a-e383-4c64-905c-130b84bf1e79.png"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Patient-Centered Care",
      description: "Every decision we make is guided by what's best for our users' health and wellbeing."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Accessibility for All",
      description: "Healthcare should be accessible to everyone, regardless of location or economic status."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Privacy & Security",
      description: "Your health data is sacred. We use bank-level security to protect your information."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-500" />,
      title: "Excellence in Innovation",
      description: "We continuously improve our platform using the latest in medical research and technology."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/premium">
                <Button>Get Premium</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About Healinton Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're on a mission to make quality healthcare accessible to everyone, everywhere. 
            Our platform combines cutting-edge technology with compassionate care to revolutionize 
            how people manage their health.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              To democratize healthcare by providing intelligent, personalized health management tools 
              that empower individuals to take control of their wellbeing. We believe that with the right 
              technology and support, everyone can live a healthier, happier life.
            </p>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-green-600 dark:text-green-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                Healinton Hub was born from a simple but powerful idea: that everyone deserves access to 
                quality healthcare, regardless of where they live or their economic circumstances. Our founders, 
                a team of healthcare professionals and technology experts, came together in 2023 with a shared 
                vision of transforming how people interact with their health.
              </p>
              <p className="mb-4">
                Having witnessed firsthand the challenges people face in managing chronic conditions, accessing 
                specialists, and navigating complex healthcare systems, we knew there had to be a better way. 
                We set out to create a platform that would not just track health metrics, but provide intelligent 
                insights, connect users with healthcare providers, and offer personalized recommendations.
              </p>
              <p>
                Today, Healinton Hub serves thousands of users worldwide, helping them manage everything from 
                diabetes and hypertension to mental health and fitness goals. But we're just getting started. 
                Our vision is to create a world where quality healthcare is truly accessible to all.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already using Healinton Hub to live healthier, more empowered lives.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/auth">
              <Button size="lg" className="px-8 py-4">
                Get Started Free
              </Button>
            </Link>
            <Link to="/premium">
              <Button variant="outline" size="lg" className="px-8 py-4">
                View Premium Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
