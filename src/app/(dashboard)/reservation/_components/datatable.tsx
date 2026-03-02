// datatable.tsx
"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  type ColumnDef,
} from "@tanstack/react-table";
import { ArrowUpDown, Eye, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner"; // your spinner component
import { useUpdateReservationStatus } from "./hook/updateStstus";
import { useResevatiosnData } from "@/services/tanstack.query";
import { useRouter } from "next/navigation";

  // import { useReservationsData } from "@/services/tanstack.query";
  // import { useUpdateReservationStatus } from "@/services/reservationMutations";

export type Status = "Confirmed" | "Pending";
export type Reservation = {
  id: string;
  guestName: string;
  roomType: string;
  roomNumber: string;
  request: string;
  duration: number;
  checkIn: string;
  checkOut: string;
  status: Status;
};

// Memoized cells to reduce unnecessary renders
const StatusBadge = React.memo(({ status }: { status: Status }) => (
  <span
    className={`inline-flex px-3 py-1 rounded-md text-xs font-medium ${
      status === "Confirmed"
        ? "bg-[#E6F6F0] text-[#1DB47D]"
        : "bg-[#FEECEC] text-[#EB5757]"
    }`}
  >
    {status}
  </span>
));

const ActionCell = React.memo(({ row }: { row: any }) => {
  const status = row.original.status;
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateReservationStatus();

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
        <Pencil className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        disabled={isUpdating}
        onClick={() =>
          updateStatus({
            id: row.original.id,
            newStatus: status === "Pending" ? "Confirmed" : "Pending",
          })
        }
        className={cn(
          "h-8 min-w-[90px] px-4 text-xs font-medium transition-colors",
          status === "Pending"
            ? "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 hover:text-violet-800"
            : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800",
          isUpdating && "opacity-70 cursor-wait"
        )}
      >
        {isUpdating ? <Spinner /> : status}
      </Button>
    </div>
  );
});

export const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "guestName",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Guest <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const router = useRouter()
      return (
         <div className="flex flex-col py-1">
        <span className="font-medium text-slate-900">
          <a className="cursor-pointer" onClick={()=>router.push(`/reservation/user/${row.original.id}`)}>
            {row.original.guestName}
          </a>
        </span>
        <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">
          {row.original.id}
        </span>
      </div>
      )
    },
  },
  {
    header: "Room",
    cell: ({ row }) => (
      <span className="text-slate-600">
        {row.original.roomType} {row.original.roomNumber}
      </span>
    ),
  },
  {
    accessorKey: "request",
    header: "Request",
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => `${row.original.duration} nights`,
  },
  {
    header: "Check-In – Check-Out",
    cell: ({ row }) => (
      <span className="text-slate-600 whitespace-nowrap">
        {row.original.checkIn} – {row.original.checkOut}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

export function GuestDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const { data: reservations = [] } = useResevatiosnData();

  const table = useReactTable({
    data: reservations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full space-y-4 p-2">
      <div className="flex items-center justify-end gap-4">
        <Input
          placeholder="Filter guests, request, room..."
          value={(table.getColumn("guestName")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("guestName")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <span className="ml-2">▼</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns()
              .filter((col) => col.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(v) => column.toggleVisibility(!!v)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No reservations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}