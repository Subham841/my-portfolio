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

interface Contact {
  id: string;
  name: string;
  mobile: string;
  email: string;
  message: string;
  submittedAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const { firestore } = useFirebase();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated");
    if (isAuthenticated !== "true") {
      router.push("/");
    } else {
      const fetchContacts = async () => {
        if (!firestore) return;
        setLoading(true);
        try {
          const contactsCollection = collection(firestore, "contacts");
          const q = query(contactsCollection, orderBy("submittedAt", "desc"));
          const querySnapshot = await getDocs(q);
          const contactsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Contact[];
          setContacts(contactsData);
        } catch (error) {
          console.error("Error fetching contacts: ", error);
        } finally {
          setLoading(false);
        }
      };
      fetchContacts();
    }
  }, [router, firestore]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminAuthenticated");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-headline font-bold">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="destructive">Logout</Button>
        </div>
        
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle>Contact Form Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Mobile</TableHead>
                  <TableHead className="text-white">Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id} className="border-gray-800">
                    <TableCell>
                      {new Date(contact.submittedAt.seconds * 1000).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.mobile}</TableCell>
                    <TableCell>{contact.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {contacts.length === 0 && (
                <p className="text-center text-gray-400 py-8">No messages yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
