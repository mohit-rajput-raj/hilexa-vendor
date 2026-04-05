'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DownloadIcon } from 'lucide-react'

export function InstallPwaButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register immediately, don't wait for 'load' because in React we are already loaded at this point
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('SW registered successfully:', reg.scope);
      }).catch(err => console.log('SW registration failed:', err));
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e)
    }
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("Chrome hasn't fired the install event yet! Possible reasons:\n1. It's already installed as a Chrome App\n2. You are in Incognito window\n3. Chrome temporarily blocked the install prompt.")
      return
    }
    
    // Show the install prompt
    deferredPrompt.prompt()
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null)
  }

  // Always render to debug if component is mounting correctly
  return (
    <Button variant="outline" onClick={handleInstallClick} className="gap-2 shrink-0 h-9 bg-primary text-primary-foreground hover:bg-primary/90">
      <DownloadIcon className="w-4 h-4" />
      <span className="hidden sm:inline">Download App</span>
    </Button>
  )
}
