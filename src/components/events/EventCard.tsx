import React from 'react';
import { Event } from '../../types';
import { formatDate, formatPrice, getEventStatusColor, getEventCategoryIcon, getEventTimeRemaining, isEventUpcoming } from '../../utils';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface EventCardProps {
  event: Event;
  onViewDetails: (eventId: string) => void;
  onPurchaseTicket?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewDetails,
  onPurchaseTicket,
}) => {
  const isUpcoming = isEventUpcoming(event);
  const timeRemaining = getEventTimeRemaining(event);
  const availableTickets = event.capacity - event.soldTickets;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div className="relative">
        {/* Event Image */}
        <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
          {event.images.length > 0 ? (
            <img
              src={event.images[0]}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="text-4xl">{getEventCategoryIcon(event.category)}</span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full',
            getEventStatusColor(event.status)
          )}>
            {event.status.replace('_', ' ')}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium rounded-full text-gray-700">
            {getEventCategoryIcon(event.category)} {event.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Event Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Event Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.startDate)}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.venue.city}, {event.venue.country}
          </div>

          {isUpcoming && (
            <div className="flex items-center text-sm text-blue-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {timeRemaining}
            </div>
          )}
        </div>

        {/* Ticket Information */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-900">{availableTickets}</span> tickets left
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              {formatPrice(Math.min(...event.ticketTypes.map(t => t.price)))}
            </div>
            <div className="text-xs text-gray-500">starting from</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails(event.id)}
          >
            View Details
          </Button>
          
          {onPurchaseTicket && event.status === 'on_sale' && availableTickets > 0 && (
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onPurchaseTicket(event.id)}
            >
              Get Tickets
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

// Helper function for class names
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default EventCard;
