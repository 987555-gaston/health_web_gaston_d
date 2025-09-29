import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MainLayout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-primary text-primary-foreground px-3 py-2 rounded-md">Skip to content</a>
      <header className="w-full border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="HealthyLife Community Clinic Home">
            <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center" aria-hidden="true">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-primary"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-4H7v-2h4V7h2v4h4v2h-4Z"/></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-none">HealthyLife</span>
              <span className="text-xs text-muted-foreground leading-none">Community Clinic</span>
            </div>
          </Link>
          <nav aria-label="Main" className="flex items-center gap-2">
            <NavLink to="/" active={isActive("/")}>Home</NavLink>
            <NavLink to="/register" active={isActive("/register")}>Register</NavLink>
            <NavLink to="/login" active={isActive("/login")}>Login</NavLink>
            <NavLink to="/booking" active={isActive("/booking")}>Find a Doctor</NavLink>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="container mx-auto py-8 grid gap-4 md:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">About</h2>
            <p className="text-sm mt-2 max-w-sm">Patient-first care with accessible, secure, and ethical design. We never sell your data.</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">Security</h2>
            <p className="text-sm mt-2 flex items-start gap-2"><span className="sr-only">Secure payment</span><svg aria-hidden="true" className="mt-0.5 h-4 w-4 text-primary" viewBox="0 0 24 24"><path d="M17 8V7a5 5 0 0 0-10 0v1H5v12h14V8ZM9 7a3 3 0 0 1 6 0v1H9Zm9 5H6v6h12Z"/></svg>Secure payments and encrypted data storage.</p>
          </div>
          <div className="flex items-center md:justify-end">
            <Button asChild className="text-sm" aria-label="Book an appointment">
              <Link to="/booking">Book an appointment</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Button asChild variant={active ? "default" : "ghost"} size="sm" className={cn("text-sm", active ? "" : "text-foreground")}> 
      <Link to={to}>{children}</Link>
    </Button>
  );
}
