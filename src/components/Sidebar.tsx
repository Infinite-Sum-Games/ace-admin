import { ChevronFirst, ChevronLast, CircleGauge, MailWarning, MoreVertical, Newspaper, Rss, ShieldCheck, TicketCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

type SidebarItem = {
  icon: JSX.Element,
  title: string,
  link: string
}

const items: SidebarItem[] = [
  {
    icon: <CircleGauge className="mx-1 text-white" />,
    title: "Dashboard",
    link: "/dashboard"
  },
  {
    icon: <TicketCheck className="mx-1 text-white" />,
    title: "Events",
    link: "/events"
  },
  {
    icon: <Rss className="mx-1 text-white" />,
    title: "Campaigns",
    link: "/campaigns"
  },
  {
    icon: <Newspaper className="mx-1 text-white" />,
    title: "Blogs",
    link: "/blogs"
  },
  {
    icon: <MailWarning className="mx-1 text-white" />,
    title: "Suggestions",
    link: "/suggestions"
  },
  {
    icon: <ShieldCheck className="mx-1 text-white" />,
    title: "Admin",
    link: "/admin"
  }
]


const Sidebar = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleCollapse = () => {
    setExpanded(curr => !curr);
  }

  // TODO: Capture firstName and lastName from secureLocalStorage after backend
  // connectivity is done

  return (
    <div className="h-screen w-1/4 pt-2 px-1 border-r">
      <div className="h-full flex flex-col shadown-sm">
        <div className={`flex ${expanded ? "justify-end" : ""}`}>
          <Button size="icon" onClick={toggleCollapse}>
            {
              expanded ?
                <ChevronFirst className="text-white" />
                :
                <ChevronLast className="text-white" />
            }
          </Button>
        </div>

        <div className="">

          {/* Sidebar Items */}
          <div>
            {items.map((item: SidebarItem, index: number) => (
              <div key={index} className="py-1">
                {
                  expanded ?
                    <Button
                      className="w-full items-left"
                      onClick={() => navigate(item.link)}
                    >
                      {item.icon}
                      {item.title}
                    </Button>
                    :
                    <Button
                      onClick={() => navigate(item.link)}
                      size="icon"
                    >
                      {item.icon}
                    </Button>
                }
              </div>
            ))}
          </div>
          {/* Profile Card */}
          <div>
            <ProfileItem
              firstName="Ritesh"
              lastName="Koushik"
              expanded={expanded}
            />
          </div>
        </div>
      </div>
    </div >
  );
}

interface ProfileItemProps {
  firstName: String,
  lastName: String
  expanded: boolean
}

const ProfileItem = ({ firstName, lastName, expanded }: ProfileItemProps) => {
  return (
    <div className="border-t flex p-3">
      <span className="font-bold cursor-pointer">{firstName.slice(0, 1) + lastName.slice(0, 1)}</span>
      <div
        className={`flex justify-between items-center overflow-hidden  
          transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
      >
        <div className="leading-4">
          <h4>{firstName + " " + lastName}</h4>
        </div>
        <MoreVertical size={20} />
      </div>
    </div>
  );
}

export default Sidebar;
