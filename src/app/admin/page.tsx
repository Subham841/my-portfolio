"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFirebase, useUser } from "@/firebase";
import { collection, getDocs, orderBy, query, doc, getDoc, Timestamp } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { MessageSquare, FolderKanban, Trash2, Edit, User as UserIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking, setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";


type Contact = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  message: string;
  submittedAt: Timestamp;
};

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  role: string;
  imageUrl: string;
};

const AdminPage = () => {
  const router = useRouter();
  const { firestore, auth } = useFirebase();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Project form state
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTech, setProjectTech] = useState("");
  const [projectRole, setProjectRole] = useState("");
  const [projectImageUrl, setProjectImageUrl] = useState("");
  
  // Profile Photo state
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState("");
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAdminAuthenticated");
    if (authStatus !== "true") {
      router.push("/");
    } else {
      setIsAuthenticated(true);
      if (auth && !user && !isUserLoading) {
        initiateAnonymousSignIn(auth);
      }
    }
  }, [router, auth, user, isUserLoading]);

  const fetchContacts = async () => {
    if (!firestore) return;
    setLoadingContacts(true);
    try {
      const contactsCollection = collection(firestore, "contacts");
      const q = query(contactsCollection, orderBy("submittedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const contactsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Contact, "id">),
      }));
      setContacts(contactsData);
    } catch (e: any) {
        toast({ variant: "destructive", title: "Could not load contacts.", description: e.message });
    } finally {
        setLoadingContacts(false);
    }
  };
  
  const fetchProjects = async () => {
    if (!firestore) return;
    setLoadingProjects(true);
    try {
      const projectsCollection = collection(firestore, "projects");
      const q = query(projectsCollection);
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Project, "id">),
      }));
      setProjects(projectsData);
    } catch (e: any) {
        toast({ variant: "destructive", title: "Could not load projects.", description: e.message });
    } finally {
        setLoadingProjects(false);
    }
  };

  const fetchProfileImage = async () => {
    if (!firestore) return;
    setLoadingProfile(true);
    try {
      const settingsDoc = doc(firestore, "settings", "main");
      const docSnap = await getDoc(settingsDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const url = data.profileImageUrl || "";
        setProfileImageUrl(url);
        setCurrentProfileImageUrl(url);
      }
    } catch (e: any) {
        toast({ variant: "destructive", title: "Could not load profile photo.", description: e.message });
    } finally {
      setLoadingProfile(false);
    }
  }

  useEffect(() => {
    if (firestore && isAuthenticated && user) {
      fetchContacts();
      fetchProjects();
      fetchProfileImage();
    }
  }, [firestore, isAuthenticated, user]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/");
  };

  const resetProjectForm = () => {
    setProjectTitle("");
    setProjectDescription("");
    setProjectTech("");
    setProjectRole("");
    setProjectImageUrl("");
    setEditingProject(null);
  }
  
  const handleOpenProjectDialog = (project: Project | null) => {
    if (project) {
        setEditingProject(project);
        setProjectTitle(project.title);
        setProjectDescription(project.description);
        setProjectTech(project.technologies ? project.technologies.join(', ') : '');
        setProjectRole(project.role);
        setProjectImageUrl(project.imageUrl);
    } else {
        resetProjectForm();
    }
    setIsProjectDialogOpen(true);
  }

  const handleProjectFormSubmit = () => {
    if (!firestore) return;

    const projectData = {
        title: projectTitle,
        description: projectDescription,
        technologies: projectTech ? projectTech.split(',').map(t => t.trim()) : [],
        role: projectRole,
        imageUrl: projectImageUrl,
    };

    if (editingProject) {
        // Update existing project
        updateDocumentNonBlocking(doc(firestore, "projects", editingProject.id), projectData);
        toast({
            title: "Project Updated",
            description: "Your project has been successfully updated.",
        });
    } else {
        // Add new project
        addDocumentNonBlocking(collection(firestore, "projects"), projectData);
        toast({
            title: "Project Added",
            description: "Your new project has been saved.",
        });
    }
    
    resetProjectForm();
    setIsProjectDialogOpen(false);
    // It can take a moment for data to sync, so we optimistically re-fetch
    setTimeout(() => fetchProjects(), 500); 
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!firestore) return;
    if (!confirm("Are you sure you want to delete this project?")) return;

    deleteDocumentNonBlocking(doc(firestore, "projects", projectId));
    toast({
      title: "Project Deleted",
      description: "The project has been successfully deleted.",
    });
    // It can take a moment for data to sync, so we optimistically re-fetch
    setTimeout(() => fetchProjects(), 500);
  };

  const handleUpdateProfileImage = () => {
    if (!firestore) return;
    const settingsDocRef = doc(firestore, 'settings', 'main');
    setDocumentNonBlocking(settingsDocRef, { profileImageUrl }, { merge: true });
    toast({
      title: "Profile Photo Updated",
      description: "Your profile photo has been updated.",
    });
    setIsProfileDialogOpen(false);
    // It can take a moment for data to sync, so we optimistically re-fetch
    setTimeout(() => fetchProfileImage(), 500);
  };

  if (!isAuthenticated || isUserLoading) {
    return (
       <div className="flex min-h-screen items-center justify-center bg-black">
        <Skeleton className="h-screen w-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-10">
      <div className="container mx-auto">
        <header className="mb-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {currentProfileImageUrl ? (
                    <Image
                      src={currentProfileImageUrl}
                      alt="Admin"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : <Skeleton className="h-10 w-10 rounded-full" />}
                  <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
                </div>
                <div className="flex gap-4">
                  <Link href="/portfolio">
                    <Button variant="outline">View Portfolio</Button>
                  </Link>
                  <Button onClick={handleLogout} variant="destructive">
                    Logout
                  </Button>
                </div>
            </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Submissions
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loadingContacts ? <Skeleton className="h-8 w-16" /> : contacts.length}</div>
                <p className="text-xs text-muted-foreground">
                  Total messages received
                </p>
              </CardContent>
            </Card>
            <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loadingProjects ? <Skeleton className="h-8 w-16" /> : projects.length}</div>
                <p className="text-xs text-muted-foreground">
                  Projects in your portfolio
                </p>
              </CardContent>
            </Card>
             <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Manage Profile
                </CardTitle>
                <UserIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Dialog open={isProfileDialogOpen} onOpenChange={(isOpen) => {
                    setIsProfileDialogOpen(isOpen);
                    if (isOpen) {
                        fetchProfileImage(); // Re-fetch when dialog opens
                    }
                }}>
                  <DialogTrigger asChild>
                      <Button className="w-full mt-4">Update Photo</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700">
                      <DialogHeader>
                      <DialogTitle>Update Profile Photo</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="p-image-url" className="text-right">Image URL</Label>
                            <Input id="p-image-url" value={profileImageUrl} onChange={(e) => setProfileImageUrl(e.target.value)} className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                          <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button onClick={handleUpdateProfileImage}>Save Photo</Button>
                      </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
        </div>

        <div className="grid gap-8">
            <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="font-headline text-2xl">
                  Manage Projects
                </CardTitle>
                 <Dialog open={isProjectDialogOpen} onOpenChange={(isOpen) => {
                    setIsProjectDialogOpen(isOpen);
                    if (!isOpen) {
                        resetProjectForm();
                    }
                 }}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenProjectDialog(null)}>Add New Project</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700">
                        <DialogHeader>
                        <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="p-title" className="text-right">Title</Label>
                            <Input id="p-title" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="p-desc" className="text-right">Description</Label>
                            <Textarea id="p-desc" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="p-tech" className="text-right">Technologies</Label>
                            <Input id="p-tech" value={projectTech} onChange={(e) => setProjectTech(e.target.value)} className="col-span-3" placeholder="Comma-separated, e.g., Next.js, ShadCN"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="p-role" className="text-right">Role</Label>
                            <Input id="p-role" value={projectRole} onChange={(e) => setProjectRole(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                             <Label htmlFor="p-image" className="text-right">Image URL</Label>
                            <Input id="p-image" value={projectImageUrl} onChange={(e) => setProjectImageUrl(e.target.value)} className="col-span-3" />
                        </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleProjectFormSubmit}>Save Project</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {loadingProjects ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    No projects added yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-slate-900/50 border-b border-white/10">
                          <TableHead className="text-white font-semibold">Title</TableHead>
                          <TableHead className="text-white font-semibold">Role</TableHead>
                          <TableHead className="text-white font-semibold">Technologies</TableHead>
                          <TableHead className="text-right text-white font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map((project) => (
                          <TableRow key={project.id} className="hover:bg-slate-900/50 border-b border-white/10">
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell>{project.role}</TableCell>
                            <TableCell>{project.technologies?.join(', ') || ''}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" className="mr-2" onClick={() => handleOpenProjectDialog(project)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Contact Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingContacts ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    No contact submissions yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-slate-900/50 border-b border-white/10">
                          <TableHead className="text-white font-semibold">Name</TableHead>
                          <TableHead className="text-white font-semibold">Email</TableHead>
                          <TableHead className="text-white font-semibold">Mobile</TableHead>
                          <TableHead className="text-white font-semibold">Message</TableHead>
                          <TableHead className="text-right text-white font-semibold">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts.map((contact) => (
                          <TableRow key={contact.id} className="hover:bg-slate-900/50 border-b border-white/10">
                            <TableCell>{contact.name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.mobile}</TableCell>
                            <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                            <TableCell className="text-right">
                              {contact.submittedAt ? new Date(
                                contact.submittedAt.seconds * 1000
                              ).toLocaleDateString() : 'N/A'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

    