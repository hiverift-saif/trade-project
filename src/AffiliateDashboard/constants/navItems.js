import {
  LayoutDashboard,
  User,
  ChartColumn,
  Link2,
  CreditCard,
  Image,
  Send,
  CircleQuestionMark,
  FileText,
  Users
} from 'lucide-react';

export const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', link: '/Dashboard', active: false },
  { icon: User, label: 'Profile', link: '/profile', active: false },
  { icon: ChartColumn, label: 'Statistics', link: '/statistics', active: false },
  { icon: Link2, label: 'Links', link: '/links', active: false },
  { icon: CreditCard, label: 'Payments', link: '/payments', active: false },
  { icon: Image, label: 'Promo Materials', link: '/promo', active: false },
  { icon: Send, label: 'Telegram Bot', link: '/telegram', active: false },
  { icon: CircleQuestionMark, label: 'Support', link: '/support', active: false },
  { icon: FileText, label: 'Affiliate Programs', link: '/programs', active: false },
  { icon: Users, label: 'Sub Affiliate', link: '/sub-affiliate', active: false },
];