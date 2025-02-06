"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CalendarIcon,
  Share2Icon,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const productImages = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zgrfN13oHB5KirFyyq7hMTeVsdopC1.png",
    alt: "Black and RoseGold Metallic L Shaped Arch Decor - Main View",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6Zl5xxrfeAnT9CDBwV2mFmkojDvekh.png",
    alt: "Black and RoseGold Metallic L Shaped Arch Decor - Full Setup",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gmbeIc9D609IhwzZjFT5H8g6aHlQPV.png",
    alt: "Te",
  },
];

const assurancePoints = [
  "Trained Professionals",
  "Get what you see",
  "Quality Assurance",
  "On-time delivery",
  "Best Prices",
];

const relatedProducts = [
  {
    name: "2 Balloon Towers",
    description: "Balloon colours as per your theme",
    price: "₹399",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GGentsSZWAOlV4EDdTHxyWt7DX87TX.png",
  },
];

export default function EventDetailComp() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <div className="group relative h-full">
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className={cn(
                    "object-cover transition-all duration-300",
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  )}
                  priority={index === 0}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="secondary"
                  size="icon"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={previousImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-4 overflow-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={cn(
                  "relative h-24 w-24 overflow-hidden rounded-lg border-2",
                  index === currentImageIndex
                    ? "border-primary"
                    : "border-transparent hover:border-primary/50"
                )}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2">Birthday</Badge>
            <h1 className="text-2xl font-bold md:text-3xl">
              Black and RoseGold Metallic L Shaped Arch Decor
            </h1>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">₹2099</span>
              <span className="text-sm text-muted-foreground line-through">
                ₹2999
              </span>
              <Badge variant="secondary">30% off</Badge>
            </div>
            <p className="text-sm text-blue-600">
              Get it at ₹1899 | Use EBONOW
            </p>
          </div>

          <div className="flex items-center gap-4">
            <CalendarIcon className="h-4 w-4" />
            <span>Celebrating on Fri, 21st Jan</span>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1">Add to Cart</Button>
            <Button variant="outline" size="icon">
              <Share2Icon className="h-4 w-4" />
            </Button>
          </div>

          {/* Related Products */}
          <div className="space-y-4">
            <h3 className="font-semibold">Frequently Bought Together</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedProducts.map((product) => (
                <Card key={product.name}>
                  <CardContent className="p-3">
                    <div className="aspect-square relative mb-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-semibold">{product.price}</span>
                      <Button variant="outline" size="sm">
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="included">Included</TabsTrigger>
              <TabsTrigger value="excluded">Excluded</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <p>
                Black and RoseGold Metallic L Shaped Arch Decor is perfect for
                your Celebration to lighten the place and give a breathtaking
                view to the guests present, also makes it easy for you to
                celebrate by booking service online easily at affordable prices.
              </p>
            </TabsContent>
            <TabsContent value="included">
              <ul className="list-inside list-disc space-y-2">
                <li>L Shaped Arch of Black and Rosegold Metallic Balloons</li>
                <li>Happy Birthday Foil (Rosegold)</li>
                <li>Foil Curtain (Black)</li>
              </ul>
            </TabsContent>
            <TabsContent value="excluded">
              <ul className="list-inside list-disc space-y-2">
                <li>Table</li>
                <li>Cake Stand</li>
                <li>Chairs</li>
                <li>Curtain</li>
              </ul>
            </TabsContent>
          </Tabs>

          <Accordion type="single" collapsible>
            <AccordionItem value="faq-1">
              <AccordionTrigger>
                Can we customize the name on the decor?
              </AccordionTrigger>
              <AccordionContent>
                Yes, the name of the occasion can be customised. Customer can do
                it during the checkout.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>About the experience</AccordionTrigger>
              <AccordionContent>
                We provide the best possible quality in terms of material as
                well as the service. With a commitment to excellence, we ensure
                that every detail is taken care of, creating an ambiance that
                reflects your unique style and vision.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
