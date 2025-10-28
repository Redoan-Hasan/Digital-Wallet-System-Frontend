import {
  useGetMyInfoQuery,
  useChangePasswordMutation,
  useChangePinMutation,
} from "@/redux/features/auth/auth.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/Modules/Common/Loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { User, Mail, Phone, ShieldCheck, KeyRound, Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const passwordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

const pinSchema = z.object({
  oldPin: z.string().min(4, "PIN must be 4 digits"),
  newPin: z.string().min(4, "PIN must be 4 digits"),
});

const MyProfile = () => {
  const {
    data: userInfo,
    isLoading,
    isError,
    refetch,
  } = useGetMyInfoQuery(undefined);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);

  const [changePassword, { isLoading: isPasswordChanging }] =
    useChangePasswordMutation();
  const [changePin, { isLoading: isPinChanging }] = useChangePinMutation();

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { oldPassword: "", newPassword: "" },
  });

  const pinForm = useForm<z.infer<typeof pinSchema>>({
    resolver: zodResolver(pinSchema),
    defaultValues: { oldPin: "", newPin: "" },
  });

  const onPasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    try {
      await changePassword(data).unwrap();
      toast.success("Password changed successfully");
      passwordForm.reset();
      setIsPasswordDialogOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  const onPinSubmit = async (data: z.infer<typeof pinSchema>) => {
    try {
      await changePin(data).unwrap();
      toast.success("PIN changed successfully");
      pinForm.reset();
      setIsPinDialogOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change PIN");
    }
  };

  if (isLoading) return <Loader />;
  if (isError || !userInfo?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500">Failed to load profile data.</p>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const user = userInfo.data.data;

  return (
    <div className="mx-auto max-w-8xl p-2 ">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        My Profile
      </h1>

      <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Account Details</CardTitle>
          <CardDescription>Your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 p-6">
          <div className="flex items-center gap-4">
            <User className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-semibold text-lg">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold text-lg">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-semibold text-lg">{user.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p
                className={cn(
                  "font-semibold text-lg",
                  user.status === "ACTIVE" ? "text-green-500" : "text-red-500"
                )}
              >
                {user.status}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Change Password</CardTitle>
            <CardDescription>Update your account password.</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog
              open={isPasswordDialogOpen}
              onOpenChange={setIsPasswordDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <KeyRound className="w-4 h-4 mr-2" /> Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    Enter your old and new password.
                  </DialogDescription>
                </DialogHeader>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Old Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <DialogClose id="close-password-dialog" asChild>
                        <Button type="button" variant="secondary">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button type="submit" disabled={isPasswordChanging}>
                        {isPasswordChanging ? "Changing..." : "Change Password"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Change PIN</CardTitle>
            <CardDescription>
              Update your 4-digit transaction PIN.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isPinDialogOpen} onOpenChange={setIsPinDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Pin className="w-4 h-4 mr-2" /> Change PIN
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Change PIN</DialogTitle>
                  <DialogDescription>
                    Enter your old and new PIN.
                  </DialogDescription>
                </DialogHeader>
                <Form {...pinForm}>
                  <form
                    onSubmit={pinForm.handleSubmit(onPinSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={pinForm.control}
                      name="oldPin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Old PIN</FormLabel>
                          <FormControl>
                            <Input type="number" minLength={4} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={pinForm.control}
                      name="newPin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New PIN</FormLabel>
                          <FormControl>
                            <Input type="number" minLength={4} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <DialogClose id="close-pin-dialog" asChild>
                        <Button type="button" variant="secondary">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button type="submit" disabled={isPinChanging}>
                        {isPinChanging ? "Changing..." : "Change PIN"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;
