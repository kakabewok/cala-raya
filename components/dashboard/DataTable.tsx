"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, CheckSquare, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DataWithId {
  id: number;
}

interface DataTableProps<TData extends DataWithId, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  onDelete: (ids: number[]) => void;
  serverSidePagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function DataTable<TData extends DataWithId, TValue>({
  columns,
  data,
  searchKey,
  onDelete,
  serverSidePagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const pageSizeOptions = ["5", "10", "20", "50"];
  const [pageSize, setPageSize] = useState<string>("10");

  // Reset row selection when data changes (e.g., after delete, add, edit)
  useEffect(() => {
    setRowSelection({});
  }, [data]);

  const handlePageSizeChange = (newSize: string) => {
    setPageSize(newSize);
    table.setPageSize(Number(newSize));
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: serverSidePagination,
    pageCount: serverSidePagination ? totalPages : undefined,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: serverSidePagination ? {
        pageIndex: currentPage - 1,
        pageSize: Number(pageSize),
      } : undefined,
    },
  });

  const selectedIds = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original.id);

  const handleDeleteSelectedRows = () => {
    onDelete(selectedIds);
  };

  const curPage = serverSidePagination ? currentPage : table.getState().pagination.pageIndex + 1;
  const totalPag = serverSidePagination ? totalPages : table.getPageCount();

  const handleNextPage = () => {
    if (serverSidePagination) {
      onPageChange?.(currentPage + 1);
    } else {
      table.nextPage();
    }
  };

  const handlePreviousPage = () => {
    if (serverSidePagination) {
      onPageChange?.(currentPage - 1);
    } else {
      table.previousPage();
    }
  };

  const handleFirstPage = () => {
    if (serverSidePagination) {
      onPageChange?.(1);
    } else {
      table.setPageIndex(0);
    }
  };

  const handleLastPage = () => {
    if (serverSidePagination) {
      onPageChange?.(totalPages);
    } else {
      table.setPageIndex(table.getPageCount() - 1);
    }
  };

  const canPrevious = serverSidePagination ? currentPage > 1 : table.getCanPreviousPage();
  const canNext = serverSidePagination ? currentPage < totalPages : table.getCanNextPage();

  return (
    <div>
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Search..."
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 ml-auto"
            >
              <EyeOff className="w-4 h-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button
        variant="outline"
        onClick={() =>
          table.toggleAllPageRowsSelected(!table.getIsAllPageRowsSelected())
        }
        className={`flex items-center gap-2 ${
          selectedIds.length < 1 ? "mb-4" : ""
        } ${
          data.length < 1 ? "hidden" : ""
        }`}
      >
        <CheckSquare className="w-4 h-4" />
        {table.getIsAllPageRowsSelected() ? "Deselect all" : "Select all"}
      </Button>
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between w-full py-4">
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={handleDeleteSelectedRows}
          >
            <Trash2 className="w-4 h-4" />
            Delete selected
          </Button>
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        </div>
      )}
      <div className="border border-border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-border bg-muted/30"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={(e) => {
                    e.stopPropagation();
                    row.toggleSelected(!row.getIsSelected());
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`${
                    row.getIsSelected() ? "!bg-muted" : ""
                  } border-b border-border cursor-pointer`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        {!serverSidePagination && (
          <Select onValueChange={handlePageSizeChange} defaultValue={pageSize}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size}>
                  Show {size} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="flex items-center justify-end gap-4 ml-auto">
          <span className="hidden text-sm text-muted-foreground md:block">
            Page <span className="font-medium text-foreground">{curPage}</span> of <span className="font-medium text-foreground">{totalPag}</span>
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFirstPage}
              disabled={!canPrevious}
              className="px-2"
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={!canPrevious}
              className="px-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={!canNext}
              className="px-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLastPage}
              disabled={!canNext}
              className="px-2"
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
