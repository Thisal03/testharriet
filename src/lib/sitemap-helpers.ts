// utils/extract-urls.ts
import { siteSettings } from "@/settings/site-settings";

export function getPriority(url: string): number {
  if (url.endsWith("/")) {
    return 1.0;
  }
  if (url.includes("/product-category")) {
    return 0.8;
  }
  if (url.includes("/product/")) {
    return 0.6;
  }
  if (url.includes("/blog")) {
    return 0.5;
  }
  return 0.4;
}

export function extractUrls(baseUrl: string): string[] {
  const urls: string[] = [];

  urls.push(baseUrl);

  if (siteSettings.site_header.menu) {
    traverseMenu(siteSettings.site_header.menu, urls, baseUrl);
  }

  urls.push(`${baseUrl}/deals`);
  urls.push(`${baseUrl}/new-arrivals`);
  urls.push(`https://blog.harrietshopping.com`);

  return urls;
}

function traverseMenu(menu: any[], urls: string[], baseUrl: string) {
  for (const item of menu) {
    if (item.path) {
      urls.push(`${baseUrl}${item.path}`);
    }

    if (item.columns) {
      for (const column of item.columns) {
        if (column.columnItems) {
          for (const columnItem of column.columnItems) {
            if (columnItem.path) {
              urls.push(`${baseUrl}${columnItem.path}`);
            }

            if (columnItem.columnItemItems) {
              for (const columnItemItem of columnItem.columnItemItems) {
                if (columnItemItem.path) {
                  urls.push(`${baseUrl}${columnItemItem.path}`);
                }
              }
            }
          }
        }
      }
    }

    if (item.children) {
      traverseMenu(item.children, urls, baseUrl);
    }
  }
}
