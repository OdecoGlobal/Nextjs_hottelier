export const dynamic = 'force-dynamic';
import { requireAgent } from '@/auth-guard';
import MainBasicInfoPage from '@/components/shared/hotel/basic-info';

const BasicInfoPage = async () => {
  const agent = await requireAgent();
  return <MainBasicInfoPage role={agent.user.role as 'AGENT'} />;
};

export default BasicInfoPage;
