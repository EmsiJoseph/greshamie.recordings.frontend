import { Bell } from 'lucide-react';
import { PhoneCall } from 'lucide-react';

export const SIDEBAR_ITEMS = {
    Admin: [
        {
            title: 'Call logs',
            icon: PhoneCall,
            url: '/call-logs',
            active: false
        },
        {
            title: 'Activity',
            icon: Bell,
            url: '/activity',
            active: true
        },
    ],
}