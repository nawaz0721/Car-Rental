"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { AppRoutes } from "@/constant/constant"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

export default function ManageBooking() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const statusOptions = ["pending", "confirmed", "completed", "cancelled"]

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await axios.get(AppRoutes.getBookings)
      let fetchedBookings = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      // Fetch car details for each booking
      const updatedBookings = await Promise.all(
        fetchedBookings.map(async (booking) => {
          if (booking.car) {
            try {
              const carResponse = await axios.get(`${AppRoutes.manageCar}/${booking.car}`)
              
              return { ...booking, carImage: carResponse.data.image, carName: carResponse.data.name }
            } catch (error) {
              console.error("Error fetching car details:", error)
              return { ...booking, carImage: "/placeholder.svg", carName: "Unknown Car" }
            }
          }
          return { ...booking, carImage: "/placeholder.svg", carName: "Unknown Car" }
        })
      )

      setBookings(updatedBookings)    
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch bookings",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(`${AppRoutes.updateBooking}/${bookingId}`, { status: newStatus })
      toast({
        title: "Success",
        description: "Booking status updated successfully",
      })
      fetchBookings()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-bold text-secondary mb-6">Manage Bookings</h1>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Car Image</TableHead>
              <TableHead>Car Name</TableHead>
              <TableHead>Pickup Date</TableHead>
              <TableHead>Drop-off Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-6">
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>
                    <img
                      src={booking.carImage || "/placeholder.svg"}
                      alt="Car"
                      className="h-12 w-auto rounded object-cover"
                    />
                  </TableCell>
                  <TableCell>{booking.carName}</TableCell>
                  <TableCell>{new Date(booking.pickUpDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(booking.dropOffDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Select value={booking.status} onValueChange={(value) => handleStatusChange(booking._id, value)}>
                      <SelectTrigger className={booking.status === "completed" ? "text-green-600" : "text-orange-600"}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
