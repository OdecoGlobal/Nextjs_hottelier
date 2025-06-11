import { requireOwner } from "@/auth-guard";
import MainBasicInfoPage from "@/components/shared/hotel/basic-info";

const BasicInfoPage = async () => {
  const owner = await requireOwner();
  return <MainBasicInfoPage role={owner.user.role as "OWNER"} />;
};

export default BasicInfoPage;
