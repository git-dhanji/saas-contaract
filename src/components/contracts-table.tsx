"use client"

// React imports
import { useState, useMemo } from "react"
// UI components
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, FileText } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

// Contract type
interface Contract {
  id: string
  name: string
  parties: string
  expiry: string
  status: string
  risk: string
}

interface ContractsTableProps {
  contracts: Contract[]
  isLoading: boolean
}

const ITEMS_PER_PAGE = 10

export function ContractsTable({ contracts, isLoading }: ContractsTableProps) {
  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter contracts by search, status, and risk
  const filteredContracts = useMemo(() => {
    return contracts.filter((contract) => {
      const matchesSearch =
        contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.parties.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || contract.status === statusFilter
      const matchesRisk = riskFilter === "all" || contract.risk === riskFilter

      return matchesSearch && matchesStatus && matchesRisk
    })
  }, [contracts, searchTerm, statusFilter, riskFilter])

  // Pagination logic
  const totalPages = Math.ceil(filteredContracts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedContracts = filteredContracts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Badge variant helpers
  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Expired":
        return "secondary"
      case "Renewal Due":
        return "outline"
      default:
        return "secondary"
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Show loading skeletons if loading
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by contract name or parties..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10"
          />
        </div>
        {/* Status filter */}
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
            <SelectItem value="Renewal Due">Renewal Due</SelectItem>
          </SelectContent>
        </Select>
        {/* Risk filter */}
        <Select
          value={riskFilter}
          onValueChange={(value) => {
            setRiskFilter(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table or empty state */}
      {filteredContracts.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No contracts found</h3>
          <p className="text-muted-foreground">
            {searchTerm || statusFilter !== "all" || riskFilter !== "all"
              ? "Try adjusting your search or filters"
              : "No contracts have been uploaded yet"}
          </p>
        </div>
      ) : (
        <>
          {/* Contracts table */}
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Contract Name</TableHead>
                  <TableHead className="font-semibold">Parties</TableHead>
                  <TableHead className="font-semibold">Expiry Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Risk Score</TableHead>
                  <TableHead className="font-semibold w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedContracts.map((contract) => (
                  <TableRow key={contract.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                      <Link href={`/dashboard/contracts/${contract.id}`} className="text-primary hover:underline">
                        {contract.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{contract.parties}</TableCell>
                    <TableCell>{formatDate(contract.expiry)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(contract.status)}>{contract.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeVariant(contract.risk)}>{contract.risk}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/contracts/${contract.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredContracts.length)} of{" "}
                {filteredContracts.length} contracts
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
