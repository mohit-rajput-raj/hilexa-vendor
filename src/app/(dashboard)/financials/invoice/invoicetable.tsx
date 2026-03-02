// components/BookingsDataTable.tsx
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
import { ArrowUpDown, Download, Eye } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ────────────────────────────────────────────────
// Type & Mock Data
// ────────────────────────────────────────────────

export type Booking = {
  guestName: string;
  bookingId: string;
  room: string;
  pricePerNight: number;
  duration: number;
  amount: number;
  status: "Paid" | "Unpaid" | "Partial" | "Cancelled";
};

const mockBookings: Booking[] = [
  { guestName: "Angus Copper", bookingId: "LG-B00108", room: "Deluxe 101", pricePerNight: 150, duration: 3, amount: 450, status: "Paid" },
  { guestName: "Catherine Lopp", bookingId: "LG-B00109", room: "Standard 202", pricePerNight: 100, duration: 2, amount: 200, status: "Unpaid" },
  { guestName: "Edgar Irving", bookingId: "LG-B00110", room: "Suite 303", pricePerNight: 250, duration: 5, amount: 1250, status: "Paid" },
  { guestName: "Gertrude Bale", bookingId: "LG-B00111", room: "Standard 204", pricePerNight: 100, duration: 1, amount: 100, status: "Unpaid" },
  { guestName: "Ice B. Holand", bookingId: "LG-B00112", room: "Deluxe 105", pricePerNight: 150, duration: 5, amount: 750, status: "Paid" },
  { guestName: "Sarah Johnson", bookingId: "LG-B00113", room: "Standard 305", pricePerNight: 100, duration: 2, amount: 200, status: "Paid" },
  { guestName: "Kevin Lee", bookingId: "LG-B00114", room: "Suite 306", pricePerNight: 250, duration: 3, amount: 750, status: "Unpaid" },
  { guestName: "Laura Martin", bookingId: "LG-B00115", room: "Deluxe 107", pricePerNight: 150, duration: 1, amount: 150, status: "Paid" },
  { guestName: "Robert King", bookingId: "LG-B00116", room: "Standard 208", pricePerNight: 100, duration: 2, amount: 200, status: "Unpaid" },
  { guestName: "Olivia White", bookingId: "LG-B00117", room: "Suite 310", pricePerNight: 250, duration: 5, amount: 1250, status: "Paid" },
  { guestName: "Catherine Lopp", bookingId: "LG-B00118", room: "Deluxe 110", pricePerNight: 150, duration: 1, amount: 150, status: "Paid" },
  { guestName: "Catherine Lopp", bookingId: "LG-B00119", room: "Standard 307", pricePerNight: 100, duration: 3, amount: 300, status: "Unpaid" },
  // ... more records
];

// ────────────────────────────────────────────────
// Status Badge
// ────────────────────────────────────────────────

const StatusBadge = React.memo(({ status }: { status: string }) => {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
    Paid:    { variant: "default", label: "Paid" },
    Unpaid:  { variant: "destructive", label: "Unpaid" },
    Partial: { variant: "secondary", label: "Partial" },
    Cancelled: { variant: "outline", label: "Cancelled" },
  };

  const style = variants[status] ?? { variant: "outline" as const, label: status };

  return (
    <Badge variant={style.variant} className="min-w-[70px] justify-center">
      {style.label}
    </Badge>
  );
});

// ────────────────────────────────────────────────
// Columns
// ────────────────────────────────────────────────

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "guestName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Guest Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("guestName")}</div>
    ),
  },
  {
    accessorKey: "bookingId",
    header: "Booking ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm text-muted-foreground">
        {row.getValue("bookingId")}
      </div>
    ),
  },
  {
    accessorKey: "room",
    header: "Room",
  },
  {
    accessorKey: "pricePerNight",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="justify-end w-full"
      >
        Price (per night)
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("pricePerNight"));
      return <div className="text-right">${price}</div>;
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Duration
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const nights = row.getValue("duration") as number;
      return <div>{nights} night{nights !== 1 ? "s" : ""}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="justify-end w-full"
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div className="text-right font-medium">${amount}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <StatusBadge status={row.getValue("status")} />
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-4">Action</div>,
    cell: () => (
      <div className="flex items-center justify-end gap-2 pr-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

// ────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────

export function InvoiceTbale() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  // Replace with real query: const { data: bookings = [] } = useBookingsQuery();
  const bookings = mockBookings;

  const table = useReactTable({
    data: bookings,
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
    <div className="w-full space-y-4">
      {/* Filters & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Date Range Picker - placeholder */}
          <Button variant="outline" className="justify-start text-left font-normal w-[240px]">
            5 June - 16 June 2028
          </Button>

          {/* Status Dropdown - placeholder */}
          <Button variant="outline" className="w-[180px] justify-between">
            All Status
            <span className="ml-2">▼</span>
          </Button>
        </div>

        <Input
          placeholder="Search name, room, etc..."
          value={(table.getColumn("guestName")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("guestName")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
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
                <TableRow key={row.id} className="hover:bg-muted/60">
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
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length}
        </div>

        <div className="flex items-center gap-2">
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
    </div>
  );
}