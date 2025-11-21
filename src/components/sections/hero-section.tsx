import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const profileImage = PlaceHolderImages.find((img) => img.id === 'profile');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight">
              Subham Kumar Sahu
            </h1>
            <p className="text-xl md:text-2xl font-headline text-primary mb-6">
              Backend Developer & Web Development Enthusiast
            </p>
            
             <div className="mt-8 flex gap-4 justify-center md:justify-start">
               <Button asChild size="lg">
                <Link href="#projects">View Projects</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary rounded-full blur-2xl animate-pulse"></div>
              {profileImage && (
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.description}
                  width={400}
                  height={400}
                  data-ai-hint={profileImage.imageHint}
                  className="relative w-full h-full object-cover rounded-full border-4 border-slate-800 shadow-2xl"
                  priority
                />
              )}
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
