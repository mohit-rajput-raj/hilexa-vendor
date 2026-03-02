"use client"



export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left */}
        <div className="col-span-12 lg:col-span-3">
          <ProfileCard />
        </div>

        {/* Middle */}
        <div className="col-span-12 lg:col-span-6">
          <BookingInfoCard />
        </div>

        {/* Right */}
        <div className="col-span-12 lg:col-span-3">
          <RoomInfoCard />
        </div>
      </div>

      <div className="mt-6">
        <BookingHistoryTable />
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function ProfileCard() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-purple-500" />
          <div>
            <p className="font-semibold">Angus Copper</p>
            <p className="text-sm text-muted-foreground">
              G011-987654321
            </p>
          </div>
        </div>

        <Separator />

        {/* Personal Info */}
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Date of Birth:</span> June 15, 1985</p>
          <p><span className="font-medium">Gender:</span> Male</p>
          <p><span className="font-medium">Nationality:</span> American</p>
          <p><span className="font-medium">Passport No:</span> A12345678</p>
        </div>

        <Separator />

        {/* Loyalty */}
        <div className="space-y-3">
          <p className="font-medium">Loyalty Program</p>
          <Badge className="bg-purple-500">Platinum Member</Badge>
          <p className="text-sm text-muted-foreground">
            15,000 points • Elite Tier
          </p>
        </div>

      </CardContent>
    </Card>
  )
}

import { Button } from "@/components/ui/button"

export function BookingInfoCard() {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <Badge variant="secondary" className="mb-2">
            Booking Confirmed
          </Badge>
          <CardTitle>Booking ID: LG-B00109</CardTitle>
          <p className="text-sm text-muted-foreground">
            June 17, 2024 • 9:46 AM
          </p>
        </div>

        <div className="space-x-2">
          <Button size="sm" variant="outline">Edit</Button>
          <Button size="sm" variant="destructive">Cancel</Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <Info label="Room Type" value="Deluxe" />
          <Info label="Room Number" value="101" />
          <Info label="Price" value="$150/night" />
          <Info label="Guests" value="2 Adults" />
          <Info label="Check In" value="June 19, 2024" />
          <Info label="Check Out" value="June 22, 2024" />
          <Info label="Duration" value="3 nights" />
        </div>

        <Separator />

        <div>
          <p className="font-medium mb-2">Special Amenities</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>✓ Complimentary breakfast</li>
            <li>✓ Free Wi-Fi</li>
            <li>✓ Access to gym and pool</li>
          </ul>
        </div>

      </CardContent>
    </Card>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}

import Image from "next/image"


export function RoomInfoCard() {
  return (
    <Card className="rounded-2xl overflow-hidden shadow-none bg-background border border-border ">
      <CardHeader>
        <CardTitle>Room Info</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative h-40 w-full rounded-xl overflow-hidden">
          <Image
            src="/room.jpg"
            alt="Room"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex justify-between text-sm">
          <span>35 m²</span>
          <span>King Bed</span>
          <span>2 Guests</span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Room & Offer</span>
            <span>$450.00</span>
          </div>
          <div className="flex justify-between">
            <span>VAT</span>
            <span>$36.00</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$535.50</span>
          </div>
        </div>

        <Badge className="bg-purple-500">Paid</Badge>

      </CardContent>
    </Card>
  )
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export function BookingHistoryTable() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Booking History</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Room Type</TableHead>
              <TableHead>Check-In</TableHead>
              <TableHead>Check-Out</TableHead>
              <TableHead>Guests</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>LG-B00109</TableCell>
              <TableCell>
                <Badge variant="secondary">Deluxe</Badge>
              </TableCell>
              <TableCell>June 19, 2024</TableCell>
              <TableCell>June 21, 2024</TableCell>
              <TableCell>2 Guests</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>LG-B00085</TableCell>
              <TableCell>
                <Badge className="bg-purple-500">Suite</Badge>
              </TableCell>
              <TableCell>March 25, 2024</TableCell>
              <TableCell>March 30, 2024</TableCell>
              <TableCell>1 Guest</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}