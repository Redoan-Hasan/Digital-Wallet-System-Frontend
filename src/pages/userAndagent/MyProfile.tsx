import {
  useGetMyInfoQuery,
  useChangePasswordMutation,
  useChangePinMutation,
  useLogoutMutation,
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
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  KeyRound,
  Pin,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "@/redux/features/user/user.api";
import { useNavigate } from "react-router";

const passwordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

const pinSchema = z.object({
  oldPin: z.string().length(4, "PIN must be 4 digits"),
  newPin: z.string().length(4, "PIN must be 4 digits"),
});

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must be a @gmail.com address.",
    }),
  phone: z
    .string()
    .regex(/^01\d{9}$/, "Phone number must be 11 digits and start with 01"),
});

const MyProfile = () => {
  const navigate = useNavigate();
  const {
    data: userInfo,
    isLoading,
    isError,
    refetch,
  } = useGetMyInfoQuery(undefined);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  const [changePassword, { isLoading: isPasswordChanging }] =
    useChangePasswordMutation();
  const [changePin, { isLoading: isPinChanging }] = useChangePinMutation();
  const [updateUser, { isLoading: isProfileUpdating }] =
    useUpdateUserMutation();
  const [logout] = useLogoutMutation();

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { oldPassword: "", newPassword: "" },
  });

  const pinForm = useForm<z.infer<typeof pinSchema>>({
    resolver: zodResolver(pinSchema),
    defaultValues: { oldPin: "", newPin: "" },
  });

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });

  const user = userInfo?.data?.data;

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, profileForm]);

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

  const onProfileSubmit = async (data: z.infer<typeof profileSchema>) => {
    const changedData: Partial<z.infer<typeof profileSchema>> = {};
    if (data.name !== user?.name) changedData.name = data.name;
    if (data.email !== user?.email) changedData.email = data.email;
    if (data.phone !== user?.phone) changedData.phone = data.phone;

    if (Object.keys(changedData).length === 0) {
      toast.info("No changes were made.");
      setIsProfileDialogOpen(false);
      return;
    }

    try {
      await updateUser({ id: user?._id as string, data: changedData }).unwrap();
      toast.success("Profile updated successfully");
      setIsProfileDialogOpen(false);

      if (changedData.email) {
        toast.info("Your email was changed. Please log in again.");
        await logout().unwrap();
        navigate("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) return <Loader />;
  if (isError || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500">Failed to load profile data.</p>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
   <div className="w-full mx-auto md:max-w-xl lg:max-w-2xl">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        My Profile
      </h1>

      <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Account Details</CardTitle>
            <CardDescription>Your personal information.</CardDescription>
          </div>
          <Dialog
            open={isProfileDialogOpen}
            onOpenChange={setIsProfileDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Pencil className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your personal information.
                </DialogDescription>
              </DialogHeader>
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isProfileUpdating}>
                      {isProfileUpdating ? "Saving..." : "Save Changes"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
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
          <div className="flex items-center gap-4">
            <User className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-semibold text-lg">{user.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Change Password</CardTitle>
            <CardDescription>
              Update your account password.
            </CardDescription>
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
                      <DialogClose asChild>
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
                            <Input type="password" maxLength={4} {...field} />
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
                            <Input type="password" maxLength={4} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
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
