
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Users, Calendar as CalendarIcon, Heart, MessageCircle, Star } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Community = () => {
  const [appointmentDate, setAppointmentDate] = useState<Date>();
  const [appointmentTime, setAppointmentTime] = useState('');

  const communityStats = [
    { label: 'Active Members', value: '2,847', icon: Users },
    { label: 'Health Stories', value: '1,293', icon: Heart },
    { label: 'Support Groups', value: '47', icon: MessageCircle },
    { label: 'Success Stories', value: '892', icon: Star }
  ];

  const supportGroups = [
    {
      name: 'Diabetes Support Circle',
      members: 234,
      description: 'Share experiences and tips for managing diabetes',
      nextMeeting: 'Tomorrow at 7:00 PM'
    },
    {
      name: 'Heart Health Warriors',
      members: 189,
      description: 'Supporting each other through heart health journeys',
      nextMeeting: 'Friday at 6:30 PM'
    },
    {
      name: 'Healthy Aging Together',
      members: 156,
      description: 'Tips and support for aging gracefully and healthily',
      nextMeeting: 'Saturday at 2:00 PM'
    }
  ];

  const handleAppointment = () => {
    if (appointmentDate && appointmentTime) {
      alert(`Appointment scheduled for ${format(appointmentDate, 'PPP')} at ${appointmentTime}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section with Community Image */}
        <div className="text-center mb-16">
          <div className="relative mb-8 rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Community of people in their forties smiling together"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-2">
                Health Community
              </h1>
              <p className="text-xl">
                Connect, share, and grow with others on their health journey
              </p>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {communityStats.map((stat, index) => (
            <Card key={index} className="healthcare-card text-center p-4">
              <stat.icon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Appointment Scheduling */}
        <div className="mb-12">
          <Card className="healthcare-card p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <CalendarIcon className="h-6 w-6 mr-2 text-primary-600" />
              Schedule Your Appointment
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label htmlFor="appointment-date" className="text-base font-medium mb-3 block">
                  Select Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !appointmentDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {appointmentDate ? format(appointmentDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={appointmentDate}
                      onSelect={setAppointmentDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="appointment-time" className="text-base font-medium mb-3 block">
                  Select Time
                </Label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full p-3 border border-input rounded-md bg-background"
                >
                  <option value="">Choose a time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                </select>
              </div>
            </div>
            <Button 
              onClick={handleAppointment} 
              className="healthcare-button mt-6 w-full md:w-auto"
              disabled={!appointmentDate || !appointmentTime}
            >
              Schedule Appointment
            </Button>
          </Card>
        </div>

        {/* Support Groups */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Users className="h-6 w-6 mr-2 text-primary-600" />
            Join Our Support Groups
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {supportGroups.map((group, index) => (
              <Card key={index} className="healthcare-card p-6">
                <h3 className="text-lg font-semibold mb-3">{group.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {group.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {group.members} members
                  </span>
                  <span className="text-sm font-medium text-primary-600">
                    {group.nextMeeting}
                  </span>
                </div>
                <Button variant="outline" className="w-full">
                  Join Group
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <Card className="healthcare-card p-8">
          <h3 className="text-xl font-semibold mb-4">Community Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Be Respectful</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Treat all community members with kindness and respect
              </p>
              <h4 className="font-medium mb-2">Share Responsibly</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Share your experiences while respecting privacy
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">No Medical Advice</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Share experiences, not medical advice. Always consult professionals
              </p>
              <h4 className="font-medium mb-2">Stay Positive</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Focus on support, encouragement, and constructive discussions
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Community;
