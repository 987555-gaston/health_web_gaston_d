import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="bg-gradient-to-b from-white to-slate-50 py-12">
      <div className="container max-w-md">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-2xl">Patient Login</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Email or Username</Label>
              <Input id="username" autoComplete="username" aria-label="Email or username" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="current-password" aria-label="Password" />
            </div>
            <div className="flex items-center justify-between">
              <Button className="h-11 px-6">Log in</Button>
              <Link to="/forgot-password" className="text-sm text-primary underline underline-offset-4">Forgot password?</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
