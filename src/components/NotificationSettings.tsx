
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Bell, Calendar, Utensils } from 'lucide-react';

const NotificationSettings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    appointments: false,
    meals: false,
    medications: false
  });
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check current notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Load saved preferences
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      
      if (permission === 'granted') {
        toast({
          title: 'Notifications Enabled',
          description: 'You will now receive notifications for your health reminders.',
        });
      } else {
        toast({
          title: 'Notifications Denied',
          description: 'Please enable notifications in your browser settings to receive reminders.',
          variant: 'destructive'
        });
      }
    }
  };

  const handleToggle = (type: keyof typeof notifications) => {
    const newSettings = {
      ...notifications,
      [type]: !notifications[type]
    };
    
    if (newSettings[type] && permission !== 'granted') {
      requestPermission();
    }
    
    setNotifications(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Notifications`,
      description: `${newSettings[type] ? 'Enabled' : 'Disabled'} successfully.`,
    });
  };

  const scheduleNotification = (title: string, body: string, delay: number) => {
    if (permission === 'granted') {
      setTimeout(() => {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        });
      }, delay);
    }
  };

  const testNotification = () => {
    if (permission === 'granted') {
      new Notification('Healinton Test', {
        body: 'This is a test notification from Healinton!',
        icon: '/favicon.ico'
      });
    } else {
      requestPermission();
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Notification Settings</h3>
      </div>

      <div className="space-y-6">
        {permission !== 'granted' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
              Enable browser notifications to receive health reminders.
            </p>
            <Button onClick={requestPermission} size="sm" className="bg-yellow-600 hover:bg-yellow-700">
              Enable Notifications
            </Button>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-green-600" />
              <div>
                <Label htmlFor="appointments">Appointment Reminders</Label>
                <p className="text-sm text-gray-500">Get notified before your hospital appointments</p>
              </div>
            </div>
            <Switch
              id="appointments"
              checked={notifications.appointments}
              onCheckedChange={() => handleToggle('appointments')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Utensils className="h-4 w-4 text-orange-600" />
              <div>
                <Label htmlFor="meals">Meal Reminders</Label>
                <p className="text-sm text-gray-500">Daily reminders for your meal plans</p>
              </div>
            </div>
            <Switch
              id="meals"
              checked={notifications.meals}
              onCheckedChange={() => handleToggle('meals')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-4 w-4 text-purple-600" />
              <div>
                <Label htmlFor="medications">Medication Reminders</Label>
                <p className="text-sm text-gray-500">Reminders for taking your medications</p>
              </div>
            </div>
            <Switch
              id="medications"
              checked={notifications.medications}
              onCheckedChange={() => handleToggle('medications')}
            />
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button onClick={testNotification} variant="outline" size="sm">
            Test Notification
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NotificationSettings;
