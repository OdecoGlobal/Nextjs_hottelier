import { decryptEmail } from '@/utils/encrpyt';
import VerifyOTPForm from './verify-otp-form';
import { redirect } from 'next/navigation';

const VerifyOTPPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) => {
  const { token } = await searchParams;
  if (!token) redirect('/sign-up');

  const email = decryptEmail(token);
  return <VerifyOTPForm email={email} />;
};

export default VerifyOTPPage;
