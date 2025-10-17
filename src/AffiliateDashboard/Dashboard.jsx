import React from 'react';
import Layout from './Layout';
import MetricsCard from './MetricsCard';
import QuickActionCard from './QuickActionCard';
import BalanceCard from './BalanceCard';
import CommissionsCard from './CommissionsCard';
import { UserPlus, Link2, MousePointer, Image as LucideImage, CircleQuestionMark, Send } from 'lucide-react';

function Dashboard() {
  const balanceData = [
    { label: 'Balance', value: '$0', color: 'text-white' },
    { label: 'Pending', value: '$0', color: 'text-yellow-400' },
    { label: 'Hold', value: '$0', color: 'text-red-400' },
  ];

  const metricsData = [
    { title: 'Registered Referrals', value: '0', icon: UserPlus, iconColor: 'text-blue-500' },
    { title: 'Referrals Links', value: '1', icon: Link2, iconColor: 'text-green-500' },
    { title: 'Clicks', value: '0', icon: MousePointer, iconColor: 'text-purple-500' },
  ];

  const quickActions = [
    { icon: LucideImage, label: 'Promo Materials', link: '/promo', color: 'blue' },
    { icon: Link2, label: 'Links', link: '/links', color: 'green' },
    { icon: CircleQuestionMark, label: 'FAQ', link: '/faq', color: 'purple' },
    { icon: Send, label: 'Telegram Bot', link: '/telegram', color: 'orange' },
  ];

  const balanceMetrics = [
    { label: 'Deposits', value: '$0.00' },
    { label: "FTD's", value: '$0.00' },
    { label: 'Clicks', value: '0' },
    { label: 'Registrations', value: '0' },
  ];

  return (
    <Layout pageTitle="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {metricsData.map((metric) => (
            <MetricsCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              iconColor={metric.iconColor}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.label}
              icon={action.icon}
              label={action.label}
              link={action.link}
              color={action.color}
            />
          ))}
        </div>
        <BalanceCard metrics={balanceMetrics} />
        <CommissionsCard amount="$0.00" />
      </div>
    </Layout>
  );
}

export default Dashboard;