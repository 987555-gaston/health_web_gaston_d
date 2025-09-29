import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  age: z.coerce.number().int().min(0).max(120),
  contact: z.string().min(5, "Enter a valid contact (email or phone)"),
  emergencyContact: z.string().min(5, "Enter an emergency contact"),
  username: z.string().min(3, "Choose a username"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include an uppercase letter")
    .regex(/[0-9]/, "Include a number"),
  securityQuestion: z.string().min(1, "Select a question"),
  securityAnswer: z.string().min(2, "Provide an answer"),
  cardNumber: z.string().regex(/^\d{16}$/, "Enter a 16-digit card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/(\d{2})$/, "MM/YY"),
  cvc: z.string().regex(/^\d{3,4}$/, "3 or 4 digits"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
  tipsOptIn: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { tipsOptIn: false },
  });

  const onSubmit = (values: FormValues) => {
    // Prototype: just show a confirmation; real apps would call an API
    alert(
      `Welcome, ${values.fullName}! Your $10 joining fee will be processed securely.`,
    );
  };

  const tips = watch("tipsOptIn");

  return (
    <div className="bg-gradient-to-b from-white to-slate-50 py-10">
      <div className="container max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          New Patient Registration
        </h1>
        <p className="mt-2 text-muted-foreground">
          Join HealthyLife for $10 and book secure, accessible appointments.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid gap-6"
          aria-describedby="form-instructions"
        >
          <p id="form-instructions" className="text-sm text-muted-foreground">
            All fields marked * are required. Use Tab to move between fields.
          </p>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Your Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Full Name *" error={errors.fullName?.message}>
                  <Input
                    aria-label="Full name"
                    {...register("fullName")}
                    autoComplete="name"
                    inputMode="text"
                  />
                </Field>
                <Field label="Age *" error={errors.age?.message}>
                  <Input
                    aria-label="Age"
                    type="number"
                    min={0}
                    max={120}
                    {...register("age")}
                    inputMode="numeric"
                  />
                </Field>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field
                  label="Contact (email or phone) *"
                  error={errors.contact?.message}
                  hint="We use this to confirm bookings."
                >
                  <Input
                    aria-label="Contact"
                    {...register("contact")}
                    autoComplete="email"
                  />
                </Field>
                <Field
                  label="Emergency Contact *"
                  error={errors.emergencyContact?.message}
                >
                  <Input
                    aria-label="Emergency contact"
                    {...register("emergencyContact")}
                  />
                </Field>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Account Security</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Username *" error={errors.username?.message}>
                  <Input
                    aria-label="Username"
                    {...register("username")}
                    autoComplete="username"
                  />
                </Field>
                <Field
                  label="Password *"
                  error={errors.password?.message}
                  hint="At least 8 characters, include a number and uppercase letter."
                >
                  <Input
                    aria-label="Password"
                    type="password"
                    {...register("password")}
                    autoComplete="new-password"
                  />
                </Field>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="securityQuestion">Security Question *</Label>
                  <Select
                    onValueChange={(v) =>
                      setValue("securityQuestion", v, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger
                      id="securityQuestion"
                      aria-label="Select a security question"
                    >
                      <SelectValue placeholder="Select a question" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pet">
                        What was the name of your first pet?
                      </SelectItem>
                      <SelectItem value="street">
                        What is the street you grew up on?
                      </SelectItem>
                      <SelectItem value="teacher">
                        Who was your favorite teacher?
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.securityQuestion && (
                    <ErrorText>{errors.securityQuestion.message}</ErrorText>
                  )}
                </div>
                <Field label="Answer *" error={errors.securityAnswer?.message}>
                  <Input
                    aria-label="Security answer"
                    {...register("securityAnswer")}
                  />
                </Field>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">
                Payment · $10 Joining Fee
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="sr-only">Secure payment</span>
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-primary"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 8V7a5 5 0 0 0-10 0v1H5v12h14V8ZM9 7a3 3 0 0 1 6 0v1H9Zm9 5H6v6h12Z" />
                </svg>
                Processed securely. We do not store full card numbers.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <Field label="Card Number *" error={errors.cardNumber?.message}>
                  <Input
                    aria-label="Card number"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    {...register("cardNumber")}
                  />
                </Field>
                <Field label="Expiry (MM/YY) *" error={errors.expiry?.message}>
                  <Input
                    aria-label="Expiry"
                    placeholder="MM/YY"
                    {...register("expiry")}
                  />
                </Field>
                <Field label="CVC *" error={errors.cvc?.message}>
                  <Input
                    aria-label="CVC"
                    inputMode="numeric"
                    maxLength={4}
                    {...register("cvc")}
                  />
                </Field>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                onCheckedChange={(v) =>
                  setValue("consent", Boolean(v), { shouldValidate: true })
                }
              />
              <div className="grid gap-1.5">
                <Label htmlFor="consent" className="font-medium">
                  I consent to secure storage of my data *
                </Label>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and used only for your care. You can
                  request deletion anytime.
                </p>
                {errors.consent && (
                  <ErrorText>{errors.consent.message}</ErrorText>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="tipsOptIn"
                checked={!!tips}
                onCheckedChange={(v) => setValue("tipsOptIn", Boolean(v))}
              />
              <div className="grid gap-1.5">
                <Label htmlFor="tipsOptIn" className="font-medium">
                  Send me health tips & reminders (optional)
                </Label>
                <p className="text-sm text-muted-foreground">
                  We’ll send occasional, relevant tips. You can opt out anytime.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button type="submit" className="text-base h-12 px-6">
              Pay $10 & Create Account
            </Button>
            <Button asChild variant="outline" className="h-12">
              <a href="/login" aria-label="Already have an account? Log in">
                Already have an account? Log in
              </a>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-sm text-destructive">
      {children}
    </p>
  );
}
