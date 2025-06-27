
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(7, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500),
});

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Contact form submitted:", values);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Contact Us</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
            <div className="p-6 bg-card rounded-lg border">
                <h3 className="font-headline text-2xl mb-4">Contact Information</h3>
                <div className="space-y-4 text-muted-foreground">
                    <a href="tel:+573015888282" className="flex items-center gap-3 hover:text-primary transition-colors">
                        <Phone className="w-5 h-5 text-primary" />
                        <span>+57 301 588 8282</span>
                    </a>
                    <a href="mailto:gerenciacomercial@santillanadelmar.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                        <Mail className="w-5 h-5 text-primary" />
                        <span>gerenciacomercial@santillanadelmar.com</span>
                    </a>
                    <p className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>MANGA - AV. PRINCIPAL, Cartagena, Colombia</span>
                    </p>
                </div>
            </div>
            <div className="p-6 bg-card rounded-lg border">
                 <h3 className="font-headline text-2xl mb-4">Working Hours</h3>
                 <div className="space-y-2 text-muted-foreground">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: By appointment only</p>
                 </div>
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and our team will be in touch.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                            <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Tell us how we can help..."
                                className="min-h-[120px]"
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
