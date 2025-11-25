
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
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Dock from "@/components/Dock";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('resize', checkMobile);
        window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('/')) {
        router.push(href);
        return;
    }
    if (pathname !== '/portfolio') {
      window.location.href = href;
    } else {
      const selector = href.split('#')[1];
      if (selector) {
        document.querySelector(`#${selector}`)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  const iconSize = isMobile ? 24 : 28;

  const mobileNavItems = [
    { label: "Home", href: "/portfolio#home", icon: <Home size={iconSize} /> },
    { label: "About", href: "/portfolio#about", icon: <User size={iconSize} /> },
    { label: "Skills", href: "/portfolio#skills", icon: <Wrench size={iconSize} /> },
    { label: "Experience", href: "/portfolio#experience", icon: <Briefcase size={iconSize} /> },
    { label: "Services", href: "/portfolio#services", icon: <Server size={iconSize} /> },
    { label: "Projects", href: "/portfolio#projects", icon: <FolderKanban size={iconSize} /> },
    { label: "Contact", href: "/portfolio#contact", icon: <Mail size={iconSize} /> },
    { label: "Admin", href: "/", icon: <Shield size={iconSize} /> },
  ];

  const dockItems = mobileNavItems.map(item => ({
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
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-full px-4 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
        <Dock 
          items={dockItems}
          baseItemSize={isMobile ? 40 : 50}
          magnification={isMobile ? 40 : 50}
          distance={isMobile ? 150 : 200}
          panelHeight={isMobile ? 52 : 68}
        />
    </header>
  );
};

export default Header;
