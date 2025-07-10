'use client';
import StatusBadge from '@/components/status-badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/lib/utils';
import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { useOnboardHotel } from '@/hooks/use-onboard-hotels';
import { useState } from 'react';
import LoadingComponent from '@/components/loading-state';
import PaginationComponent from '../../pagination';
import Link from 'next/link';

const AdminHotelListComponent = () => {
  const [params, setParams] = useState({
    status: '',
    page: '1',
    limit: '',
    search: '',
  });
  const { data, isPending, error } = useOnboardHotel({
    page: params.page,
    status: params.status,
    limit: params.limit,
    search: params.search,
  });

  if (isPending) {
    return <LoadingComponent />;
  }
  if (error) {
    return <div>An error occured while getting data {error.message}</div>;
  }
  const { data: hotels, totalPages } = data;
  console.log(data);

  return (
    <section className="space-y-4">
      <Card className="border-glow space-y-5">
        <CardHeader>
          <CardTitle className="text-brand-secondary font-bold text-xl md:text-2xl lg:text-3xl ">
            Hotel Management
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="border-glow">
        <CardHeader>
          <CardTitle>All Hotels</CardTitle>
          <CardDescription>
            <Input
              type="search"
              onChange={e =>
                setParams(prev => ({ ...prev, search: e.target.value }))
              }
            />
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-linear-(--gradient-200) hover:bg-linear-(--gradient-200) hover:opacity-95 ">
                <TableHead className="text-brand-secondary">Hotel</TableHead>
                <TableHead className="text-brand-secondary">Status</TableHead>
                <TableHead className="text-brand-secondary ">Date</TableHead>
                <TableHead className="text-brand-secondary">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {hotels.map(hotel => {
                const { location, id, status, updatedAt, images, name } = hotel;

                const img = images[0]?.imageUrl;

                return (
                  <TableRow
                    key={id}
                    className="border-b-brand-primary-200 hover:bg-glass-bg"
                  >
                    <TableCell>
                      <div className="flex flex-col lg:flex-row items-center gap-2">
                        {img ? (
                          <Image
                            priority
                            src={img}
                            alt={name}
                            width={70}
                            height={40}
                            className="border border-brand-primary object-cover overflow-clip rounded-lg"
                          />
                        ) : (
                          <div className="w-[70px] h-[40px] bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                            No image
                          </div>
                        )}

                        <div className="flex flex-col font-semibold">
                          <span className="text-brand-secondary">{name}</span>
                          <span className="text-muted-foreground text-xs truncate">
                            {location.length > 20
                              ? `${location.substring(0, 20)}...`
                              : location}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <StatusBadge status={status} />
                    </TableCell>

                    <TableCell className="text-muted-foreground text-xs font-semibold">
                      <p>{formatDateTime(updatedAt).dateOnly}</p>
                      <p>{formatDateTime(updatedAt).timeOnly}</p>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/hotels/${id}`}
                          className=" w-8 h-8  flex items-center justify-center rounded-lg bg-brand-primary-200/50"
                        >
                          <Edit className="w-5 h-5 text-slate-50" />
                        </Link>
                        <div className="w-8 h-8  flex items-center justify-center rounded-lg  bg-red-100">
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <PaginationComponent
            page={Number(params.page) || 1}
            totalPages={totalPages}
            onPageChange={newPage =>
              setParams(prev => ({
                ...prev,
                page: newPage.toString(),
              }))
            }
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default AdminHotelListComponent;
