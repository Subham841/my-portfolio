"use client";

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useFirebase, useCollection } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';

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

  const projectsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "projects"));
  }, [firestore]);

  const { data: projects, isLoading } = useCollection<Project>(projectsQuery);


  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Projects</h2>
          <p className="text-lg text-gray-400 mt-2">A selection of my work.</p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-3xl mx-auto">
          {isLoading ? (
             <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6">
                <Skeleton className="w-full h-48 md:h-64" />
                <Skeleton className="h-8 w-1/2 mt-4" />
                <Skeleton className="h-4 w-1/3 mt-2" />
                <Skeleton className="h-12 w-full mt-4" />
                <div className="flex flex-wrap gap-2 mt-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                </div>
            </div>
          ) : !projects || projects.length === 0 ? (
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
                    className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-headline font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-3"><span className="font-semibold">Role:</span> {project.role}</p>
                <p className="text-gray-300 mb-4 text-sm md:text-base">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs">
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
