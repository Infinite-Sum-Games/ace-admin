import { newsletterData } from "@/atoms/atoms";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2, ChartNoAxesCombined, ArrowUpDown, EyeIcon } from "lucide-react";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { Button } from "../ui/button";
import { TableCell } from "../ui/table";
import { Badge } from "../ui/badge";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import EditSheet from './EditSheet';
import AlertDialogComponent from './AlertDialogComponent';

export type Newsletter = {
  id: number;
  title: string;
  blurb: string;
  content: string;
  status: "Draft" | "Published";
  createdAt: Date;
  updatedAt: Date;
};

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
    accessorKey: "title",
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
        <div className="font-normal text-base">{row.original.title}</div>
        <div className="text-sm text-muted-foreground">{row.original.blurb}</div>
      </TableCell>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: (row) => {
      const status = row.getValue() as "Draft" | "Published";
      const badgeProps =
        status === "Draft"
          ? { className: "border-2 border-[#215c33] text-[#3fb950] bg-[#192f28]", label: "Draft" }
          : { className: "border-2 border-[#254f88] text-[#4493f8] bg-[#192639]", label: "Published" };

      return (
        <div className="text-center">
          <Badge className={`text-xs ${badgeProps.className}`} variant="outline">
            {badgeProps.label}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Created On</div>,
    cell: (row) => {
      const date = row.getValue() as Date;
      return (
        <div className="text-center">
          {date.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
    filterFn: (row, columnId, value) => {
      const year = new Date(row.getValue(columnId)).getFullYear();
      return value.includes(year);
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-center">Last Updated</div>,
    cell: (row) => {
      const date = row.getValue() as Date;
      return (
        <div className="text-center">
          {date.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-right pr-4">Actions</div>,
    cell: ({ row }) => {
      const [, setData] = useRecoilState(newsletterData);
      const [isDialogOpen, setDialogOpen] = useState(false);
      const [selectedId, setSelectedId] = useState<number | null>(null);
      const [isEditSheetOpen, setEditSheetOpen] = useState(false);

      function handleDelete() {
        setData((prevData: Newsletter[]) =>
          prevData.filter((campaign) => campaign.id !== selectedId)
        );
        setDialogOpen(false);
      }

      function handleEdit(newsletter: Newsletter) {
        setEditSheetOpen(true);
        setSelectedId(newsletter.id);
      }

      const handleSave = (updatedNewsletter: Newsletter) => {
        const updatedDate = new Date();
        setData((prevData: Newsletter[]) =>
          prevData.map((newsletter) =>
            newsletter.id === selectedId
              ? { ...updatedNewsletter, updatedAt: updatedDate }
              : newsletter
          )
        );
      };

      return (
        <TooltipProvider>
          <div className="flex justify-end space-x-2">
            <ActionButton
              icon={<Edit className="w-5 h-5" color="#3b82f6"/>}
              onClick={() => handleEdit(row.original)}
              tooltipContent="Edit"
            />
            <ActionButton
              icon={<EyeIcon className="w-5 h-5" color="#3b82f6"/>}
              onClick={() => {/* Add preview functionality */}}
              tooltipContent="Preview"
            />
            <ActionButton
              icon={<ChartNoAxesCombined className="w-5 h-5" color="#3b82f6"/>}
              onClick={() => {/* Add analytics functionality */}}
              tooltipContent="View Analytics"
            />
            <ActionButton
              icon={<Trash2 className="w-5 h-5" color="#3b82f6"/>}
              onClick={() => {
                setSelectedId(row.original.id);
                setDialogOpen(true);
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

            <EditSheet
              open={isEditSheetOpen}
              onOpenChange={setEditSheetOpen}
              newsletter={row.original}
              onSave={handleSave}
            />
          </div>
        </TooltipProvider>
      );
    },
  },
];

interface ActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  tooltipContent: string;
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
  );
}
