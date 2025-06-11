import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "./signup-form";

const SignUpPage = () => {
  return (
    <section className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle className="text-center">Create An Account</CardTitle>
          <CardDescription className="text-center">
            Enter your details below to create an account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default SignUpPage;
