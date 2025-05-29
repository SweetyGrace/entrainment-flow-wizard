
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleRegister = (eventId: string) => {
    navigate(`/registration?event=${eventId}`);
  };

  const handleCardClick = (eventId: string) => {
    navigate(`/programme/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative h-screen">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/lovable-uploads/db80701b-0446-4aba-a856-cf8b1fcb70d7.png"
            alt="Spiritual guide"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="relative z-10 flex items-center justify-start h-full pl-8 md:pl-16 lg:pl-24">
            <div className="max-w-2xl">
              <div className="text-left">
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

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Entrainment'25 Programme */}
            <Card 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group h-full flex flex-col"
              onClick={() => handleCardClick('entrainment25')}
            >
              <div className="relative">
                <img
                  src="/lovable-uploads/0a61e8e7-a873-449f-a7a9-56e36cad109d.png"
                  alt="Entrainment'25"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Entrainment'25
                </CardTitle>
                <CardDescription className="text-gray-600">
                  A transformative 3-day journey of consciousness awakening with Mahatria Ra
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>March 15-17, 2025</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Mysore, Karnataka</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Limited to 500 participants</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>3 days intensive</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegister('entrainment25');
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
            </Card>

            {/* HDB Programme */}
            <Card 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group h-full flex flex-col"
              onClick={() => handleCardClick('hdb')}
            >
              <div className="relative">
                <img
                  src="/lovable-uploads/8e8f875a-1c7f-4a5f-aa81-19c5e1789d30.png"
                  alt="HDB"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  HDB
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Global gathering of spiritual leaders and consciousness researchers
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>April 20-22, 2025</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Rishikesh, Uttarakhand</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Open for 1000 participants</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>3 days conference</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegister('hdb');
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
            </Card>

            {/* MSD Programme */}
            <Card 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group h-full flex flex-col"
              onClick={() => handleCardClick('msd')}
            >
              <div className="relative">
                <img
                  src="/lovable-uploads/8e8f875a-1c7f-4a5f-aa81-19c5e1789d30.png"
                  alt="MSD"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  MSD
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Silent meditation retreat for deep inner peace and clarity
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>May 10-17, 2025</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Dharamshala, HP</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Limited to 50 participants</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>7 days silent retreat</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegister('msd');
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
