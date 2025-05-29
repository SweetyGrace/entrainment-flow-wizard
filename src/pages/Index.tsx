
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Users, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 'entrainment25',
      name: "Entrainment'25",
      date: "March 15-17, 2025",
      location: "Infinitheism Headquarters",
      description: "A transformative spiritual gathering with Mahatria",
      attendees: 500,
      price: 2500,
      image: "/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png"
    },
    {
      id: 'consciousness-summit',
      name: "Consciousness Summit 2025",
      date: "April 22-24, 2025",
      location: "Mystic Valley Resort",
      description: "Explore the depths of consciousness and spiritual awakening",
      attendees: 350,
      price: 3200,
      image: "/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png"
    },
    {
      id: 'mindfulness-retreat',
      name: "Mindfulness Retreat",
      date: "May 8-10, 2025",
      location: "Serene Mountain Lodge",
      description: "A peaceful retreat focused on mindfulness and inner peace",
      attendees: 200,
      price: 1800,
      image: "/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png"
    }
  ];

  const handleRegister = (eventId: string, scenario: string = 'new') => {
    navigate(`/registration?scenario=${scenario}`);
  };

  return (
    <div className="min-h-screen bg-[#F9FBFF]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-[#1C3A6A]">
                Infinitheism Events
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-[#52585E] hover:bg-gray-50">
                Login
              </Button>
              <Button className="bg-[#0799FF] hover:bg-blue-600">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1C3A6A] to-[#0799FF] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Journey
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join us for life-changing spiritual experiences and profound teachings with Mahatria
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#1C3A6A] hover:bg-gray-100 px-8 py-3 text-lg"
          >
            Explore Events
          </Button>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-[#52585E] max-w-2xl mx-auto">
              Discover transformative experiences designed to elevate your consciousness and deepen your spiritual practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">{event.name}</h3>
                  <p className="text-[#52585E] mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-[#52585E]">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-[#52585E]">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-[#52585E]">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees} attendees
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-[#1C3A6A]">
                      ₹{event.price.toLocaleString()}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRegister(event.id, 'new')}
                        className="border-[#0799FF] text-[#0799FF] hover:bg-blue-50"
                      >
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Demo Links */}
          <div className="mt-12 text-center">
            <div className="inline-flex bg-white rounded-lg p-1 border border-gray-200">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleRegister('entrainment25', 'new')}
                className="text-[#52585E] hover:bg-gray-50"
              >
                New User Flow
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleRegister('entrainment25', 'partial')}
                className="text-[#52585E] hover:bg-gray-50"
              >
                Partial Data Flow
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleRegister('entrainment25', 'complete')}
                className="text-[#52585E] hover:bg-gray-50"
              >
                Complete Data Flow
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D2D2D] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Infinitheism</h3>
              <p className="text-gray-300">
                Transforming lives through spiritual wisdom and conscious evolution.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  Events
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p>Email: info@infinitheism.com</p>
                <p>Phone: +91 9876543210</p>
                <p>Address: Infinitheism Headquarters</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Infinitheism. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
