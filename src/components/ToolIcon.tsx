'use client';

import {
  Microscope, Zap, RefreshCw, Anchor, List,
  CircleDollarSign, Video, TrendingUp, Bot, Wallet,
  Activity, Map, Target, LayoutTemplate, Smartphone,
  Search, Clapperboard, CalendarDays,
  LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Microscope,
  Zap,
  RefreshCw,
  Anchor,
  List,
  CircleDollarSign,
  Video,
  TrendingUp,
  Bot,
  Wallet,
  Activity,
  Map,
  Target,
  LayoutTemplate,
  Smartphone,
  Search,
  Clapperboard,
  CalendarDays,
};

interface ToolIconProps {
  name: string;
  size?: number;
}

export default function ToolIcon({ name, size = 18 }: ToolIconProps) {
  const Icon = ICON_MAP[name] ?? Activity;
  return <Icon size={size} strokeWidth={2} />;
}
