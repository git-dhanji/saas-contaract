"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ContractsTable } from "@/components/contracts-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react"


interface Contract {
    id: string
    name: string
    parties: string
    expiry: string
    status: string
    risk: string
}

export default function DashboardPage() {
    const [contracts, setContracts] = useState<Contract[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                setError(null)
                const response = await fetch("contracts.json")
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Failed to fetch contracts: ${response.status}`)
                }
                const data = await response.json()
                console.log(data)
                setContracts(data)
            } catch (error) {
                console.error("Failed to fetch contracts:", error)
                setError("Failed to load contracts. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchContracts()
    }, [])

    const handleRetry = () => {
        setIsLoading(true)
        setError(null)
        const fetchContracts = async () => {
            try {
                const response = await fetch("/contracts.json")
                if (!response.ok) {
                    throw new Error(`Failed to fetch contracts: ${response.status}`)
                }
                const data = await response.json()
                setContracts(data)
            } catch (error) {
                console.error("Failed to fetch contracts:", error)
                setError("Failed to load contracts. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }
        fetchContracts()
    }

    const stats = [
        {
            title: "Total Contracts",
            value: contracts.length.toString(),
            description: "Active and pending contracts",
            icon: FileText,
            trend: "+2 this month",
        },
        {
            title: "High Risk",
            value: contracts.filter((c) => c.risk === "High").length.toString(),
            description: "Contracts requiring attention",
            icon: AlertTriangle,
            trend: "-1 from last month",
            variant: "destructive" as const,
        },
        {
            title: "Expiring Soon",
            value: contracts.filter((c) => c.status === "Renewal Due").length.toString(),
            description: "Within next 90 days",
            icon: Clock,
            trend: "+2 this month",
            variant: "warning" as const,
        },
        {
            title: "Active",
            value: contracts.filter((c) => c.status === "Active").length.toString(),
            description: "Currently active contracts",
            icon: CheckCircle,
            trend: "+3 this month",
            variant: "success" as const,
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Contracts Dashboard</h1>
                    <p className="text-muted-foreground">Manage and monitor your contract portfolio</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.title} className="bg-card border-border">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">{stat.description}</p>
                                <div className="mt-2">
                                    <Badge variant={stat.variant || "secondary"} className="text-xs">
                                        {stat.trend}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Contracts Table */}
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">All Contracts</CardTitle>
                        <CardDescription>Complete list of your contracts with filtering and search</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ContractsTable contracts={contracts} isLoading={isLoading} error={error} onRetry={handleRetry} />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
