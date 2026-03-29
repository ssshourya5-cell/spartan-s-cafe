import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Clock, Loader2, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

export default function ContactSection() {
  const { actor } = useActor();
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    items: "",
  });
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
  });

  const orderMutation = useMutation({
    mutationFn: ({
      name,
      phone,
      items,
    }: { name: string; phone: string; items: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.requestOrderCallback(name, phone, items);
    },
    onSuccess: () => {
      toast.success("Order request received! We'll call you back soon.");
      setOrderForm({ name: "", phone: "", items: "" });
    },
    onError: () =>
      toast.error("Failed to send request. Please call us directly."),
  });

  const bookingMutation = useMutation({
    mutationFn: ({ name, phone, date, time, guests }: typeof bookingForm) => {
      if (!actor) throw new Error("Not connected");
      return actor.bookTable(
        name,
        phone,
        date,
        time,
        BigInt(Number.parseInt(guests) || 2),
      );
    },
    onSuccess: () => {
      toast.success("Table booked! We'll confirm your reservation shortly.");
      setBookingForm({ name: "", phone: "", date: "", time: "", guests: "2" });
    },
    onError: () => toast.error("Booking failed. Please call us to reserve."),
  });

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !orderForm.name.trim() ||
      !orderForm.phone.trim() ||
      !orderForm.items.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    orderMutation.mutate(orderForm);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !bookingForm.name.trim() ||
      !bookingForm.phone.trim() ||
      !bookingForm.date ||
      !bookingForm.time
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    bookingMutation.mutate(bookingForm);
  };

  return (
    <section
      className="min-h-screen pt-24 pb-16 px-4 page-enter"
      data-ocid="contact.section"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-black text-foreground mb-4">
            Contact & Book
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <a
            href="tel:+9108445605336"
            className="block"
            data-ocid="contact.phone.button"
          >
            <div className="card-hover bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Phone className="text-gold mx-auto mb-3" size={28} />
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
                Call Us
              </p>
              <p className="text-gold font-bold">+91-08445605336</p>
              <p className="text-xs text-muted-foreground mt-1">Tap to call</p>
            </div>
          </a>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <MapPin className="text-gold mx-auto mb-3" size={28} />
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
              Address
            </p>
            <p className="text-foreground font-medium text-sm">
              Goula Road, Haripur Bhandeo
            </p>
            <p className="text-muted-foreground text-xs">Uttarakhand 263142</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Clock className="text-gold mx-auto mb-3" size={28} />
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
              Hours
            </p>
            <p className="text-foreground font-medium">10:00 AM – 9:30 PM</p>
            <p className="text-muted-foreground text-xs">Open Daily</p>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Callback Form */}
          <div
            className="bg-card border border-border rounded-xl p-8"
            data-ocid="contact.order.panel"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                <span className="text-background text-lg">🍽️</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Order Callback
                </h3>
                <p className="text-xs text-muted-foreground">
                  We'll call you back to confirm your order
                </p>
              </div>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={orderForm.name}
                onChange={(e) =>
                  setOrderForm((p) => ({ ...p, name: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="contact.order.name.input"
              />
              <Input
                placeholder="Phone Number"
                type="tel"
                value={orderForm.phone}
                onChange={(e) =>
                  setOrderForm((p) => ({ ...p, phone: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="contact.order.phone.input"
              />
              <Textarea
                placeholder="Items you'd like to order (e.g. Paneer Makhani Pizza, 2x Noodles...)"
                value={orderForm.items}
                onChange={(e) =>
                  setOrderForm((p) => ({ ...p, items: e.target.value }))
                }
                className="bg-background border-border min-h-[100px]"
                data-ocid="contact.order.items.textarea"
              />
              <Button
                type="submit"
                disabled={orderMutation.isPending}
                className="gold-gradient text-background font-bold w-full tracking-widest"
                data-ocid="contact.order.submit.button"
              >
                {orderMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <span>REQUEST CALLBACK</span>
                    <ArrowRight className="ml-2" size={16} />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground text-xs">
              <span>Or call directly:</span>
              <a
                href="tel:+9108445605336"
                className="text-gold hover:underline font-semibold"
                data-ocid="contact.order.phone_link.button"
              >
                +91-08445605336
              </a>
            </div>
          </div>

          {/* Table Booking Form */}
          <div
            className="bg-card border border-border rounded-xl p-8"
            data-ocid="contact.booking.panel"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                <span className="text-background text-lg">🍽</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Reserve a Table
                </h3>
                <p className="text-xs text-muted-foreground">
                  Book your table in advance
                </p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={bookingForm.name}
                onChange={(e) =>
                  setBookingForm((p) => ({ ...p, name: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="contact.booking.name.input"
              />
              <Input
                placeholder="Phone Number"
                type="tel"
                value={bookingForm.phone}
                onChange={(e) =>
                  setBookingForm((p) => ({ ...p, phone: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="contact.booking.phone.input"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) =>
                    setBookingForm((p) => ({ ...p, date: e.target.value }))
                  }
                  className="bg-background border-border"
                  data-ocid="contact.booking.date.input"
                />
                <Input
                  type="time"
                  value={bookingForm.time}
                  onChange={(e) =>
                    setBookingForm((p) => ({ ...p, time: e.target.value }))
                  }
                  min="10:00"
                  max="21:30"
                  className="bg-background border-border"
                  data-ocid="contact.booking.time.input"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Number of Guests
                </p>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={bookingForm.guests}
                  onChange={(e) =>
                    setBookingForm((p) => ({ ...p, guests: e.target.value }))
                  }
                  className="bg-background border-border"
                  data-ocid="contact.booking.guests.input"
                />
              </div>
              <Button
                type="submit"
                disabled={bookingMutation.isPending}
                className="gold-gradient text-background font-bold w-full tracking-widest"
                data-ocid="contact.booking.submit.button"
              >
                {bookingMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking...
                  </>
                ) : (
                  <>
                    <span>BOOK TABLE</span>
                    <ArrowRight className="ml-2" size={16} />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground text-xs">
              <span>Or call directly:</span>
              <a
                href="tel:+9108445605336"
                className="text-gold hover:underline font-semibold"
                data-ocid="contact.booking.phone_link.button"
              >
                +91-08445605336
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
