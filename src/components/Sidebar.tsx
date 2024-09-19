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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
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
  // TODO: Capture firstName and lastName after backend integration is done.
  // It can be extracted either from secureLocalStorage or using recoil/atoms
  // Adding placeholders for now
  const [firstName, setFirstName] = useState<string>("Ritesh");
  const [lastName, setLastName] = useState<string>("Koushik");

  const logoutHandler = () => {
    // TODO: Add confirmation screen before logging out
    secureLocalStorage.clear();
    navigate("/login")
  }

  return (
    <div className="w-[] h-screen border-r bg-[var(hsl(--background))]">
      <div className="flex flex-col items-center space-between p-2">
        {/* Navigation Links */}
        <div>
          {items.map((item: SidebarItem, index: number) => (
            <div key={index}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button onClick={() => navigate(item.link)} size="icon" variant="outline">
                      {item.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-y-2">
          {/* Theme */}

          {/* TODO: Setup Light-Dark model toggle */}

          {/* <TooltipProvider> */}
          {/*   <Tooltip> */}
          {/*     <TooltipTrigger> */}
          {/*       <ModeToggle /> */}
          {/*     </TooltipTrigger> */}
          {/*     <TooltipContent side="right">Toggle Theme</TooltipContent> */}
          {/*   </Tooltip> */}
          {/* Profile */}

          {/* TODO: Profile pictures can be an add-on for later versions */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage src="unreachable-link" alt="pfp" />
                  <AvatarFallback className="bg-white text-black">{firstName.slice(0, 1) + lastName.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>
            {/* Logout */}
            <Tooltip>
              <TooltipTrigger>
                <Button onClick={logoutHandler} size="icon" variant="outline" >
                  <LogOut className="text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div >
  );
}

export default Sidebar;
