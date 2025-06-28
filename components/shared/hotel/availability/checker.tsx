'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';
import { GetRoomType, AdminAgentRole, AvailabilityType } from '@/types';
import { formatDisplayDate, generateDateRange } from '@/utils/date-utils';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';

import { useState } from 'react';
import RoomAvailabilityForm from '.';
import { useRangeSize } from '@/hooks/use-range';
import HotelCreationSteps from '../creation-steps';

type RoomAvailabilityProp = {
  room: GetRoomType;
  hotelId: string;
  roomId: string;
  role: AdminAgentRole;
};

const AvailabilityRoomSetter = ({
  room,
  hotelId,
  roomId,
  role,
}: RoomAvailabilityProp) => {
  const range = useRangeSize();
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedAvailability, setSelectedAvailability] =
    useState<AvailabilityType | null>(null);

  const dateRange = generateDateRange(currentDate, range);
  const findAvailability = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    const match = room.roomAvailability.find(entry => {
      const aDate = new Date(entry.date);
      aDate.setHours(0, 0, 0, 0);
      return aDate.getTime() === d.getTime();
    });

    return (
      match ?? {
        date: d,
        isAvailable: true,
        inventory: room.totalRooms,
        price: room.baseRate,
      }
    );
  };

  const navigateWeek = (dir: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + dir * range);
    setCurrentDate(newDate);
  };

  const gridClass = {
    1: 'grid-cols-[minmax(100px,1fr)_repeat(1,minmax(60px,1fr))]',
    2: 'grid-cols-[minmax(100px,1fr)_repeat(2,minmax(60px,1fr))]',
    3: 'grid-cols-[minmax(100px,1fr)_repeat(3,minmax(60px,1fr))]',
    5: 'grid-cols-[minmax(100px,1fr)_repeat(5,minmax(60px,1fr))]',
    7: 'grid-cols-[minmax(100px,1fr)_repeat(7,minmax(60px,1fr))]',
  }[range];
  return (
    <section className="flex flex-col md:flex-row md:min-h-screen">
      <HotelCreationSteps current={5} role={role} />
      <div className=" flex-1 py-10 px-5">
        <Card className="w-full  mx-auto mt-4 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigateWeek(-1)}
                size="icon"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigateWeek(1)}
                size="icon"
              >
                <ChevronRight />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Week of {currentDate.toDateString()}
            </div>
          </div>

          {/* Grid header */}
          <div className={cn('grid gap-0 mb-2 items-center', gridClass)}>
            <p className=" text-sm font-semibold">{room.name}</p>
            {dateRange.map((date, i) => {
              const { day, month, weekday } = formatDisplayDate(date);
              return (
                <div key={i} className="text-xs px-1 py-2">
                  <div>{month}</div>
                  <div className="font-bold">{day}</div>
                  <div className="text-muted-foreground">{weekday}</div>
                </div>
              );
            })}
          </div>

          {/* Availability row */}
          <div className={cn('grid gap-0 mb-2 items-center', gridClass)}>
            <p className=" text-sm font-semibold">Availability</p>
            {dateRange.map((date, i) => {
              const entry = findAvailability(date);

              return (
                <div
                  key={i}
                  className={cn(
                    'flex items-center justify-center py-3 border-r border-b cursor-pointer hover:opacity-80',
                    entry.isAvailable ? 'bg-green-500' : 'bg-destructive',
                  )}
                  onClick={() => setSelectedAvailability(entry)}
                >
                  {entry.isAvailable ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Inventory row */}
          <div className={cn('grid gap-0 mb-2 items-center', gridClass)}>
            <p className=" text-sm font-semibold">Inventory</p>
            {dateRange.map((date, i) => {
              const entry = findAvailability(date);
              return (
                <div
                  key={i}
                  className="py-2 border text-sm text-center cursor-pointer"
                  onClick={() => setSelectedAvailability(entry)}
                >
                  {entry.inventory}
                </div>
              );
            })}
          </div>

          {/* Price row */}
          <div className={cn('grid gap-0 mb-2 items-center', gridClass)}>
            <p className=" text-sm font-semibold">Price</p>
            {dateRange.map((date, i) => {
              const entry = findAvailability(date);
              return (
                <div
                  key={i}
                  className="py-2 border text-sm text-center cursor-pointer"
                  onClick={() => setSelectedAvailability(entry)}
                >
                  ₦{entry.price}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Dialog
        open={!!selectedAvailability}
        onOpenChange={() => setSelectedAvailability(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogTitle />
          <DialogDescription />
          {selectedAvailability && (
            <RoomAvailabilityForm
              room={room}
              hotelId={hotelId}
              roomId={roomId}
              role={role}
              initialData={selectedAvailability}
              onClose={() => setSelectedAvailability(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AvailabilityRoomSetter;
