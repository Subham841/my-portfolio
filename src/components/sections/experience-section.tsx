import { Briefcase } from 'lucide-react';

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Experience</h2>
          <p className="text-lg text-gray-400 mt-2">My professional training and roles.</p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-white/10"></div>
          
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-4 w-4 h-4 bg-primary rounded-full border-4 border-slate-800"></div>
            <div className="md:flex items-center w-full">
              <div className="md:w-1/2"></div>
              <div className="md:w-1/2 md:pl-8">
                <div className="bg-black/20 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-2xl">
                  <div className="flex items-center gap-4 mb-3">
                    <Briefcase className="h-6 w-6 text-primary"/>
                    <h3 className="text-xl font-headline font-bold text-white">Training Role</h3>
                  </div>
                  <p className="text-gray-400 font-semibold mb-3">Logisaar</p>
                  <p className="text-gray-300">
                    Completed hands-on training where I gained practical exposure in backend and system operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
