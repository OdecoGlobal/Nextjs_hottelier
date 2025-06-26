import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginForm from './login-credentials';

const LoginPage = () => {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <CardTitle className="text-center">Login To Your Account</CardTitle>
        <CardDescription className="text-center">
          Enter your details below to login
        </CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
