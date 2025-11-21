"use client";

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useFirebase } from '@/firebase/provider';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  role: string;
  imageUrl: string;
};


const ProjectsSection = () => {
  const { firestore } = useFirebase();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore) return;

    const fetchProjects = async () => {
      setLoading(true);
      const projectsCollection = collection(firestore, "projects");
      const q = query(projectsCollection);
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Project, "id">),
      }));
      setProjects(projectsData);
      setLoading(false);
    };

    fetchProjects();
  }, [firestore]);


  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Projects</h2>
          <p className="text-lg text-gray-400 mt-2">A selection of my work.</p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-3xl mx-auto">
          {loading ? (
             <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6">
                <Skeleton className="w-full h-64" />
                <Skeleton className="h-8 w-1/2 mt-4" />
                <Skeleton className="h-4 w-1/3 mt-2" />
                <Skeleton className="h-12 w-full mt-4" />
                <div className="flex flex-wrap gap-2 mt-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                </div>
            </div>
          ) : projects.length === 0 ? (
             <div className="text-center py-12 text-gray-400">
                No projects have been added yet.
              </div>
          ) : (
            projects.map((project, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl overflow-hidden group">
              <div className="relative">
                {project.imageUrl && (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
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
          )))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

    