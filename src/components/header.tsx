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
import { usePathname } from "next/navigation";


const navItems = [
  { label: "Home", href: "/portfolio#home", icon: <Home size={28} /> },
  { label: "About", href: "/portfolio#about", icon: <User size={28} /> },
  { label: "Skills", href: "/portfolio#skills", icon: <Wrench size={28} /> },
  { label: "Experience", href: "/portfolio#experience", icon: <Briefcase size={28} /> },
  { label: "Services", href: "/portfolio#services", icon: <Server size={28} /> },
  { label: "Projects", href: "/portfolio#projects", icon: <FolderKanban size={28} /> },
  { label: "Contact", href: "/portfolio#contact", icon: <Mail size={28} /> },
];

const Header = () => {
  const pathname = usePathname();

  const scrollToSection = (href: string) => {
    if (pathname !== '/portfolio') {
      window.location.href = href;
    } else {
      const selector = href.split('#')[1];
      if (selector) {
        document.querySelector(`#${selector}`)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const dockItems = navItems.map(item => ({
    icon: (
      <button 
        onClick={() => scrollToSection(item.href)} 
        className="w-full h-full flex items-center justify-center text-gray-300 hover:text-primary"
        aria-label={item.label}
      >
        {item.icon}
      </button>
    ),
    label: item.label,
    onClick: () => scrollToSection(item.href)
  }));
  
  if (pathname !== '/portfolio') {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center"
      )}
    >
        <Dock items={dockItems} />
    </header>
  );
};

export default Header;
