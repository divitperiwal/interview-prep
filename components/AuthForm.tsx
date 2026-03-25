"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signIn, signUp } from "@/lib/actions/auth.actions";
import { auth } from "@/firebase/client";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({
          uid : userCredentials.user.uid,
          name : name!,
          email,
          password,
        })

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully. Please Sign In.");
        router.push("/sign-in");


      } else {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();

        if(!idToken) {
          toast.error("Sign in failed. Please try again.");
          return;
        }
        
        await signIn({email, idToken});
        toast.success("Sign in successfully.");
        router.push("/");

      }
    } catch (err) {
      console.log(err);
      toast.error(`There was an error ${err}`);
    }
  }

  const isSignIn = type === "sign-in";
  const isSubmitting = form.formState.isSubmitting;



  return (
    <div className="card-border lg:min-w-[566px] w-full animate-fadeIn">
      <div className="flex flex-col gap-8 card py-12 px-8 sm:px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} alt="logo" height={32} width={38} />
          <h2 className="text-white">PrepWise</h2>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-center text-2xl font-bold">Practice job interviews with AI</h3>
          <p className="text-center text-muted-foreground text-sm">Prepare for your next interview with intelligent feedback</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Full Name"
                placeholder="Your Name"
              />
            )}
            <FormField
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="your@email.com"
              />
            <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="••••••••"
                type="password"
              />

            <Button className="btn mt-2" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting && <span className="spinner" aria-hidden="true" />}
              {isSubmitting
                ? isSignIn
                  ? "Signing In..."
                  : "Creating Account..."
                : isSignIn
                  ? "Sign In"
                  : "Create an Account"}
            </Button>
          </form>
        </Form>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <span className="relative px-2 text-sm text-muted-foreground bg-inherit">or</span>
        </div>
        <p className="text-center text-muted-foreground text-sm">
          {isSignIn ? "No Account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-semibold text-white ml-1 hover:opacity-80 transition-opacity inline-block"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
