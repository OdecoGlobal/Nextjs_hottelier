import StatusBadge from '@/components/status-badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/lib/utils';
import { HotelType } from '@/types';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { ModeToggle } from '../../header/mode-toggle';
import AdminHotelReviewDialog from './hotel-review-dialog';

const HotelListingComponents = ({ hotels }: { hotels: HotelType[] }) => {
  return (
    <Card>
      <CardHeader>
        All Hotels <ModeToggle />
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader className="bg-linear-(--brand-sidebar-gradient) hover:bg-brand-bg">
            <TableRow>
              <TableHead className="text-brand-secondary">Hotel</TableHead>
              <TableHead className="text-brand-secondary">Status</TableHead>
              <TableHead className="text-brand-secondary hidden md:block">
                Date
              </TableHead>
              <TableHead className="text-brand-secondary">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {hotels.map(hotel => {
              const { basicInfo, id, status, updatedAt, images } = hotel;
              const img = images.filter(img => img.imageType === 'COVER')[0]
                .imageUrl;

              return (
                <TableRow
                  key={id}
                  className="border-b-brand-primary hover:bg-brand-primary/20"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Image
                        priority
                        src={img}
                        alt={basicInfo.name}
                        width={70}
                        height={40}
                        className="border border-brand-primary object-cover overflow-clip rounded-lg"
                      />
                      <div className="flex flex-col font-semibold">
                        <span className="text-brand-secondary">
                          {basicInfo.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {basicInfo.address}, {basicInfo.city}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={status} />
                  </TableCell>

                  <TableCell className="text-muted-foreground text-xs font-semibold hidden md:block">
                    {formatDateTime(updatedAt).dateTime}
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <AdminHotelReviewDialog id={id} />
                      <div className="w-fit p-2 bg-destructive rounded-xl">
                        <Trash2 className="w-6 h-6" />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HotelListingComponents;
