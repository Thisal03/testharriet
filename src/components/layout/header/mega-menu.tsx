import Link from "next/link";
import React from "react";

interface MenuItem {
  id: number | string;
  path: string;
  label: string;
  columnItemItems?: MenuItem[];
}

type MegaMenuProps = {
  columns: {
    id: number | string;
    columnItems: MenuItem[];
  }[];
  totalProducts?: number; // Add totalProducts prop
};

const MegaMenu: React.FC<MegaMenuProps> = ({ columns }) => {
  // Function to calculate grid column class
  const getGridColumnsClass = (columnsLength: number) => {
    if (columnsLength >= 5) {
      return "grid-cols-5";
    }
    if (columnsLength >= 4) {
      return "grid-cols-4";
    }
    return "grid-cols-3"; // Default to 3 if less than 3 columns
  };

  // Determine the appropriate grid column class for the current menu
  const gridColumnsClass = getGridColumnsClass(columns.length);

  return (
    <div
      className={`absolute bg-[#FFFFFF] megaMenu shadow-header ltr:left-44 rtl:-right-28 ltr:xl:left-0 rtl:xl:right-0 grid ${gridColumnsClass}`}
    >
      {columns?.map((column, colIdx) => (
        <ul
          className="pt-6 even:bg-[#fefefe] pb-7 2xl:pb-8 2xl:pt-7"
          key={`mega-menu-column-${column.id}-${colIdx}`} // Unique key
        >
          {column?.columnItems?.map((columnItem, itemIdx) => (
            <React.Fragment
              key={`mega-menu-column-item-${column.id}-${columnItem.id}-${itemIdx}`}
            >
              <li className="mb-1.5">
                <Link
                  href={columnItem.path}
                  className="block text-sm py-1.5 text-[#161616] font-semibold px-5 hover:text-heading"
                >
                  {columnItem.label}
                </Link>
              </li>
              {columnItem?.columnItemItems?.map(
                (item: any, subItemIdx: number) => (
                  <li
                    key={`mega-menu-subitem-${column.id}-${columnItem.id}-${item.id}-${subItemIdx}`} // Unique key
                    className={
                      columnItem?.columnItemItems?.length === item.id
                        ? "border-b border-gray-300 pb-3.5 mb-3"
                        : ""
                    }
                  >
                    <Link
                      href={item.path}
                      className="text-body text-[11.9px] px-5 hover:text-heading hover:ml-1 transition-all duration-400 hover:font-semibold"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </React.Fragment>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default MegaMenu;
