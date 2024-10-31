import { campaignData } from "@/atoms/atoms"
import { ColumnDef } from "@tanstack/react-table"
import {
  Edit,
  Trash2,
  ChartNoAxesCombined,
  ArrowUpDown,
  BookText,
} from "lucide-react"
import { useRecoilState } from "recoil"
import { useState } from "react"
import { Button } from "../ui/button"
import { TableCell } from "../ui/table"
import { Badge } from "../ui/badge"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import EditDialog from "./EditCampaignDialog"
import AlertDialogComponent from "./AlertDialogComponent"
import { useNavigate } from "react-router-dom"

export enum Status {
  Draft = "Draft",
  Published = "Published",
}

export enum CampaignFrequency {
  Monthly = "Monthly",
  Semesterly = "Semesterly",
  BiYearly = "BiYearly",
  Yearly = "Yearly",
  None = "None",
}

export type Newsletter = {
  id: string
  campaignTitle: string
  blurb: string
  frequency: CampaignFrequency
  createdAt: Date
  updatedAt: Date
  campaignContent: CampaignContent[]
  subscribers: Subscribers[]
}

export type CampaignContent = {
  id: number
  campaignId?: string
  content: string
  status: Status
  scheduledOn: Date
}

export type Subscribers = {
  // Define subscribers properties as needed
}

export const columns: ColumnDef<Newsletter>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="text-left">
        <Button
          className="px-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-left px-4">{row.original.id}</div>,
  },
  {
    accessorKey: "campaignTitle",
    header: ({ column }) => (
      <div className="text-left">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <TableCell>
        <div className="font-normal text-base">
          {row.original.campaignTitle}
        </div>
        <div className="text-sm text-muted-foreground">
          {row.original.blurb}
        </div>
      </TableCell>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const { campaignContent } = row.original
      const latestContent = campaignContent[campaignContent.length - 1]

      let status: Status
      if (latestContent) {
        const isDraft = new Date(latestContent.scheduledOn) > new Date()
        status = isDraft ? Status.Draft : latestContent.status
      } else {
        status = Status.Draft // Default to Draft if no content
      }

      return (
        <div className="text-center">
          <Badge
            className={`text-xs ${
              status === Status.Draft
                ? "border-2 border-[#215c33] text-[#3fb950] bg-[#192f28]"
                : "border-2 border-[#254f88] text-[#4493f8] bg-[#192639]"
            }`}
          >
            {status}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Created On</div>,
    cell: (row) => {
      const date = row.getValue() as Date
      return (
        <div className="text-center">
          {date.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      )
    },
    filterFn: (row, columnId, value) => {
      const status = row.getValue(columnId)
      return value.includes(status)
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-center">Last Updated</div>,
    cell: (row) => {
      const date = row.getValue() as Date
      return (
        <div className="text-center">
          {date.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-right pr-4">Actions</div>,
    cell: ({ row }) => {
      const [, setData] = useRecoilState(campaignData)
      const [isDialogOpen, setDialogOpen] = useState(false)
      const [selectedId, setSelectedId] = useState<string | null>(null)
      const [isEditDialogOpen, setEditDialogOpen] = useState(false)

      function handleDelete() {
        setData((prevData: Newsletter[]) =>
          prevData.filter((campaign) => campaign.id !== selectedId)
        )
        setDialogOpen(false)
      }

      function handleEdit(newsletter: Newsletter) {
        setEditDialogOpen(true)
        setSelectedId(newsletter.id)
      }

      const handleSave = (updatedNewsletter: Newsletter) => {
        const updatedDate = new Date()
        setData((prevData: Newsletter[]) =>
          prevData.map((newsletter) =>
            newsletter.id === selectedId
              ? { ...updatedNewsletter, updatedAt: updatedDate }
              : newsletter
          )
        )
      }
      const navigate = useNavigate()
      function seeEditions() {
        navigate(`/campaigns/${row.original.id}/editions`)
      }

      return (
        <TooltipProvider>
          <div className="flex justify-end space-x-2">
            <ActionButton
              icon={<Edit className="w-5 h-5" color="#3b82f6" />}
              onClick={() => handleEdit(row.original)}
              tooltipContent="Edit"
            />
            <ActionButton
              icon={<BookText className="w-5 h-5" color="#3b82f6" />}
              onClick={seeEditions}
              tooltipContent="See Editions"
            />
            <ActionButton
              icon={<ChartNoAxesCombined className="w-5 h-5" color="#3b82f6" />}
              onClick={() => {
                /* Add analytics functionality */
              }}
              tooltipContent="View Analytics"
            />
            <ActionButton
              icon={<Trash2 className="w-5 h-5" color="#3b82f6" />}
              onClick={() => {
                setSelectedId(row.original.id)
                setDialogOpen(true)
              }}
              tooltipContent="Delete"
            />

            <AlertDialogComponent
              open={isDialogOpen}
              onOpenChange={setDialogOpen}
              onConfirm={handleDelete}
              title="Are you absolutely sure?"
              description="This action cannot be undone. This will permanently delete the newsletter."
            />

            <EditDialog
              open={isEditDialogOpen}
              onOpenChange={setEditDialogOpen}
              newsletter={row.original}
              onSave={handleSave}
            />
          </div>
        </TooltipProvider>
      )
    },
  },
]

interface ActionButtonProps {
  icon: React.ReactNode
  onClick: () => void
  tooltipContent: string
}

function ActionButton({ icon, onClick, tooltipContent }: ActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          onClick={onClick}
          className="border border-muted p-2 rounded-lg"
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" align="center" className="text-xs">
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  )
}