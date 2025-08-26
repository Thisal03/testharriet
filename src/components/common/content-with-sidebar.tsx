import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";

type ContentItem = {
  id: string;
  title: string;
  description?: string[];
  subheading?: ContentItem[];
};

export function ContentWithSidebar({ items }: { items: ContentItem[] }) {
  function makeTitleToDOMId(title: string) {
    return title.toLowerCase().split(" ").join("-");
  }

  return (
    <div className="min-h-screen">
      <div className="py-8 md:py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={item.id} className="group">
                      <Link
                        href={`#${makeTitleToDOMId(item.title)}`}
                        className="block px-4 py-3 text-sm font-medium text-gray-950 transition-colors rounded-lg hover:bg-gray-100 hover:text-primary-600 group-hover:bg-gray-50"
                      >
                        <span className="mr-2 text-gray-900">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.title}
                      </Link>

                      {item.subheading && (
                        <div className="pl-8 mt-1 space-y-1">
                          {item.subheading.map((subheading) => {
                            if (!subheading.title) return null;
                            return (
                              <Link
                                key={subheading.id}
                                href={`#${makeTitleToDOMId(subheading.title)}`}
                                className="block px-3 py-2 text-xs font-medium text-gray-900 transition-colors rounded-lg hover:bg-gray-100 hover:text-primary-600"
                              >
                                {subheading.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              {items.map((item) => (
                <section
                  key={item.id}
                  id={makeTitleToDOMId(item.title)}
                  className="mb-12 scroll-mt-20"
                >
                  <h2 className="mb-6 text-xl font-bold text-gray-950 md:text-2xl">
                    {item.title}
                  </h2>

                  {item.subheading ? (
                    <>
                      {item.subheading.map((subheading) => {
                        return (
                          <div
                            key={subheading.id}
                            id={makeTitleToDOMId(subheading.title)}
                            className="mb-8 scroll-mt-20"
                          >
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
                              {subheading.title}
                            </h3>

                            {subheading.description && (
                              <div className="pl-1 text-gray-600">
                                <ol className="space-y-3 list-decimal list-inside">
                                  {subheading.description.map((desc, idx) => (
                                    <li
                                      key={idx}
                                      className="pl-2 text-base leading-relaxed"
                                    >
                                      {desc}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="pl-1 text-gray-600">
                      {item.description && (
                        <ol className="space-y-3 list-decimal list-inside">
                          {item.description?.map((desc, idx) => (
                            <li
                              key={idx}
                              className="pl-2 text-base leading-relaxed"
                            >
                              {desc}
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  )}
                </section>
              ))}

              <div className="py-6 mt-8 flex justify-center items-center flex-col border-t border-gray-200">
                <p className="text-sm sm:text-base lg:text-lg text-center text-gray-900">
                  If you have any questions, please contact us.
                </p>
                <Link href="/contact-us" className="inline-block mt-4">
                  <Button variant="outline">Contact Support</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
