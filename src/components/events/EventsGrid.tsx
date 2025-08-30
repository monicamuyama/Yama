import React, { useState, useEffect } from 'react';
import { Event, EventCategory } from '../../types';
import EventCard from './EventCard';
import Button from '../ui/Button';

interface EventsGridProps {
  events: Event[];
  onViewEvent: (eventId: string) => void;
  onPurchaseTicket?: (eventId: string) => void;
}

const EventsGrid: React.FC<EventsGridProps> = ({
  events,
  onViewEvent,
  onPurchaseTicket,
}) => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'name'>('date');

  // Filter and sort events
  useEffect(() => {
    let filtered = events;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'price':
          const aMinPrice = Math.min(...a.ticketTypes.map(t => t.price));
          const bMinPrice = Math.min(...b.ticketTypes.map(t => t.price));
          return aMinPrice - bMinPrice;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
  }, [events, selectedCategory, searchQuery, sortBy]);

  const categories = [
    { value: 'all', label: 'All Events', icon: '📅' },
    { value: EventCategory.CONFERENCE, label: 'Conferences', icon: '🎤' },
    { value: EventCategory.CONCERT, label: 'Concerts', icon: '🎵' },
    { value: EventCategory.FESTIVAL, label: 'Festivals', icon: '🎪' },
    { value: EventCategory.WORKSHOP, label: 'Workshops', icon: '🔧' },
    { value: EventCategory.NETWORKING, label: 'Networking', icon: '🤝' },
    { value: EventCategory.SPORTS, label: 'Sports', icon: '⚽' },
    { value: EventCategory.ART, label: 'Art', icon: '🎨' },
    { value: EventCategory.FOOD, label: 'Food', icon: '🍕' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search events, venues, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value as EventCategory | 'all')}
                className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1 sm:mr-2 text-sm">{category.icon}</span>
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="w-full sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'name')}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredEvents.length} of {events.length} events
        </p>
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery('')}
            className="text-xs sm:text-sm"
          >
            Clear Search
          </Button>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={onViewEvent}
              onPurchaseTicket={onPurchaseTicket}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12">
          <div className="text-4xl sm:text-6xl mb-4">🔍</div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 px-4">
            {searchQuery
              ? `No events match "${searchQuery}". Try adjusting your search or filters.`
              : 'No events are currently available in this category.'}
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-sm"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsGrid;
