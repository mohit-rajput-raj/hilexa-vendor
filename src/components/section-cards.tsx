'use client'
import { Icon, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  IconCurrencyDollar,
  IconShoppingCart,
  IconUsers,
  IconArrowUpRight,
} from "@tabler/icons-react"
import { DashboardData } from "@/app/(dashboard)/dashboard/page"
import card from "antd/es/card"

export const CardsData: {
  description: string
  title: string
  icon: Icon
  trending: string
  trendingIcon: Icon
  trendingValue: string
}[] = [
    {
      description: "Total Revenue",
      title: "$1,250.00",
      icon: IconCurrencyDollar,
      trending: "+12.5%",
      trendingIcon: IconTrendingUp,
      trendingValue: "Compared to last month",
    },
    {
      description: "Total Orders",
      title: "320",
      icon: IconShoppingCart,
      trending: "-4.3%",
      trendingIcon: IconTrendingDown,
      trendingValue: "Compared to last week",
    },
    {
      description: "New Customers",
      title: "89",
      icon: IconUsers,
      trending: "+8.1%",
      trendingIcon: IconTrendingUp,
      trendingValue: "Compared to last month",
    },
    {
      description: "Conversion Rate",
      title: "3.4%",
      icon: IconArrowUpRight,
      trending: "+1.2%",
      trendingIcon: IconTrendingUp,
      trendingValue: "Since yesterday",
    },
  ]

export function SectionCards({dash}:{dash:DashboardData}) {
  
  return (
    <div className="w-full *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card  className="@container/card">
          <CardHeader>
            <CardDescription>{CardsData[0].description}</CardDescription>

            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {CardsData[0].title}
            </CardTitle>

            <CardAction>
              <Badge variant="outline" className="flex items-center gap-1">
                {/* <CardsData.trendingIcon size={16} /> */}
                {CardsData[0].trending}
              </Badge>
              <p>
                {dash.stats.newBookings}
              </p>
            </CardAction>
          </CardHeader>
        </Card>
      

    </div>
  )
}
