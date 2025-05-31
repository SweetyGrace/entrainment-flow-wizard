
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Calendar, Users, Clock } from 'lucide-react';

const ProgrammeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock programme data
  const programmes = {
    'entrainment25': {
      name: "Entrainment'25",
      description: "A transformative 3-day journey of consciousness awakening with Mahatria Ra",
      fullDescription: "Entrainment'25 is a profound spiritual gathering designed to awaken your inner consciousness and connect you with your true self. Led by the enlightened master Mahatria Ra, this intensive 3-day programme combines ancient wisdom with modern insights to create a transformative experience that will change your life forever.",
      image: "/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png",
      date: "March 15-17, 2025",
      location: "Mysore, Karnataka",
      participants: "Limited to 500 participants",
      duration: "3 days intensive"
    },
    'hdb': {
      name: "HDB",
      description: "Global gathering of spiritual leaders and consciousness researchers",
      fullDescription: "HDB (Higher Dimensional Being) is an extraordinary gathering that brings together spiritual leaders, consciousness researchers, and seekers from around the world. This programme focuses on exploring higher dimensions of consciousness and understanding the true nature of existence.",
      image: "/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png",
      date: "April 20-22, 2025",
      location: "Rishikesh, Uttarakhand",
      participants: "Open for 1000 participants",
      duration: "3 days conference"
    },
    'msd': {
      name: "MSD",
      description: "Silent meditation retreat for deep inner peace and clarity",
      fullDescription: "MSD (Mindful Silent Dialogue) is an intensive silent meditation retreat designed to help you discover deep inner peace and mental clarity. Through the practice of mindful silence, you will learn to quiet the mind and connect with your inner wisdom.",
      image: "/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png",
      date: "May 10-17, 2025",
      location: "Dharamshala, HP",
      participants: "Limited to 50 participants",
      duration: "7 days silent retreat"
    }
  };

  const programme = programmes[id as keyof typeof programmes];

  if (!programme) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Programme not found</h1>
          <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleRegister = () => {
    navigate(`/registration?event=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programmes
          </Button>
        </div>
      </div>

      {/* Programme Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <div className="relative h-96">
            <img
              src={programme.image}
              alt={programme.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-8 text-white">
                <h1 className="text-4xl font-bold mb-2">{programme.name}</h1>
                <p className="text-xl opacity-90">{programme.description}</p>
              </div>
            </div>
          </div>
          
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Programme Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Programme</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {programme.fullDescription}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{programme.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{programme.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{programme.participants}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{programme.duration}</span>
                  </div>
                </div>
              </div>

              {/* Registration Section */}
              <div>
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900">Ready to Transform?</CardTitle>
                    <CardDescription className="text-blue-700">
                      Join this life-changing programme and embark on your journey of consciousness awakening.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={handleRegister}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 text-lg font-medium"
                    >
                      Register Now
                    </Button>
                    <p className="text-sm text-blue-600 text-center mt-3">
                      Registration is subject to approval
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgrammeDetails;
