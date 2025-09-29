import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  services: string[];
  times: string[];
  telehealthAvailable?: boolean;
};

const MOCK_DOCTORS: Doctor[] = [
  { id: "1", name: "Dr. Anna Patel", specialty: "GP", services: ["General Consultation", "Telehealth Appointment"], times: ["Morning", "Afternoon"], telehealthAvailable: true },
  { id: "2", name: "Dr. Miguel Santos", specialty: "Cardiologist", services: ["General Consultation"], times: ["Afternoon", "Evening"] },
  { id: "3", name: "Dr. Lila Chen", specialty: "Dentist", services: ["General Consultation", "Vaccination"], times: ["Morning"] },
  { id: "4", name: "Dr. Omar Khan", specialty: "Psychologist", services: ["Telehealth Appointment"], times: ["Evening"], telehealthAvailable: true },
  { id: "5", name: "Dr. Emma Reed", specialty: "GP", services: ["General Consultation", "Vaccination", "Telehealth Appointment"], times: ["Morning", "Afternoon"], telehealthAvailable: true },
];

export default function DoctorSearch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState( (searchParams.get("doctor") || "") );
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [specialty, setSpecialty] = useState(searchParams.get("specialty") || "");
  const [service, setService] = useState(searchParams.get("service") || "");
  const [times, setTimes] = useState(searchParams.get("times") || "Any");

  useEffect(() => {
    // Keep times default to Any if empty
    if (!searchParams.get("times")) setTimes("Any");
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (doctor.trim()) params.set("doctor", doctor.trim());
    if (date) params.set("date", date);
    if (specialty) params.set("specialty", specialty);
    if (service) params.set("service", service);
    if (times) params.set("times", times);
    navigate({ pathname: "/booking", search: params.toString() });
  };

  const filtered = useMemo(() => {
    const q = doctor.trim().toLowerCase();
    return MOCK_DOCTORS.filter((d) => {
      if (q && !d.name.toLowerCase().includes(q)) return false;
      if (specialty && specialty !== "" && d.specialty !== specialty) return false;
      if (service && service !== "" && !d.services.includes(service)) return false;
      if (times && times !== "Any" && !d.times.includes(times)) return false;
      return true;
    });
  }, [doctor, specialty, service, times]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Doctor Search & Booking</h1>
      <p className="mt-2 text-muted-foreground">Search by any combination of fields. Fields are optional. Results update after you search.</p>

      <Card className="mt-6">
        <CardContent className="p-4 md:p-6">
          <form onSubmit={handleSearch} aria-label="Doctor search form" className="grid gap-3">
            <div className="grid gap-2">
              <label htmlFor="doctor" className="text-sm font-medium">Doctor name</label>
              <Input id="doctor" name="doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="e.g. Dr. Smith" aria-label="Doctor name" />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="grid gap-2">
                <label htmlFor="date" className="text-sm font-medium">Date</label>
                <input id="date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-11 rounded-md border border-input bg-background px-3" aria-label="Choose a date" />
              </div>

              <div className="grid gap-2">
                <label htmlFor="specialty" className="text-sm font-medium">Specialty</label>
                <select id="specialty" name="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="h-11 rounded-md border border-input bg-background px-3" aria-label="Choose a specialty">
                  <option value="">-- Any --</option>
                  <option>Cardiologist</option>
                  <option>GP</option>
                  <option>Dentist</option>
                  <option>Psychologist</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="grid gap-2">
                <label htmlFor="service" className="text-sm font-medium">Service</label>
                <select id="service" name="service" value={service} onChange={(e) => setService(e.target.value)} className="h-11 rounded-md border border-input bg-background px-3" aria-label="Choose a service">
                  <option value="">-- Any --</option>
                  <option>General Consultation</option>
                  <option>Vaccination</option>
                  <option>Telehealth Appointment</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label htmlFor="times" className="text-sm font-medium">Preferred Time</label>
                <select id="times" name="times" value={times} onChange={(e) => setTimes(e.target.value)} className="h-11 rounded-md border border-input bg-background px-3" aria-label="Choose a preferred time">
                  <option>Any</option>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <Button onClick={handleSearch} className="h-12 px-6 w-full md:w-auto" aria-label="Search Doctors">Search Doctors</Button>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">10% discount applies automatically for 3+ telehealth sessions.</p>
          </form>
        </CardContent>
      </Card>

      <section aria-live="polite" className="mt-6">
        <h2 className="text-xl font-semibold">Results</h2>
        <p className="text-sm text-muted-foreground">Showing {filtered.length} doctor{filtered.length !== 1 ? "s" : ""} based on your filters.</p>

        <div className="mt-4 grid gap-3">
          {filtered.map((d) => (
            <Card key={d.id} className="shadow-sm">
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{d.name}</h3>
                  <p className="text-sm text-muted-foreground">{d.specialty} • {d.services.join(", ")}</p>
                </div>
                <div className="mt-3 sm:mt-0 flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Available: {d.times.join(", ")}</span>
                  <Button asChild>
                    <a className="h-10 px-4" href={`/confirm?doctor=${encodeURIComponent(d.name)}&specialty=${encodeURIComponent(d.specialty)}&service=${encodeURIComponent(d.services[0])}&date=${encodeURIComponent(date)}&times=${encodeURIComponent(times)}`}>Book</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
