"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { Facebook, Instagram } from "lucide-react";
import { auth } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
type LoginSchema = z.infer<typeof loginSchema>;

const GoogleIcon = () => (
    <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.222,0-9.655-3.417-11.297-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574	l6.19,5.238C39.99,34.552,44,29.865,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
)

export default function LoginPage() {
  const t = useTranslation();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  const { register: registerSignIn, handleSubmit: handleSubmitSignIn, formState: { errors: errorsSignIn } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

   const { register: registerSignUp, handleSubmit: handleSubmitSignUp, formState: { errors: errorsSignUp } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });


  const handleAuthAction = async (action: 'signIn' | 'signUp', data: LoginSchema) => {
    setIsLoading(true);
    try {
      if (action === 'signIn') {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } else {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
      }
      toast({ title: t('loginTitle'), description: "You have successfully logged in." });
      router.push('/profile');
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Authentication Error", description: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  const onSignInSubmit: SubmitHandler<LoginSchema> = (data) => handleAuthAction('signIn', data);
  const onSignUpSubmit: SubmitHandler<LoginSchema> = (data) => handleAuthAction('signUp', data);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        toast({ title: "Welcome!", description: "You have successfully signed in with Google." });
        router.push('/profile');
    } catch (error: any) {
        toast({ variant: 'destructive', title: "Authentication Error", description: error.message });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-16 px-4 flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">{t('loginTitle')}</CardTitle>
                <CardDescription>{t('loginSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                       <GoogleIcon /> Continue with Google
                    </Button>
                    <Button variant="outline" className="w-full" disabled>
                        <Facebook className="mr-2 h-5 w-5 text-blue-600" /> {t('loginFacebook')}
                    </Button>
                    <Button variant="outline" className="w-full" disabled>
                        <Instagram className="mr-2 h-5 w-5 text-pink-600" /> {t('loginInstagram')}
                    </Button>
                </div>
                
                <div className="my-6 flex items-center">
                    <Separator className="flex-1" />
                    <span className="mx-4 text-xs text-muted-foreground">{t('loginOr')}</span>
                    <Separator className="flex-1" />
                </div>

                <Tabs defaultValue="signin" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                        <form onSubmit={handleSubmitSignIn(onSignInSubmit)} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="signin-email">{t('loginEmailLabel')}</Label>
                                <Input id="signin-email" type="email" placeholder="you@example.com" {...registerSignIn("email")} />
                                {errorsSignIn.email && <p className="text-destructive text-sm">{errorsSignIn.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signin-password">{t('loginPasswordLabel')}</Label>
                                <Input id="signin-password" type="password" {...registerSignIn("password")} />
                                {errorsSignIn.password && <p className="text-destructive text-sm">{errorsSignIn.password.message}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Signing In..." : "Sign In"}
                            </Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="signup">
                        <form onSubmit={handleSubmitSignUp(onSignUpSubmit)} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="signup-email">{t('loginEmailLabel')}</Label>
                                <Input id="signup-email" type="email" placeholder="you@example.com" {...registerSignUp("email")} />
                                {errorsSignUp.email && <p className="text-destructive text-sm">{errorsSignUp.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-password">{t('loginPasswordLabel')}</Label>
                                <Input id="signup-password" type="password" {...registerSignUp("password")} />
                                {errorsSignUp.password && <p className="text-destructive text-sm">{errorsSignUp.password.message}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Signing Up..." : "Sign Up"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}
