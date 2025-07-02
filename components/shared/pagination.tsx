'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getVisiblePages } from '@/lib/utils';
import { Button } from '../ui/button';

interface PaginationComponentProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({
  page,
  totalPages,
  onPageChange,
}: PaginationComponentProps) => {
  const visiblePages = getVisiblePages(page, totalPages);

  const handlePageClick = (p: number) => {
    if (p !== page) onPageChange(p);
  };

  const handleClick = (type: 'prev' | 'next') => {
    if (type === 'next' && page < totalPages) {
      onPageChange(page + 1);
    } else if (type === 'prev' && page > 1) {
      onPageChange(page - 1);
    }
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => handleClick('prev')}
            disabled={page <= 1}
          >
            <PaginationPrevious />
          </Button>
        </PaginationItem>
        {visiblePages.map((p, i) => {
          if (p === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => handlePageClick(p)}
              >
                {p} 
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => handleClick('next')}
            disabled={page >= totalPages}
          >
            <PaginationNext />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
