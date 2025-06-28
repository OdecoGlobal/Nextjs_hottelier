export const dynamic = 'force-dynamic';
import { requireAdminOrAgent } from '@/auth-guard';
import MainBasicInfoPage from '@/components/shared/hotel/basic-info';
import { AdminAgentRole } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Basic Info',
};

const BasicInfoPage = async ({
  params,
}: {
  params: Promise<{ role: AdminAgentRole }>;
}) => {
  const { role } = await params;
  const session = await requireAdminOrAgent(role);
  return <MainBasicInfoPage role={session.user.role as AdminAgentRole} />;
};

export default BasicInfoPage;
