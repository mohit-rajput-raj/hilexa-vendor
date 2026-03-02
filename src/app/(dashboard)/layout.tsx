import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {ErrorBoundary} from 'react-error-boundary'
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import { CompactFooter } from "@/components/footer/compactfooter"
// import { Footer } from "@/components/footer/footer"

export default function Page(
    { children }: { children: React.ReactNode }
) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 52)",
                    "--header-height": "calc(var(--spacing) * 19)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="sidebar" className="bg-foreground/10" />
            <SidebarInset className="bg-gray-50 dark:bg-zinc-900">
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <SiteHeader />
                </ErrorBoundary>
                <div className="flex flex-1 flex-col px-2">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 p-2 md:gap-6 md:p-2  rounded-xl min-h-screen">
                            {children}
                            <CompactFooter/>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
