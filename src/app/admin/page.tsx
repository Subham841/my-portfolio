"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFirebase } from "@/firebase/provider";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
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

type Contact = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  message: string;
  submittedAt: {
    seconds: number;
    nanoseconds: number;
  };
};

const AdminPage = () => {
  const router = useRouter();
  const { firestore } = useFirebase();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAdminAuthenticated");
    if (authStatus !== "true") {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    if (!firestore || !isAuthenticated) return;

    const fetchContacts = async () => {
      setLoading(true);
      const contactsCollection = collection(firestore, "contacts");
      const q = query(contactsCollection, orderBy("submittedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const contactsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Contact, "id">),
      }));
      setContacts(contactsData);
      setLoading(false);
    };

    fetchContacts();
  }, [firestore, isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/");
  };
  
  if (!isAuthenticated) {
    return (
       <div className="flex min-h-screen items-center justify-center bg-black">
        <Skeleton className="h-[400px] w-[800px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-10">
      <div className="container mx-auto">
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline text-2xl">
              Contact Submissions
            </CardTitle>
            <div className="flex gap-4">
              <Link href="/portfolio">
                <Button variant="outline">View Portfolio</Button>
              </Link>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
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
                          {new Date(
                            contact.submittedAt.seconds * 1000
                          ).toLocaleDateString()}
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
  );
};

export default AdminPage;
