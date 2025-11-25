"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';

const HeroSection = () => {
  const { firestore } = useFirebase();
  
  const settingsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, "settings", "main");
  }, [firestore]);

  const { data: settings, isLoading } = useDoc(settingsRef);

  const profileImageUrl = settings?.profileImageUrl;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden py-20">
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-1 md:order-2">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary rounded-full blur-2xl animate-pulse"></div>
              {isLoading ? (
                 <Skeleton className="relative w-full h-full rounded-full border-4 border-slate-800 shadow-2xl" />
              ) : profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt="Subham Kumar Sahu"
                  width={400}
                  height={400}
                  className="relative w-full h-full object-cover rounded-full border-4 border-slate-800 shadow-2xl"
                  priority
                />
              ) : (
                <div className="relative w-full h-full object-cover rounded-full border-4 border-slate-800 shadow-2xl bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight">
              Subham Kumar Sahu
            </h1>
            <p className="text-xl md:text-2xl font-headline text-primary mb-6">
              Backend Developer & Web Development Enthusiast
            </p>
            
             <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
               <Link href="#projects">
                  <Button size="lg">View Projects</Button>
                </Link>
                <Link href="#contact">
                   <Button size="lg" variant="outline">Contact Me</Button>
                </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link href="#about" aria-label="Scroll to about section">
          <ArrowDown className="w-8 h-8 text-gray-400 animate-bounce"/>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
