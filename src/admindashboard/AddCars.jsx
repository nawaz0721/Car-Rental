import { useState, useEffect } from "react"
import axios from "axios"
import { AppRoutes } from "@/constant/constant"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pencil, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ManageCars() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cars, setCars] = useState([])
  const [carData, setCarData] = useState({
    id: null,
    name: "",
    price: "",
    city: "",
    category: "",
    description: "",
    status: "",
    image: null,
    previewImage: null,
  })
  const { toast } = useToast()

  const statusOptions = ["available", "rented"]
  const categoryOptions = ["SUV", "Sedan", "Truck"]

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await axios.get(AppRoutes.manageCar)
      const sortedCars = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setCars(sortedCars)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch cars",
      })
    }
  }

  const resetForm = () => {
    setCarData({
      id: null,
      name: "",
      price: "",
      city: "",
      category: "",
      description: "",
      status: "",
      image: null,
      previewImage: null,
    })
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setCarData({
        ...carData,
        image: file,
        previewImage: URL.createObjectURL(file),
      })
    }
  }

  const handleSaveCar = async () => {
    const { name, price, city, category, description, image, id } = carData

    if (!name || !price || !city || !category || !description || (!id && !image)) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields",
      })
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("city", city)
    formData.append("category", category)
    formData.append("description", description)
    formData.append("status", carData.status || "available")

    if (image) {
      formData.append("image", image)
    }

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } }

      if (id) {
        await axios.put(`${AppRoutes.manageCar}/${id}`, formData, config)
        toast({
          title: "Success",
          description: "Car updated successfully",
        })
      } else {
        await axios.post(AppRoutes.manageCar, formData, config)
        toast({
          title: "Success",
          description: "Car added successfully",
        })
      }
      fetchCars()
      setIsModalOpen(false)
      resetForm()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save car",
      })
    }
  }

  const handleStatusChange = async (carId, newStatus) => {
    try {
      await axios.put(`${AppRoutes.manageCar}/${carId}`, { status: newStatus })
      toast({
        title: "Success",
        description: "Status updated successfully",
      })
      fetchCars()
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Manage Cars</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm()
                setIsModalOpen(true)
              }}
              className="bg-primary text-secondary hover:bg-primary/90"
            >
              Add Car
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{carData.id ? "Edit Car" : "Add New Car"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Car Name"
                value={carData.name}
                onChange={(e) => setCarData({ ...carData, name: e.target.value })}
              />
              <Input
                placeholder="Price"
                value={carData.price}
                onChange={(e) => setCarData({ ...carData, price: e.target.value })}
              />
              <Input
                placeholder="City"
                value={carData.city}
                onChange={(e) => setCarData({ ...carData, city: e.target.value })}
              />
              <Select value={carData.category} onValueChange={(value) => setCarData({ ...carData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Description"
                value={carData.description}
                onChange={(e) => setCarData({ ...carData, description: e.target.value })}
              />
              <Select value={carData.status} onValueChange={(value) => setCarData({ ...carData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {carData.previewImage && (
                <div className="mt-2">
                  <p className="mb-2 text-sm text-muted-foreground">Current Image:</p>
                  <img
                    src={carData.previewImage || "/placeholder.svg"}
                    alt="Car Preview"
                    className="h-24 w-auto rounded-md object-cover"
                  />
                </div>
              )}
              <div className="mt-2">
                <Input type="file" onChange={handleFileChange} accept="image/*" className="cursor-pointer" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button className="bg-primary text-secondary hover:bg-primary/90" onClick={handleSaveCar}>
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car._id}>
                <TableCell>{car.name}</TableCell>
                <TableCell>{car.price}</TableCell>
                <TableCell>{car.city}</TableCell>
                <TableCell>{car.category}</TableCell>
                <TableCell className="max-w-[200px] truncate">{car.description}</TableCell>
                <TableCell>
                  <Select value={car.status} onValueChange={(value) => handleStatusChange(car._id, value)}>
                    <SelectTrigger className={car.status === "available" ? "text-green-600" : "text-red-600"}>
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
                <TableCell>
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    className="h-12 w-auto rounded object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCarData({
                          id: car._id,
                          name: car.name,
                          price: car.price,
                          city: car.city,
                          category: car.category,
                          description: car.description,
                          status: car.status,
                          previewImage: car.image,
                        })
                        setIsModalOpen(true)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Car</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this car? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 text-white hover:bg-red-600"
                            onClick={async () => {
                              try {
                                await axios.delete(`${AppRoutes.manageCar}/${car._id}`)
                                toast({
                                  title: "Success",
                                  description: "Car deleted successfully",
                                })
                                fetchCars()
                              } catch (error) {
                                toast({
                                  variant: "destructive",
                                  title: "Error",
                                  description: "Failed to delete car",
                                })
                              }
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

