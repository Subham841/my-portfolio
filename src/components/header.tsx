"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Code, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Admin Panel", href: "/admin" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const sectionIds = navItems.map((item) => item.href.substring(1)).filter(id => id && !id.startsWith('/'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/50 backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2">
          <Code className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline text-white">Subham</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                activeSection === item.href.substring(1)
                  ? "text-primary"
                  : "text-gray-300"
              )}
            >
              {item.label}
              {activeSection === item.href.substring(1) && !item.href.startsWith('/admin') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="icon">
            <Menu className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center z-50">
           <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="absolute top-6 right-4">
            <X className="h-6 w-6 text-white" />
          </Button>
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-2xl font-medium transition-colors hover:text-primary",
                  activeSection === item.href.substring(1)
                    ? "text-primary"
                    : "text-gray-300"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
