
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Clock, ArrowRight, Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleRegister = (eventId: string) => {
    navigate(`/registration?event=${eventId}`);
  };

  const handleLearnMore = (eventId: string) => {
    // For now, just scroll to event details or show more info
    console.log(`Learn more about event: ${eventId}`);
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
                  Join transformative events that awaken your inner potential and connect you with like-minded souls on the journey of self-discovery.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button 
                      onClick={() => handleRegister('featured')}
                      className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Explore Events
                      <ArrowRight className="ml-2 h-5 w-5" />
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
            src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png"
            alt="Spiritual gathering"
          />
        </div>
      </div>

      {/* Events Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Upcoming Transformative Events
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover events that will awaken your consciousness and transform your life
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Entrainment'25 Event */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
              <div className="relative">
                <img
                  src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png"
                  alt="Entrainment'25"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white">Featured</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Heart className="w-4 h-4 text-red-500" />
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                    Entrainment'25
                  </CardTitle>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.9</span>
                  </div>
                </div>
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
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">₹2,500</div>
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleLearnMore('entrainment25')}
                    >
                      Learn More
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleRegister('entrainment25')}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consciousness Summit 2025 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
              <div className="relative">
                <img
                  src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png"
                  alt="Consciousness Summit"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600 text-white">New</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-bold group-hover:text-green-600 transition-colors">
                    Consciousness Summit 2025
                  </CardTitle>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8</span>
                  </div>
                </div>
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
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600">₹3,500</div>
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleLearnMore('consciousness-summit')}
                    >
                      Learn More
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleRegister('consciousness-summit')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mindfulness Retreat */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
              <div className="relative">
                <img
                  src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png"
                  alt="Mindfulness Retreat"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-600 text-white">Popular</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-bold group-hover:text-purple-600 transition-colors">
                    Mindfulness Retreat
                  </CardTitle>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.7</span>
                  </div>
                </div>
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
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-2xl font-bold text-purple-600">₹4,200</div>
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleLearnMore('mindfulness-retreat')}
                    >
                      Learn More
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleRegister('mindfulness-retreat')}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Register
                    </Button>
                  </div>
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
