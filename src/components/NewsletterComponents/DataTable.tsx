import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DataTablePagination } from "./tablePagination";
import { YearFilter, StatusFilter, ResetFiltersButton } from "./DataTableFilters";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const currentYear = new Date().getFullYear();
  const startYear = Math.max(2021, currentYear - 5);
  const years = Array.from({ length: currentYear - startYear + 2 }, (_, i) => startYear + i);
  const statuses = ["Draft", "Published"];

  const handleYearFilterChange = (year: number) => {
    setColumnFilters((prev) => {
      const existingFilter = prev.find((filter) => filter.id === "createdAt");

      if (existingFilter) {
        const value = existingFilter.value as number[];
        if (value.includes(year)) {
          return prev.filter(filter => filter.id !== "createdAt" || !value.includes(year));
        } else {
          return prev.map(filter => 
            filter.id === "createdAt" ? { ...filter, value: [...value, year] } : filter
          );
        }
      } else {
        return [...prev, { id: "createdAt", value: [year] }];
      }
    });
  };

  const clearYearFilters = () => {
    setColumnFilters((prev) => prev.filter((filter) => filter.id !== "createdAt"));
  };

  const selectedYears = columnFilters
    .filter((filter) => filter.id === "createdAt")
    .flatMap((filter) => filter.value as number[]);

  const handleStatusFilterChange = (status: string) => {
    setColumnFilters((prev) => {
      const filtered = prev.filter((filter) => filter.id !== "status");
      return [...filtered, { id: "status", value: status }];
    });
  };

  const clearStatusFilters = () => {
    setColumnFilters((prev) => prev.filter((filter) => filter.id !== "status"));
  };

  function resetAllFilters(): void {
    setColumnFilters([]);
    setSorting([]);
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <Input
          placeholder="Search by title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center mr-2">
          <div className="mr-2">
            <ResetFiltersButton resetAllFilters={resetAllFilters}/>
          </div>
          <div className="mr-2">
            <StatusFilter
              statuses={statuses}
              onStatusChange={handleStatusFilterChange}
              clearStatusFilters={clearStatusFilters}
            />
          </div>
          <div>
            <YearFilter
              years={years}
              selectedYears={selectedYears}
              onYearChange={handleYearFilterChange}
              clearYearFilters={clearYearFilters}
            />
          </div>
          <div>
            <Button
              className="ml-2 flex items-center font-semibold py-2 rounded"
              variant="default"
            >
              <PlusIcon className="mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>
      <div className="border-2 border-border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead 
                    key={header.id} 
                    className={index === 0 ? "w-[60px] pr-0" : index === 1 ? "pl-0" : ""}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  className={`h-20 ${rowIndex % 2 === 0 ? "bg-[#101929]" : ""}`}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell 
                      key={cell.id} 
                      className={
                        cellIndex === 0 
                          ? "py-0 pr-0 w-[60px]" 
                          : cellIndex === 1 
                            ? "py-0 pl-0" 
                            : "py-0"
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-14 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-6">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}