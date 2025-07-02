export const dynamic = 'force-dynamic';

import Link from 'next/link';

const MainAdminPage = async () => {
  return (
    <>
      Admin
      <Link href="/admin/hotels">Hotels</Link>
    </>
  );
};

export default MainAdminPage;
