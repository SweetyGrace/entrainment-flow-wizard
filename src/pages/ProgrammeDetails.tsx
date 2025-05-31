
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/common/components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/components/Card";
import { TopNavigation } from "@/components/TopNavigation";

const ProgrammeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from API
  const programme = {
    id: id,
    title: "Summer Science Camp",
    description: "Explore the wonders of science through hands-on experiments and activities. This comprehensive program covers physics, chemistry, biology, and environmental science through engaging experiments and field trips.",
    image: "/lovable-uploads/science-camp.jpg",
    duration: "2 weeks",
    ageGroup: "12-16 years",
    price: 299,
    startDate: new Date("2024-07-15"),
    endDate: new Date("2024-07-29"),
    location: "London, UK",
    category: "Science",
    capacity: 30,
    spotsLeft: 12,
    rating: 4.8,
    reviews: 156,
    highlights: [
      "Hands-on laboratory experiments",
      "Field trips to science museums",
      "Guest lectures from researchers",
      "Certificate of completion",
      "Small group learning (max 15 per group)"
    ],
    schedule: [
      { day: "Monday", activity: "Physics Lab - Motion and Forces" },
      { day: "Tuesday", activity: "Chemistry Lab - Reactions and Solutions" },
      { day: "Wednesday", activity: "Biology Lab - Cell Structure and Function" },
      { day: "Thursday", activity: "Environmental Science Field Trip" },
      { day: "Friday", activity: "Project Presentations and Awards" }
    ],
    instructor: {
      name: "Dr. Sarah Johnson",
      credentials: "PhD in Physics, 10 years teaching experience",
      image: "/lovable-uploads/instructor.jpg"
    }
  };

  const handleRegister = () => {
    navigate(`/register/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Programs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image and Title */}
            <div className="relative">
              <img
                src={programme.image}
                alt={programme.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {programme.spotsLeft} spots left
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{programme.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{programme.rating} ({programme.reviews} reviews)</span>
                </div>
                <span>•</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {programme.category}
                </span>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{programme.description}</p>
            </div>

            {/* Program Details */}
            <Card>
              <CardHeader>
                <CardTitle>Program Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-gray-600">{programme.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Age Group</p>
                      <p className="text-gray-600">{programme.ageGroup}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{programme.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Dates</p>
                      <p className="text-gray-600">
                        {programme.startDate.toLocaleDateString()} - {programme.endDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {programme.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Weekly Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Sample Weekly Schedule</CardTitle>
                <CardDescription>
                  Here's what a typical week looks like in this program
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {programme.schedule.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-blue-600 w-20">
                        {item.day}
                      </div>
                      <div className="flex-1">
                        {item.activity}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>Meet Your Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <img
                    src={programme.instructor.image}
                    alt={programme.instructor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-lg">{programme.instructor.name}</h4>
                    <p className="text-gray-600">{programme.instructor.credentials}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      £{programme.price}
                    </div>
                    <div className="text-gray-600">per participant</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-orange-800 font-medium">
                    Only {programme.spotsLeft} spots remaining!
                  </p>
                </div>
                
                <Button 
                  onClick={handleRegister}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  Register Now
                </Button>
                
                <div className="text-center text-sm text-gray-600">
                  <p>✓ Secure booking</p>
                  <p>✓ Instant confirmation</p>
                  <p>✓ Full refund available</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span>{programme.capacity} participants</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available:</span>
                  <span className="text-green-600">{programme.spotsLeft} spots</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span>⭐ {programme.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span>{programme.reviews} reviews</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeDetails;
