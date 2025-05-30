
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgramCard from '@/components/ProgramCard';
import TopNavigation from '@/components/TopNavigation';
import BannerCarousel from '@/components/BannerCarousel';

const Index = () => {
  const navigate = useNavigate();

  const programs = [
    {
      id: 'entrainment25',
      title: "Entrainment'25",
      description: "A transformative journey of consciousness and wisdom",
      backgroundImage: "/lovable-uploads/f0247085-e8e2-4308-840f-99073530b0b0.png",
      dates: "Jan 10 - 15, 2025",
      checkIn: "Jan 10, 2025\n3:00 PM",
      checkOut: "Jan 15, 2025\n11:00 AM",
      investment: "₹2,500",
      venue: "Kovalam, Kerala",
      note: "Popular Program",
      onRegister: (eventId: string) => {
        console.log(`Navigating to registration for ${eventId}`);
        navigate(`/registration?event=${eventId}`);
      },
      onClick: (eventId: string) => {
        console.log(`View details for ${eventId}`);
        navigate(`/programme/${eventId}`);
      }
    },
    {
      id: 'hdb',
      title: "HDB",
      description: "Himalayan Dhyana Bodh - Mountain meditation retreat",
      backgroundImage: "/lovable-uploads/9915522c-4120-403c-9834-f100e5676ef4.png",
      dates: "Feb 5 - 10, 2025",
      checkIn: "Feb 5, 2025\n2:00 PM",
      checkOut: "Feb 10, 2025\n12:00 PM",
      investment: "₹1,500",
      venue: "Rishikesh, Uttarakhand",
      note: "Mountain Retreat",
      onRegister: (eventId: string) => {
        console.log(`Navigating to registration for ${eventId}`);
        navigate(`/registration?event=${eventId}`);
      },
      onClick: (eventId: string) => {
        console.log(`View details for ${eventId}`);
        navigate(`/programme/${eventId}`);
      }
    },
    {
      id: 'msd',
      title: "MSD",
      description: "Mystic Spiritual Discovery by the ocean",
      backgroundImage: "/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png",
      dates: "Mar 15 - 20, 2025",
      checkIn: "Mar 15, 2025\n4:00 PM",
      checkOut: "Mar 20, 2025\n10:00 AM",
      investment: "₹1,200",
      venue: "Goa",
      note: "Ocean Side",
      onRegister: (eventId: string) => {
        console.log(`Navigating to registration for ${eventId}`);
        navigate(`/registration?event=${eventId}`);
      },
      onClick: (eventId: string) => {
        console.log(`View details for ${eventId}`);
        navigate(`/programme/${eventId}`);
      }
    },
    {
      id: 'tat',
      title: "TAT",
      description: "Transformational Awareness Training",
      backgroundImage: "/lovable-uploads/6aaa074e-3cb7-41ee-a6db-98aab03d3831.png",
      dates: "Apr 1 - 3, 2025",
      checkIn: "Apr 1, 2025\n9:00 AM",
      checkOut: "Apr 3, 2025\n6:00 PM",
      investment: "Free Program",
      venue: "Chennai, Tamil Nadu",
      note: "3 Day Training",
      onRegister: (eventId: string) => {
        console.log(`Navigating to registration for ${eventId}`);
        navigate(`/registration?event=${eventId}`);
      },
      onClick: (eventId: string) => {
        console.log(`View details for ${eventId}`);
        navigate(`/programme/${eventId}`);
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      
      {/* Banner Carousel */}
      <BannerCarousel />

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
    </div>
  );
};

export default Index;
