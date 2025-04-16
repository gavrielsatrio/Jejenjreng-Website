import classNames from "classnames"

import { useState } from "react"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { updateOrderStatus } from "@/slices/orders"
import { extractSpreadsheetID } from "@/utils/spreadsheets/ID"

import { IOrder } from "@/interfaces/models/IOrder"

import { Badge } from "@/components/Badge"
import { EventType } from "@/enums/EventType"
import { OrderStatus } from "@/enums/OrderStatus"
import { Close, Envelope, Map, Phone, Receipt, Truck } from "@/icons"

interface OrderProps {
  order: IOrder;
  eventType: string;
  spreadsheetLink: string;
}

function Order({ order, eventType, spreadsheetLink }: OrderProps) {
  const dispatch = useAppDispatch();
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);

  const toggleStatusModal = () => {
    setIsStatusModalVisible(prev => !prev);
  }

  const handleUpdateStatus = async (status: string) => {
    toggleStatusModal();

    const spreadsheetID = extractSpreadsheetID(spreadsheetLink);
    await dispatch(updateOrderStatus({
      spreadsheetID: spreadsheetID,
      rowNo: order.rowNo,
      status
    }));
  }

  return (
    <div className={`border border-[#C8C8C8] rounded-lg shadow-sm bg-white p-6 flex flex-col gap-x-6`}>
      <div className="relative flex justify-between">
        <div>
          <h3 className="font-bold text-lg">{order.name}</h3>
          <p className="text-sm text-black/40">placed order at {order.timestamp}</p>

          <div className="flex items-center gap-x-2 mt-4">
            <Envelope className="fill-black/60 size-4 flex-none" />
            <p className="text-black/60 text-sm">{order.email}</p>
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <Phone className="fill-black/60 size-4 flex-none" />
            <p className="text-black/60 text-sm">{order.phoneNumber}</p>
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <Map className="fill-black/60 size-4 flex-none" />
            <p className="text-black/60 text-sm">{order.address}</p>
          </div>
        </div>
        <Badge
          onClick={toggleStatusModal}
          className={classNames('font-semibold italic self-start flex-none cursor-pointer', {
            'bg-amber-500/20 text-amber-500 hover:bg-amber-600/20 hover:text-amber-600': order.status === OrderStatus.PENDING,
            'bg-teal-500/20 text-teal-500 hover:bg-teal-600/20 hover:text-teal-600': order.status === OrderStatus.PAID,
            'bg-rose-500/20 text-rose-500 hover:bg-rose-600/20 hover:text-rose-600': order.status === OrderStatus.PACKED
          })}
        >
          {order.status}
        </Badge>

        {isStatusModalVisible && (
          <div className="flex flex-col bg-white border border-[#C8C8C8] absolute top-0 right-0 p-3 rounded-sm">
            <p className="text-sm font-semibold">Select order status:</p>
            <div className="flex items-center gap-x-2 mt-2">
              {Object.values(OrderStatus).map((status, index) => (
                <Badge
                  key={index}
                  onClick={() => handleUpdateStatus(status)}
                  className={classNames('font-semibold italic self-start flex-none cursor-pointer', {
                    'bg-amber-500/20 text-amber-500 hover:bg-amber-600/20 hover:text-amber-600': status === OrderStatus.PENDING,
                    'bg-teal-500/20 text-teal-500 hover:bg-teal-600/20 hover:text-teal-600': status === OrderStatus.PAID,
                    'bg-rose-500/20 text-rose-500 hover:bg-rose-600/20 hover:text-rose-600': status === OrderStatus.PACKED
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
        <Badge className="bg-blue-500/20 text-blue-500 font-semibold">{order.purchasedProducts.reduce((prev, curr) => (prev + curr.qty), 0)} items</Badge>
        <div className="flex items-center gap-x-2">
          {eventType === EventType.MAIL_ORDER && (
            <button className="flex items-center gap-x-2 px-4 py-2 text-sm font-bold bg-blue-500 hover:bg-blue-600 rounded-full text-white cursor-pointer">
              <Truck className="fill-white size-5" />
              <span>Shipping Info</span>
            </button>
          )}
          <button className="flex items-center gap-x-2 px-4 py-2 text-sm font-bold bg-emerald-500 hover:bg-emerald-600 rounded-full text-white cursor-pointer">
            <Receipt className="fill-white size-5" />
            <span>Invoice</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export { Order }