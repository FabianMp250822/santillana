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
import { useTranslation } from "@/hooks/use-translation";
import { useState } from "react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
  const { toast } = useToast();
  const t = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, { message: t('formErrorName') }),
    email: z.string().email({ message: t('formErrorEmail') }),
    phone: z.string().min(7, { message: t('formErrorPhone') }),
    message: z.string().min(10, { message: t('formErrorMessage') }).max(500),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isFirebaseConfigured) {
        toast({
            variant: "destructive",
            title: "Firebase Not Configured",
            description: "Cannot submit form. Please configure Firebase credentials.",
        });
        return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "contacts"), {
        ...values,
        createdAt: serverTimestamp(),
      });
      toast({
        title: t('toastMessageSentTitle'),
        description: t('toastMessageSentDesc'),
      });
      form.reset();
    } catch (error: any) {
      console.error("Error adding document: ", error);
      let description = t('formErrorDesc');
      if (error.message.includes('offline') || error.message.includes('unavailable')) {
        description = "Could not send message. This might be due to an incorrect Firebase project ID or a network issue. Please try again later.";
      }
      toast({
        variant: "destructive",
        title: t('formErrorTitle'),
        description: description,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{t('contactTitle')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('contactSubtitle')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
            <div className="p-6 bg-card rounded-lg border">
                <h3 className="font-headline text-2xl mb-4">{t('contactInfo')}</h3>
                <div className="space-y-4 text-muted-foreground">
                    <a href="tel:+573018698582" className="flex items-center gap-3 hover:text-primary transition-colors">
                        <Phone className="w-5 h-5 text-primary" />
                        <span>+57 301 869 8582</span>
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
                 <h3 className="font-headline text-2xl mb-4">{t('workingHours')}</h3>
                 <div className="space-y-2 text-muted-foreground">
                    <p>{t('workingHours_Weekdays')}</p>
                    <p>{t('workingHours_Saturday')}</p>
                    <p>{t('workingHours_Sunday')}</p>
                 </div>
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{t('contactFormTitle')}</CardTitle>
                <CardDescription>{t('contactFormSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('formNameLabel')}</FormLabel>
                            <FormControl>
                            <Input placeholder={t('formNamePlaceholder')} {...field} />
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
                            <FormLabel>{t('formEmailLabel')}</FormLabel>
                            <FormControl>
                            <Input placeholder={t('formEmailPlaceholder')} {...field} />
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
                            <FormLabel>{t('formPhoneLabel')}</FormLabel>
                            <FormControl>
                            <Input placeholder={t('formPhonePlaceholder')} {...field} />
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
                            <FormLabel>{t('formMessageLabel')}</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder={t('formMessagePlaceholder')}
                                className="min-h-[120px]"
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? t('formSendingButton') : t('formSubmitButton')}
                    </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
