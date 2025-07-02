// components/breadcrumb.tsx
'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(segment => segment !== '');

  const getHref = (index: number) => {
    return '/' + segments.slice(0, index + 1).join('/');
  };

  // Show dropdown if more than 3 segments
  const shouldCollapse = segments.length > 3;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.length > 0 && <BreadcrumbSeparator />}

        {shouldCollapse ? (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {segments.slice(0, -2).map((segment, index) => (
                    <DropdownMenuItem key={index} asChild>
                      <Link href={getHref(index)} className="capitalize">
                        {segment.replace(/-/g, ' ')}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            {segments.slice(-2).map((segment, index) => {
              const adjustedIndex = segments.length - 2 + index;
              const isLast = adjustedIndex === segments.length - 1;
              const href = getHref(adjustedIndex);
              const formattedSegment = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              return (
                <React.Fragment key={adjustedIndex}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={href}>{formattedSegment}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </>
        ) : (
          segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const href = getHref(index);
            const formattedSegment = segment
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem key={index}>
                  {isLast ? (
                    <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{formattedSegment}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
