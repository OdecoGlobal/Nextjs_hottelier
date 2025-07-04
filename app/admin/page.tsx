export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Admin Home',
};

const MainAdminPage = async () => {
  return (
    <>
      Admin
      <Link href="/admin/hotels">Hotels</Link>
    </>
  );
};

export default MainAdminPage;
