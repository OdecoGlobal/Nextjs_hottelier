import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SignupAgentForm from './signup-agent-form';

const SignupAgentPage = () => {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <CardTitle className="text-center">
          Create An Agent&apos;s Account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your details below to create an account to list your property
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignupAgentForm />
      </CardContent>
    </Card>
  );
};

export default SignupAgentPage;
