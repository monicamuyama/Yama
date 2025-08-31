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
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Event Image - Left Side */}
        <div className="relative sm:w-80 h-48 sm:h-auto flex-shrink-0">
          {event.images.length > 0 ? (
            <img
              src={event.images[0]}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl">{getEventCategoryIcon(event.category)}</span>
            </div>
          )}

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

        {/* Event Details - Right Side */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {event.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Event Meta */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 event-meta">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="card-action mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 8h18" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {formatDate(event.startDate)}
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="card-action mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-6.5 8-11A8 8 0 104 11c0 4.5 8 11 8 11z" />
                  </svg>
                  {event.venue.city}, {event.venue.country}
                </div>

                {isUpcoming && (
                  <div className="flex items-center text-sm text-purple-600 md:col-span-2">
                    <svg className="card-action mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                    </svg>
                    {timeRemaining}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 pt-4">
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
              <div className="flex space-x-3">
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
          </div>
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
