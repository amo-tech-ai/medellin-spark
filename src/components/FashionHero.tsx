import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FashionHero = () => {
  const fashionImages = [
    {
      src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format",
      alt: "Fashion runway model",
      className: "row-span-2"
    },
    {
      src: "https://images.unsplash.com/photo-1558769132-cb1aea680c7e?w=800&auto=format",
      alt: "Editorial fashion shoot",
      className: ""
    },
    {
      src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format",
      alt: "Designer atelier",
      className: ""
    },
    {
      src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format",
      alt: "Fashion accessories",
      className: "row-span-2"
    },
    {
      src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format",
      alt: "Studio fashion",
      className: ""
    },
    {
      src: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&auto=format",
      alt: "Haute couture detail",
      className: ""
    },
    {
      src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format",
      alt: "Fashion boutique",
      className: "col-span-2"
    },
    {
      src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format",
      alt: "Model portfolio",
      className: ""
    }
  ];

  return (
    <section className="min-h-screen bg-[#F8F6F3] relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 max-w-xl">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-gray-900 leading-[1.1]">
                Where Fashion Meets{" "}
                <span className="font-serif italic block mt-2">Intelligence.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
                FashionOS is the AI-powered platform connecting designers, brands, and fashion 
                events into one seamless experience. Discover exclusive shows, emerging designers, 
                and the future of fashion technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-900 text-white rounded-full px-8 py-6 text-base"
                asChild
              >
                <Link to="/events">
                  Explore Designers
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 py-6 text-base transition-all duration-300"
                asChild
              >
                <Link to="/auth">
                  Join FashionOS
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-300">
              <div>
                <div className="text-3xl font-light text-gray-900">150+</div>
                <div className="text-sm text-gray-600 mt-1">Designers</div>
              </div>
              <div>
                <div className="text-3xl font-light text-gray-900">50+</div>
                <div className="text-sm text-gray-600 mt-1">Events</div>
              </div>
              <div>
                <div className="text-3xl font-light text-gray-900">10K+</div>
                <div className="text-sm text-gray-600 mt-1">Attendees</div>
              </div>
            </div>
          </div>

          {/* Right Image Grid - Desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-4 h-[700px] auto-rows-fr">
            {fashionImages.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl ${image.className}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Right Image Grid - Tablet */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 max-w-2xl mx-auto">
            {fashionImages.slice(0, 6).map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl aspect-[3/4]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Right Image Grid - Mobile */}
          <div className="grid md:hidden grid-cols-2 gap-3">
            {fashionImages.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl aspect-[3/4]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-pink-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default FashionHero;
