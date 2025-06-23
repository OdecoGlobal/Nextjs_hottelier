import DeleteDialog from '@/components/delete.dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { deleteRoom } from '@/lib/actions/delete.actions';
import { formatValueString } from '@/lib/utils';
import { GetRoomType, Roles } from '@/types';
import { House } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type RoomProp = {
  rooms: GetRoomType[];
  role: Roles;
};

const ShowRooms = ({ rooms, role }: RoomProp) => {
  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      {rooms.length === 0 && role !== 'USER' && (
        <div className="text-center py-16">
          <div className="bg-muted-foreground rounded-lg p-8 border-2 border-dashed border-blue-600">
            <House />
            <h3 className="text-xl font-semibold  mb-2">No Rooms Added</h3>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add Your First Room
            </Button>
          </div>
        </div>
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
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 ">
                        <Link href={url} className="text-slate-50">
                          View Room Details
                        </Link>
                      </Button>
                      {role !== 'USER' && (
                        <div className="flex justify-evenly">
                          <Button
                            asChild
                            type="button"
                            variant="outline"
                            className=""
                          >
                            <Link
                              href={`/${role.toLowerCase()}/onboarding/${
                                room.hotelId
                              }/rooms/${room.id}/rates`}
                            >
                              ✏️ Edit Room Availability
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
