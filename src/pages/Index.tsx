
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, Calendar, Users, Clock, CalendarDays, Timer, ArrowUpRight, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const Index = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [bannerVisible, setBannerVisible] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    // Trigger banner animation on mount
    const timer = setTimeout(() => {
      setBannerVisible(true);
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = parseInt(entry.target.getAttribute('data-card-index') || '0');
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, cardIndex]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const handleRegister = (eventId: string) => {
    navigate(`/registration?event=${eventId}`);
  };

  const handleCardClick = (eventId: string) => {
    navigate(`/programme/${eventId}`);
  };

  // Carousel images for the hero section (removed first image)
  const carouselImages = [
    {
      src: "/lovable-uploads/0a61e8e7-a873-449f-a7a9-56e36cad109d.png",
      alt: "Spiritual awakening",
      title: "Awaken Your",
      subtitle: "Inner Wisdom",
      description: "Discover profound insights and transformative experiences through our carefully curated spiritual programmes."
    },
    {
      src: "/lovable-uploads/8e8f875a-1c7f-4a5f-aa81-19c5e1789d30.png",
      alt: "Meditation retreat",
      title: "Journey to",
      subtitle: "Self Discovery",
      description: "Embark on a life-changing journey of personal growth and spiritual enlightenment with expert guidance."
    }
  ];

  const programmes = [
    {
      id: 'entrainment25',
      title: 'Entrainment\'25',
      description: 'A transformative 3-day journey of consciousness awakening with Mahatria Ra',
      image: '/lovable-uploads/0a61e8e7-a873-449f-a7a9-56e36cad109d.png',
      dates: 'Wed, 18 Sept to\nSat, 21 Sept 2025',
      checkIn: '04:00 p.m. to 09:00 p.m.\non Wed, 18 Sept 2025',
      checkOut: 'Latest by 02:00 p.m.\non Sat, 21 Sept 2025',
      investment: 'INR 49,000/-\n(plus GST 18%)',
      venue: 'Leonia Holistic Destination, Bommaraspet, shameerpet, Ranga Reddy District, Hyderabad 500078.',
      note: '*Early check-in and Late check-out not available'
    },
    {
      id: 'hdb',
      title: 'HDB',
      description: 'Global gathering of spiritual leaders and consciousness researchers',
      image: '/lovable-uploads/8e8f875a-1c7f-4a5f-aa81-19c5e1789d30.png',
      dates: 'Thu, 20 Apr to\nSun, 22 Apr 2025',
      checkIn: '03:00 p.m. to 08:00 p.m.\non Thu, 20 Apr 2025',
      checkOut: 'Latest by 01:00 p.m.\non Sun, 22 Apr 2025',
      investment: 'INR 35,000/-\n(plus GST 18%)',
      venue: 'Rishikesh Retreat Center, Rishikesh, Uttarakhand 249304.',
      note: '*Approval required for participation'
    },
    {
      id: 'msd',
      title: 'MSD',
      description: 'Silent meditation retreat for deep inner peace and clarity',
      image: '/lovable-uploads/8e8f875a-1c7f-4a5f-aa81-19c5e1789d30.png',
      dates: 'Sat, 10 May to\nSat, 17 May 2025',
      checkIn: '02:00 p.m. to 07:00 p.m.\non Sat, 10 May 2025',
      checkOut: 'Latest by 12:00 p.m.\non Sat, 17 May 2025',
      investment: 'No Waiting List',
      venue: 'Dharamshala Meditation Center, Dharamshala, Himachal Pradesh 176215.',
      note: '*Limited to 50 participants'
    },
    {
      id: 'tat',
      title: 'TAT',
      description: 'Transformative awareness training for personal growth and mindfulness',
      image: '/lovable-uploads/9915522c-4120-403c-9834-f100e5676ef4.png',
      dates: 'Fri, 5 Jun to\nSun, 7 Jun 2025',
      checkIn: '05:00 p.m. to 10:00 p.m.\non Fri, 5 Jun 2025',
      checkOut: 'Latest by 03:00 p.m.\non Sun, 7 Jun 2025',
      investment: 'Free Program',
      venue: 'Pune Convention Center, Pune, Maharashtra 411028.',
      note: '*Open for 200 participants'
    }
  ];

  const formatTextWithMahatriaRed = (text: string) => {
    const parts = text.split(/(Mahatria)/gi);
    return parts.map((part, index) => 
      part.toLowerCase() === 'mahatria' ? (
        <span key={index} className="text-red-500">{part}</span>
      ) : part
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section with Carousel - Reduced to 50vh height */}
      <div className="hero-banner-container relative overflow-hidden">
        <div className="hero-carousel-wrapper relative h-[50vh]">
          <Carousel 
            plugins={[plugin.current]}
            className="w-full h-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-0">
              {carouselImages.map((image, index) => (
                <CarouselItem key={index} className="pl-0">
                  <div className="carousel-slide relative h-[50vh]">
                    <img
                      className={`hero-image absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
                        bannerVisible 
                          ? 'scale-100 opacity-100' 
                          : 'scale-105 opacity-80'
                      }`}
                      src={image.src}
                      alt={image.alt}
                    />
                    <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/80"></div>
                    <div className="hero-content relative z-10 flex items-center justify-end h-full pr-8 md:pr-16 lg:pr-24">
                      <div className="hero-text-container max-w-2xl">
                        <div className={`text-right transition-all duration-1000 ease-out ${
                          bannerVisible 
                            ? 'translate-y-0 opacity-100' 
                            : 'translate-y-8 opacity-0'
                        }`}>
                          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-white mb-6">
                            <span className="block">{image.title}</span>
                            <span className="block text-blue-400">{image.subtitle}</span>
                          </h1>
                          <p className="hero-description mt-3 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                            {image.description}
                          </p>
                          <div className="hero-cta-container mt-8">
                            <Button 
                              onClick={() => handleRegister('featured')}
                              className="hero-cta-button relative overflow-hidden px-12 py-6 text-lg md:text-xl font-medium rounded-full text-white border-0 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                              style={{
                                backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                              }}
                            >
                              <span className="relative z-10">explore programmes</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 md:left-8 bg-white/20 hover:bg-white/30 border-white/30 text-white" />
            <CarouselNext className="right-4 md:right-8 bg-white/20 hover:bg-white/30 border-white/30 text-white" />
          </Carousel>
        </div>
      </div>

      {/* Programmes Section */}
      <div className="programmes-section py-16 bg-gray-50">
        <div className="programmes-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="programmes-header text-center">
            <h2 className="programmes-title text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Upcoming Transformative Programmes
            </h2>
            <p className="programmes-subtitle mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover programmes that will awaken your consciousness and transform your life
            </p>
          </div>

          <div className="programmes-list mt-12 space-y-8">
            {programmes.map((programme, index) => (
              <Card 
                key={programme.id}
                ref={(el) => cardRefs.current[index] = el}
                data-card-index={index}
                className={`programme-card programme-card-${programme.id} overflow-hidden hover:shadow-lg transition-all duration-700 cursor-pointer group transform ${
                  visibleCards.has(index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                } bg-white border border-gray-200 rounded-2xl`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
                onClick={() => handleCardClick(programme.id)}
              >
                {/* Header with image and title */}
                <div className="programme-card-header relative h-48 overflow-hidden">
                  <img
                    src={programme.image}
                    alt={programme.title}
                    className="programme-card-image w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="programme-card-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="programme-card-title-container absolute top-6 left-1/2 transform -translate-x-1/2">
                    <div className="text-center">
                      <h1 className="programme-card-title text-4xl font-light text-white tracking-wide">
                        en<span className="text-red-500">trainment</span>
                        <span className="text-blue-400 text-2xl">24</span>
                      </h1>
                      <div className="programme-card-dots flex justify-center mt-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Grid */}
                <CardContent className="programme-card-content p-8">
                  <div className="programme-info-grid grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Program Dates */}
                    <div className="programme-info-item programme-dates text-center">
                      <div className="programme-info-icon mb-4">
                        <CalendarDays className="w-8 h-8 mx-auto text-gray-600 stroke-1" />
                      </div>
                      <h3 className="programme-info-title font-semibold text-gray-900 text-lg mb-3">Program Dates</h3>
                      <p className="programme-info-text text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {programme.dates}
                      </p>
                    </div>

                    {/* Check-in Time */}
                    <div className="programme-info-item programme-checkin text-center">
                      <div className="programme-info-icon mb-4">
                        <Timer className="w-8 h-8 mx-auto text-gray-600 stroke-1" />
                      </div>
                      <h3 className="programme-info-title font-semibold text-gray-900 text-lg mb-3">Check-in-Time</h3>
                      <p className="programme-info-text text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {programme.checkIn}
                      </p>
                    </div>

                    {/* Check-out Time */}
                    <div className="programme-info-item programme-checkout text-center">
                      <div className="programme-info-icon mb-4">
                        <ArrowUpRight className="w-8 h-8 mx-auto text-gray-600 stroke-1" />
                      </div>
                      <h3 className="programme-info-title font-semibold text-gray-900 text-lg mb-3">Check-out-Time</h3>
                      <p className="programme-info-text text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {programme.checkOut}
                      </p>
                    </div>

                    {/* Investment */}
                    <div className="programme-info-item programme-investment text-center">
                      <div className="programme-info-icon mb-4">
                        <div className="w-8 h-8 mx-auto border-2 border-gray-600 rounded flex items-center justify-center">
                          <IndianRupee className="w-4 h-4 text-gray-600 stroke-1" />
                        </div>
                      </div>
                      <h3 className="programme-info-title font-semibold text-gray-900 text-lg mb-3">Investment</h3>
                      <p className="programme-info-text text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {programme.investment}
                      </p>
                    </div>
                  </div>

                  {/* Venue Information */}
                  <div className="programme-venue-section mt-8 pt-6 border-t border-gray-100">
                    <p className="programme-venue-text text-gray-600 text-sm leading-relaxed">
                      <span className="font-medium">Venue:</span> {programme.venue}
                    </p>
                    <p className="programme-note-text text-gray-500 text-xs mt-2 italic">
                      {programme.note}
                    </p>
                  </div>

                  {/* Register Button */}
                  <div className="programme-cta-section mt-6 flex justify-center">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegister(programme.id);
                      }}
                      className="programme-register-button relative overflow-hidden px-8 py-3 font-medium rounded-full text-white border-0 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                      style={{
                        backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <span className="relative z-10">register now</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
