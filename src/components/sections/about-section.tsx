import { GraduationCap, School } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const educationData = [
  {
    level: "B.Tech (CSE)",
    institution: "Nalanda Institute of Technology",
    year: "2nd Year",
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
  },
  {
    level: "Higher Secondary",
    institution: "Aarayan Gurukul",
    icon: <School className="h-8 w-8 text-primary" />,
  },
  {
    level: "Matriculation",
    institution: "Odisha Adarsha Vidyalaya",
    icon: <School className="h-8 w-8 text-primary" />,
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">About Me</h2>
          <p className="text-lg text-gray-400 mt-2">My journey and educational background.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl mb-12">
          <p className="text-center text-lg md:text-xl text-gray-200 leading-relaxed">
            I’m Subham Kumar Sahu, a CSE undergraduate driven by a deep interest in backend development, data structures, and practical problem solving. I actively seek opportunities to apply my technical knowledge to impactful and innovative software solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-headline font-bold text-white text-center mb-8">Education</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {educationData.map((edu, index) => (
              <Card key={index} className="bg-black/20 backdrop-blur-lg border border-white/10 text-white shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="mx-auto bg-slate-800/50 rounded-full p-4 w-fit mb-4">
                    {edu.icon}
                  </div>
                  <CardTitle className="font-headline">{edu.level}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{edu.institution}</p>
                  {edu.year && <p className="text-gray-400 text-sm mt-1">{edu.year}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
