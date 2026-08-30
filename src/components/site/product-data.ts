import catWellness from "@/assets/cat-wellness.jpg";
import catPersonal from "@/assets/cat-personal.jpg";
import catDevices from "@/assets/cat-devices.jpg";
import catMedicines from "@/assets/cat-medicines.jpg";
import catElderly from "@/assets/cat-elderly.jpg";

export type Product = {
  id: string;
  name: string;
  pack: string;
  price: number;
  mrp: number;
  off: string;
  rating: number;
  img: string;
  images: string[];
  category: string;
  description: string;
  highlights: string[];
};

export const products: Product[] = [
  {
    id: "vitamin-c-1000mg-tablets",
    name: "Vitamin C 1000mg Tablets",
    pack: "Bottle of 60 tablets",
    price: 349,
    mrp: 449,
    off: "22% off",
    rating: 4.6,
    img: catWellness,
    images: [catWellness, catPersonal, catDevices],
    category: "Wellness",
    description:
      "Daily immune support with easy-to-take Vitamin C tablets for your wellness routine.",
    highlights: ["60 tablets per bottle", "Supports daily immunity", "Suitable for adults"],
  },
  {
    id: "gentle-daily-face-wash",
    name: "Gentle Daily Face Wash",
    pack: "100 ml tube",
    price: 199,
    mrp: 260,
    off: "23% off",
    rating: 4.4,
    img: catPersonal,
    images: [catPersonal, catWellness, catElderly],
    category: "Personal Care",
    description:
      "A gentle everyday cleanser that leaves skin feeling fresh, clean and comfortable.",
    highlights: ["100 ml tube", "For everyday cleansing", "Gentle skincare formula"],
  },
  {
    id: "digital-bp-monitor",
    name: "Digital BP Monitor",
    pack: "1 device with cuff",
    price: 1899,
    mrp: 2499,
    off: "24% off",
    rating: 4.7,
    img: catDevices,
    images: [catDevices, catMedicines, catWellness],
    category: "Healthcare Devices",
    description:
      "Keep track of your blood pressure at home with a simple, easy-to-read digital monitor.",
    highlights: ["1 monitor with cuff", "Clear digital display", "Designed for home monitoring"],
  },
  {
    id: "paracetamol-650mg",
    name: "Paracetamol 650mg",
    pack: "Strip of 15 tablets",
    price: 32,
    mrp: 40,
    off: "20% off",
    rating: 4.8,
    img: catMedicines,
    images: [catMedicines, catDevices, catWellness],
    category: "Medicines",
    description:
      "A household medicine essential for temporary relief from fever and mild-to-moderate pain.",
    highlights: [
      "Strip of 15 tablets",
      "For temporary fever relief",
      "Use as directed by a doctor",
    ],
  },
  {
    id: "calcium-d3-softgels",
    name: "Calcium + D3 Softgels",
    pack: "Bottle of 30 softgels",
    price: 279,
    mrp: 359,
    off: "22% off",
    rating: 4.5,
    img: catElderly,
    images: [catElderly, catWellness, catPersonal],
    category: "Elderly Care",
    description: "A convenient calcium and vitamin D3 supplement for everyday bone health support.",
    highlights: ["30 softgels per bottle", "Calcium with Vitamin D3", "Easy-to-swallow softgels"],
  },
  {
    id: "omega-3-fish-oil",
    name: "Omega 3 Fish Oil",
    pack: "Bottle of 60 capsules",
    price: 599,
    mrp: 799,
    off: "25% off",
    rating: 4.6,
    img: catWellness,
    images: [catWellness, catElderly, catPersonal],
    category: "Wellness",
    description: "Omega 3 capsules made for a simple addition to your daily nutrition routine.",
    highlights: ["60 capsules per bottle", "Source of Omega 3", "Daily nutrition support"],
  },
  {
    id: "digital-thermometer",
    name: "Digital Thermometer",
    pack: "1 device",
    price: 249,
    mrp: 349,
    off: "28% off",
    rating: 4.5,
    img: catDevices,
    images: [catDevices, catMedicines, catPersonal],
    category: "Healthcare Devices",
    description: "A compact digital thermometer for quick, convenient temperature checks at home.",
    highlights: ["1 digital thermometer", "Quick temperature checks", "Compact and easy to use"],
  },
  {
    id: "multivitamin-for-seniors",
    name: "Multivitamin for Seniors",
    pack: "Bottle of 30 tablets",
    price: 429,
    mrp: 549,
    off: "21% off",
    rating: 4.7,
    img: catElderly,
    images: [catElderly, catWellness, catDevices],
    category: "Elderly Care",
    description:
      "A daily multivitamin designed to complement the nutritional needs of older adults.",
    highlights: ["30 tablets per bottle", "Daily nutritional support", "Made for seniors"],
  },
];

export function getProduct(productId: string) {
  return products.find((product) => product.id === productId);
}
