import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SignUpOwnerForm from './signup-owner-form';

const SignUpOwnerPage = () => {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <CardTitle className="text-center">
          Create An Owner&apos;s Account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your details below to create an account to list your property
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignUpOwnerForm />
      </CardContent>
    </Card>
  );
};

export default SignUpOwnerPage;
