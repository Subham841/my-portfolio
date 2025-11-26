import { Database, type LucideIcon } from 'lucide-react';
import DjangoIcon from '../icons/django-icon';
import PythonIcon from '../icons/python-icon';
import { useFirebase, useCollection } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';
import * as LucideIcons from 'lucide-react';
import { useMemo } from 'react';

type Skill = {
  id: string;
  name: string;
  icon: string;
  gradient: string;
};

const iconComponents: { [key: string]: React.ElementType } = {
  ...LucideIcons,
  django: DjangoIcon,
  python: PythonIcon,
};

const SkillsSection = () => {
  const { firestore } = useFirebase();

  const skillsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "skills"));
  }, [firestore]);

  const { data: skills, isLoading } = useCollection<Skill>(skillsQuery);

  const getIconComponent = (iconName: string): React.ElementType => {
    const IconComponent = iconComponents[iconName];
    // A bit of a hack to handle inconsistent casing in lucide-react
    if (IconComponent) return IconComponent;
    
    const likelyName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const LikelyIconComponent = iconComponents[likelyName];
    if(LikelyIconComponent) return LikelyIconComponent;

    return Database; // Default icon
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Technical Skills</h2>
          <p className="text-lg text-gray-400 mt-2">My proficiency in backend technologies.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-36 w-full rounded-2xl" />
            ))
          ) : !skills || skills.length === 0 ? (
             <div className="text-center py-12 text-gray-400 col-span-2 md:col-span-4">
                No skills have been added yet.
              </div>
          ) : (
            skills.map((skill) => {
              const IconComponent = getIconComponent(skill.icon);
              return (
                <div
                  key={skill.id}
                  className={`relative p-6 rounded-2xl flex flex-col items-center justify-center text-center text-white bg-gradient-to-br ${skill.gradient} border border-white/10 shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-primary/30 hover:shadow-2xl hover:-translate-y-2`}
                >
                  <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-headline">{skill.name}</h3>
                  <div className="absolute top-0 left-0 w-full h-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
