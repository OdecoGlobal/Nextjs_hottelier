'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/lib/actions/auth.actions';
import { loginSchema } from '@/lib/schemas/validator';
import { useUserStore } from '@/stores/use-user-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setUser, clearUser } = useUserStore.getState();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    clearUser();
    const res = await loginUser(values);
    if (!res.success || !res.user) {
      toast({
        title: 'Error',
        description: res.message,
        variant: 'destructive',
      });
    } else {
      setUser(res.user);
      toast({
        title: 'Success',
        description: res.message,
        variant: 'default',
      });
      router.replace('/');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@gmail.com"
                  {...field}
                  type="email"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="***********"
                  {...field}
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            'Login'
          )}
        </Button>
        <p className="text-sm text-right">
          <Link href="#" className="underline text-muted-foreground">
            Forgot Password?
          </Link>
        </p>
        <p className="text-sm text-center">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="underline text-muted-foreground">
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
