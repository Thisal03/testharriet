import { IoLocationSharp, IoMail, IoCallSharp } from "react-icons/io5";
import Link from "next/link";
import { FC } from "react";

const data = [
  {
    id: 1,
    slug: "https://maps.app.goo.gl/oHChpGwiMqU6cGT49",
    icon: <IoLocationSharp />,
    name: "Address",
    description: "410/137, Bauddhaloka Mawatha, Colombo 07 (Corporate Office)",
  },
  {
    id: 2,
    slug: "mailto:info@harrietshopping.com",
    icon: <IoMail />,
    name: "Email",
    description: "info@harrietshopping.com",
  },
  {
    id: 3,
    slug: "https://wa.me/message/GGVY53PXK7DPJ1",
    icon: <IoCallSharp />,
    name: "Customer Care",
    description: "+94 (77) 606 6026",
  },
  {
    id: 4,
    slug: "https://wa.me/94767816262",
    icon: <IoCallSharp />,
    name: "Order & Logistics Related Issues",
    description: "+94 (76) 781 6262",
  },
];

interface Props {
  image?: HTMLImageElement;
}
const ContactInfoBlock: FC<Props> = () => {
  return (
    <div className="mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7">
      <h4 className="text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1">
        Find Us Here
      </h4>
      {data?.map((item: any) => (
        <div key={`contact--key${item.id}`} className="flex items-center pb-7">
          <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
            {item.icon}
          </div>
          <div className="flex flex-col ltr:pl-3 rtl:pr-3 ltr:2xl:pl-4 rtl:2xl:pr-4">
            <h5 className="text-base font-semibold text-heading">
              {item.name}
            </h5>
            <Link href={item.slug} className="text-sm mt-0">
              {item.description}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfoBlock;
