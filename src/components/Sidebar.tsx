import {
  House,
  LandPlot,
  LogOut,
  MessageCircleWarning,
  NotebookPen,
  TicketCheck,
  UserCog
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import secureLocalStorage from "react-secure-storage";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggleButton } from "./ModeToggle";

type SidebarItem = {
  icon: JSX.Element,
  title: string,
  link: string
}

const items: SidebarItem[] = [
  {
    icon: <House className="mx-1 dark:text-white" />,
    title: "Dashboard",
    link: "/dashboard"
  },
  {
    icon: <TicketCheck className="mx-1 dark:text-white" />,
    title: "Events",
    link: "/events"
  },
  {
    icon: <LandPlot className="mx-1 dark:text-white" />,
    title: "Campaigns",
    link: "/campaigns"
  },
  {
    icon: <NotebookPen className="mx-1 dark:text-white" />,
    title: "Blogs",
    link: "/blogs"
  },
  {
    icon: <MessageCircleWarning className="mx-1 dark:text-white" />,
    title: "Suggestions",
    link: "/suggestions"
  },
  {
    icon: <UserCog className="mx-1 dark:text-white" />,
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
    <div className="w-fit h-screen bg-[hsl(var(--background))]">
      <div className="flex flex-col justify-between p-2 h-full">
        {/* Navigation Links */}
        <div>
          {items.map((item: SidebarItem, index: number) => (
            <div key={index} className="my-4 mx-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button onClick={() => navigate(item.link)} size="icon" variant="outline" className="border-0">
                      {item.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-1 border-2">{item.title}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-y-4">
          {/* TODO: Profile pictures can be an add-on for later versions */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ModeToggleButton />
              </TooltipTrigger>
              <TooltipContent side="right">Toggle Theme</TooltipContent>
            </Tooltip>
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
                <Button onClick={logoutHandler} size="icon" variant="outline" className="border-0" >
                  <LogOut color="#c42a21" />
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
