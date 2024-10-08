import { useEffect } from "react";
import {
  columns,
} from "../../components/NewsletterComponents/Columns";
import { DataTable } from "../../components/NewsletterComponents/DataTable";
import { campaignData } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import Sidebar from "../../components/Sidebar";
const CampaignsPage: React.FC = () => {
  useEffect(() => {
    document.title = "ACE | Campaigns";
  }, []);

  const [data] = useRecoilState(campaignData);
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-foreground text-6xl font-bold">Campaigns</h1>
        <div className="mt-8 text-foreground">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;
