import { useState } from 'react';
import React from 'react';
import { Heart, Calendar, Info, AlertTriangle } from 'lucide-react';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: React.ReactElement;
}

const getInitialNotifications = (): Notification[] => [
  {
    id: 1,
    type: 'reminder',
    title: 'Medication Reminder',
    message: "It's time to take your morning medication (Lisinopril)",
    time: '5 minutes ago',
    read: false,
    icon: React.createElement(Heart, { className: "h-4 w-4 text-red-500" })
  },
  {
    id: 2,
    type: 'appointment',
    title: 'Upcoming Appointment',
    message: 'Your cardiology appointment is scheduled for tomorrow at 2:00 PM',
    time: '2 hours ago',
    read: false,
    icon: React.createElement(Calendar, { className: "h-4 w-4 text-blue-500" })
  },
  {
    id: 3,
    type: 'info',
    title: 'Health Tip',
    message: 'Remember to stay hydrated! Aim for 8 glasses of water daily.',
    time: '1 day ago',
    read: true,
    icon: React.createElement(Info, { className: "h-4 w-4 text-green-500" })
  },
  {
    id: 4,
    type: 'warning',
    title: 'Blood Pressure Alert',
    message: 'Your last reading was slightly elevated. Consider consulting your doctor.',
    time: '2 days ago',
    read: false,
    icon: React.createElement(AlertTriangle, { className: "h-4 w-4 text-orange-500" })
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(getInitialNotifications());

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification
  };
};