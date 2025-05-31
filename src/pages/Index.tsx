
import { useState } from "react";
import { Button } from "@/common/components/Button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/common/components/Carousel";
import { useNavigate } from "react-router-dom";
import TopNavigation from "@/components/TopNavigation";
import ProgramCard from "@/components/ProgramCard";

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for featured programs
  const featuredPrograms = [
    {
      id: "1",
      title: "Summer Science Camp",
      description: "Explore the wonders of science through hands-on experiments and activities.",
      backgroundImage: "/lovable-uploads/science-camp.jpg",
      dates: "July 15-29\n2024",
      checkIn: "Saturday\n2:00 PM",
      checkOut: "Sunday\n11:00 AM", 
      investment: "₹299",
      venue: "London, UK",
      note: "All materials included"
    },
    {
      id: "2", 
      title: "Creative Arts Workshop",
      description: "Unleash your creativity through painting, sculpting, and digital art.",
      backgroundImage: "/lovable-uploads/arts-workshop.jpg",
      dates: "Aug 1-8\n2024",
      checkIn: "Friday\n3:00 PM",
      checkOut: "Sunday\n12:00 PM",
      investment: "₹199",
      venue: "Manchester, UK", 
      note: "Art supplies provided"
    },
    {
      id: "3",
      title: "Adventure Outdoor Camp", 
      description: "Experience the great outdoors with hiking, camping, and team challenges.",
      backgroundImage: "/lovable-uploads/outdoor-camp.jpg",
      dates: "July 20-30\n2024",
      checkIn: "Saturday\n10:00 AM", 
      checkOut: "Monday\n4:00 PM",
      investment: "₹449",
      venue: "Lake District, UK",
      note: "Equipment included"
    }
  ];

  // Mock data for all programs
  const allPrograms = [
    ...featuredPrograms,
    {
      id: "4",
      title: "Tech Innovation Camp",
      description: "Learn coding, robotics, and AI in an interactive environment.",
      backgroundImage: "/lovable-uploads/tech-camp.jpg", 
      dates: "Aug 15-29\n2024",
      checkIn: "Monday\n9:00 AM",
      checkOut: "Friday\n5:00 PM",
      investment: "₹399",
      venue: "Birmingham, UK",
      note: "Laptops provided"
    },
    {
      id: "5",
      title: "Music & Performance Week",
      description: "Develop your musical talents and stage presence.",
      backgroundImage: "/lovable-uploads/music-camp.jpg",
      dates: "Aug 5-12\n2024",
      checkIn: "Monday\n10:00 AM",
      checkOut: "Sunday\n6:00 PM",
      investment: "₹249",
      venue: "Edinburgh, UK",
      note: "Instruments available"
    },
    {
      id: "6",
      title: "Environmental Science Expedition",
      description: "Study ecosystems and conservation in natural settings.",
      backgroundImage: "/lovable-uploads/environmental-camp.jpg",
      dates: "July 25\nAug 6, 2024",
      checkIn: "Thursday\n8:00 AM",
      checkOut: "Tuesday\n3:00 PM",
      investment: "₹379",
      venue: "Devon, UK",
      note: "Field equipment included"
    }
  ];

  const categories = ["All", "Science", "Arts", "Adventure", "Technology", "Music"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPrograms = allPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleProgramSelect = (eventId: string) => {
    navigate(`/programme/${eventId}`);
  };

  const handleProgramRegister = (eventId: string) => {
    navigate(`/registration?event=${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Discover Amazing Youth Programs
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of young people in life-changing experiences that inspire, educate, and empower.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 rounded-lg text-gray-900 flex-1"
            />
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Programs Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Programs</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {featuredPrograms.map((program) => (
                <CarouselItem key={program.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <ProgramCard 
                      {...program}
                      onRegister={handleProgramRegister}
                      onClick={handleProgramSelect}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <ProgramCard 
                key={program.id}
                {...program}
                onRegister={handleProgramRegister}
                onClick={handleProgramSelect}
              />
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No programs found matching your criteria. Try adjusting your search or category filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-lg">Young People Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-lg">Programs Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-lg">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of young achievers and discover what you're truly capable of.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Browse Programs
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
