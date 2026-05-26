"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createBooking } from "@/lib/actions/booking";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Calendar,
  Users,
  CreditCard,
  User,
  Mail,
  Phone,
  MessageSquare,
  Loader2,
  Shield,
  Check,
  Lock,
  ChevronLeft,
  Clock,
  MapPin,
} from "lucide-react";
import Link from "next/link";

type CheckoutProps = {
  propertyId: string;
  propertyName: string;
  propertySlug: string;
  propertyCity: string;
  propertyCountry: string;
  propertyImage: string | null;
  cancellationPolicy: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  roomTypeId: string;
  roomTypeName: string;
  roomCategory: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nightlyRates: { date: string; rate: number }[];
  totalPrice: number;
  userName: string | null;
  userEmail: string | null;
};

type Step = "stay_guest" | "payment";

export function CheckoutForm(props: CheckoutProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<Step>("stay_guest");
  const [error, setError] = useState<string | null>(null);

  // Guest details form
  const [guestName, setGuestName] = useState(props.userName || "");
  const [guestEmail, setGuestEmail] = useState(props.userEmail || "");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Promo code
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Payment form (simulated)
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState(props.userName || "");

  const nights = Math.ceil(
    (new Date(props.checkOut).getTime() - new Date(props.checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const subtotal = props.totalPrice;
  const taxes = Math.round(subtotal * 0.12 * 100) / 100;
  const fees = 25;
  const total = subtotal + taxes + fees - promoDiscount;

  const steps: { key: Step; label: string; number: number }[] = [
    { key: "stay_guest", label: "Stay & guest", number: 1 },
    { key: "payment", label: "Payment", number: 2 },
  ];

  function handleContinueToPayment() {
    if (!guestName.trim() || !guestEmail.trim()) {
      setError("Name and email are required.");
      return;
    }
    setError(null);
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBackToStayGuest() {
    setStep("stay_guest");
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmitBooking() {
    if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvc.trim()) {
      setError("Please fill in all payment details.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const result = await createBooking({
        propertyId: props.propertyId,
        roomTypeId: props.roomTypeId,
        checkIn: props.checkIn,
        checkOut: props.checkOut,
        adults: props.guests,
        children: 0,
        guestName: guestName.trim(),
        guestEmail: guestEmail.trim(),
        guestPhone: guestPhone.trim(),
        specialRequests: specialRequests.trim(),
      });

      if ("error" in result) {
        setError(result.error!);
      } else {
        router.push(`/bookings/${result.bookingId}/confirmation`);
      }
    });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href={`/properties/${props.propertySlug}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
        data-testid="back-to-property"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to {props.propertyName}
      </Link>

      <h1 className="text-2xl font-bold text-foreground" data-testid="checkout-title">
        Complete your booking
      </h1>

      {/* Step Indicator */}
      <div className="mt-6 flex items-center gap-2" data-testid="checkout-steps">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                step === s.key
                  ? "bg-accent text-accent-foreground"
                  : steps.findIndex((st) => st.key === step) > i
                  ? "bg-accent/20 text-accent"
                  : "bg-secondary text-muted"
              }`}
            >
              {steps.findIndex((st) => st.key === step) > i ? (
                <Check className="h-4 w-4" />
              ) : (
                s.number
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                step === s.key ? "text-foreground" : "text-muted"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div className="mx-2 h-px w-8 bg-border sm:w-16" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Step 1: Stay summary + guest details (merged) */}
          {step === "stay_guest" && (
            <Card data-testid="step-stay-and-guest">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Stay &amp; guest
                </CardTitle>
                <p className="text-sm text-muted">
                  Review your reservation and confirm who&apos;s checking in—all in one
                  step before payment.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property summary */}
                <section data-testid="step-review-summary" className="space-y-4">
                  <div className="flex gap-4">
                    {props.propertyImage && (
                      <img
                        src={props.propertyImage}
                        alt={props.propertyName}
                        className="h-24 w-32 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {props.propertyName}
                      </h3>
                      <p className="flex items-center gap-1 text-sm text-muted">
                        <MapPin className="h-3.5 w-3.5" />
                        {props.propertyCity}, {props.propertyCountry}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="secondary" className="capitalize text-xs">
                          {props.roomCategory}
                        </Badge>
                        <span className="text-sm text-foreground">
                          {props.roomTypeName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 rounded-lg bg-secondary/50 p-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">
                        Check-in
                      </p>
                      <p className="mt-1 font-semibold text-foreground">
                        {formatDate(props.checkIn)}
                      </p>
                      <p className="text-xs text-muted">
                        After {props.checkInTime || "3:00 PM"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">
                        Check-out
                      </p>
                      <p className="mt-1 font-semibold text-foreground">
                        {formatDate(props.checkOut)}
                      </p>
                      <p className="text-xs text-muted">
                        Before {props.checkOutTime || "11:00 AM"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">
                        Guests
                      </p>
                      <p className="mt-1 font-semibold text-foreground">
                        {props.guests} guest{props.guests !== 1 ? "s" : ""}
                      </p>
                      <p className="text-xs text-muted">
                        {nights} night{nights !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Nightly rate breakdown
                    </p>
                    <div className="mt-2 max-h-40 space-y-1 overflow-y-auto text-sm">
                      {props.nightlyRates.map((nr) => (
                        <div
                          key={nr.date}
                          className="flex justify-between text-muted"
                        >
                          <span>{formatDate(nr.date)}</span>
                          <span>{formatCurrency(nr.rate)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 rounded-lg border border-border p-3">
                    <Shield className="mt-0.5 h-4 w-4 text-accent" />
                    <div>
                      <p className="text-sm font-medium capitalize text-foreground">
                        {props.cancellationPolicy.replace("_", " ")} cancellation
                      </p>
                      <p className="text-xs text-muted">
                        {props.cancellationPolicy === "free"
                          ? "Free cancellation up to 24 hours before check-in."
                          : props.cancellationPolicy === "moderate"
                          ? "Free cancellation up to 5 days before check-in. 50% refund after."
                          : props.cancellationPolicy === "strict"
                          ? "50% refund up to 1 week before check-in. No refund after."
                          : "This reservation is non-refundable."}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border p-3">
                    <p className="mb-2 text-sm font-medium text-foreground">
                      Have a promo or corporate code?
                    </p>
                    <div className="flex gap-2">
                      <Input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1"
                        data-testid="promo-code-input"
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (promoCode.trim()) {
                            setPromoApplied(true);
                            setPromoDiscount(25);
                          }
                        }}
                        disabled={promoApplied}
                        data-testid="apply-promo-code"
                      >
                        {promoApplied ? "Applied" : "Apply"}
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="mt-1 text-xs text-accent" data-testid="promo-success">
                        Code applied! ${promoDiscount} discount.
                      </p>
                    )}
                  </div>
                </section>

                <hr className="border-border" />

                {/* Guest details */}
                <section data-testid="step-guest-fields" className="space-y-4">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <User className="h-5 w-5 text-accent" />
                    Guest contact
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <Input
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="John Doe"
                          className="pl-10"
                          data-testid="guest-name-input"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <Input
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="pl-10"
                          data-testid="guest-email-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                      <Input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                        data-testid="guest-phone-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Special Requests
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted" />
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Late check-in, extra pillows, dietary needs..."
                        rows={3}
                        className="w-full rounded-lg border border-border bg-secondary/50 py-2 pl-10 pr-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        data-testid="special-requests-input"
                      />
                    </div>
                  </div>
                </section>

                {error && (
                  <p className="text-sm text-destructive" data-testid="details-error">
                    {error}
                  </p>
                )}

                <Button
                  variant="accent"
                  size="lg"
                  className="w-full"
                  onClick={handleContinueToPayment}
                  data-testid="continue-to-payment"
                >
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment */}
          {step === "payment" && (
            <Card data-testid="step-payment">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-accent" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
                  <p className="flex items-center gap-2 text-sm text-foreground">
                    <Lock className="h-4 w-4 text-accent" />
                    Your payment info is secured with SSL encryption
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Name on Card
                  </label>
                  <Input
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    data-testid="card-name-input"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <Input
                      value={cardNumber}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                        setCardNumber(
                          v.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
                        );
                      }}
                      placeholder="4242 4242 4242 4242"
                      className="pl-10"
                      data-testid="card-number-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Expiry Date
                    </label>
                    <Input
                      value={cardExpiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                        if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                        setCardExpiry(v);
                      }}
                      placeholder="MM/YY"
                      data-testid="card-expiry-input"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      CVC
                    </label>
                    <Input
                      value={cardCvc}
                      onChange={(e) =>
                        setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      placeholder="123"
                      data-testid="card-cvc-input"
                    />
                  </div>
                </div>

                <p className="text-xs text-muted">
                  This is a demo app. No real charges will be made. Use any card
                  number.
                </p>

                {error && (
                  <p className="text-sm text-destructive" data-testid="payment-error">
                    {error}
                  </p>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleBackToStayGuest}
                    data-testid="back-to-stay-guest"
                  >
                    Back
                  </Button>
                  <Button
                    variant="accent"
                    size="lg"
                    className="flex-1"
                    onClick={handleSubmitBooking}
                    disabled={isPending}
                    data-testid="submit-booking"
                  >
                    {isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Lock className="mr-2 h-4 w-4" />
                    )}
                    {isPending
                      ? "Processing..."
                      : `Pay ${formatCurrency(total)}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Price Summary Sidebar */}
        <div>
          <Card className="sticky top-20 border-accent/20">
            <CardHeader>
              <CardTitle className="text-lg">Price Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                {props.propertyImage && (
                  <img
                    src={props.propertyImage}
                    alt={props.propertyName}
                    className="h-16 w-20 rounded-lg object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-foreground">
                    {props.propertyName}
                  </p>
                  <p className="text-xs text-muted">{props.roomTypeName}</p>
                </div>
              </div>

              <hr className="border-border" />

              <div className="flex items-center gap-2 text-muted">
                <Calendar className="h-4 w-4" />
                {formatDate(props.checkIn)} — {formatDate(props.checkOut)}
              </div>
              <div className="flex items-center gap-2 text-muted">
                <Clock className="h-4 w-4" />
                {nights} night{nights !== 1 ? "s" : ""}
              </div>
              <div className="flex items-center gap-2 text-muted">
                <Users className="h-4 w-4" />
                {props.guests} guest{props.guests !== 1 ? "s" : ""}
              </div>

              <hr className="border-border" />

              <div className="flex justify-between">
                <span className="text-muted">
                  Room ({nights} night{nights !== 1 ? "s" : ""})
                </span>
                <span className="text-foreground">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Taxes (12%)</span>
                <span className="text-foreground">
                  {formatCurrency(taxes)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Service fee</span>
                <span className="text-foreground">{formatCurrency(fees)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-accent">
                  <span>Promo discount</span>
                  <span>-{formatCurrency(promoDiscount)}</span>
                </div>
              )}

              <hr className="border-border" />

              <div
                className="flex justify-between text-base font-bold"
                data-testid="checkout-total"
              >
                <span className="text-foreground">Total</span>
                <span className="text-accent">{formatCurrency(total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
