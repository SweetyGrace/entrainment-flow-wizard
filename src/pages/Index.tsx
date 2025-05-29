
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
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Transform Your</span>{' '}
                  <span className="block text-blue-600 xl:inline">Consciousness</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Join transformative programmes that awaken your inner potential and connect you with like-minded souls on the journey of self-discovery.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button 
                      onClick={() => handleRegister('featured')}
                      className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Explore Programmes
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="/lovable-uploads/db80701b-0446-4aba-a856-cf8b1fcb70d7.png"
            alt="Spiritual guide"
          />
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
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              onClick={() => handleCardClick('entrainment25')}
            >
              <div className="relative">
                <img
                  src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png"
                  alt="Entrainment'25"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                  Entrainment'25
                </CardTitle>
                <CardDescription className="text-gray-600">
                  A transformative 3-day journey of consciousness awakening with Mahatria Ra
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
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
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* HDB Programme */}
            <Card 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              onClick={() => handleCardClick('hdb')}
            >
              <div className="relative">
                <img
                  src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png"
                  alt="HDB"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                  HDB
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Global gathering of spiritual leaders and consciousness researchers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
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
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* MSD Programme */}
            <Card 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              onClick={() => handleCardClick('msd')}
            >
              <div className="relative">
                <img
                  src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png"
                  alt="MSD"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                  MSD
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Silent meditation retreat for deep inner peace and clarity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
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
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Register
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
