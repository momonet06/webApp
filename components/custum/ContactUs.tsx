"use client";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Loader2, Mailbox, MapPinHouse, PhoneIcon } from "lucide-react";
import Link from "next/link";

const Map = dynamic(() => import("@/components/custum/LocalisationMap"), {
  loading: () => <Loader2 className="animate-spin " size={40} />,
  ssr: false,
});
interface IconType {
  name: any;
  color: string;
  fillcolor: string;
  href: any;
}
const icon: IconType[] = [
  { name: "twitter", color: "#08a0e9", fillcolor: "#08a0e9", href: "#" },
  {
    name: "facebook",
    color: "#0866FF",
    fillcolor: "#0866FF",
    href: "https://www.facebook.com/profile.php?id=61567052514955",
  },
  { name: "linkedin", color: "#0a66c2", fillcolor: "#0a66c2", href: "#" },
  { name: "youtube", color: "#000", fillcolor: "#FF0000", href: "#" },
];
const ContactUs: React.FC<any> = () => {
  return (
    <motion.div
      initial={{ y: 100 }}
      whileInView={{
        y: 10,
        transition: { type: "spring", bounce: 0.4, duration: 0.8 },
      }}
      className="border-2 mx-1 flex flex-wrap rounded-lg  text-sm border-black bg-[url('/fondfooter.jpg')] bg-fixed bg-cover bg-center "
    >
      <div className="size-auto grow ">
        <h1 className="text-3xl my-0">الإتصال بالمندوبية</h1>

        <ul className="list-disc list-inside mx-4 space-y-4 text-black">
          <li className="list-none">
            <h2 className="font-lateef text-orange-600">التوقيت الشتوى</h2>
            <ul className="text-sm space-y-2 mx-8">
              <li>من الإثنين الى الخميس: 08:30 - 12:30، 13:30 - 17:30</li>
              <li>يوم الجمعة: 08:00 - 13:00، 14:30 - 17:30</li>
            </ul>
            <h2 className="font-lateef text-orange-600">التوقيت الصيفي</h2>
            <ul className="text-sm space-y-2 mx-8">
              <li>من الإثنين الى الخميس: 08:00 - 14:30</li>
              <li>يوم الجمعة: 08:00 - 13:30</li>
            </ul>
          </li>
          <li>
            <MapPinHouse className="inline-block" size={18} fill="#f0faf3" />
            <span className="inline-block align-middle mx-2 ">
              المقر الإجتماعي:
            </span>
            <span className="inline-block">
              {process.env.NEXT_PUBLIC_CONTACT_ADDRESS}
            </span>
          </li>
          <li>
            <PhoneIcon className="inline-block" size={18} fill="#f0faf3" />
            <span className="inline-block mr-2">
              الهــاتف:{process.env.NEXT_PUBLIC_CONTACT_TEL}
              الفــاكس:{process.env.NEXT_PUBLIC_CONTACT_FAX}
            </span>
          </li>

          <li>
            <Mailbox className="inline-block" size={18} fill="#f0faf3" />
            <span className="inline-block align-middle mx-2">
              البريد الإلكتروني: {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
            </span>
          </li>
        </ul>
        <div className="flex place-content-center gap-4 py-1">
          {icon.map((item, index) => (
            <Link
              href={item.href}
              rel="noopener noreferrer"
              target="_blank"
              key={index}
            >
              <DynamicIcon
                name={item.name as any}
                color={item.color}
                fill={item.fillcolor}
                size={35}
                className="inline-block rounded-full border border-black cursor-pointer p-0.5"
              />
            </Link>
          ))}
        </div>

        <div className="pb-2">
          <p className="text-xs font-extrabold text-slate-600 text-center">
            &copy;2025-المندوبية الجهوية للتنمية الفلاحية بنابل-جميع الحقوق
            محفوظة
          </p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0.2, 0.5, 0.8, 1] }}
        viewport={{ amount: 0.3 }}
        className="w-full sm:w-96 sm:h-[325]  p-1 h-80"
      >
        <Map center={{ lng: 10.735851, lat: 36.459223 }} />
      </motion.div>
    </motion.div>
  );
};
export default ContactUs;
