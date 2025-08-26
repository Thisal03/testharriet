import Link from "next/link";
import MegaMenu from "@/components/layout/header/mega-menu";
import { cn } from "@/lib/utils";
import { FaChevronDown } from "react-icons/fa";
import ListMenu from "./list-menu";

interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu = ({ data, className }: MenuProps) => {
  return (
    <nav className={cn(`headerMenu flex w-full relative `, className)}>
      {data?.map((item: any, idx: number) => (
        <div
          className={`menuItem group cursor-pointer py-3 ${
            item.subMenu ? "relative" : ""
          }`}
          key={`header-menu-item-${item.id}-${idx}`} // Unique key
        >
          <Link
            href={item.path}
            className="relative justify-center inline-flex items-center px-3 text-[10px] md:text-[12px] xl:text-[13px] font-medium uppercase text-[#161616] leading-loose xl:px-4 group-hover:text-black"
          >
            {item.label}
            {(item?.columns || item.subMenu) && (
              <span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end ">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
            )}
          </Link>

          {item?.columns && Array.isArray(item.columns) && (
            <MegaMenu columns={item.columns} />
          )}

          {item?.subMenu && Array.isArray(item.subMenu) && (
            <div className="absolute invisible bg-gray-50 opacity-0 group-hover:visible subMenu shadow-header ltr:left-0 rtl:right-0 group-hover:opacity-100">
              <ul className="py-5 text-sm text-[#161616]">
                {item.subMenu.map((menu: any, subIdx: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${idx}-${subIdx}`;

                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.subMenu}
                      menuName={menuName}
                      key={`list-menu-item-${menu.id}-${idx}-${subIdx}`} // Unique key
                      menuIndex={subIdx}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};
export default HeaderMenu;
