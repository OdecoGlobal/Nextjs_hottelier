import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Building2, Plus } from 'lucide-react';
import Link from 'next/link';

const StartNewHotel = () => (
  <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
    <CardContent className="pt-6 text-center h-full flex flex-col justify-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Plus size={32} className="text-blue-600" />
      </div>
      <CardTitle className="text-xl mb-3">Add New Hotel</CardTitle>
      <CardDescription className="mb-6">
        Start fresh with a new hotel listing
      </CardDescription>
    </CardContent>
    <CardFooter>
      <Button
        asChild
        className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group"
      >
        <Link href="/agent/onboarding/basic-info">
          <Building2 size={16} className="mr-2" />
          Start New Hotel
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default StartNewHotel;
