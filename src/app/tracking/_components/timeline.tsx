import React from "react";

type TimelineItem = {
  date: string;
  description: string;
  location?: string;
  status_type?: string;
};

type TimelineProps = {
  items: TimelineItem[];
  date_created: string;
};

function parseDateString(dateString: string): Date | null {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export default function Timeline({ items, date_created }: TimelineProps) {
  const formattedDateCreated = new Date(date_created).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const staticTimelineItem: TimelineItem = {
    date: date_created,
    status_type: "YOUR ORDER IS PLACED",
    description: "",
  };

  const allItems = [staticTimelineItem, ...items];

  return (
    <div className="relative mt-4 ml-6 border-l border-gray-200 dark:border-gray-700">
      {allItems.map((item, index) => {
        const date = parseDateString(item.date);
        const formattedDate = date
          ? date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "Invalid date";

        return (
          <div key={index} className="flex mb-10 ml-6">
            <span className="absolute w-4 h-4 bg-gray-200 rounded-full mt-1.5 -left-2 border border-white dark:border-gray-900 dark:bg-gray-700"></span>
            <div className="mt-1">
              <p className="text-sm">
                {index === 0 ? `${formattedDateCreated}` : formattedDate}
              </p>
              <p className="text-sm normal-case">
                <b className="text-heading">{item.status_type}</b>
                {item.description ? ` at ${item.description}` : ""}
                <br />
                {item.location ? `Location: ${item.location}` : ""}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
