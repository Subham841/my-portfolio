import { ServerCog } from 'lucide-react';

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Services</h2>
          <p className="text-lg text-gray-400 mt-2">What I can offer.</p>
        </div>
        <div className="flex justify-center">
          <div className="relative max-w-md w-full group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-white shadow-2xl">
              <div className="mx-auto bg-slate-800 rounded-full p-4 w-fit mb-6">
                <ServerCog className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Backend Development</h3>
              <p className="text-gray-300">
                Building scalable backend architectures using Django, Python, and databases such as SQL and PostgreSQL. I focus on creating robust and efficient systems tailored to project needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
