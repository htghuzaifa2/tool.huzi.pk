
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length === 0 || message.trim().length === 0) {
      toast({
        title: "Validation Error",
        description: "Name and message fields cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    const whatsappNumber = "923251480148";
    let formattedMessage = `Name: ${name}\n`;
    if (email) {
      formattedMessage += `Email: ${email}\n`;
    }
    if (subject) {
      formattedMessage += `Subject: ${subject}\n`;
    }
    formattedMessage += `\nMessage: ${message}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      formattedMessage
    )}`;

    window.open(whatsappUrl, "_blank");
  };


  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline">Contact Us</h1>
          <p className="text-muted-foreground mt-2">Have a question or feedback? We'd love to hear from you.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            placeholder="Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input 
            type="email"
            placeholder="Your Email (Optional)" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            placeholder="Subject (Optional)" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Textarea 
            placeholder="Your Message" 
            className="min-h-[150px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <div className="text-center">
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
