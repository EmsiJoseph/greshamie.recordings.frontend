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
            url: '/activity',
            active: true
        },
        {
            title: 'Call logs',
            icon: PhoneCall,
            url: '/call-logs',
            active: false
        },
        {
            title: 'Analytics',
            icon: ChartLine,
            url: '/analytics',
            active: false
        },
        {
            title: 'Audio Test',
            icon: ChartLine,
            url: '/audiotest',
            active: false
        },
    ],
    
}