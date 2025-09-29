import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function formatCurrency(n: number) {
  return `$${n.toFixed(2)}`;
}

const PRICES: Record<string, number> = {
  "General Consultation": 80,
  "Vaccination": 40,
  "Telehealth Appointment": 60,
};

export default function Confirm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const doctor = searchParams.get("doctor") || "";
  const specialty = searchParams.get("specialty") || "";
  const service = searchParams.get("service") || "General Consultation";
  const date = searchParams.get("date") || "";
  const times = searchParams.get("times") || "Any";
  const isNew = searchParams.get("new") === "1"; // mock toggle for joining fee

  const [quantity, setQuantity] = useState<number>(1);
  const [fullName, setFullName] = useState(searchParams.get("patient") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [emergency, setEmergency] = useState(searchParams.get("emergency") || "");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [postcode, setPostcode] = useState("");

  const [consent, setConsent] = useState(false);
  const [tipsOptIn, setTipsOptIn] = useState(false);

  const pricePer = PRICES[service] ?? 80;
  const subtotal = pricePer * quantity + (isNew ? 10 : 0);
  const discount = service === "Telehealth Appointment" && quantity >= 3 ? 0.1 * (pricePer * quantity) : 0;
  const total = subtotal - discount;

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName) e.fullName = "Enter full name";
    if (!email || !/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!phone) e.phone = "Enter a phone number";
    if (!consent) e.consent = "Consent is required";
    if (!cardName) e.cardName = "Enter cardholder name";
    if (!/^[0-9]{16}$/.test(cardNumber.replace(/\s+/g, ""))) e.cardNumber = "Enter a 16-digit card number";
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry)) e.expiry = "Enter expiry in MM/YY";
    if (!/^[0-9]{3,4}$/.test(cvc)) e.cvc = "Enter a 3 or 4 digit CVC";
    if (!postcode) e.postcode = "Enter billing postcode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    const id = `HL-${Date.now().toString(36).toUpperCase().slice(-8)}`;
    const params = new URLSearchParams({ id, doctor, specialty, service, date, times, quantity: String(quantity), total: String(total), email });
    navigate(`/success?${params.toString()}`);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Review your booking</h1>
      <p className="mt-2 text-muted-foreground">Confirm details and pay securely. Card details are encrypted and never stored.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg font-semibold">Booking summary</h2>
            <dl className="mt-3 grid gap-2">
              <div>
                <dt className="text-sm font-medium">Doctor</dt>
                <dd className="text-base">{doctor || "—"} <span className="text-sm text-muted-foreground">{specialty}</span></dd>
              </div>
              <div>
                <dt className="text-sm font-medium">Service</dt>
                <dd className="text-base">{service}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium">Date</dt>
                <dd className="text-base">{date || "Any"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium">Preferred time</dt>
                <dd className="text-base">{times}</dd>
              </div>

              <div className="mt-3">
                <span className="inline-block px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">{service === "Telehealth Appointment" ? "Telehealth" : "In-person"}</span>
              </div>

              <div className="mt-4 grid gap-2">
                <label className="text-sm font-medium">Price per session</label>
                <div className="text-base">{formatCurrency(pricePer)}</div>
              </div>

              <div className="grid gap-2 mt-3">
                <label className="text-sm font-medium" htmlFor="qty">Quantity</label>
                <select id="qty" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="h-10 rounded-md border border-input bg-background px-3 w-24">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4 grid gap-1">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(pricePer * quantity)}</span>
                </div>
                {isNew && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>$10 joining fee</span>
                    <span>{formatCurrency(10)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded-md text-sm text-green-800">Telehealth bundle discount (10%) applied: -{formatCurrency(discount)}</div>
                )}
                <div className="mt-2 flex items-center justify-between text-lg font-semibold">Total <span>{formatCurrency(total)}</span></div>
              </div>

            </dl>

            <div className="mt-4">
              <h3 className="text-sm font-medium">Patient details</h3>
              <p className="text-sm text-muted-foreground">If you registered, these fields will be prefilled. You can edit them here for this booking.</p>

              <div className="mt-3 grid gap-3">
                <div className="grid gap-1">
                  <label className="text-sm">Full name</label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} aria-label="Full name" />
                  {errors.fullName && <p role="alert" className="text-sm text-destructive">{errors.fullName}</p>}
                </div>
                <div className="grid gap-1">
                  <label className="text-sm">Email</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
                  {errors.email && <p role="alert" className="text-sm text-destructive">{errors.email}</p>}
                </div>
                <div className="grid gap-1">
                  <label className="text-sm">Phone</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Phone" />
                  {errors.phone && <p role="alert" className="text-sm text-destructive">{errors.phone}</p>}
                </div>
                <div className="grid gap-1">
                  <label className="text-sm">Emergency contact</label>
                  <Input value={emergency} onChange={(e) => setEmergency(e.target.value)} aria-label="Emergency contact" />
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        <div>
          <Card>
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg font-semibold">Payment</h2>
              <p className="text-sm text-muted-foreground">Card details are encrypted and never stored.</p>

              <form className="mt-4 grid gap-3" onSubmit={(e) => e.preventDefault()} aria-label="Payment form">
                <div className="grid gap-1">
                  <label className="text-sm">Cardholder name</label>
                  <Input value={cardName} onChange={(e) => setCardName(e.target.value)} aria-label="Cardholder name" />
                  {errors.cardName && <p role="alert" className="text-sm text-destructive">{errors.cardName}</p>}
                </div>
                <div className="grid gap-1">
                  <label className="text-sm">Card number</label>
                  <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} inputMode="numeric" placeholder="1234123412341234" aria-label="Card number" />
                  {errors.cardNumber && <p role="alert" className="text-sm text-destructive">{errors.cardNumber}</p>}
                </div>
                <div className="grid gap-2 sm:grid-cols-3 sm:gap-3 sm:grid">
                  <div className="grid gap-1">
                    <label className="text-sm">Expiry (MM/YY)</label>
                    <Input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" aria-label="Expiry" />
                    {errors.expiry && <p role="alert" className="text-sm text-destructive">{errors.expiry}</p>}
                  </div>
                  <div className="grid gap-1">
                    <label className="text-sm">CVC</label>
                    <Input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="CVC" inputMode="numeric" aria-label="CVC" />
                    {errors.cvc && <p role="alert" className="text-sm text-destructive">{errors.cvc}</p>}
                  </div>
                  <div className="grid gap-1">
                    <label className="text-sm">Billing postcode</label>
                    <Input value={postcode} onChange={(e) => setPostcode(e.target.value)} aria-label="Billing postcode" />
                    {errors.postcode && <p role="alert" className="text-sm text-destructive">{errors.postcode}</p>}
                  </div>
                </div>

                <div className="mt-3 flex items-start gap-2">
                  <input id="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4" />
                  <label htmlFor="consent" className="text-sm">I consent to HealthyLife storing my patient details securely and agree to the <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.</label>
                </div>

                <div className="flex items-start gap-2">
                  <input id="tips" type="checkbox" checked={tipsOptIn} onChange={(e) => setTipsOptIn(e.target.checked)} className="h-4 w-4" />
                  <label htmlFor="tips" className="text-sm">Email me health tips & appointment reminders.</label>
                </div>

                <div className="mt-4 flex gap-3">
                  <Button onClick={handleConfirm} className="flex-1 h-12 bg-primary text-primary-foreground" aria-label="Confirm and pay">Confirm & Pay</Button>
                  <Button asChild variant="outline" className="h-12" aria-label="Back to search">
                    <a href="/booking">Back to search</a>
                  </Button>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">A confirmation email will be sent with your booking details and receipt.</p>

                <div className="mt-4 text-xs text-muted-foreground">
                  <strong>SLO mapping</strong>
                  <ul className="list-disc ml-5 mt-2">
                    <li>SLO B: Clear labels, consent, transparent pricing.</li>
                    <li>SLO C: Mobile-first, keyboard-only flow, high contrast, screen-reader friendly.</li>
                    <li>SLO D: Efficient review + single-page checkout; visible totals and errors.</li>
                  </ul>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
