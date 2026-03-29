import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const curatedReviews = [
  {
    name: "Rahul Sharma",
    rating: 5,
    comment:
      "Absolutely amazing food and ambiance! The bamboo cabin dining is a unique experience. Must try the Paneer Tandoori Pizza — absolutely delicious!",
    date: "March 2026",
  },
  {
    name: "Priya Negi",
    rating: 5,
    comment:
      "Best restaurant in the area! The umbrella ceiling décor is stunning. Great for family gatherings. The Chilli Chicken Pizza is out of this world.",
    date: "February 2026",
  },
  {
    name: "Vikram Singh",
    rating: 5,
    comment:
      "Visited with friends — we loved the warm, spartan-themed interiors. Burgers are very affordable and tasty. The lantern-lit upper floor is so romantic!",
    date: "January 2026",
  },
  {
    name: "Anjali Rawat",
    rating: 4,
    comment:
      "Cozy atmosphere, very friendly staff, and the noodles for two were hearty and flavorful. Will definitely come back with the whole family!",
    date: "March 2026",
  },
  {
    name: "Deepak Bisht",
    rating: 5,
    comment:
      "The Peri Peri Chicken Pizza is a game changer. Love the vibe of this place — feels like a warrior's feast hall. Top-notch in all of Uttarakhand!",
    date: "February 2026",
  },
];

interface UserReview {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const STORAGE_KEY = "spartan_cafeteria_reviews";

function loadReviews(): UserReview[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveReview(review: UserReview) {
  const reviews = loadReviews();
  reviews.unshift(review);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

function StarRating({
  rating,
  onChange,
  size = 20,
}: { rating: number; onChange?: (r: number) => void; size?: number }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`transition-colors ${
            onChange ? "cursor-pointer" : "cursor-default"
          } ${
            star <= (hover || rating)
              ? "fill-primary text-primary"
              : "text-muted"
          }`}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange?.(star)}
        />
      ))}
    </div>
  );
}

function ReviewCard({ name, rating, comment, date }: UserReview) {
  return (
    <div className="card-hover bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center font-bold text-background mb-2">
            {name[0].toUpperCase()}
          </div>
          <p className="font-semibold text-foreground text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
        <StarRating rating={rating} />
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed italic">
        "{comment}"
      </p>
    </div>
  );
}

export default function ReviewsSection() {
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setUserReviews(loadReviews());
  }, []);

  const allReviews = [...userReviews, ...curatedReviews];

  const avgRating =
    allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      toast.error("Please fill in your name and review.");
      return;
    }
    if (form.rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    setSubmitting(true);
    const newReview: UserReview = {
      name: form.name.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
      date: new Date().toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      }),
    };
    saveReview(newReview);
    setUserReviews(loadReviews());
    setForm({ name: "", rating: 5, comment: "" });
    setSubmitting(false);
    toast.success("Thank you for your review!");
  };

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 page-enter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">
            What Our Guests Say
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-black text-foreground mb-4">
            Reviews
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4" />
          <div className="flex items-center justify-center gap-2">
            <StarRating rating={Math.round(avgRating)} />
            <span className="text-primary font-bold">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-muted-foreground text-sm">
              · {allReviews.length} Review{allReviews.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allReviews.map((review, i) => (
            <div
              key={`${review.name}-${i}`}
              className="page-enter"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <ReviewCard {...review} />
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <div className="max-w-xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Share Your Experience
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              We'd love to hear from you!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                className="bg-background border-border focus:border-primary"
              />
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Your Rating
                </p>
                <StarRating
                  rating={form.rating}
                  onChange={(r) => setForm((p) => ({ ...p, rating: r }))}
                  size={28}
                />
              </div>
              <Textarea
                placeholder="Tell us about your experience..."
                value={form.comment}
                onChange={(e) =>
                  setForm((p) => ({ ...p, comment: e.target.value }))
                }
                className="bg-background border-border focus:border-primary min-h-[100px]"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="gold-gradient text-background font-bold w-full tracking-widest"
              >
                {submitting ? "Submitting..." : "SUBMIT REVIEW"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
