import { createContext, useContext, useState, cloneElement, Children } from 'react'
import { cn } from '@/lib/utils'

const SidebarContext = createContext({ open: true, setOpen: () => {} })

export function SidebarProvider({ children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div className="flex min-h-screen w-full">
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}

export function Sidebar({ className, children }) {
  const { open } = useSidebar()
  return (
    <aside
      className={cn(
        'flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 shrink-0',
        open ? 'w-64' : 'w-0 overflow-hidden',
        'hidden md:flex',
        className
      )}
    >
      {children}
    </aside>
  )
}

export function SidebarInset({ children, className }) {
  return <div className={cn('flex flex-1 flex-col min-w-0', className)}>{children}</div>
}

export function SidebarTrigger({ className }) {
  const { open, setOpen } = useSidebar()
  return (
    <button
      onClick={() => setOpen(!open)}
      className={cn('p-1.5 rounded-md hover:bg-muted transition-colors', className)}
      aria-label="Toggle sidebar"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  )
}

export function SidebarHeader({ className, children }) {
  return <div className={cn('flex flex-col', className)}>{children}</div>
}

export function SidebarContent({ className, children }) {
  return <div className={cn('flex flex-1 flex-col overflow-y-auto py-2', className)}>{children}</div>
}

export function SidebarFooter({ className, children }) {
  return <div className={cn('flex flex-col', className)}>{children}</div>
}

export function SidebarGroup({ className, children }) {
  return <div className={cn('flex flex-col gap-1 py-2', className)}>{children}</div>
}

export function SidebarGroupLabel({ className, children }) {
  return <p className={cn('px-3 py-1 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider', className)}>{children}</p>
}

export function SidebarGroupContent({ children }) {
  return <div>{children}</div>
}

export function SidebarMenu({ children }) {
  return <ul className="flex flex-col gap-0.5">{children}</ul>
}

export function SidebarMenuItem({ children }) {
  return <li>{children}</li>
}

export function SidebarMenuButton({ asChild, isActive, className, children, ...props }) {
  const buttonClass = cn(
    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    isActive && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
    className
  )

  if (asChild) {
    const child = Children.only(children)
    return cloneElement(child, {
      className: cn(buttonClass, child.props.className),
      ...props,
    })
  }

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  )
}

export function SidebarSeparator({ className }) {
  return <div className={cn('mx-3 my-1 h-px bg-sidebar-border', className)} />
}
