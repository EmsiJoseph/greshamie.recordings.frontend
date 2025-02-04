import { ChartLine, LayoutDashboard } from 'lucide-react';
import { Bell } from 'lucide-react';
import { PhoneCall } from 'lucide-react';
import { Book } from 'lucide-react';
import { ChartSpline } from 'lucide-react';
import { Settings } from 'lucide-react';
export const SIDEBAR_ITEMS = {
    Admin: [
        {
            title: 'Activity',
            icon: Bell,
            url: '/admin/activity',
        },
        {
            title: 'Call logs',
            icon: PhoneCall,
            url: '/admin/call-logs',
        },
        {
            title: 'Analytics',
            icon: ChartLine,
            url: '/admin/analytics',
        },
    ],
    
}