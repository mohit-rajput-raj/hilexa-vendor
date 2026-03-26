// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { UseFormReturn } from "react-hook-form";
// import { X, Plus, Loader2, MapPin } from "lucide-react";
// import dynamic from "next/dynamic";

// import { Button } from "@/components/ui/button";
// import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
// import { SignUpProps } from "@/schema/auth";
// import { cn } from "@/lib/utils";
// import { Checkbox } from "@/components/ui/checkbox";
// import { hotelFeatures } from "@/components/icons";
// import ImageField from "./image-input";
// // Dynamic import for Leaflet to avoid SSR issues
// const LocationPicker = dynamic(() => import("./location-picker"), {
//   ssr: false,
//   loading: () => <div className="h-[300px] w-full bg-muted animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>
// });

// export const amenityKeys = Object.keys(hotelFeatures) as (keyof typeof hotelFeatures)[];


// export const Step_3 = ({
//     currentStep,
//     methods,
// }: {
//     currentStep: number;
//     methods: UseFormReturn<SignUpProps>;
// }) => {
//     const {
//         register,
//         formState: { errors },
//         watch,
//         setValue,
//         control
//     } = methods;

//     const images = watch("images") || [];
//     const documents = watch("documents") || [];
//     const location = watch("location") || { type: "Point", coordinates: [19.0760, 72.8777] };

//     const handleAddImage = (data: { url: string; public_id: string; resource_type: string }) => {
//         setValue("images", [...images, data], { shouldValidate: true });
//     };

//     const handleRemoveImage = (index: number) => {
//         const newImages = images.filter((_, i) => i !== index);
//         setValue("images", newImages, { shouldValidate: true });
//     };

//     const handleAddDocument = (data: { url: string; public_id: string; resource_type: string; name: string }) => {
//         setValue("documents", [...documents, {
//             docName: data.name,
//             docUrl: data.url,
//             public_id: data.public_id,
//             resource_type: data.resource_type
//         }], { shouldValidate: true });
//     };

//     const handleRemoveDocument = (index: number) => {
//         const newDocs = documents.filter((_, i) => i !== index);
//         setValue("documents", newDocs, { shouldValidate: true });
//     };

//     return (
//         <FieldGroup className="space-y-8">
//             <div className="flex flex-col gap-8">
//                 {/* Hotel Name */}
//                 <Field>
//                     <FieldLabel htmlFor="name">Hotel Name</FieldLabel>
//                     <Input
//                         id="name"
//                         type="text"
//                         placeholder="Grand Plaza Hotel"
//                         {...register("name")}
//                         className={cn(errors.name && "border-destructive")}
//                     />
//                     {errors.name && (
//                         <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
//                     )}
//                 </Field>

//                 {/* Description */}
//                 <Field>
//                     <FieldLabel htmlFor="description">Description</FieldLabel>
//                     <Input
//                         id="description"
//                         type="text"
//                         placeholder="A luxury hotel in the heart of the city..."
//                         {...register("description")}
//                         className={cn(errors.description && "border-destructive")}
//                     />
//                     {errors.description && (
//                         <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
//                     )}
//                 </Field>

//                 {/* Hotel Address */}
//                 <Field>
//                     <FieldLabel htmlFor="hotelAddress">Hotel Address</FieldLabel>
//                     <Input
//                         id="hotelAddress"
//                         type="text"
//                         placeholder="123 Main St, Area"
//                         {...register("hotelAddress")}
//                         className={cn(errors.hotelAddress && "border-destructive")}
//                     />
//                     {errors.hotelAddress && (
//                         <p className="text-sm text-destructive mt-1">{errors.hotelAddress.message}</p>
//                     )}
//                 </Field>

//                 {/* Hotel City */}
//                 <Field>
//                     <FieldLabel htmlFor="hotelCity">Hotel City</FieldLabel>
//                     <Input
//                         id="hotelCity"
//                         placeholder="Bangalore"
//                         {...register("hotelCity")}
//                         className={cn(errors.hotelCity && "border-destructive")}
//                     />
//                     {errors.hotelCity && (
//                         <p className="text-sm text-destructive mt-1">{errors.hotelCity.message}</p>
//                     )}
//                 </Field>

//                 {/* Location Picker */}
//                 <Field>
//                     <FieldLabel>Pin Hotel Location</FieldLabel>
//                     <LocationPicker
//                         value={[location.coordinates[1], location.coordinates[0]]}
//                         onChange={(coords) => {
//                             setValue("location", {
//                                 type: "Point",
//                                 coordinates: [coords[1], coords[0]] // [lng, lat] for GeoJSON
//                             }, { shouldValidate: true });
//                         }}
//                     />
//                     <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
//                         <MapPin className="w-4 h-4" />
//                         <span>Lat: {location.coordinates[1].toFixed(6)}, Lng: {location.coordinates[0].toFixed(6)}</span>
//                     </div>
//                 </Field>

//                 {/* Images Section */}
//                 <div className="space-y-4">
//                     <FieldLabel>Hotel Images</FieldLabel>
//                     <div className="flex flex-wrap gap-4">
//                         {images.map((img, index) => (
//                             <div key={index} className="relative w-32 h-32 rounded-lg overflow-hidden border shadow-sm group">
//                                 <img src={img.url} alt={`Hotel ${index}`} className="w-full h-full object-cover" />
//                                 <button
//                                     onClick={() => handleRemoveImage(index)}
//                                     className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                                 >
//                                     <X className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         ))}
//                         <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50 hover:bg-muted transition-colors">
//                             <ImageField
//                                 label=""
//                                 onUploadSuccess={(data) => handleAddImage(data)}
//                             />
//                         </div>
//                     </div>
//                     {errors.images && (
//                         <p className="text-sm text-destructive mt-1">{errors.images.message}</p>
//                     )}
//                 </div>

//                 {/* Documents Section */}
//                 <div className="space-y-4">
//                     <FieldLabel>Hotel Documents</FieldLabel>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {documents.map((doc, index) => (
//                             <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
//                                 <div className="flex flex-col">
//                                     <span className="text-sm font-medium">{doc.docName}</span>
//                                     <a href={doc.docUrl} target="_blank" className="text-xs text-primary hover:underline">View Document</a>
//                                 </div>
//                                 <button
//                                     onClick={() => handleRemoveDocument(index)}
//                                     className="p-1 text-destructive hover:bg-destructive/10 rounded-full"
//                                 >
//                                     <X className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                     <ImageField
//                         label="Add Document"
//                         onUploadSuccess={(data) => handleAddDocument(data)}
//                     />
//                     {errors.documents && (
//                         <p className="text-sm text-destructive mt-1">{errors.documents.message}</p>
//                     )}
//                 </div>

//                 {/* Amenities Section */}
//                 <div className="space-y-4">
//                     <FieldLabel>Amenities</FieldLabel>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                         {amenityKeys.map((id) => (
//                             <FormField
//                                 key={id}
//                                 control={control}
//                                 name="amenities"
//                                 render={({ field }) => (
//                                     <FormItem className="flex items-center space-x-3 space-y-0 p-2 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
//                                         <FormControl>
//                                             <Checkbox
//                                                 checked={field.value?.includes(id)}
//                                                 onCheckedChange={(checked) => {
//                                                     const arr = field.value || [];
//                                                     field.onChange(
//                                                         checked ? [...arr, id] : arr.filter((v) => v !== id)
//                                                     );
//                                                 }}
//                                             />
//                                         </FormControl>
//                                         <FormLabel className="font-normal capitalize cursor-pointer">{id.replace("_", " ")}</FormLabel>
//                                     </FormItem>
//                                 )}
//                             />
//                         ))}
//                     </div>
//                     {errors.amenities && (
//                         <p className="text-sm text-destructive mt-1">{errors.amenities.message}</p>
//                     )}
//                 </div>
//             </div>
//         </FieldGroup>
//     );
// };
// "use client";

// import { UseFormReturn } from "react-hook-form";
// import { X, MapPin, Building2, Info, Image as ImageIcon, FileText, CheckCircle2 } from "lucide-react";
// import dynamic from "next/dynamic";
// import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
// import { SignUpProps } from "@/schema/auth";
// import { cn } from "@/lib/utils";
// import { Checkbox } from "@/components/ui/checkbox";
// import { hotelFeatures } from "@/components/icons";
// import ImageField from "./image-input";

// const LocationPicker = dynamic(() => import("./location-picker"), {
//     ssr: false,
//     loading: () => <div className="h-[300px] w-full bg-white/[0.02] border border-white/10 animate-pulse rounded-2xl flex items-center justify-center text-muted-foreground">Loading Map...</div>
// });

// export const amenityKeys = Object.keys(hotelFeatures) as (keyof typeof hotelFeatures)[];

// export const Step_3 = ({ methods }: { currentStep: number; methods: UseFormReturn<SignUpProps> }) => {
//     const { register, formState: { errors }, watch, setValue, control } = methods;

//     const images = watch("images") || [];
//     const documents = watch("documents") || [];
//     const location = watch("location") || { type: "Point", coordinates: [72.8777, 19.0760] };
//     const inputClasses = "h-12 bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40";

//     return (
//         <FieldGroup className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">

//             {/* Property Basic Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Field className="md:col-span-2">
//                     <div className="flex items-center gap-2 mb-2">
//                         <Building2 className="w-4 h-4 text-primary" />
//                         <FieldLabel className="text-slate-200">Hotel Name</FieldLabel>
//                     </div>
//                     <Input placeholder="Grand Plaza Hotel" {...register("name")} className={inputClasses} />
//                 </Field>

//                 <Field className="md:col-span-2">
//                     <div className="flex items-center gap-2 mb-2">
//                         <Info className="w-4 h-4 text-primary" />
//                         <FieldLabel className="text-slate-200">Description</FieldLabel>
//                     </div>
//                     <textarea
//                         {...register("description")}
//                         placeholder="Describe your property's unique charm..."
//                         className={cn(inputClasses, "min-h-[100px] w-full rounded-md p-3 resize-none")}
//                     />
//                 </Field>
//             </div>

//             <div className="h-px bg-white/5" />

//             {/* Location Section */}
//             <div className="space-y-4">
//                 <div className="flex flex-col gap-1">
//                     <FieldLabel className="text-slate-200">Property Location</FieldLabel>
//                     <p className="text-xs text-muted-foreground">Drag the pin to your exact property entrance.</p>
//                 </div>
//                 <div className="rounded-2xl overflow-hidden border border-white/10 shadow-inner">
//                     <LocationPicker
//                         value={[location.coordinates[1], location.coordinates[0]]}
//                         onChange={(coords) => setValue("location", { type: "Point", coordinates: [coords[1], coords[0]] })}
//                     />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <Input placeholder="Address" {...register("hotelAddress")} className={inputClasses} />
//                     <Input placeholder="City" {...register("hotelCity")} className={inputClasses} />
//                 </div>
//             </div>

//             <div className="h-px bg-white/5" />

//             {/* Media Gallery */}
//             <div className="space-y-4">
//                 <div className="flex items-center gap-2">
//                     <ImageIcon className="w-4 h-4 text-primary" />
//                     <FieldLabel className="text-slate-200">Property Gallery</FieldLabel>
//                 </div>

//                 {/* Grid Layout */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

//                     {/* Existing Images */}
//                     {images.map((img, index) => (
//                         <div
//                             key={index}
//                             className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group bg-white/[0.02]"
//                         >
//                             <img
//                                 src={img.url}
//                                 alt=""
//                                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                             />
//                             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
//                             <button
//                                 type="button"
//                                 onClick={() => setValue("images", images.filter((_, i) => i !== index))}
//                                 className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-all duration-200 hover:bg-red-600"
//                             >
//                                 <X className="w-3.5 h-3.5" />
//                             </button>
//                         </div>
//                     ))}

//                     {/* The Upload Trigger - Styled as a Grid Card */}
//                     <div className="aspect-square relative flex items-center justify-center">
//                         <div className="w-full h-full border-2 border-dashed border-white/10 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all group overflow-hidden">
//                             <ImageField
//                                 // We pass a "minimal" label or handle the styling inside ImageField
//                                 label="Add Photo"
//                                 variant="grid"
//                                 onUploadSuccess={(data) => setValue("images", [...images, data])}
//                             // IMPORTANT: If your ImageField has a lot of internal UI (like that green "Verified" text),
//                             // you should modify it to be "compact" when used in a grid.
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {errors.images && (
//                     <p className="text-xs text-destructive font-medium">{errors.images.message}</p>
//                 )}
//             </div>

//             {/* Amenities Selection */}
//             <div className="space-y-4">
//                 <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-primary" />
//                     <FieldLabel className="text-slate-200">Amenities & Features</FieldLabel>
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                     {amenityKeys.map((id) => (
//                         <FormField
//                             key={id}
//                             control={control}
//                             name="amenities"
//                             render={({ field }) => (
//                                 <label className={cn(
//                                     "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none",
//                                     field.value?.includes(id)
//                                         ? "bg-primary/10 border-primary/40 text-primary"
//                                         : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]"
//                                 )}>
//                                     <Checkbox
//                                         className="hidden"
//                                         checked={field.value?.includes(id)}
//                                         onCheckedChange={(checked) => {
//                                             const arr = field.value || [];
//                                             field.onChange(checked ? [...arr, id] : arr.filter((v) => v !== id));
//                                         }}
//                                     />
//                                     <span className="text-xs font-medium capitalize">{id.replace("_", " ")}</span>
//                                 </label>
//                             )}
//                         />
//                     ))}
//                 </div>
//             </div>

//             {/* Documents */}
//             <div className="space-y-4">
//                 <div className="flex items-center gap-2">
//                     <FileText className="w-4 h-4 text-primary" />
//                     <FieldLabel className="text-slate-200">Property Documents</FieldLabel>
//                 </div>
//                 <div className="space-y-3">
//                     {documents.map((doc, index) => (
//                         <div key={index} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl group">
//                             <div className="flex items-center gap-3">
//                                 <div className="p-2 bg-primary/10 rounded-lg"><FileText className="w-4 h-4 text-primary" /></div>
//                                 <div className="flex flex-col">
//                                     <span className="text-sm font-medium text-slate-200">{doc.docName}</span>
//                                     <a href={doc.docUrl} target="_blank" className="text-[10px] text-primary uppercase font-bold tracking-tight">View PDF</a>
//                                 </div>
//                             </div>
//                             <button onClick={() => setValue("documents", documents.filter((_, i) => i !== index))} className="p-2 hover:text-destructive transition-colors"><X className="w-4 h-4" /></button>
//                         </div>
//                     ))}
//                     <ImageField label="Upload License/Permit" onUploadSuccess={(data) => setValue("documents", [...documents, { docName: data.name, docUrl: data.url, public_id: data.public_id, resource_type: data.resource_type }])} />
//                 </div>
//             </div>
//         </FieldGroup>
//     );
// };
"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { X, MapPin, Building2, Info, Image as ImageIcon, FileText, CheckCircle2, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SignUpProps } from "@/schema/auth";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { hotelFeatures } from "@/components/icons";
import ImageField from "./image-input";
import { toast } from "sonner";

// const LocationPicker = dynamic(() => import("./location-picker"), {
//     ssr: false,
//     loading: () => <div className="h-[300px] w-full bg-white/[0.02] border border-white/10 animate-pulse rounded-2xl flex items-center justify-center text-muted-foreground">Loading Map...</div>
// });


import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default Leaflet icon disappearing in Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// SUB-COMPONENT: This handles the sliding animation
function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            // .flyTo(coords, zoom, options)
            map.flyTo(center, 16, {
                animate: true,
                duration: 1.0, // 1 second duration as requested
            });
        }
    }, [center, map]);

    return null;
}

interface LocationPickerProps {
    value: [number, number]; // [lat, lng]
    onChange: (coords: [number, number]) => void;
}

const LocationPicker = ({ value, onChange }: LocationPickerProps) => {
    return (
        <div className="h-[300px] w-full relative">
            <MapContainer
                center={value}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* This component triggers the animation whenever 'value' changes */}
                <MapUpdater center={value} />

                <Marker
                    position={value}
                    icon={icon}
                    draggable={true}
                    eventHandlers={{
                        dragend: (e) => {
                            const marker = e.target;
                            const position = marker.getLatLng();
                            onChange([position.lat, position.lng]);
                        },
                    }}
                />
            </MapContainer>
        </div>
    );
};

export const amenityKeys = Object.keys(hotelFeatures) as (keyof typeof hotelFeatures)[];

export const Step_3 = ({ methods }: { currentStep: number; methods: UseFormReturn<SignUpProps> }) => {
    const { register, formState: { errors }, watch, setValue, control } = methods;

    const [isLocating, setIsLocating] = useState(false);
    const images = watch("images") || [];
    const documents = watch("documents") || [];
    const location = watch("location") || { type: "Point", coordinates: [72.8777, 19.0760] };
    const inputClasses = "h-12 bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40";
    // Inside Step_3.tsx
    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;

                // This update triggers the 'value' prop change in LocationPicker,
                // which then triggers map.flyTo() inside the MapUpdater.
                setValue("location", {
                    type: "Point",
                    coordinates: [longitude, latitude],
                }, { shouldValidate: true });

                setIsLocating(false);
                toast.success("Location synced!");
            },
            (err) => {
                setIsLocating(false);
                toast.error("Location access denied.");
            },
            { enableHighAccuracy: true }
        );
    };
    // const handleGetCurrentLocation = () => {
    //     if (!navigator.geolocation) {
    //         toast.error("Geolocation is not supported by your browser");
    //         return;
    //     }

    //     setIsLocating(true);
    //     navigator.geolocation.getCurrentPosition(
    //         (pos) => {
    //             const { latitude, longitude } = pos.coords;
    //             setValue("location", {
    //                 type: "Point",
    //                 coordinates: [longitude, latitude], // GeoJSON [lng, lat]
    //             }, { shouldValidate: true });

    //             setIsLocating(false);
    //             toast.success("Location pinned to your current position");
    //         },
    //         (err) => {
    //             setIsLocating(false);
    //             toast.error("Unable to retrieve location. Please pin it manually.");
    //             console.error(err);
    //         },
    //         { enableHighAccuracy: true }
    //     );
    // };

    return (
        <FieldGroup className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">

            {/* Property Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        <FieldLabel className="text-slate-200">Hotel Name</FieldLabel>
                    </div>
                    <Input placeholder="Grand Plaza Hotel" {...register("name")} className={inputClasses} />
                </Field>

                <Field className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-primary" />
                        <FieldLabel className="text-slate-200">Description</FieldLabel>
                    </div>
                    <textarea
                        {...register("description")}
                        placeholder="Describe your property's unique charm..."
                        className={cn(inputClasses, "min-h-[100px] w-full rounded-md p-3 resize-none")}
                    />
                </Field>
            </div>

            <div className="h-px bg-white/5" />

            {/* Location Section */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <FieldLabel className="text-slate-200">Property Location</FieldLabel>
                        <p className="text-xs text-muted-foreground">Drag the pin to your exact property entrance.</p>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isLocating}
                        onClick={handleGetCurrentLocation}
                        className="bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary transition-all gap-2"
                    >
                        {isLocating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <MapPin className="w-3.5 h-3.5" />}
                        {isLocating ? "Locating..." : "Use Current Location"}
                    </Button>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                    <LocationPicker
                        value={[location.coordinates[1], location.coordinates[0]]}
                        onChange={(coords) => setValue("location", { type: "Point", coordinates: [coords[1], coords[0]] })}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Address" {...register("hotelAddress")} className={inputClasses} />
                    <Input placeholder="City" {...register("hotelCity")} className={inputClasses} />
                </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Media Gallery */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary" />
                    <FieldLabel className="text-slate-200">Property Gallery</FieldLabel>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group bg-white/[0.02]"
                        >
                            <img
                                src={img.url}
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <button
                                type="button"
                                onClick={() => setValue("images", images.filter((_, i) => i !== index))}
                                className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-all duration-200 hover:bg-red-600"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}

                    <div className="aspect-square relative flex items-center justify-center">
                        <div className="w-full h-full border-2 border-dashed border-white/10 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all group overflow-hidden">
                            <ImageField
                                label="Add Photo"
                                variant="grid"
                                onUploadSuccess={(data) => setValue("images", [...images, data])}
                            />
                        </div>
                    </div>
                </div>

                {errors.images && (
                    <p className="text-xs text-destructive font-medium">{errors.images.message}</p>
                )}
            </div>

            {/* Amenities Selection */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <FieldLabel className="text-slate-200">Amenities & Features</FieldLabel>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {amenityKeys.map((id) => (
                        <FormField
                            key={id}
                            control={control}
                            name="amenities"
                            render={({ field }) => (
                                <label className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none",
                                    field.value?.includes(id)
                                        ? "bg-primary/10 border-primary/40 text-primary"
                                        : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]"
                                )}>
                                    <Checkbox
                                        className="hidden"
                                        checked={field.value?.includes(id)}
                                        onCheckedChange={(checked) => {
                                            const arr = field.value || [];
                                            field.onChange(checked ? [...arr, id] : arr.filter((v) => v !== id));
                                        }}
                                    />
                                    <span className="text-xs font-medium capitalize">{id.replace("_", " ")}</span>
                                </label>
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Documents */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <FieldLabel className="text-slate-200">Property Documents</FieldLabel>
                </div>
                <div className="space-y-3">
                    {documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg"><FileText className="w-4 h-4 text-primary" /></div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-200">{doc.docName}</span>
                                    <a href={doc.docUrl} target="_blank" rel="noreferrer" className="text-[10px] text-primary uppercase font-bold tracking-tight">View PDF</a>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setValue("documents", documents.filter((_, i) => i !== index))}
                                className="p-2 hover:text-destructive transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <ImageField label="Upload License/Permit" onUploadSuccess={(data) => setValue("documents", [...documents, { docName: data.name, docUrl: data.url, public_id: data.public_id, resource_type: data.resource_type }])} />
                </div>
            </div>
        </FieldGroup>
    );
};
