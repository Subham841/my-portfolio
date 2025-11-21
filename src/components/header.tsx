"use client";

import Link from "next/link";
import {
  Code,
  Home,
  User,
  Wrench,
  Briefcase,
  Server,
  FolderKanban,
  Mail,
  PanelTop,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Dock from "@/components/Dock";

const navItems = [
  { label: "Home", href: "#home", icon: <Home size={28} /> },
  { label: "About", href: "#about", icon: <User size={28} /> },
  { label: "Skills", href: "#skills", icon: <Wrench size={28} /> },
  { label: "Experience", href: "#experience", icon: <Briefcase size={28} /> },
  { label: "Services", href: "#services", icon: <Server size={28} /> },
  { label: "Projects", href: "#projects", icon: <FolderKanban size={28} /> },
  { label: "Contact", href: "#contact", icon: <Mail size={28} /> },
];

const Header = () => {
  const dockItems = navItems.map(item => ({
    icon: (
      <Link href={item.href} className="w-full h-full flex items-center justify-center text-gray-300 hover:text-primary">
        {item.icon}
      </Link>
    ),
    label: item.label,
    onClick: () => {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
    }
  }));

  return (
    <header
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center"
      )}
    >
        <Dock items={dockItems} />
    </header>
  );
};

export default Header;
