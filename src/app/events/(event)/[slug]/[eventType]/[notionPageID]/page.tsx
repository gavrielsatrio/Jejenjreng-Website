'use client';

import Image from "next/image";
import classNames from "classnames";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"

import { fetchEvent } from "@/slices/event";
import { fetchProducts } from "@/slices/products";
import { applyFilterAndSort, fetchOrders } from "@/slices/orders";
import { getIsLoading as getProductsIsLoading } from "@/slices/products/selector";
import { getEvent, getSpreadsheetID, getIsLoading as getEventIsLoading } from "@/slices/event/selector";
import { getOrdersFilters, getIsLoading as getOrderIsLoading, getShownOrders, getOrdersSort } from "@/slices/orders/selector";

import { Badge } from "@/components/Badge"
import { Order } from "@/components/cards/Order";
import { Modal } from "@/components/Modal";
import { Skeleton } from "@/components/skeletons/Skeleton";
import { Container } from "@/components/Container"
import { OrderStatus } from "@/enums/OrderStatus";
import { SkeletonOrder } from "@/components/skeletons/SkeletonOrder";
import { Calendar, Map, ChevronLeft, Filter, Search, Close, Check, SortAZ, SortZA } from "@/icons"

interface EventDetailRouteParams {
  slug: string;
  eventType: string;
  notionPageID: string;
  [key: string]: string;
}

interface EventDetailFilterAndSortState {
  open: boolean;
  filters: Array<string>;
  sort: {
    by: string;
    direction: string;
  };
}

function EventPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notionPageID } = useParams<EventDetailRouteParams>();

  const event = useAppSelector(getEvent);
  const eventSpreadsheetID = useAppSelector(getSpreadsheetID);
  const shownOrders = useAppSelector(getShownOrders);
  const ordersFilters = useAppSelector(getOrdersFilters);
  const ordersSort = useAppSelector(getOrdersSort);
  const isEventLoading = useAppSelector(getEventIsLoading);
  const isOrderLoading = useAppSelector(getOrderIsLoading);
  const isProductsLoading = useAppSelector(getProductsIsLoading);

  const sortableFields = [
    'Timestamp',
    'Name',
    'Email',
    'Phone Number',
    'Purchased Items'
  ];

  const [filterAndSort, setFilterAndSort] = useState<EventDetailFilterAndSortState>({
    open: false,
    filters: [],
    sort: {
      by: '',
      direction: ''
    }
  });

  const handleBack = () => {
    router.back();
  }

  const toggleFilter = () => {
    setFilterAndSort(prev => ({
      ...prev,
      filters: ordersFilters,
      sort: ordersSort,
      open: !prev.open
    }));
  }

  const applyFilter = () => {
    dispatch(applyFilterAndSort({ filters: filterAndSort.filters, sort: filterAndSort.sort }))
    toggleFilter();
  }

  const handleStatusFilter = (status: string) => {
    if (status === '') {
      setFilterAndSort(prev => ({
        ...prev,
        filters: []
      }));

      return;
    }

    if (filterAndSort.filters.includes(status)) {
      setFilterAndSort(prev => ({
        ...prev,
        filters: prev.filters.filter(prevStatus => prevStatus != status)
      }));

      return;
    }

    setFilterAndSort(prev => ({
      ...prev,
      filters: [...prev.filters, status]
    }));
  }

  const handleFieldSort = (field: string) => {
    if (field === '') {
      setFilterAndSort(prev => ({
        ...prev,
        sort: {
          by: '',
          direction: ''
        }
      }));

      return;
    }

    if (filterAndSort.sort.by === field) {
      if (filterAndSort.sort.direction === 'descending') {
        setFilterAndSort(prev => ({
          ...prev,
          sort: {
            by: '',
            direction: ''
          }
        }));
      } else {
        setFilterAndSort(prev => ({
          ...prev,
          sort: {
            ...prev.sort,
            direction: 'descending'
          }
        }));
      }

      return;
    }

    setFilterAndSort(prev => ({
      ...prev,
      sort: {
        ...prev.sort,
        by: field,
        direction: 'ascending'
      }
    }));
  }

  useEffect(() => {
    dispatch(fetchEvent({
      notionPageID
    }));

    dispatch(fetchProducts({
      notionPageID
    }));
  }, []);

  useEffect(() => {
    if (isEventLoading) {
      return;
    }

    dispatch(fetchOrders({
      spreadsheetID: eventSpreadsheetID,
      eventType: event.type
    }));
  }, [isEventLoading]);

  return (
    <Container className="bg-primary px-12 pt-12">
      <div className="min-v-dvh flex flex-col">
        <div className="flex items-center gap-x-1 w-fit cursor-pointer" onClick={handleBack}>
          <ChevronLeft className="size-6 fill-secondary" />
          <span className="text-secondary">Back</span>
        </div>
        {isEventLoading ? (
          <>
            <Skeleton className="h-8 w-64 mt-6" />
            <Skeleton className="h-3 w-48 mt-4" />
            <Skeleton className="h-3 w-40 mt-2" />
            <Skeleton className="h-5 w-24 mt-6" />
          </>
        ) : (
          <>
            <h1 className="font-bold text-3xl mt-6 text-secondary">{event.name}</h1>
            <div className="flex items-center gap-x-2 mt-3">
              <Calendar className="fill-secondary size-4" />
              <p className="text-secondary font-medium text-sm">{event.date}</p>
            </div>
            <div className="flex items-center gap-x-2 mt-2">
              <Map className="fill-secondary size-4" />
              <p className="text-secondary font-medium text-sm">{event.location}</p>
            </div>
            <Badge className="bg-secondary/30 text-secondary font-semibold italic self-start flex-none mt-6">{event.type}</Badge>
          </>
        )}

        <div className="flex justify-between mt-8 items-center">
          <h3 className="text-xl font-bold text-secondary">Orders List</h3>
          <div className="flex items-center gap-x-4">
            <Search className="fill-secondary size-6 cursor-pointer" />
            <Filter className="fill-secondary size-6 cursor-pointer" onClick={toggleFilter} />
          </div>
        </div>
        <div className="grid grid-cols-2 mt-4 mb-8 gap-6">
          {isEventLoading || isOrderLoading || isProductsLoading ? (
            <SkeletonOrder count={6} />
          ) : (
            <>
              {shownOrders.length > 0 ? (
                <>
                  {shownOrders.map(order => (
                    <Order
                      key={order.timestamp}
                      order={order} />
                  ))}
                </>
              ) : (
                <div className="col-span-2 flex flex-col items-center justify-center p-8 gap-y-4">
                  <Image src="/assets/wiwol-confused-transparent.png" width={510} height={489} alt="Empty Order Image" className="w-1/8 object-contain" />
                  <h4 className="text-black/60 text-center">Oh no!,<br />There are still no orders for this event.</h4>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {filterAndSort.open && (
        <Modal onClickOutside={toggleFilter}>
          <div className="bg-white rounded-lg p-6 w-1/2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xl">Filter and Sort</h4>
              <div className="flex gap-x-2 items-center">
                <Close className="size-6 fill-black cursor-pointer" onClick={toggleFilter} />
              </div>
            </div>

            <hr className="border-black/15 my-4" />

            <p className="font-semibold">Status</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.values(OrderStatus).map((status, index) => (
                <Badge
                  key={index}
                  onClick={() => handleStatusFilter(status)}
                  className={classNames('flex items-center gap-x-2 cursor-pointer', {
                    'border border-black/15 text-black/60 hover:bg-black/5': !filterAndSort.filters.includes(status),
                    'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30': filterAndSort.filters.includes(status)
                  })}
                >
                  {filterAndSort.filters.includes(status) && (
                    <Check className="size-4 fill-blue-500" />
                  )}
                  <span>{status}</span>
                </Badge>
              ))}
            </div>
            <p className="font-semibold mt-4">Sort By</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {sortableFields.map((field, index) => (
                <Badge
                  key={index}
                  onClick={() => handleFieldSort(field)}
                  className={classNames('flex items-center gap-x-2 cursor-pointer', {
                    'border border-black/15 text-black/60 hover:bg-black/5': filterAndSort.sort.by !== field,
                    'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30': filterAndSort.sort.by === field
                  })}
                >
                  {filterAndSort.sort.by === field && (
                    <>
                      {filterAndSort.sort.direction === 'ascending' ? (
                        <SortAZ className="size-4 fill-blue-500" />
                      ) : (
                        <SortZA className="size-4 fill-blue-500" />
                      )}
                    </>
                  )}
                  <span>{field}</span>
                </Badge>
              ))}
            </div>

            <hr className="border-black/15 my-4" />

            <div className="flex items-center justify-between">
              <button className="font-bold text-blue-500 cursor-pointer" onClick={() => {
                handleStatusFilter('');
                handleFieldSort('');
              }}>Reset</button>
              <div className="flex gap-x-2">
                <button className="px-8 py-2 rounded-full font-semibold cursor-pointer border border-black/60 text-black/60 hover:bg-black/5" onClick={toggleFilter}>Cancel</button>
                <button className="px-8 py-2 rounded-full font-semibold cursor-pointer bg-blue-500 hover:bg-blue-600 text-white" onClick={applyFilter}>Apply</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Container>
  )
}

export default EventPage;