import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id") || "";
  const doctor = searchParams.get("doctor") || "";
  const service = searchParams.get("service") || "";
  const date = searchParams.get("date") || "";
  const times = searchParams.get("times") || "";
  const total = searchParams.get("total") || "";
  const email = searchParams.get("email") || "";

  const handleCalendar = () => {
    const start = date || new Date().toISOString().split("T")[0];
    const title = `Appointment with ${doctor}`;
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:${id}\nSUMMARY:${title}\nDTSTART;VALUE=DATE:${start.replace(/-/g,"")}\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `booking-${id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    const receipt = `Booking ID: ${id}\nDoctor: ${doctor}\nService: ${service}\nDate: ${date}\nTime: ${times}\nTotal paid: $${Number(total).toFixed(2)}\n`;
    const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Booking confirmed 🎉</h1>
      <p className="mt-2 text-muted-foreground">We've emailed your confirmation and receipt to {email || "your email"}.</p>

      <Card className="mt-6">
        <CardContent className="p-4 md:p-6">
          <h2 className="text-xl font-semibold">Summary</h2>
          <div className="mt-3 grid gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Doctor</span>
              <span>{doctor}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Service</span>
              <span>{service}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Date</span>
              <span>{date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Time</span>
              <span>{times}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Booking ID</span>
              <span className="font-mono text-sm">{id}</span>
            </div>
            <div className="flex items-center justify-between mt-3 font-semibold text-lg">
              <span>Total paid</span>
              <span>{total ? `$${Number(total).toFixed(2)}` : "—"}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button onClick={handleCalendar} className="h-12">Add to calendar</Button>
            <Button onClick={handleDownload} variant="outline" className="h-12">Download receipt (TXT)</Button>
            <Button asChild variant="ghost" className="h-12">
              <a href="/booking">Book another appointment</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
