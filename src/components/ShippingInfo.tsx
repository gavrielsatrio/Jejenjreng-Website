'use client'

import html2canvas from "html2canvas-pro";
import { useEffect, useRef } from "react"

interface ShipppingInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  eventName: string;
  recipient: string;
  address: string;
  phoneNumber: string;
  onFinishGenerated?: () => void;
}

function ShippingInfo({ 
  address,
  className,
  recipient,
  eventName,
  phoneNumber,
  onFinishGenerated = () => {}
}: ShipppingInfoProps) {
  const shippingInfoRef = useRef<HTMLDivElement>(null);

  const saveShippingInfo = async () => {
    if (!shippingInfoRef.current || !shippingInfoRef) {
      return;
    }

    // Scale the canvas into A6 width
    const canvas = await html2canvas(shippingInfoRef.current!, {
      logging: false,
      scale: 2,
    });

    const dataURL = canvas.toDataURL("image/jpeg");

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `SHIPPING-${eventName.toUpperCase()}-${recipient.toUpperCase()}.jpeg`;
    link.click();

    onFinishGenerated();
  }

  useEffect(() => {
    saveShippingInfo();
  }, []);

  return (
    <div className={`absolute w-[525px] h-[740px] bg-primary px-6 py-10 overflow-hidden flex flex-col ${className}`} ref={shippingInfoRef}>
      <img src="/assets/jeje2.png" loading="lazy" alt="Fox Image" className="absolute -bottom-20 -left-8 z-10 w-1/2 object-contain object-right" />
      <img src="/assets/ornament-transparent.png" loading="lazy" alt="Ornament Image" className="absolute top-0 right-0 z-0 h-80 translate-x-1/2 -translate-y-1/3" />
      <img src="/assets/ornament-transparent.png" loading="lazy" alt="Ornament Image" className="absolute bottom-0 left-0 z-0 h-[30rem] -translate-x-1/2 translate-y-8" />
      <img src="/assets/ornament2-transparent.png" loading="lazy" alt="Ornament Image" className="absolute top-0 left-0 z-10 size-24" />

      <div className="relative grow bg-secondary-lighter rounded-3xl flex flex-col p-6 tracking-widest z-30">
        <img src="/assets/ornament2-transparent.png" loading="lazy" alt="Ornament Image" className="absolute bottom-0 right-0 z-10 size-24 translate-x-1/4 translate-y-1/2" />

        <h3 className="text-2xl text-primary tracking-widest font-shrikhand uppercase">AFTERSALE PACKAGE</h3>
        <hr className="border-secondary-dark my-2" />
        
        <div className="p-4 font-hammersmith-one text-xs uppercase leading-loose h-[calc(50%-0.5px)]">
          <h4 className="text-primary font-medium">SENDER</h4>
          <p className="text-secondary-darker">HISANA JASMINE</p>
          <p className="text-secondary-darker">Jl. Dalang, No. 1, RT04/RW05, Munjul, Cipayung, Jakarta Timur, 13850</p>
          <p className="text-secondary-darker">087748274701</p>
        </div>
        <hr className="border-secondary-dark my-2" />
        <div className="p-4 font-hammersmith-one text-xs uppercase leading-loose h-[calc(50%-0.5px)] text-right">
          <h4 className="text-primary font-medium">RECIPIENT</h4>
          <p className="text-secondary-darker">{recipient}</p>
          <p className="text-secondary-darker">{address}</p>
          <p className="text-secondary-darker">{phoneNumber}</p>
        </div>
      </div>

      <div className="flex items-end justify-end">
        <div className="rounded-s-3xl w-3/4 bg-secondary-lighter mt-16 -mr-6 p-8 pl-20">
          <h3 className="text-5xl font-shrikhand w-fit text-primary tracking-widest leading-12">Terima<br />Kasih!</h3>
        </div>
      </div>
    </div>
  )
}

export { ShippingInfo }