export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin Home',
};

const MainAdminPage = async () => {
  return <>Admin Home</>;
};

export default MainAdminPage;
