
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import ProgramCard from "@/components/ProgramCard";

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

  // Carousel images for the hero section
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
      image: '/lovable-uploads/f0247085-e8e2-4308-840f-99073530b0b0.png',
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section with Carousel */}
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
                    <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    <div className="hero-content relative z-10 flex items-center justify-start h-full pl-8 md:pl-16 lg:pl-24">
                      <div className="hero-text-container max-w-2xl">
                        <div className={`text-left transition-all duration-1000 ease-out ${
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

          <div className="programmes-list mt-12 space-y-12">
            {programmes.map((programme, index) => (
              <div
                key={programme.id}
                ref={(el) => cardRefs.current[index] = el}
                data-card-index={index}
                className={`transform transition-all duration-700 ${
                  visibleCards.has(index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <ProgramCard
                  id={programme.id}
                  title={programme.title}
                  description={programme.description}
                  backgroundImage={programme.image}
                  dates={programme.dates}
                  checkIn={programme.checkIn}
                  checkOut={programme.checkOut}
                  investment={programme.investment}
                  venue={programme.venue}
                  note={programme.note}
                  onRegister={handleRegister}
                  onClick={handleCardClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
