
import Sidebar from "../../components/Sidebar";
import { useEffect } from "react";
import {
  columns,
} from "../../components/NewsletterComponents/Columns";
import { EventDataTable } from "../../components/EventComponents/EventDataTable";
import { newsletterData } from "../../atoms/atoms";
import { useRecoilState } from "recoil";



export const EventAnalytics:React.FC= () => 
    {
        useEffect(() => {
          document.title = "ACE | Campaigns";
        }, []);
      
        const [data] = useRecoilState(newsletterData);
        return (
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="flex-1 p-6">
              <h1 className="text-foreground text-6xl font-bold">Event Analytics :</h1>
              <div className="mt-8 text-foreground">
                <EventDataTable columns={columns} data={data} />
              </div>
            </div>
          </div>
        );
      };

