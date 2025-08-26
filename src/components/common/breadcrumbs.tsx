"use client";
import { BreadcrumbItemProps, useBreadCrumbs } from "@/hooks/use-breadcrumbs";
import React from "react";
import { useMedia } from "react-use";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../ui/breadcrumb";
import { X } from "lucide-react";

const Breadcrumbs = ({
  breadcrumbs: crumbs,
}: {
  breadcrumbs?: BreadcrumbItemProps[];
}) => {
  const { breadcrumbs } = useBreadCrumbs();
  const items = React.useMemo(
    () => crumbs ?? breadcrumbs,
    [crumbs, breadcrumbs]
  );
  const [expanded, setExpanded] = React.useState(false);

  const isMobile = useMedia("(max-width: 769px)");

  const handleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setExpanded(true);
  };

  const handleCollapse = (e: React.MouseEvent) => {
    e.preventDefault();
    setExpanded(false);
  };

  if (isMobile && !expanded && items.length > 1) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis
              onClick={handleExpand}
              className="h-5 w-4 cursor-pointer hover:bg-muted rounded"
              title="Expand breadcrumb"
            />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={items[items.length - 1].href}
              className="capitalize truncate max-w-[220px] overflow-hidden whitespace-nowrap"
              title={items[items.length - 1].label}
            >
              {items[items.length - 1].label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  if (isMobile && expanded) {
    return (
      <Breadcrumb>
        <BreadcrumbList className="flex flex-col items-start">
          <div className="flex items-center justify-between w-full">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <button
              onClick={handleCollapse}
              className="text-muted-foreground hover:text-foreground"
              title="Collapse breadcrumb"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {items.map((breadcrumb, index) => (
            <div
              key={index}
              className="flex items-center pl-4"
              style={{ paddingLeft: `${(index + 1) * 16}px` }}
            >
              <BreadcrumbSeparator className="mr-2" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={breadcrumb.href}
                  className="capitalize text-sm"
                >
                  {breadcrumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={breadcrumb.href} className="capitalize">
                {breadcrumb.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
