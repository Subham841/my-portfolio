"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ContactSection = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle the form submission, e.g., send data to a server.
    // For this example, we'll just show a toast notification.
    toast({
      title: "Form Submitted!",
      description: "Thank you for your message. I will get back to you soon.",
    });
    setName("");
    setMobile("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-12">Contact With Me</h2>
          <div className="relative w-full max-w-lg mx-auto p-8 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div>
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="mobile" className="text-white">Mobile No.</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Your Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Gmail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Gmail Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-white">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="mt-2 min-h-[100px]"
                />
              </div>
              <div className="text-center">
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
