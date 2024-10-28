import { campaignEditionByIdData } from "@/atoms/atoms";
import { Status } from "@/components/NewsletterComponents/Columns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Sidebar from "../../components/Sidebar";
import AlertDialogComponent from "@/components/NewsletterComponents/AlertDialogComponent";
import PreviewDialog from "@/components/NewsletterComponents/PreviewDialog";

export interface campaignEditionById {
  campaignTitle: string;
  campaignContent: {
    id: number;
    content: string;
    status: Status;
    scheduledOn: Date;
  }[];
}

export const tempData: campaignEditionById = {
  campaignTitle: "The Monthly Roundup - September",
  campaignContent: [
    {
      id: 1,
      content: "In this issue, we cover our recent events.",
      status: Status.Published,
      scheduledOn: new Date("2022-09-10T10:00:00.000Z"),
    },
    {
      id: 2,
      content: `
# [Newsletter Title]
*Date: YYYY-MM-DD*

---

## Welcome Message
Hello [Readers],

Welcome to this month's edition of our newsletter! We have some exciting updates and resources to share with you.

---

## Featured Article
### [Article Title]
*Author: [Author Name]*  
*Published on: YYYY-MM-DD*

[Brief introduction to the article or summary. You can include a link to read more.](#)

---

## Upcoming Events
### [Event Title]
- **Date:** YYYY-MM-DD
- **Time:** HH:MM AM/PM
- **Location:** [Venue or Link to Event]

[Short description of the event and a link for registration if applicable.]

---

## Community Highlights
- **Highlight 1:** [Description or link]
- **Highlight 2:** [Description or link]
- **Highlight 3:** [Description or link]

---
`,
      status: Status.Draft,
      scheduledOn: new Date("2023-09-15T10:00:00.000Z"),
    },
    {
      id: 3,
      content: "This month, we dive into AI advancements.",
      status: Status.Published,
      scheduledOn: new Date("2021-09-10T10:00:00.000Z"),
    },
    {
      id: 4,
      content: "Our top picks for the best books of the year.",
      status: Status.Published,
      scheduledOn: new Date("2021-09-10T10:00:00.000Z"),
    },
  ],
};

const CampaignEditions = () => {
  const { id } = useParams<{ id: string }>();
  const [campaignEdition, setcampaignEdition] = useRecoilState(campaignEditionByIdData);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [editionToPreview, setEditionToPreview] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editionToDelete, setEditionToDelete] = useState<number | null>(null);

  useEffect(() => {
    document.title = "ACE | Campaign Editions";
    setcampaignEdition(tempData);

    // Implement API logic if needed
  }, []);
  const campaignContent = campaignEdition?.campaignContent || [];
  const navigate = useNavigate();
  
  const handleEditClick = (contentID: number) => {
    navigate(`/campaigns/${id}/editions/${contentID}/edit`);
  };

  const handlePreviewClick = (id: number) => {
    setEditionToPreview(id);
    setIsPreviewDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setEditionToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedContent = campaignContent.filter(edition => edition.id !== id);
    setcampaignEdition(prev => ({
      ...prev,
      campaignContent: updatedContent,
    }));
    setEditionToDelete(null);
  };

  return (
    <div className="bg-background min-h-screen text-foreground flex">
      <Sidebar />
      <div className="flex-1">
        <div>
          <h1 className="text-6xl font-bold p-6">
            {campaignEdition?.campaignTitle} - Editions
          </h1>
        </div>
        <div className="px-6">
          <div className="pb-2 flex justify-between items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/campaigns">Campaigns</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Editions</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Button>
              <Plus w-6 h-6 className="pr-2" />
              Add
            </Button>
          </div>
          <div className="border-border border-2 rounded-lg">
            <Table className="text-base">
              <TableCaption>
                A list of your recent campaign editions.
              </TableCaption>
              <TableHeader>
                <TableRow className="p-0">
                  <TableHead className="p-0 pl-6 text-left">ID</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Scheduled On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignContent.map(edition => (
                  <TableRow
                    key={edition.id}
                    className={`max-h-10 h-10 ${edition.id % 2 === 0 ? "bg-[#101929]" : ""}`}
                  >
                    <TableCell className="pl-6 text-left">{edition.id}</TableCell>
                    <TableCell className="max-w-[30vw]">
                      {edition.content.length > 150
                        ? `${edition.content.substring(0, 150)}...`
                        : edition.content}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={`text-center ${edition.status === Status.Draft ? "border-2 border-[#215c33] text-[#3fb950] bg-[#192f28]" : "border-2 border-[#5e4b8b] text-[#ab7df8] bg-[#2b2a43]"}`}>
                        {edition.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {edition.scheduledOn.toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" onClick={() => handleEditClick(edition.id)} className="border border-muted p-2 mx-1 rounded-lg">
                              <Edit w-5 h-5 color="#3b82f6" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit content</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" onClick={() => handlePreviewClick(edition.id)} className="border border-muted p-2 mx-1 rounded-lg">
                              <Eye w-5 h-5 color="#3b82f6" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Preview content</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" onClick={() => handleDeleteClick(edition.id)} className="border border-muted p-2 mx-1 rounded-lg">
                              <Trash2 w-5 h-5 color="#3b82f6" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete content</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <AlertDialogComponent
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
              onConfirm={() => {
                if (editionToDelete !== null) {
                  handleDelete(editionToDelete);
                }
              }}
              title="Are you absolutely sure?"
              description="This action cannot be undone. This will permanently delete the edition content."
            />
            <PreviewDialog
              open={isPreviewDialogOpen}
              onOpenChange={setIsPreviewDialogOpen}
              content={campaignContent.find(edition => edition.id === editionToPreview)?.content || "Nothing to preview"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignEditions;
