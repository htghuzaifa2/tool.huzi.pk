import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline">Contact Us</h1>
          <p className="text-muted-foreground mt-2">Have a question or feedback? We'd love to hear from you.</p>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Your Name" />
            <Input type="email" placeholder="Your Email" />
          </div>
          <Input placeholder="Subject" />
          <Textarea placeholder="Your Message" className="min-h-[150px]" />
          <div className="text-center">
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
