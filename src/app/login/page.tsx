import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="container mx-auto py-16 px-4 flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
                <CardDescription>Sign in to access your profile and favorites.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Button variant="outline" className="w-full">
                        <Facebook className="mr-2 h-5 w-5 text-blue-600" /> Continue with Facebook
                    </Button>
                    <Button variant="outline" className="w-full">
                        <Instagram className="mr-2 h-5 w-5 text-pink-600" /> Continue with Instagram
                    </Button>
                </div>
                
                <div className="my-6 flex items-center">
                    <Separator className="flex-1" />
                    <span className="mx-4 text-xs text-muted-foreground">OR</span>
                    <Separator className="flex-1" />
                </div>
                
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <Button type="submit" className="w-full">
                        <Mail className="mr-2 h-5 w-5" /> Sign In with Email
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
