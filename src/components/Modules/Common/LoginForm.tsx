import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 p-2 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="w-full pl-10 p-3 rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    className="w-full pl-10 p-3 rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                </div>
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  Login
                </Button>
                <FieldDescription className="text-center mt-4">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="text-primary hover:underline">
                    Sign up
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
