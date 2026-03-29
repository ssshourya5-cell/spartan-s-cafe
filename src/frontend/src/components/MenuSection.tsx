import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";

interface MenuItem {
  name: string;
  price: number;
  isVeg: boolean;
}

interface MenuCategory {
  veg: MenuItem[];
  nonVeg: MenuItem[];
  image: string;
}

const menuData: Record<string, MenuCategory> = {
  Pizza: {
    image: "/assets/generated/pizza-hero.dim_800x600.jpg",
    veg: [
      { name: "Onion / Tomato / Capsicum / Corn", price: 190, isVeg: true },
      { name: "Veg 5 Star Pizza", price: 190, isVeg: true },
      { name: "Paneer 5 Star Pizza", price: 220, isVeg: true },
      { name: "Pepper & Cream 5 Star Pizza", price: 220, isVeg: true },
      { name: "Pepper & Cream Paneer 5 Star", price: 250, isVeg: true },
      { name: "Farmhouse Pizza", price: 280, isVeg: true },
      { name: "Chilli Paneer Pizza", price: 300, isVeg: true },
      { name: "Paneer Makhani Pizza", price: 300, isVeg: true },
      { name: "Paneer Tandoori Pizza", price: 300, isVeg: true },
      { name: "Mushroom Makhani Pizza", price: 300, isVeg: true },
      { name: "Mushroom Tandoori Pizza", price: 300, isVeg: true },
      { name: "Peri Peri Veg Pizza", price: 300, isVeg: true },
    ],
    nonVeg: [
      { name: "Grill Chicken Pizza", price: 220, isVeg: false },
      { name: "Fried Chicken Pizza", price: 240, isVeg: false },
      { name: "Chilli Chicken Pizza", price: 320, isVeg: false },
      { name: "Tandoori Chicken Pizza", price: 320, isVeg: false },
      { name: "Grilled Chicken Pizza", price: 300, isVeg: false },
      { name: "Pepper & Cream Chicken Pizza", price: 250, isVeg: false },
      { name: "Farmhouse Non-Veg Pizza", price: 290, isVeg: false },
      { name: "Peri Peri Chicken Pizza", price: 300, isVeg: false },
    ],
  },
  Pasta: {
    image: "/assets/generated/pasta-hero.dim_800x600.jpg",
    veg: [
      { name: "White Sauce Pasta", price: 200, isVeg: true },
      { name: "Red Sauce Pasta", price: 200, isVeg: true },
    ],
    nonVeg: [
      { name: "Pasta Chicken White Sauce", price: 220, isVeg: false },
      { name: "Pasta Chicken Red Sauce", price: 230, isVeg: false },
    ],
  },
  Noodles: {
    image: "/assets/generated/noodles-hero.dim_800x600.jpg",
    veg: [
      { name: "Chilli Garlic Noodles (for 2)", price: 150, isVeg: true },
      { name: "Singapore Noodles (for 2)", price: 150, isVeg: true },
      { name: "Chilli Mushroom (for 2)", price: 150, isVeg: true },
      { name: "Tandoori Veg Noodles (for 2)", price: 150, isVeg: true },
    ],
    nonVeg: [
      { name: "Non Veg Singapore Noodles", price: 150, isVeg: false },
      { name: "Tandoori Non Veg Noodles", price: 160, isVeg: false },
      { name: "Chilli Garlic Chicken Noodles", price: 150, isVeg: false },
    ],
  },
  Burgers: {
    image: "/assets/generated/burger-hero.dim_800x600.jpg",
    veg: [
      { name: "Spartans Veg Burger", price: 50, isVeg: true },
      { name: "Pepper & Garlic Burger", price: 60, isVeg: true },
      { name: "Paneer Burger", price: 60, isVeg: true },
      { name: "Cheese Burger", price: 60, isVeg: true },
      { name: "Hot & Spicy Burger", price: 60, isVeg: true },
      { name: "Hot & Spicy Paneer Burger", price: 70, isVeg: true },
      { name: "Hot & Spicy Cheese Burger", price: 70, isVeg: true },
      { name: "Pepper & Garlic Paneer", price: 70, isVeg: true },
      { name: "Pepper & Garlic Cheese", price: 70, isVeg: true },
      { name: "Hot & Spicy Paneer & Cheese", price: 80, isVeg: true },
      { name: "Pepper & Garlic Paneer & Cheese", price: 80, isVeg: true },
      { name: "Plain Paneer King Burger", price: 100, isVeg: true },
      { name: "Hot & Spicy Paneer King Burger", price: 110, isVeg: true },
      { name: "Pepper & Garlic Paneer King Burger", price: 110, isVeg: true },
    ],
    nonVeg: [
      { name: "Hot & Spicy Chicken Plain Burger", price: 90, isVeg: false },
      { name: "Hot & Spicy Chicken Cheese Burger", price: 100, isVeg: false },
      { name: "Chicken Tandoori Plain Burger", price: 90, isVeg: false },
      { name: "Chicken Tandoori Cheese", price: 100, isVeg: false },
      { name: "Pepper & Garlic Chicken Plain", price: 90, isVeg: false },
      { name: "Pepper & Garlic Chicken Cheese", price: 100, isVeg: false },
    ],
  },
};

const categoryIcons: Record<string, string> = {
  Pizza: "🍕",
  Pasta: "🍝",
  Noodles: "🍜",
  Burgers: "🍔",
};

function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
      data-ocid={`menu.item.${index + 1}`}
    >
      <div className="card-hover flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-primary/40 group">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
              item.isVeg ? "border-green-500" : "border-red-500"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full m-0.5 ${
                item.isVeg ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </div>
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            {item.name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gold font-bold text-sm">₹{item.price}</span>
          <a href="tel:+9108445605336">
            <button
              type="button"
              className="text-xs bg-transparent border border-primary/40 text-primary px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              Order
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MenuSection() {
  return (
    <section
      className="min-h-screen pt-24 pb-16 px-4 page-enter"
      data-ocid="menu.section"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">
            What We Serve
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-black text-foreground mb-4">
            Our Menu
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        <Tabs defaultValue="Pizza" className="w-full">
          <TabsList
            className="grid grid-cols-4 w-full mb-8 bg-card border border-border"
            data-ocid="menu.category.tab"
          >
            {Object.keys(menuData).map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="text-xs tracking-widest data-[state=active]:text-primary-foreground data-[state=active]:bg-primary"
              >
                <span className="mr-1">{categoryIcons[cat]}</span>
                <span className="hidden sm:inline">{cat.toUpperCase()}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(menuData).map(([cat, data]) => (
            <TabsContent key={cat} value={cat}>
              {/* Category Image Banner */}
              <div className="relative h-48 rounded-xl overflow-hidden mb-8">
                <img
                  src={data.image}
                  alt={cat}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
                <div className="absolute left-6 bottom-6">
                  <h3 className="font-display text-4xl font-black text-primary">
                    {categoryIcons[cat]} {cat}
                  </h3>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Veg */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full border-2 border-green-500 flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full m-0.5 bg-green-500" />
                    </div>
                    <h4 className="text-sm font-semibold tracking-widest text-green-400 uppercase">
                      Vegetarian
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {data.veg.map((item, i) => (
                      <MenuItemCard key={item.name} item={item} index={i} />
                    ))}
                  </div>
                </div>

                {/* Non-Veg */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full border-2 border-red-500 flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full m-0.5 bg-red-500" />
                    </div>
                    <h4 className="text-sm font-semibold tracking-widest text-red-400 uppercase">
                      Non-Vegetarian
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {data.nonVeg.map((item, i) => (
                      <MenuItemCard
                        key={item.name}
                        item={item}
                        index={i + 50}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Order CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Want to place an order? Call us directly!
          </p>
          <a href="tel:+9108445605336">
            <button
              type="button"
              className="gold-gradient text-background font-bold px-8 py-3 rounded-full text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
              data-ocid="menu.order.button"
            >
              📞 Call to Order: +91-08445605336
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
