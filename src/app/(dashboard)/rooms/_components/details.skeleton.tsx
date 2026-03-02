"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PageSkeleton() {
  return (
      <div className="min-w-full flex">
        <Card className="w-full  h-full">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
      </div>
      
  )
}