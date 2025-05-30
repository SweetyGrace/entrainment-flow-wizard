
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProgramCard from '@/components/ProgramCard';
import TopNavigation from '@/components/TopNavigation';

const Index = () => {
  const programs = [
    {
      id: 'entrainment25',
      title: "Entrainment'25",
      location: "Kovalam, Kerala",
      dates: "Jan 10 - 15, 2025",
      duration: "6 days",
      price: "₹2,500",
      image: "/lovable-uploads/f0247085-e8e2-4308-840f-99073530b0b0.png",
      description: "A transformative journey of consciousness and wisdom",
      isPopular: true
    },
    {
      id: 'hdb',
      title: "HDB",
      location: "Rishikesh, Uttarakhand",
      dates: "Feb 5 - 10, 2025",
      duration: "6 days",
      price: "₹1,500",
      image: "/lovable-uploads/9915522c-4120-403c-9834-f100e5676ef4.png",
      description: "Himalayan Dhyana Bodh - Mountain meditation retreat"
    },
    {
      id: 'msd',
      title: "MSD",
      location: "Goa",
      dates: "Mar 15 - 20, 2025",
      duration: "6 days",
      price: "₹1,200",
      image: "/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png",
      description: "Mystic Spiritual Discovery by the ocean"
    },
    {
      id: 'tat',
      title: "TAT",
      location: "Chennai, Tamil Nadu",
      dates: "Apr 1 - 3, 2025",
      duration: "3 days",
      price: "Free",
      image: "/lovable-uploads/6aaa074e-3cb7-41ee-a6db-98aab03d3831.png",
      description: "Transformational Awareness Training"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/0a61e8e7-a873-449f-a7a9-56e36cad109d.png" 
            alt="Spiritual gathering" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="flex justify-start">
            <div className="max-w-2xl text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transform Your Journey Within
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Discover inner peace and wisdom through our transformative spiritual programs across India
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
                  Explore Programs
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg rounded-full backdrop-blur-sm">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for life-changing experiences designed to awaken your consciousness and connect you with your true self
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {programs.map((program) => (
            <ProgramCard key={program.id} {...program} />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Programs?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our carefully crafted spiritual journeys</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Learn from experienced spiritual teachers and masters who guide you through transformative practices</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Sacred Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Experience spirituality in India's most sacred and energetically powerful locations</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Connect with like-minded souls and build lasting friendships on your spiritual journey</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
