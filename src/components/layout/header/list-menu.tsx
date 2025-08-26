import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import MegaMenu from "./mega-menu";

const ListMenu = ({
  dept,
  data,
  hasSubMenu,
  hasMegaMenu,
  hasBrands,
  hasBanners,
  menuIndex,
}: any) => {
  return (
    <li className={cn(!hasMegaMenu ? "group relative" : "")}>
      <Link
        href={data.path}
        className="flex items-center py-2 ltr:pl-5 rtl:pr-5 ltr:xl:pl-7 rtl:xl:pr-7 ltr:pr-3 rtl:pl-3 ltr:xl:pr-3.5 rtl:xl:pl-3.5 hover:text-heading hover:bg-gray-100"
      >
        {data.icon && (
          <span className="inline-flex ltr:mr-2 rtl:ml-2">{data.icon}</span>
        )}
        {data.label}
        {data.subMenu && (
          <ChevronRight className="size-4 mt-0.5 shrink-0 ltr:ml-auto rtl:mr-auto transition duration-300 ease-in-out text-body group-hover:text-black" />
        )}
      </Link>
      {hasSubMenu && (
        <SubMenu dept={dept} data={data.subMenu} menuIndex={menuIndex} />
      )}
      {(hasMegaMenu || hasBrands || hasBanners) && (
        <div className="absolute flex bg-white categoryMegaMenu shadow-header w-[630px] xl:w-[1000px] 2xl:w-[1200px] ltr:left-full rtl:right-full">
          <div className="flex-shrink-0">
            <MegaMenu columns={hasMegaMenu} />
          </div>
          <div className="hidden xl:block">
            <div className="grid grid-cols-3 gap-3 p-6 2xl:py-8 2xl:px-7 3xl:grid-cols-3 justify-items-center">
              {hasBrands.map((brand: any) => (
                <Link
                  href={brand.path}
                  key={`brand-${brand.id}-${menuIndex}`} // Unique key
                  className="bg-[#fefefe] border border-gray-300 rounded-md"
                >
                  <Image
                    src={brand.icon.src}
                    height={60}
                    width={150}
                    alt={brand.label}
                  />
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 p-6 border-t border-gray-300 2xl:py-8 2xl:px-7 ">
              {hasBanners.map((banner: any) => (
                <Link
                  href={banner.path}
                  key={`banner-${banner.id}-${menuIndex}`}
                >
                  <img className="" src={banner.image.src} alt={banner.label} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

const SubMenu: React.FC<any> = ({ dept, data, menuIndex }) => {
  dept = dept + 1;
  return (
    <ul className="absolute z-0 invisible w-56 py-3 bg-gray-50 opacity-0 subMenuChild shadow-subMenu ltr:right-full rtl:left-full ltr:2xl:right-auto rtl:2xl:left-auto ltr:2xl:left-full rtl:2xl:right-full top-4">
      {data?.map((menu: any, index: number) => {
        const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

        return (
          <ListMenu
            dept={dept}
            data={menu}
            hasSubMenu={menu.subMenu}
            menuName={menuName}
            key={`submenu-${dept}-${menuIndex}-${index}-${menu.id}`} // Unique key
            menuIndex={index}
          />
        );
      })}
    </ul>
  );
};

export default ListMenu;
