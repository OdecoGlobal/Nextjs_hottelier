import DeleteDialog from '@/components/delete.dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { deleteRoom } from '@/lib/actions/delete.actions';
import { formatValueString } from '@/lib/utils';
import { GetRoomType, Roles } from '@/types';
import { House, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type RoomProp = {
  rooms: GetRoomType[];
  role: Roles;
  hotelId: string;
};

const ShowRooms = ({ rooms, role, hotelId }: RoomProp) => {
  return (
    <section className="py-8 px-4 max-w-7xl mx-auto space-y-8">
      {rooms.length === 0 && role !== 'USER' && (
        <Card className="border-2 border-dashed border-gray-300 hover:border-brand-secondary hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6 text-center h-full flex flex-col justify-center">
            <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus
                size={32}
                className="text-brand-primary-border-brand-primary-200"
              />
            </div>
            <h3 className="text-xl font-semibold  mb-2">No Rooms Added</h3>
          </CardContent>

          <CardFooter>
            <Button
              asChild
              className="w-full bg-white border-2 border-brand-primary-200 text-brand-primary-border-brand-primary-200 hover:bg-brand-primary-border-brand-primary-200 hover:text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group"
            >
              <Link href={`/onboard/hotel/${hotelId}/rooms`}>
                <House size={16} className="mr-2" />
                Add Your First Room
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      {rooms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(room => {
            const url = `/hotels/${room.hotelId}/rooms/${room.id}`;
            const deleteAction = async () => {
              'use server';
              return await deleteRoom(room.hotelId, room.id);
            };
            return (
              <Card key={room.id} className="pt-0 overflow-hidden">
                <CardHeader className="relative h-48 overflow-hidden">
                  <Image
                    src={room.roomImages[0]?.imageUrl}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  <Badge className="absolute top-4 right-4">
                    ₦{room.baseRate}/night
                  </Badge>

                  <Badge className="absolute bottom-4 left-4">
                    {room.amenities.roomSize}{' '}
                    {room.amenities.roomSizeUnit === 'SQUARE_FEET'
                      ? 'sq ft'
                      : 'sqm'}
                  </Badge>
                </CardHeader>
                {/* CONTENT */}
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-bold text-muted-foreground mb-2">
                    {room.name}
                  </h3>

                  <div className="flex items-center gap-1">
                    <span>👥</span>
                    <span>{room.maxOccupancy} guests</span>
                  </div>

                  <div className="space-y-3">
                    {/* AMENITIES */}

                    <div className="flex flex-wrap gap-2">
                      {room.amenities.showerType && (
                        <Badge variant="outline">
                          {formatValueString(room.amenities.showerType)}
                        </Badge>
                      )}
                      {room.amenities.roomViewType && (
                        <Badge variant="outline">
                          {formatValueString(room.amenities.roomViewType)}
                        </Badge>
                      )}
                      {room.amenities.outDoorSpaceType && (
                        <Badge variant="outline">
                          {formatValueString(room.amenities.outDoorSpaceType)}
                        </Badge>
                      )}

                      {room.amenities.roomEssential &&
                        room.amenities.roomEssential.length > 0 &&
                        room.amenities.roomEssential
                          .slice(0, 2)
                          .map((essential, i) => (
                            <Badge key={i}>{essential}</Badge>
                          ))}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button className="w-full bg-brand-primary-100 border-brand-primary-200 hover:bg-glow">
                        <Link href={url} className="text-slate-50">
                          View Room Details
                        </Link>
                      </Button>
                      {role !== 'USER' && (
                        <div className="flex gap-2">
                          <Button
                            asChild
                            type="button"
                            variant="outline"
                            className=""
                          >
                            <Link
                              href={`/onboard/hotel/${
                                room.hotelId
                              }/rooms/${room.id}/rates`}
                            >
                              ✏️ Edit Availability
                            </Link>
                          </Button>
                          <DeleteDialog action={deleteAction} />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ShowRooms;
