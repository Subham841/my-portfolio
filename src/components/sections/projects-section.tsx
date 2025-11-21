import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'Admin Panel Project',
    description: 'A functional and responsive admin panel built using Django for managing data and backend operations.',
    technologies: ['Django', 'Python', 'SQL'],
    role: 'Backend Developer',
    image: PlaceHolderImages.find((img) => img.id === 'admin-panel'),
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Projects</h2>
          <p className="text-lg text-gray-400 mt-2">A selection of my work.</p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-3xl mx-auto">
          {projects.map((project, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl overflow-hidden group">
              <div className="relative">
                {project.image && (
                  <Image
                    src={project.image.imageUrl}
                    alt={project.image.description}
                    width={600}
                    height={400}
                    data-ai-hint={project.image.imageHint}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-headline font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-3"><span className="font-semibold">Role:</span> {project.role}</p>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
