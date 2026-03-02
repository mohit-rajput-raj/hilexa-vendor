"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { amenityIconMap } from "@/components/icons";
import { NewRoomProps, NewRoomSchema } from "./zod-schema";
import { X, Plus } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

export default function AddRoomForm({setEditMode}: {setEditMode?:  React.Dispatch<React.SetStateAction<{
    id: string;
    mode: boolean;
}>>}) {
  const { uploadFile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);           // local blob URLs for instant preview
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);   // final secure URLs from server

  const form = useForm<NewRoomProps>({
    resolver: zodResolver(NewRoomSchema),
    defaultValues: {
      accessibilityFeatures: [],
      amenities: [],
      images: [],           // will contain uploaded URLs (string[])
      bedType: "",
      roomCapacity: "",
      view: [],
      roomDescription: "",
      roomFloor: "",
      roomNumber: "",
      roomPricePerNight: "",
      roomType: "",
      roomSize: "",
      reservationStatus: "available",
    },
    mode: "onChange",
  });

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);
    setUploading(true);

    // 1. Show immediate local previews
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);

    // 2. Upload each file and collect URLs
    const newUrls: string[] = [];

    for (const file of newFiles) {
      try {
        const result = await uploadFile(file);
        if (result?.url) {
          console.log(result?.url);
          
          newUrls.push(result.url);
          toast.success(`Uploaded: ${file.name}`);
        } else {
          throw new Error("No URL returned");
        }
      } catch (err) {
        console.error("Upload failed:", file.name, err);
        toast.error(`Failed to upload ${file.name}`);
        // Optionally: remove the failed preview here
      }
    }

    // 3. Update form with uploaded URLs
    const currentUrls = form.getValues("images") || [];
    form.setValue("images", [...currentUrls, ...newUrls], {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Keep track of uploaded URLs separately if needed
    setUploadedUrls((prev) => [...prev, ...newUrls]);

    setUploading(false);
    // Reset input value so same file can be selected again if needed
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    // Remove preview
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });

    // Remove from form (URLs)
    const currentUrls = form.getValues("images") || [];
    form.setValue(
      "images",
      currentUrls.filter((_, i) => i !== index),
      { shouldValidate: true }
    );

    // Optional: remove from uploadedUrls tracking
    setUploadedUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: NewRoomProps) => {
    setLoading(true);

    try {
      const formData = new FormData();

      const fields: (keyof NewRoomProps)[] = [
        "roomNumber",
        "roomFloor",
        "reservationStatus",
        "roomType",
        "bedType",
        "roomDescription",
        "roomSize",
        "roomCapacity",
        "roomPricePerNight",
      ];

      fields.forEach((field) => {
        const value = data[field];
        if (value !== undefined && value !== "") {
          formData.append(String(field), String(value));
        }
      });

      data.amenities?.forEach((id) => formData.append("amenities", id));
      data.accessibilityFeatures?.forEach((id) => formData.append("accessibility", id));
      data.view?.forEach((id) => formData.append("view", id));

      // Send array of uploaded image URLs
      data.images?.forEach((url) => {
        formData.append("images[]", url);   // or "imageUrls[]", match your backend
      });

      console.log("Submitting data:", Object.fromEntries(formData));

      // await fetch("/api/rooms", { method: "POST", body: formData });
      // const res = await response.json();

      toast.success("Room created successfully!");
      form.reset();
      setPreviews([]);
      setUploadedUrls([]);
    } catch (err) {
      console.error("Room creation failed:", err);
      toast.error("Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-12">
        <Card className="rounded-2xl border-none shadow-lg">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Add a New Room</CardTitle>
            {
              setEditMode && (
                <Button onClick={()=>setEditMode((v)=>({...v, mode:false}))}>
                  Close
                </Button>
              )
            }
          </CardHeader>

          <CardContent className="space-y-10">
            {/* Images Section */}
            <div className="space-y-5">
              <div className="flex justify-between items-end">
                <h3 className="font-semibold text-lg">Room Pictures</h3>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-muted-foreground">
                    {previews.length} image{previews.length !== 1 && "s"}
                  </p>
                  {uploading && <span className="text-xs text-amber-600">Uploading...</span>}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {previews.map((src, idx) => (
                  <div key={src} className="relative group animate-fade-in">
                    <div className="h-28 w-40 rounded-xl overflow-hidden border shadow-sm bg-muted/30">
                      <Image
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        width={160}
                        height={112}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1.5 shadow-md hover:bg-destructive/90 transition-colors"
                      disabled={uploading}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}

                <FormField
                  control={form.control}
                  name="images"
                  render={({ fieldState }) => (
                    <FormItem className="inline-block">
                      <FormControl>
                        <label
                          className={`h-28 w-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors ${
                            uploading ? "opacity-60 pointer-events-none" : ""
                          }`}
                        >
                          <Input
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleImageChange}
                            disabled={uploading}
                          />
                          <Plus size={28} className="text-muted-foreground" />
                          <span className="mt-1.5 text-sm font-medium text-muted-foreground">
                            {uploading ? "Uploading..." : "Add Images"}
                          </span>
                        </label>
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Rest of your form remains the same */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Primary Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Room Number */}
                <FormField control={form.control} name="roomNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Number</FormLabel>
                    <FormControl><Input placeholder="e.g. 402" className="rounded-full" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Floor */}
                <FormField control={form.control} name="roomFloor" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Floor</FormLabel>
                    <FormControl><Input placeholder="e.g. 4" className="rounded-full" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Reservation Status */}
                <FormField control={form.control} name="reservationStatus" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="rounded-full"><SelectValue  /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Room Type */}
                <FormField control={form.control} name="roomType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="rounded-full"><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="deluxe">Deluxe</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Capacity */}
                <FormField control={form.control} name="roomCapacity" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl><Input className="rounded-full" type="number" placeholder="2" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Price */}
                <FormField control={form.control} name="roomPricePerNight" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price / Night</FormLabel>
                    <FormControl><Input className="rounded-full" type="number" placeholder="1500" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Bed Type */}
                <FormField control={form.control} name="bedType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bed Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="rounded-full"><SelectValue placeholder="Select bed" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="double">Double</SelectItem>
                        <SelectItem value="king">King Size</SelectItem>
                        <SelectItem value="queen">Queen Size</SelectItem>
                        <SelectItem value="sofa">Sofa</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Room Size */}
                <FormField control={form.control} name="roomSize" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Size (sqft)</FormLabel>
                    <FormControl><Input className="rounded-full" placeholder="350" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>
            <Separator />

            {/* Primary Details */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Primary Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* ... your existing FormFields for roomNumber, roomFloor, etc. ... */}
                {/* Just make sure Input has className="rounded-full" if you want it */}
              </div>

              <FormField
                control={form.control}
                name="roomDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter room details, view, furniture information..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Amenities & Accessibility */}
            <div className="space-y-10">
              <CheckboxGrid
                name="amenities"
                label="Amenities"
                items={[
                  { id: "wifi", label: "Wi-Fi" },
                  { id: "air_conditioning", label: "AC" },
                  { id: "minibar", label: "Mini-bar" },
                  { id: "tv", label: "TV" },
                  { id: "coffee", label: "Coffee Maker" },
                  { id: "pets_allowed", label: "Pet-friendly" },
                  { id: "city_view", label: "City View" },
                  { id: "sea_view", label: "Sea View" },
                ]}
                control={form.control}
              />

              <CheckboxGrid
                name="accessibilityFeatures"
                label="Accessibility Features"
                items={[
                  { id: "wheelchair_accessible", label: "Wheelchair Accessible" },
                  { id: "shower_bars", label: "Shower Grab Bars" },
                ]}
                control={form.control}
              />
              <CheckboxGrid
                name="view"
                label="View"
                items={[
                  { id: "city_view", label: "City View" },
                  { id: "sea_view", label: "Sea View" },
                  
                ]}
                control={form.control}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t">
              <Button
                type="submit"
                size="lg"
                disabled={loading || uploading}
                className="flex-1 sm:flex-none"
              >
                {loading ? "Submitting..." : "Create Room"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1 sm:flex-none"
                onClick={() => {
                  form.reset();
                  setPreviews([]);
                  setUploadedUrls([]);
                }}
                disabled={loading || uploading}
              >
                Reset Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

// CheckboxGrid remains unchanged — keeping your version
type CheckboxGridProps = {
  name: "amenities" | "accessibilityFeatures" | "view";
  label: string;
  items: { id: string; label: string }[];
  control: any;
};

function CheckboxGrid({ name, label, items, control }: CheckboxGridProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <Label className="text-lg font-semibold">{label}</Label>
        <Input
          placeholder={`Filter ${label.toLowerCase()}...`}
          className="max-w-[260px] h-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-5 rounded-xl border bg-muted/5">
        {filtered.map((item) => {
          const Icon = amenityIconMap?.[item.id];
          return (
            <FormField
              key={item.id}
              control={control}
              name={name}
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 p-2.5 rounded-lg hover:bg-muted/40 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        field.onChange(
                          checked
                            ? [...current, item.id]
                            : current.filter((v: string) => v !== item.id)
                        );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2">
                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                    {item.label}
                  </FormLabel>
                </FormItem>
              )}
            />
          );
        })}
      </div>
    </div>
  );
}