"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

// 1. Main Section Component
export function CustomerReviewsSection() {
  const reviews = [
    {
      name: "Johan Manulang",
      date: "June 15, 2024",
      rating: 5,
      review: "Fantastic stay! The room was exceptionally clean and comfortable, and the staff were incredibly helpful and friendly. The location was perfect for our needs. Highly recommend this hotel to anyone visiting the area.",
    },
    {
      name: "Suzi Matsuda",
      date: "June 12, 2024",
      rating: 4,
      review: "Great location and very friendly staff. The room was cozy and well-maintained. The breakfast could have offered more variety, but overall, it was a very good experience. I would stay here again.",
    },
    {
      name: "Donnie Wong",
      date: "June 10, 2024",
      rating: 3,
      review: "The room was nice and the bed was comfortable, but there were some maintenance issues. The air conditioning was not working properly, which made the room quite warm at night.",
    },
    {
      name: "Isla de Lacosta",
      date: "June 8, 2024",
      rating: 5,
      review: "Amazing service and a beautiful hotel. The amenities were top-notch, especially the spa, which I thoroughly enjoyed. The staff were very attentive and made my stay truly memorable. Will definitely return!",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header matching the image */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button variant="secondary" size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg h-9 px-4">
            Newest
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg border">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((item, index) => (
          <CustomerReviewCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

// 2. Individual Card Component
export function CustomerReviewCard({
  name,
  review,
  date,
  rating,
}: {
  name: string
  review: string
  date: string
  rating: number
}) {
  return (
    <Card className="rounded-2xl shadow-sm border bg-card hover:shadow-md transition-shadow">
      <CardContent className="p-6 space-y-4">
        {/* Profile Info */}
        <div className="space-y-3">
          <Avatar className="h-12 w-12 border-none">
            <AvatarFallback className="bg-violet-500 text-white font-bold text-lg">
              {/* Using a solid violet background to match the image */}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-base text-foreground">{name}</p>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={rating} />
              <span className="text-[10px] text-muted-foreground font-medium">• {date}</span>
            </div>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-6">
          &quot;{review}&quot;
        </p>
      </CardContent>
    </Card>
  )
}

// 3. Star Helper
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted/20 text-muted/20"
          }`}
        />
      ))}
    </div>
  )
}