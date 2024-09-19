import {
  CircleGauge,
  LogOut,
  MailWarning,
  Newspaper,
  Rss,
  ShieldCheck,
  TicketCheck
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import secureLocalStorage from "react-secure-storage";
import { ModeToggle } from "./mode-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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

  const logoutHandler = () => {
    // TODO: Add confirmation screen before logging out
    secureLocalStorage.clear();
    navigate("/login")
  }

  // TODO: Capture firstName and lastName from secureLocalStorage after backend
  // connectivity is done using a useEffect
  const [firstName, setFirstName] = useState<string>("Ritesh");
  const [lastName, setLastName] = useState<string>("Koushik");

  return (
    <div className="w-[] h-screen border-r bg-background">
      <div className="flex flex-col items-center space-between p-2">
        {/* Navigation Links */}
        <div>
          <></>
        </div>

        {/* Auxiliary Links */}
        <div className="flex flex-col items-center gap-y-2">
          {/* Theme */}
          <Tooltip>
            <TooltipTrigger>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent side="right">Toggle Theme</TooltipContent>
          </Tooltip>
          {/* Profile */}
          <Tooltip>
            <TooltipTrigger>
              <Avatar>
                <AvatarImage src="unreachable-link" alt="pfp" />
                <AvatarFallback>{firstName.slice(0, 1) + lastName.slice(0, 1)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right">Profile</TooltipContent>
          </Tooltip>
          {/* Logout */}
          <Tooltip>
            <TooltipTrigger>
              <Button onClick={logoutHandler}>
                <LogOut />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
