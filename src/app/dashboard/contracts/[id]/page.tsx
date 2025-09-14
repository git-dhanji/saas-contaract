"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ArrowLeft, FileText, AlertTriangle, Info, Eye, Calendar, Users, Shield } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ContractDetail {
  id: string
  name: string
  parties: string
  start: string
  expiry: string
  status: string
  risk: string
  clauses: Array<{
    title: string
    summary: string
    confidence: number
  }>
  insights: Array<{
    risk: string
    message: string
  }>
  evidence: Array<{
    source: string
    snippet: string
    relevance: number
  }>
}

export default function ContractDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [contract, setContract] = useState<ContractDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContractDetail = async () => {
      try {
        const response = await fetch("/contract-details.json")
        const data = await response.json()
        const contractDetail = data[params.id as string]

        if (contractDetail) {
          setContract(contractDetail)
        } else {
          setError("Contract not found")
        }
      } catch (err) {
        setError("Failed to load contract details")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchContractDetail()
    }
  }, [params.id])

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

  const getInsightIcon = (risk: string) => {
    switch (risk) {
      case "High":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "Medium":
        return <Info className="h-4 w-4 text-chart-5" />
      case "Low":
        return <Shield className="h-4 w-4 text-chart-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
          <Skeleton className="h-64" />
        </div>
      </DashboardLayout>
    )
  }

  if (error || !contract) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Contract Not Found</h3>
          <p className="text-muted-foreground mb-4">{error || "The requested contract could not be found."}</p>
          <Button onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">{contract.name}</h1>
            <p className="text-muted-foreground">Contract details and AI analysis</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Eye className="h-4 w-4" />
                View Evidence
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Evidence Panel</SheetTitle>
                <SheetDescription>Retrieved snippets and relevance scores for contract analysis</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {contract.evidence.map((item, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">{item.source}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {Math.round(item.relevance * 100)}% relevant
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground italic">"{item.snippet}"</p>
                      <div className="mt-2">
                        <Progress value={item.relevance * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Contract Metadata */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contract Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  Parties
                </div>
                <p className="font-medium text-card-foreground">{contract.parties}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Start Date
                </div>
                <p className="font-medium text-card-foreground">{formatDate(contract.start)}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Expiry Date
                </div>
                <p className="font-medium text-card-foreground">{formatDate(contract.expiry)}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  Status & Risk
                </div>
                <div className="flex gap-2">
                  <Badge variant={getStatusBadgeVariant(contract.status)}>{contract.status}</Badge>
                  <Badge variant={getRiskBadgeVariant(contract.risk)}>{contract.risk} Risk</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Clauses Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Contract Clauses</CardTitle>
              <CardDescription>Key clauses identified with confidence scores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contract.clauses.map((clause, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-card-foreground">{clause.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {Math.round(clause.confidence * 100)}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{clause.summary}</p>
                  <Progress value={clause.confidence * 100} className="h-2" />
                  {index < contract.clauses.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Insights Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>AI Risk Insights</CardTitle>
              <CardDescription>Automated analysis and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contract.insights.map((insight, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.risk)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getRiskBadgeVariant(insight.risk)} className="text-xs">
                          {insight.risk} Risk
                        </Badge>
                      </div>
                      <p className="text-sm text-card-foreground">{insight.message}</p>
                    </div>
                  </div>
                  {index < contract.insights.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
