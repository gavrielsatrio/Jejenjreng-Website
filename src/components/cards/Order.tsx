import classNames from "classnames"

import { useState } from "react"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"

import { updateOrderStatus } from "@/slices/orders"
import { getEvent, getSpreadsheetID } from "@/slices/event/selector"

import { IOrder } from "@/interfaces/models/IOrder"

import { Badge } from "@/components/Badge"
import { Invoice } from "@/components/Invoice"
import { EventType } from "@/enums/EventType"
import { OrderStatus } from "@/enums/OrderStatus"
import { Close, Envelope, Loader, Map, Phone, Receipt, Truck } from "@/icons"

interface OrderProps {
  order: IOrder;
}

function Order({ order }: OrderProps) {
  const dispatch = useAppDispatch();

  const event = useAppSelector(getEvent);
  const eventSpreadsheetID = useAppSelector(getSpreadsheetID);

  const [isOrderStatusLoading, setIsOrderStatusLoading] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);

  const toggleStatusModal = () => {
    setIsStatusModalVisible(prev => !prev);
  }

  const handleUpdateStatus = async (status: string) => {
    toggleStatusModal();
    setIsOrderStatusLoading(true);

    await dispatch(updateOrderStatus({
      spreadsheetID: eventSpreadsheetID,
      rowNo: order.rowNo,
      status
    }));

    setIsOrderStatusLoading(false);
  }

  const handleOpenInvoice = () => {
    setIsInvoiceOpen(true);
  }

  const handleOpenShippingInfo = () => {

  }

  return (
    <div className={`rounded-lg shadow-md bg-secondary-lighter p-6 flex flex-col gap-x-6 relative overflow-hidden`}>
      <div className="relative flex justify-between grow">
        <div>
          <h3 className="font-bold text-lg text-primary">{order.customer}</h3>
          <p className="text-sm text-primary-light">placed order at {order.timestamp}</p>

          <div className="flex items-center gap-x-2 mt-4">
            <Envelope className="fill-primary-light size-4 flex-none" />
            <p className="text-primary-light text-sm">{order.email}</p>
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <Phone className="fill-primary-light size-4 flex-none" />
            <p className="text-primary-light text-sm">{order.phoneNumber}</p>
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <Map className="fill-primary-light size-4 flex-none" />
            <p className="text-primary-light text-sm">{order.address}</p>
          </div>
        </div>

        <Badge
          onClick={toggleStatusModal}
          loading={isOrderStatusLoading}
          className={classNames('font-semibold italic self-start flex-none cursor-pointer', {
            'bg-red-500/20 text-red-500 fill-red-500 hover:bg-red-600/20 hover:text-red-600 hover:fill-red-600': order.status === OrderStatus.PENDING,
            'bg-blue-500/20 text-blue-500 fill-blue-500 hover:bg-blue-600/20 hover:text-blue-600 hover:fill-blue-600': order.status === OrderStatus.PAID,
            'bg-emerald-500/20 text-emerald-500 fill-emerald-500 hover:bg-emerald-600/20 hover:text-emerald-600 hover:fill-emerald-600': order.status === OrderStatus.PACKED
          })}
        >
          {order.status}
        </Badge>

        {isStatusModalVisible && (
          <div className="flex flex-col bg-secondary-lighter border border-[#C8C8C8] absolute top-0 right-0 p-3 rounded-sm">
            <p className="text-sm font-semibold">Select order status:</p>
            <div className="flex items-center gap-x-2 mt-2">
              {Object.values(OrderStatus).map((status, index) => (
                <Badge
                  key={index}
                  onClick={() => handleUpdateStatus(status)}
                  className={classNames('font-semibold italic self-start flex-none cursor-pointer', {
                    'bg-red-500/20 text-red-500 hover:bg-red-600/20 hover:text-red-600': status === OrderStatus.PENDING,
                    'bg-blue-500/20 text-blue-500 hover:bg-blue-600/20 hover:text-blue-600': status === OrderStatus.PAID,
                    'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-600/20 hover:text-emerald-600': status === OrderStatus.PACKED
                  })}
                >
                  {status}
                </Badge>
              ))}
            </div>

            <Close className="fill-black/60 hover:fill-black/75 size-4 flex-none absolute top-3 right-3 cursor-pointer" onClick={toggleStatusModal} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-6">
        <Badge className="bg-orange-500/20 text-orange-500 font-semibold">{order.purchasedProducts.reduce((prev, curr) => (prev + curr.qty), 0)} items</Badge>
        <div className="flex items-center gap-x-2">
          {event.type === EventType.MAIL_ORDER && (
            <button className="flex items-center gap-x-2 px-4 py-2 text-sm font-bold bg-indigo-500 hover:bg-indigo-600 rounded-full text-white cursor-pointer" onClick={handleOpenShippingInfo}>
              <Truck className="fill-white size-5" />
              <span>Shipping Info</span>
            </button>
          )}
          <button className="flex items-center gap-x-2 px-4 py-2 text-sm font-bold bg-emerald-500 hover:bg-emerald-600 rounded-full text-white cursor-pointer" onClick={handleOpenInvoice} disabled={isInvoiceOpen}>
            {isInvoiceOpen ? (
              <Loader className="size-5 fill-white animate-spin duration-1000" />
            ) : (
              <>
                <Receipt className="fill-white size-5" />
                <span>Invoice</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isInvoiceOpen && (
        <Invoice className="top-0 left-0 -z-10" eventName={`${event.name} ${event.type}`} orderNumber={order.rowNo - 1} purchasedProducts={order.purchasedProducts} recipient={order.customer} onFinishGenerated={() => setIsInvoiceOpen(false)} key={order.timestamp} />
      )}
    </div>
  )
}

export { Order }