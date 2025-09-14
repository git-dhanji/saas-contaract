"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  name: string
  size: number
  status: "uploading" | "success" | "error"
  progress: number
}

interface UploadModalProps {
  children: React.ReactNode
}

export function UploadModal({ children }: UploadModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const simulateUpload = (fileId: string) => {
    const updateProgress = (progress: number) => {
      setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress } : f)))
    }

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)

        // Randomly determine success or error
        const isSuccess = Math.random() > 0.2 // 80% success rate

        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) => (f.id === fileId ? { ...f, status: isSuccess ? "success" : "error", progress: 100 } : f)),
          )
        }, 500)
      }
      updateProgress(Math.min(progress, 100))
    }, 200)
  }

  const handleFileSelect = useCallback((selectedFiles: FileList) => {
    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: "uploading" as const,
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Start upload simulation for each file
    newFiles.forEach((file) => {
      simulateUpload(file.id)
    })
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const droppedFiles = e.dataTransfer.files
      if (droppedFiles.length > 0) {
        handleFileSelect(droppedFiles)
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const clearAllFiles = () => {
    setFiles([])
  }

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "uploading":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-chart-4" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />
    }
  }

  const getStatusText = (status: UploadedFile["status"]) => {
    switch (status) {
      case "uploading":
        return "Uploading..."
      case "success":
        return "Upload complete"
      case "error":
        return "Upload failed"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Upload Contracts</DialogTitle>
          <DialogDescription>
            Upload contract documents for analysis. Supported formats: PDF, DOC, DOCX
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Upload Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Drop files here or click to browse</h3>
            <p className="text-muted-foreground mb-4">Select contract files to upload and analyze</p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              className="hidden"
              id="file-upload"
              onChange={(e) => {
                if (e.target.files) {
                  handleFileSelect(e.target.files)
                }
              }}
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Uploaded Files ({files.length})</h4>
                <Button variant="ghost" size="sm" onClick={clearAllFiles}>
                  Clear All
                </Button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border"
                  >
                    <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="h-6 w-6 p-0 flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                        <Badge
                          variant={
                            file.status === "success"
                              ? "default"
                              : file.status === "error"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {getStatusText(file.status)}
                        </Badge>
                      </div>
                      {file.status === "uploading" && <Progress value={file.progress} className="h-2" />}
                    </div>
                    <div className="flex-shrink-0">{getStatusIcon(file.status)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            disabled={files.length === 0 || files.some((f) => f.status === "uploading")}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
