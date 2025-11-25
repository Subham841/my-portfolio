"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import ElectricBorder from "../ElectricBorder";
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setIsSubmitting(true);

    emailjs.sendForm(
        'service_8she5yk',
        'template_ofenzro',
        form.current,
        'Zpdz3Axx-ecILKpoo'
    ).then((result) => {
        console.log(result.text);
        toast({
            title: "Form Submitted!",
            description: "Thank you for your message. I will get back to you soon.",
        });
        form.current?.reset();
    }, (error) => {
        console.log(error.text);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "Something went wrong. Please try again.",
        });
    }).finally(() => {
        setIsSubmitting(false);
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-12">Contact With Me</h2>
            <ElectricBorder
              color="#7df9ff"
              speed={1}
              chaos={0.5}
              thickness={2}
              style={{ borderRadius: '1rem' }}
            >
              <div className="relative w-full max-w-lg mx-auto p-6 md:p-8 bg-black/20 backdrop-blur-lg border border-transparent rounded-2xl shadow-2xl">
                <form ref={form} onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div>
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile" className="text-white">Mobile No.</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="Your Mobile Number"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your Email Address"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      required
                      className="mt-2 min-h-[100px]"
                    />
                  </div>
                  <div className="text-center pt-2">
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </div>
            </ElectricBorder>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
