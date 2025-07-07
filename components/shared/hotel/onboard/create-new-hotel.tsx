'use client';
import SubmitFormButton from '@/components/submit-form-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCreateNewHotel } from '@/hooks/use-onboard-hotels';
import { createHotelSchema } from '@/lib/schemas/validator';
import { cn } from '@/lib/utils';
import { NewHotelType } from '@/types';
import { locationData } from '@/utils/generate-location';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, Info } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateNewHotel = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateNewHotel();

  const form = useForm<NewHotelType>({
    resolver: zodResolver(createHotelSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      officialEmail: '',
      location: '',
    },
  });

  const { control, handleSubmit } = form;
  const onSubmit = (values: NewHotelType) => {
    mutate(values);
  };
  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 max-w-4xl mx-auto"
          >
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Hotel Name</FormLabel>
                  <div className="flex justify-center items-center">
                    <FormControl>
                      <Input
                        {...field}
                        className="brand-input"
                        autoComplete="hotel-name"
                      />
                    </FormControl>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="w-56">
                        <p>
                          Use the official name of your property, for example
                          the one you use on your website. Avoid use of special
                          characters. The name should ideally not be less than
                          35 characters for search engine optimization.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="officialEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="brand-input"
                      autoComplete="hotel-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="brand-input"
                      autoComplete="hotel-phone-number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          type="button"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? locationData.find(loc => loc === field.value)
                            : 'Select location'}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[--radix-popover-trigger-width] p-0"
                      align="center"
                    >
                      <Command>
                        <CommandInput
                          placeholder="Type your location"
                          value={field.value}
                          onValueChange={field.onChange}
                        />

                        <CommandList>
                          <CommandEmpty>No result found</CommandEmpty>
                          {locationData.map(data =>
                            data ? (
                              <CommandItem
                                key={data}
                                value={data}
                                onSelect={() => {
                                  form.setValue('location', data);
                                  setOpen(false);
                                }}
                              >
                                {data}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    data === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ) : null,
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitFormButton action="submit" isPending={isPending} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateNewHotel;
