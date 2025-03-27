import { Envelope, Map, Phone, Receipt, Truck } from "@/icons"
import { Badge } from "@/components/Badge"
import { IOrder } from "@/interfaces/models/IOrder"

interface OrderProps {
  order: IOrder
}

function Order({ order }: OrderProps) {
  return (
    <div className={`border border-[#C8C8C8] rounded-lg shadow-sm bg-white p-6 flex flex-col gap-x-6`}>
      <div className="flex justify-between">
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
        <Badge className="bg-sky-500/20 text-sky-500 font-semibold italic self-start flex-none cursor-pointer">{order.status}</Badge>
      </div>
      <div className="flex items-center justify-between mt-6">
        <Badge className="bg-orange-500/20 text-orange-500 font-semibold">{order.purchasedProducts.reduce((prev, curr) => (prev + curr.qty), 0)} item(s)</Badge>
        <div className="flex items-center gap-x-2">
          <button className="flex items-center gap-x-2 px-4 py-2 text-sm font-bold bg-blue-500 hover:bg-blue-600 rounded-full text-white cursor-pointer">
            <Truck className="fill-white size-5" />
            <span>Shipping Info</span>
          </button>
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