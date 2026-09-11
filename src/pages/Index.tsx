import React, { useState } from 'react';
import { Star, MapPin, Clock, DollarSign, Search, Filter, Heart, MessageSquare } from 'lucide-react';

interface Tutor {
  id: number;
  name: string;
  subject: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  location: string;
  availability: string;
  image: string;
  bio: string;
  badges: string[];
}

const tutors: Tutor[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    subject: 'Mathematics',
    rating: 4.9,
    reviews: 127,
    hourlyRate: 45,
    location: 'San Francisco, CA',
    availability: 'Weekdays 3-8pm',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'MIT graduate with 8 years of tutoring experience. Specializing in calculus and algebra.',
    badges: ['Top Rated', 'Verified'],
  },
  {
    id: 2,
    name: 'James Wilson',
    subject: 'English Literature',
    rating: 4.8,
    reviews: 94,
    hourlyRate: 40,
    location: 'New York, NY',
    availability: 'Flexible',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Published author and English professor. Expert in essay writing and literature analysis.',
    badges: ['Top Rated'],
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    subject: 'Spanish',
    rating: 4.9,
    reviews: 156,
    hourlyRate: 38,
    location: 'Miami, FL',
    availability: 'Evenings',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Native Spanish speaker. Conversational and grammar lessons for all levels.',
    badges: ['Top Rated', 'Verified', 'Native Speaker'],
  },
  {
    id: 4,
    name: 'David Kumar',
    subject: 'Physics',
    rating: 4.7,
    reviews: 112,
    hourlyRate: 50,
    location: 'Boston, MA',
    availability: 'Weekends',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: 'PhD in Physics. Specializes in AP Physics and college prep courses.',
    badges: ['Verified'],
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const subjects = ['Mathematics', 'English Literature', 'Spanish', 'Physics'];
  
  const filtered = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || tutor.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Tuitions Hub</h1>
          </div>
          <nav className="flex items-center gap-6">
            <button className="text-muted-foreground hover:text-foreground transition">Become a Tutor</button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-foreground mb-4">Find Your Perfect Tutor</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with verified tutors in any subject. Learn at your pace, on your schedule.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by tutor name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-12 flex-wrap">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <button
            onClick={() => setSelectedSubject(null)}
            className={`px-4 py-2 rounded-full transition ${
              selectedSubject === null
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-foreground hover:bg-muted'
            }`}
          >
            All Subjects
          </button>
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
              className={`px-4 py-2 rounded-full transition ${
                selectedSubject === subject
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-foreground hover:bg-muted'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-8">
          Showing {filtered.length} tutor{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map(tutor => (
            <div
              key={tutor.id}
              className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleFavorite(tutor.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
                >
                  <Heart
                    className={`w-5 h-5 transition ${
                      favorites.includes(tutor.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
                  {tutor.badges.map(badge => (
                    <span
                      key={badge}
                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{tutor.name}</h3>
                    <p className="text-sm text-primary font-medium">{tutor.subject}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-foreground">{tutor.rating}</span>
                      <span className="text-xs text-muted-foreground">({tutor.reviews})</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tutor.bio}</p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">{tutor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">{tutor.availability}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground font-bold">
                    <DollarSign className="w-4 h-4" />
                    <span>${tutor.hourlyRate}/hour</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium text-sm">
                    Book Session
                  </button>
                  <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No tutors found matching your criteria.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start learning?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students who are achieving their academic goals with Tuitions Hub.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-bold">
              Find a Tutor
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition font-bold">
              Become a Tutor
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">How it works</a></li>
                <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition">Subjects</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition">Safety</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2024 Tuitions Hub. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition">Twitter</a>
              <a href="#" className="hover:text-foreground transition">Facebook</a>
              <a href="#" className="hover:text-foreground transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
