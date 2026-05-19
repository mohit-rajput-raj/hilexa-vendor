"use client"

import * as React from "react"
import { useState, useEffect, useTransition, useId } from "react"
import { Users, Check, LogInIcon, BikeIcon, MountainIcon, SwordIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useQueryClient } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconSwitch,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useCurrentUser } from "@/services/queryes"
import { Spinner } from "./ui/spinner"
import { ScrollArea } from "./ui/scroll-area"
import { VendorAccountsConnectAccount } from "@/services/fetch.service"
import { toast } from "sonner"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useGetConnectedAccounts } from "@/services/tanstack.query"
const accounts = [
  {
    id: "hotel",
    name: "Joylan Dorwart",
    email: "admin@gmail.com",
    avatar: "/girl.png",
    role: "Hotel vendor",
  },
  {
    id: "cabs",
    name: "JD Properties",
    email: "billing@jdproperties.com",
    avatar: "",
    role: "Cab vendor",
  },
  {
    id: "bikes",
    name: "Personal Account",
    email: "joylan.personal@gmail.com",
    avatar: "",
    role: "Bike vendor",
  },
  {
    id: "tours",
    name: "JD Properties",
    email: "billing@jdproperties.com",
    avatar: "",
    role: "Tour vendor",
  },
  {
    id: "adventures",
    name: "Personal Account",
    email: "joylan.personal@gmail.com",
    avatar: "",
    role: "Adventure vendor",
  },
]

export function NavUser() {
  const router = useRouter()
  const pathname = usePathname()
  const { isMobile } = useSidebar()
  const { data: vendor, isLoading, refetch, isRefetching } = useCurrentUser()
  const [mounted, setMounted] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (isLoading || isRefetching) return <Spinner />

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground left-0"
            >
              <Avatar className="h-8 w-8 rounded-full grayscale">
                <AvatarImage src={vendor?.data?.hotelDetails?.images[0]?.url || '/girl.png'} alt={vendor?.data?.hotelDetails?.name || 'vendor'} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{vendor?.data?.hotelDetails?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {vendor?.data?.businessDetails?.businessEmail}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={vendor?.data?.hotelDetails?.images[0]?.url || '/girl.png'} alt={vendor?.data?.hotelDetails?.name || 'vendor'} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{vendor?.data?.hotelDetails?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {vendor?.data?.businessDetails?.businessEmail}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => {
                if (pathname !== "/profile") {
                  router.push("/profile")
                }
              }}>
                <IconUserCircle />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>

              {/* FIXED: Added onSelect={(e) => e.preventDefault()} to keep the item from closing the parent dropdown context */}
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0 focus:bg-transparent">
                <div className="flex w-full items-center gap-2 px-2 py-1.5">
                  <IconSwitch className="size-4 text-muted-foreground shrink-0" />
                  <SwitchAccountButton />
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              localStorage.removeItem("accessToken")
              queryClient.clear()
              router.push("/login")
            }}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}


export function SwitchAccountButton() {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [activeId, setActiveId] = React.useState("hotel")
  const { data } = useGetConnectedAccounts();
  const { switchAccount } = useAuthStore()
  // console.log(data.data);


  // Sync initial state from localStorage safely on client mount
  React.useEffect(() => {
    const savedCategory = localStorage.getItem("category")
    if (savedCategory) {
      setActiveId(savedCategory)
    }
  }, [])

  const handleSwitch = async (id: string, cat: string) => {
    const privid = activeId;
    setActiveId(id)
    setLoading(true);


    try {

      const res = await switchAccount(id);

      console.log(res);

      if (res.success) {
        localStorage.setItem("category", cat)
        console.log("asdsad");

        setTimeout(() => {
          setOpen(false)
          window.location.reload()
        }, 200)

      } else {
        setActiveId(privid);
      }


    } catch (error) {
      setActiveId(privid)
      toast.error("Something went wrong during Switching account")

    } finally {
      setLoading(false);
    }

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="w-full text-left text-sm font-normal text-foreground hover:text-foreground transition-colors"
        >
          Switch Account
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-background border-border dark:border-zinc-800">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Switch Account
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Select an account or property setup to toggle your active view.
          </DialogDescription>
          <DialogSignInDemo />
        </DialogHeader>

        {/* 1. FIXED: Wrapped inside ScrollArea with constrained, low max-height */}
        <ScrollArea className="h-full max-h-[240px] px-6 pb-6 pr-5">
          <div className="space-y-2 pt-2">
            {data?.data.map((account: {
              vendorId: string,
              businessName: string,
              serviceType?: string,
              status: string
            }

            ) => {
              const isActive = account.vendorId === activeId
              return (
                <button

                  disabled={loading}
                  key={account.vendorId}
                  onClick={() => handleSwitch(account.vendorId, account.serviceType || "hotel")}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 border text-left",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent/60 border-primary/40 dark:bg-zinc-800/60 dark:border-zinc-700"
                      : "bg-transparent border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      {/* <AvatarImage src={account.avatar} alt={account.businessName} /> */}
                      <AvatarFallback className="bg-primary/10 text-primary dark:bg-zinc-800 dark:text-zinc-200">
                        {account.businessName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none text-foreground">
                        {account.businessName}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {account.status}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-primary dark:text-zinc-400 mt-0.5">
                        {account.serviceType || "hotel"}
                      </span>
                    </div>
                  </div>

                  {isActive && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground dark:bg-zinc-100 dark:text-zinc-900">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}



// Dummy server action placeholder - replace with your real import path
// import { VendorAccountsConnectAccount } from "@/actions/vendor";

const DialogSignInDemo = () => {
  // 1. Properly pass this open state into the Dialog component
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const vendorId = user?.data?.vendor.vendorId;

  const [formDataaa, setFormData] = useState({
    email: "",
    password: ""
  });
  // const [serviceType, setServiceType] = useState("")

  // Updated handler with explicit typing
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formDataaa,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", formDataaa.email);
      formData.set("password", formDataaa.password);
      formData.set("vendorId", vendorId);
      try {
        const res = await VendorAccountsConnectAccount(formData);
        if (res?.error) {
          setError(res.error);
          toast.error(res.error); // Show error to the user explicitly
        } else {
          setOpen(false); // This will now successfully close the modal
          toast.success("Connected successfully!");
          // Optional: Reset form fields on success
          setFormData({ email: "", password: "" });
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again later.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Connect</Button>
      </DialogTrigger>

      <DialogContent className='to-card bg-gradient-to-b from-primary-100 to-40% [background-size:100%_101%] sm:max-w-sm dark:from-sky-900'>
        {/* 2. Moved form inside Content tag to preserve DOM submission tree structure */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader className='items-center'>
            <div className='mb-4 flex size-12 items-center justify-center rounded-full bg-primary-600/10 sm:mx-0 dark:bg-sky-400/10'>
              <LogInIcon className='size-6 text-primary dark:text-primary-400' />
            </div>
            <DialogTitle>Switch Account</DialogTitle>
            <DialogDescription className='text-center'>
              Make a new doc to bring your words, data and teams together. For free.
            </DialogDescription>
          </DialogHeader>

          <div className='flex flex-col gap-4'>
            {/* <ComboboxOptionWithIIconDemo /> */}
            <div className='grid gap-3'>
              <Label htmlFor='email'>Email</Label>
              {/* 3. FIXED: Changed name from 'useremail' to 'email' to match state object key */}
              <Input
                type='email'
                id='email'
                name='email'
                value={formDataaa.email}
                placeholder='example@gmail.com'
                onChange={onchange}
                required
              />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='password'>Password</Label>
              {/* 3. FIXED: Changed name from 'userpassword' to 'password' to match state object key */}
              <Input
                type='password'
                id='password'
                name='password'
                value={formDataaa.password}
                placeholder='Password'
                onChange={onchange}
                required
              />
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </div>

          <DialogFooter className='space-y-2 pt-4 sm:flex-col'>
            <Button
              type="submit"
              disabled={pending}
              className='w-full bg-sky-600 text-white hover:bg-sky-700 focus-visible:ring-sky-600 dark:bg-sky-400 dark:text-slate-900 dark:hover:bg-sky-500 dark:focus-visible:ring-sky-400'
            >
              {pending ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


export default DialogSignInDemo






import {
  ChevronsUpDownIcon,
  DollarSignIcon,
  FactoryIcon,
  FilmIcon,
  HospitalIcon,
  HotelIcon,
  MonitorIcon,
  ScaleIcon,
  SchoolIcon,
  TractorIcon,
  ZapIcon
} from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAuthStore } from "@/stores/auth.store"

const industries = [
  {
    value: 'Hotels',
    label: 'Hotels',
    icon: HotelIcon
  },
  {
    value: 'Cabs',
    label: 'Cabs',
    icon: HospitalIcon
  },
  {
    value: 'Bikes',
    label: 'Bikes',
    icon: BikeIcon
  },
  {
    value: 'Tours',
    label: 'Tours',
    icon: MountainIcon
  },
  {
    value: 'Adventures',
    label: 'Adventures',
    icon: SwordIcon
  },

]

const ComboboxOptionWithIIconDemo = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]'
          >
            {value ? (
              <span className='flex min-w-0 items-center gap-2'>
                {(() => {
                  const selectedItem = industries.find(industry => industry.value === value)

                  if (selectedItem) {
                    const Icon = selectedItem.icon

                    return <Icon className='text-muted-foreground' />
                  }

                  return null
                })()}
                <span className='truncate'>{industries.find(industry => industry.value === value)?.label}</span>
              </span>
            ) : (
              <span className='text-muted-foreground'>Select industry category</span>
            )}
            <ChevronsUpDownIcon className='text-muted-foreground/80 shrink-0' aria-hidden='true' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0' align='start'>
          <Command>
            <CommandInput placeholder='Search industries...' />
            <CommandList>
              <CommandEmpty>No industry found.</CommandEmpty>
              <CommandGroup>
                {industries.map(industry => (
                  <CommandItem
                    key={industry.value}
                    value={industry.value}
                    onSelect={currentValue => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center gap-2'>
                      <industry.icon className='text-muted-foreground size-4' />
                      {industry.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

