
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [bannerVisible, setBannerVisible] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const programmes = [
    {
      id: 'entrainment25',
      title: 'Entrainment\'25',
      description: 'A transformative 3-day journey of consciousness awakening with Mahatria Ra',
      image: '/lovable-uploads/0a61e8e7-a873-449f-a7a9-56e36cad109d.png',
      date: 'March 15-17, 2025',
      location: 'Mysore, Karnataka',
      participants: 'Limited to 500 participants',
      duration: '3 days intensive'
    },
    {
      id: 'hdb',
      title: 'HDB',
      description: 'Global gathering of spiritual leaders and consciousness researchers',
      image: '/lovable-uploads/8e8f875a-1c7f-4a5f-aa81-19c5e1789d30.png',
      date: 'April 20-22, 2025',
      location: 'Rishikesh, Uttarakhand',
      participants: 'Open for 1000 participants',
      duration: '3 days conference'
    },
    {
      id: 'msd',
      title: 'MSD',
      description: 'Silent meditation retreat for deep inner peace and clarity',
      image: '/lovable-uploads/8e8f875a-1c7f-4a5f-aa81-19c5e1789d30.png',
      date: 'May 10-17, 2025',
      location: 'Dharamshala, HP',
      participants: 'Limited to 50 participants',
      duration: '7 days silent retreat'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative h-screen">
          <img
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
              bannerVisible 
                ? 'scale-100 opacity-100' 
                : 'scale-105 opacity-80'
            }`}
            src="/lovable-uploads/db80701b-0446-4aba-a856-cf8b1fcb70d7.png"
            alt="Spiritual guide"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="relative z-10 flex items-center justify-start h-full pl-8 md:pl-16 lg:pl-24">
            <div className="max-w-2xl">
              <div className={`text-left transition-all duration-1000 ease-out ${
                bannerVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-white mb-6">
                  <span className="block">Transform Your</span>
                  <span className="block text-blue-400">Consciousness</span>
                </h1>
                <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                  Join transformative programmes that awaken your inner potential and connect you with like-minded souls on the journey of self-discovery.
                </p>
                <div className="mt-8">
                  <Button 
                    onClick={() => handleRegister('featured')}
                    className="relative overflow-hidden px-8 py-4 text-base md:text-lg font-medium rounded-full text-white border-0 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                    style={{
                      backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <span className="relative z-10">Explore Programmes</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programmes Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Upcoming Transformative Programmes
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover programmes that will awaken your consciousness and transform your life
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {programmes.map((programme, index) => (
              <Card 
                key={programme.id}
                ref={(el) => cardRefs.current[index] = el}
                data-card-index={index}
                className={`overflow-hidden hover:shadow-lg transition-all duration-700 cursor-pointer group transform ${
                  visibleCards.has(index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
                onClick={() => handleCardClick(programme.id)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative overflow-hidden md:w-80 md:flex-shrink-0">
                    <img
                      src={programme.image}
                      alt={programme.title}
                      className="w-full h-48 md:h-full object-cover transition-all duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {programme.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {programme.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{programme.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{programme.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{programme.participants}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{programme.duration}</span>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-start md:justify-end">
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRegister(programme.id);
                          }}
                          className="relative overflow-hidden px-6 py-3 font-medium rounded-full text-white border-0 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                          style={{
                            backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          <span className="relative z-10">Register</span>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
