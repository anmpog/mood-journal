import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Pagination, PaginationContent, PaginationItem } from './ui/pagination'

interface OffsetPaginationProps {
  totalRecords: number
  recordsPerPage: number
  name: string
}

export default function OffsetPagination({
  totalRecords,
  recordsPerPage = 4,
  name,
}: OffsetPaginationProps) {
  const minPageValue = 1
  // const maxPageValue = Math.ceil(totalRecords / recordsPerPage)
  const maxPageValue = 20
  const pageNumbers: number[] = []
  const windowSize = 6

  for (let i = minPageValue; i < maxPageValue; i++) {
    if (i === minPageValue) {
      pageNumbers.push(i)
    }
  }

  const [currentPage, setCurrentPage] = useState<number>(minPageValue)

  const handleChangePage = (linkIndex: number) => {
    if (linkIndex + 1 > maxPageValue || linkIndex + 1 < minPageValue) {
      throw new Error('Invalid page value.')
    }

    setCurrentPage(linkIndex + 1)
  }

  const handleIncrementPageNumber = () => {
    setCurrentPage((prev) => Math.min(prev + 1, maxPageValue))
  }

  const handleDecrementPageNumber = () => {
    setCurrentPage((prev) => Math.max(prev - 1, minPageValue))
  }
  return (
    <Pagination className='debug' aria-label={name ? name : 'pagination'}>
      <PaginationContent className='debug'>
        <PaginationItem>
          <Button
            onClick={() => handleDecrementPageNumber()}
            variant='ghost'
            size='icon-sm'
            disabled={currentPage === minPageValue}
          >
            <ChevronLeftIcon />
          </Button>
        </PaginationItem>
        {pageNumbers.map((_, index) => {
          return (
            <PaginationItem key={index}>
              <Button
                onClick={() => handleChangePage(index)}
                className={
                  currentPage === index + 1 ? 'bg-gray-200' : 'bg-none'
                }
                size={'icon-sm'}
                variant={currentPage === index + 1 ? 'outline' : 'ghost'}
              >
                {index + 1}
              </Button>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <Button
            onClick={() => handleIncrementPageNumber()}
            variant='ghost'
            size='icon-sm'
            disabled={currentPage === maxPageValue}
          >
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
