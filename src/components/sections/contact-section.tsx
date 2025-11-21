import { Button } from "@/components/ui/button";
import Link from "next/link";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Get In Touch</h2>
          <p className="text-lg text-gray-400 mt-4 mb-8">
            My social platforms and contact details are coming soon. Stay tuned!
          </p>
          <div className="relative w-full max-w-sm mx-auto p-8 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl">
             <p className="text-white text-xl font-semibold">Coming Soon...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
