import { Database } from 'lucide-react';
import DjangoIcon from '../icons/django-icon';
import PythonIcon from '../icons/python-icon';

const skills = [
  {
    name: 'Django',
    icon: <DjangoIcon className="h-10 w-10 text-white" />,
    gradient: 'from-green-600/80 to-teal-800/80',
  },
  {
    name: 'Python',
    icon: <PythonIcon className="h-10 w-10 text-white" />,
    gradient: 'from-blue-600/80 to-yellow-500/80',
  },
  {
    name: 'SQL',
    icon: <Database className="h-10 w-10 text-white" />,
    gradient: 'from-sky-500/80 to-indigo-700/80',
  },
  {
    name: 'PostgreSQL',
    icon: <Database className="h-10 w-10 text-white" />,
    gradient: 'from-blue-700/80 to-slate-800/80',
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 md:py-32 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Technical Skills</h2>
          <p className="text-lg text-gray-400 mt-2">My proficiency in backend technologies.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl flex flex-col items-center justify-center text-center text-white bg-gradient-to-br ${skill.gradient} border border-white/10 shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-primary/30 hover:shadow-2xl hover:-translate-y-2`}
            >
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                {skill.icon}
              </div>
              <h3 className="text-lg font-bold font-headline">{skill.name}</h3>
              <div className="absolute top-0 left-0 w-full h-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
