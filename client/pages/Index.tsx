import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="bg-white">
      <section className="container grid lg:grid-cols-2 gap-8 items-center py-12 md:py-20">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full" aria-label="Accessible and secure design">
            <span className="sr-only">Badge:</span>
            Accessible • Secure • Ethical
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            HealthyLife Community Clinic
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-prose">
            Book in-person or telehealth appointments with a simple, accessible experience designed for everyone. High-contrast, big buttons, clear labels, and secure payments.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
            <Button asChild size="lg" className="text-base h-12 px-6 w-full sm:w-auto" aria-label="Register as a new patient">
              <Link to="/register">New Patient Registration</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 w-full sm:w-auto" aria-label="Log in as existing patient">
              <Link to="/login">Existing Patient Login</Link>
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Telehealth bundle: 10% off when booking 3+ sessions.</p>
        </div>
        <div>
          <Card className="shadow-sm">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-xl font-semibold">Quick Booking</h2>
              <p className="mt-2 text-sm text-muted-foreground">Find a doctor by date, specialty or service.</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="date">Date</label>
                  <input id="date" type="date" className="h-11 rounded-md border border-input bg-background px-3" aria-label="Choose a date" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="specialty">Specialty</label>
                  <select id="specialty" className="h-11 rounded-md border border-input bg-background px-3" aria-label="Choose a specialty">
                    <option>Any</option>
                    <option>General Practice</option>
                    <option>Pediatrics</option>
                    <option>Vaccination</option>
                    <option>Telehealth</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="service">Service</label>
                  <select id="service" className="h-11 rounded-md border border-input bg-background px-3" aria-label="Choose a service">
                    <option>Consultation</option>
                    <option>Vaccination</option>
                    <option>Telehealth</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="times">Preferred Time</label>
                  <select id="times" className="h-11 rounded-md border border-input bg-background px-3" aria-label="Choose a preferred time">
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <Button asChild className="h-12 px-6 text-base" aria-label="Search for doctors">
                  <Link to="/booking">Search Doctors</Link>
                </Button>
                <Button asChild variant="ghost" className="h-12" aria-label="Learn about discounts">
                  <Link to="/booking">See discount details</Link>
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">All icons include alt text; site supports keyboard navigation.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-8">
        <div className="mx-auto relative w-full flex justify-center">
          <img src="https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Doctor speaking with an elderly patient" loading="lazy" className="mx-auto w-full max-w-5xl h-96 object-cover rounded-md shadow-md" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="bg-black/45 px-6 py-4 rounded-md text-center max-w-3xl w-full sm:w-auto mx-auto">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">You're in safe hands</h3>
              <p className="mt-2 text-sm sm:text-base text-white/90">Compassionate, secure care — clear consent, encrypted records, and respectful treatment for every patient.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-t">
        <div className="container py-10 grid gap-6 md:grid-cols-3">
          <Feature title="Secure & Private" description="Encrypted data, transparent consent, and secure payments.">
            <svg aria-hidden="true" className="h-6 w-6 text-primary" viewBox="0 0 24 24"><path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5Zm1 16h-2v-2h2Zm0-4h-2V7h2Z"/></svg>
          </Feature>
          <Feature title="Accessible by Design" description="High contrast, large text, clear labels, and keyboard-friendly." >
            <svg aria-hidden="true" className="h-6 w-6 text-primary" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 15h2v2h-2Zm1-13a3 3 0 0 1 3 3c0 2-3 1.75-3 5h-2c0-3.5 3-3 3-5a1 1 0 1 0-2 0H8a4 4 0 0 1 4-4Z"/></svg>
          </Feature>
          <Feature title="Inclusive Booking" description="Simple forms, big buttons, and phone or in-person support.">
            <svg aria-hidden="true" className="h-6 w-6 text-primary" viewBox="0 0 24 24"><path d="M16 11a4 4 0 1 0-5 3.87V22h2v-7.13A4 4 0 0 0 16 11ZM6 8H2v2h4v8h2V4H6Z"/></svg>
          </Feature>
        </div>
      </section>
    </div>
  );
}

function Feature({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1" aria-hidden="true">{children}</div>
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
