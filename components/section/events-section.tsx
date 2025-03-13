"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Event } from "../profile/artist-admin";
import {
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Plus,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageUploader from "../profile/image-uploader";

interface EventsSectionProps {
  events: Event[];
  updateEvents: (events: Event[]) => void;
  error?: string;
}

export default function EventsSection({
  events,
  updateEvents,
  error,
}: EventsSectionProps) {
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    venue: "",
    image: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateEventInput = () => {
    const errors: Record<string, string> = {};

    if (!newEvent.title.trim()) {
      errors.title = "Event title is required";
    }

    if (!newEvent.date) {
      errors.date = "Event date is required";
    }

    if (!newEvent.time) {
      errors.time = "Event time is required";
    }

    if (!newEvent.venue.trim()) {
      errors.venue = "Event venue is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addEvent = () => {
    if (!validateEventInput()) return;

    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
    };

    updateEvents([...events, event]);
    setNewEvent({ title: "", date: "", time: "", venue: "", image: "" });
    setFormErrors({});
  };

  const removeEvent = (id: string) => {
    updateEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        <p className="text-gray-400 mb-4">
          Add upcoming concerts, shows, or appearances.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="bg-red-900 border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="eventTitle">Event Title</Label>
            <Input
              id="eventTitle"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              placeholder="Enter event title"
              className={`mt-1 bg-white border-gray-600 ${
                formErrors.title ? "border-red-500" : ""
              }`}
            />
            {formErrors.title && (
              <div className="text-red-500 text-sm mt-1">
                {formErrors.title}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventDate">Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className={`mt-1 bg-white border-gray-600 ${
                  formErrors.date ? "border-red-500" : ""
                }`}
              />
              {formErrors.date && (
                <div className="text-red-500 text-sm mt-1">
                  {formErrors.date}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="eventTime">Time</Label>
              <Input
                id="eventTime"
                type="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
                className={`mt-1 bg-white border-gray-600 ${
                  formErrors.time ? "border-red-500" : ""
                }`}
              />
              {formErrors.time && (
                <div className="text-red-500 text-sm mt-1">
                  {formErrors.time}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="eventVenue">Venue</Label>
            <Input
              id="eventVenue"
              value={newEvent.venue}
              onChange={(e) =>
                setNewEvent({ ...newEvent, venue: e.target.value })
              }
              placeholder="Enter venue name"
              className={`mt-1 bg-white border-gray-600 ${
                formErrors.venue ? "border-red-500" : ""
              }`}
            />
            {formErrors.venue && (
              <div className="text-red-500 text-sm mt-1">
                {formErrors.venue}
              </div>
            )}
          </div>

          <div>
            <Label>Event Image (Optional)</Label>
            <div className="mt-1">
              <ImageUploader
                onImageSelected={(url) =>
                  setNewEvent({ ...newEvent, image: url })
                }
                currentImage={newEvent.image}
                aspectRatio="16:9"
                height={150}
              />
            </div>
          </div>

          <Button
            onClick={addEvent}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Нэмэх
          </Button>
        </div>

        <div>
          <Label>Upcoming Events</Label>
          {events.length > 0 ? (
            <div className="mt-1 border border-gray-700 rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-white">
                  <TableRow className="border-gray-700">
                    <TableHead>Event</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id} className="border-gray-700">
                      <TableCell className="bg-white">
                        <div className="flex items-center">
                          {event.image && (
                            <img
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              className="w-12 h-8 object-cover rounded mr-2"
                            />
                          )}
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.venue}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="bg-white">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="bg-white">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEvent(event.id)}
                          className="hover:bg-red-900 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="mt-1 border border-gray-700 rounded-md p-8 flex flex-col items-center justify-center text-gray-500">
              <Calendar className="h-12 w-12 mb-2" />
              <div>No events added yet</div>
              <div className="text-sm">
                Add upcoming events to display them here
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
