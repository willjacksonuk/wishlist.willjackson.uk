export interface WishlistItem {
  title: string;
  brand?: string;
  description?: string;
  url?: string;
  price?: string;
  priority?: "high" | "medium" | "low";
  image?: string;
}

export const meta = {
  title: "Wishlist 2026",
};

export const wishlist: WishlistItem[] = [
  {
    title: "Diamond Cotton Twill Camp Cap",
    brand: "Finisterre",
    description: "Organic cotton twill camp cap with diamond logo patch in navy",
    url: "https://finisterre.com/products/organic-cotton-diamond-twill-camp-cap-navy",
    price: "£40.00",
    priority: "medium"
  },
  {
    title: "Seat cushions and covers",
    brand: "Safefoam",
    description: "A set of cushions and covers for an Ercol 334 chair",
    url: "https://www.safefoam.co.uk/product/ercol-334-seat-back-cushions-subtle-delaney-green/#SID=70",
    price: "£185.00",
    priority: "medium"
  },
  {
    title: "Nalgene Sustain 1L Wide Mouth Bottle",
    brand: "Finisterre",
    description: "Reusable 1 litre bottle in seafoam blue and mermaid print",
    url: "https://finisterre.com/products/nalgene-sustain-1l-waterbottle-seafoam",
    price: "£25.00",
    priority: "medium"
  },
  {
    title: "Ribbed Sock",
    brand: "Finisterre",
    description: "Wool blend ribbed sock in whichever colour you think is nicest",
    url: "https://finisterre.com/products/wool-blend-ribbed-sock-beeswax",
    price: "£20.00",
    priority: "medium"
  },
  {
    title: "Men's Lifestyle Socks — Dress & Casual",
    brand: "Darn Tough",
    description: "A nice pair of decent socks",
    url: "https://darntough.uk/collections/mens-lifestyle-socks-dress-casual",
    price: "£28.00",
    priority: "medium"
  },
  {
    title: "Good Grips Box Grater",
    brand: "OXO",
    description: "A good box grater",
    url: "https://www.johnlewis.com/oxo-good-grips-box-grater/p230448461",
    price: "£16.00",
    priority: "medium"
  },
  {
    title: "Good Grips Soft Handled Can Opener",
    brand: "OXO",
    description: "A good tin opener",
    url: "https://www.amazon.co.uk/dp/B00004OCJW?ascsubtag=5121833",
    price: "£12.00",
    priority: "medium"
  },
  {
    title: "TM-02 Digital Kitchen Timer",
    brand: "ThermPro",
    description: "A dual-display digital kitchen timer",
    url: "https://www.amazon.co.uk/ThermoPro-TM02-Countdown-Adjustable-Backlight/dp/B0CS35GXJK",
    price: "£12.70",
    priority: "medium"
  }
  ];