import { BagIcon } from "@/components/icons/bag-icon";
import { JewelryIcon } from "@/components/icons/jewelry-icon";
import { MenIcon } from "@/components/icons/men-icon";
import { SneakerIcon } from "@/components/icons/sneaker-icon";
import { SunglassIcon } from "@/components/icons/sunglass-icon";
import { WalletIcon } from "@/components/icons/wallet-icon";
import { WatchIcon } from "@/components/icons/watch-icon";
import { WomenIcon } from "@/components/icons/women-icon";

export const siteSettings = {
  name: "Online Shopping In Sri Lanka | Fashion Marketplace | Harriet",
  description:
    "Shop the latest trends on Harriet, a marketplace where fashion enthusiasts who love online shopping in Sri Lanka can navigate through a range of choice.",
  author: {
    name: "Harriet Shopping",
    websiteUrl: "https://harrietshopping.com",
    address: "",
  },
  logo: {
    url: "https://images.harrietshopping.com/front-web/images/logos/logo-2.png",
    alt: "Harriet Shopping",
    href: "/",
    width: 138,
    height: 16,
  },
  defaultLanguage: "en",
  canonical: "https://web.harrietshopping.com",
  currencyCode: "LKR",
  site_header: {
    menu: [
      // Women Menu Below
      {
        id: 1,
        path: "/product-category/women",
        label: "Women",
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: "/product-category/dresses",
                label: "Dresses",
                columnItemItems: [
                  // {
                  //   id: 1,
                  //   path: '/product-category/long-dresses',
                  //   label: 'Long Dresses',
                  // },
                  {
                    id: 1,
                    path: "/product-category/midi-dresses",
                    label: "Midi Dresses",
                  },
                  // {
                  //   id: 3,
                  //   path: '/product-category/short-dresses',
                  //   label: 'Short Dresses',
                  // },
                  {
                    id: 2,
                    path: "/product-category/maxi-dresses",
                    label: "Maxi Dresses",
                  },
                  {
                    id: 3,
                    path: "/product-category/mini-dress",
                    label: "Mini Dresses",
                  },
                  {
                    id: 4,
                    path: "/product-category/party-dresses",
                    label: "Party Dresses",
                  },
                  {
                    id: 5,
                    path: "/product-category/casual-dresses",
                    label: "Casual Dresses",
                  },
                  {
                    id: 6,
                    path: "/product-category/women-jumpsuits",
                    label: "Jumpsuits",
                  },
                  // {
                  //   id: 9,
                  //   path: "/product-category/shrugs",
                  //   label: "Shrugs",
                  // },
                  // {
                  //   id: 10,
                  //   path: "/product-category/rompers",
                  //   label: "Rompers",
                  // },
                  {
                    id: 7,
                    path: "/product-category/matching-sets",
                    label: "Matching Sets",
                  },
                  // {
                  //   id: 12,
                  //   path: "/product-category/women-cardigans",
                  //   label: "Cardigans",
                  // },
                ],
              },
              {
                id: 2,
                path: "/product-category/women-formal-wear",
                label: "Formal wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/women-formal-dresses",
                    label: "Formal Dresses",
                  },
                  {
                    id: 2,
                    path: "/product-category/women-formal-topwear",
                    label: "Formal Topwear",
                  },
                  // {
                  //   id: 3,
                  //   path: "/product-category/women-formal-bottomwear",
                  //   label: "Formal Pants",
                  // },
                  // {
                  //   id: 4,
                  //   path: '/product-category/women-office-pants',
                  //   label: 'Formal Office Pants',
                  // },
                  // {
                  //   id: 5,
                  //   path: "/product-category/women-formal-blazers",
                  //   label: "Blazers",
                  // },
                ],
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/product-category/women-topwear",
                label: "Topwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/women-shirts",
                    label: "Shirts",
                  },
                  {
                    id: 2,
                    path: "/product-category/women-t-shirts",
                    label: "T-Shirts",
                  },
                  // {
                  //   id: 3,
                  //   path: "/product-category/women-sweaters-sweatshirts",
                  //   label: "Sweaters & Sweatshirts",
                  // },
                  {
                    id: 3,
                    path: "/product-category/women-kaftans",
                    label: "Kaftans",
                  },
                  // {
                  //   id: 5,
                  //   path: "/product-category/women-jackets-coats",
                  //   label: "Jackets & Coats",
                  // },
                  {
                    id: 4,
                    path: "/product-category/blouses",
                    label: "Blouses",
                  },
                  {
                    id: 5,
                    path: "/product-category/women-casual-tops",
                    label: "Casual Tops",
                  },
                  {
                    id: 6,
                    path: "/product-category/women-tank-tops",
                    label: "Tank Tops",
                  },
                  {
                    id: 7,
                    path: "/product-category/crop-tops",
                    label: "Crop Tops",
                  },
                  {
                    id: 8,
                    path: "/product-category/women-tube-tops",
                    label: "Tube Tops",
                  },
                  // {
                  //   id: 9,
                  //   path: "/product-category/hoodies-women",
                  //   label: "Hoodies",
                  // },
                  // {
                  //   id: 10,
                  //   path: "/product-category/poncho-top",
                  //   label: "Poncho Tops",
                  // },
                ],
              },
              {
                id: 2,
                path: "/product-category/women-bottomwear",
                label: "Bottomwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/women-pants",
                    label: "Pants",
                  },
                  // {
                  //   id: 2,
                  //   path: "/product-category/women-jeans",
                  //   label: "Denims",
                  // },
                  {
                    id: 2,
                    path: "/product-category/women-shorts-bottom", // changes slug 1
                    label: "Shorts",
                  },
                  {
                    id: 3,
                    path: "/product-category/women-skirts",
                    label: "Skirts",
                  },
                  {
                    id: 4,
                    path: "/product-category/women-leggings", // changes slug 2
                    label: "Leggings",
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              // {
              //   id: 1,
              //   path: "/product-category/women-ethnic-wear",
              //   label: "Ethnic Wear",
              //   columnItemItems: [
              //     {
              //       id: 1,
              //       path: "/product-category/women-saree",
              //       label: "Saree",
              //     },
              //     {
              //       id: 2,
              //       path: "/product-category/women-lungi",
              //       label: "Lungi",
              //     },
              //     {
              //       id: 3,
              //       path: "/product-category/women-kurthis",
              //       label: "Kurthis",
              //     },
              //     {
              //       id: 4,
              //       path: "/product-category/women-shalwars",
              //       label: "Shalwars",
              //     },
              //     {
              //       id: 5,
              //       path: "/product-category/women-batiks",
              //       label: "Batiks",
              //     },
              //   ],
              // },
              {
                id: 1,
                path: "/product-category/women-sports-active-wear",
                label: "Sports & Active Wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/women-sports-active-wear-tops",
                    label: "Tops",
                  },
                  {
                    id: 2,
                    path: "/product-category/women-sports-active-wear-leggings",
                    label: "Leggings",
                  },
                  {
                    id: 3,
                    path: "/product-category/women-sports-active-wear-joggers",
                    label: "Joggers",
                  },
                  {
                    id: 4,
                    path: "/product-category/women-sports-active-wear-shorts",
                    label: "Shorts",
                  },
                  {
                    id: 5,
                    path: "/product-category/women-sports-bras",
                    label: "Sports Bras",
                  },
                  // {
                  //   id: 6,
                  //   path: "/product-category/women-swimwear",
                  //   label: "Swimwear",
                  // },
                  // {
                  //   id: 7,
                  //   path: "/product-category/women-sports-active-wear-pants",
                  //   label: "Pants",
                  // },
                  // {
                  //   id: 8,
                  //   path: "/product-category/women-beachwear",
                  //   label: "Beachwear",
                  // },
                  {
                    id: 6,
                    path: "/product-category/women-sports-accessories",
                    label: "Sports Accessories",
                  },
                  {
                    id: 7,
                    path: "/product-category/women-sports-matching-sets",
                    label: "Sports Matching Sets",
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            columnItems: [
              {
                id: 1,
                path: "/product-category/women-innerwear-sleepwear",
                label: "Innerwear & Sleepwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/women-bra",
                    label: "Bras",
                  },
                  {
                    id: 2,
                    path: "/product-category/women-briefs",
                    label: "Briefs",
                  },
                  {
                    id: 3,
                    path: "/product-category/women-shapewear",
                    label: "Shapewear",
                  },
                  {
                    id: 4,
                    path: "/product-category/women-sleepwear-loungewear",
                    label: "Sleepwear & Loungewear",
                  },
                  // {
                  //   id: 5,
                  //   path: "/product-category/women-camisoles-thermals",
                  //   label: "Camisoles & Thermals",
                  // },
                  {
                    id: 5,
                    path: "/product-category/women-body-shapers",
                    label: "Body shapers",
                  },
                  // {
                  //   id: 6,
                  //   path: "/product-category/women-eye-mask",
                  //   label: "Eye Mask",
                  // },
                ],
              },
              {
                id: 2,
                path: "/product-category/women-footwear",
                label: "Footwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/women-flats",
                    label: "Flats",
                  },
                  {
                    id: 2,
                    path: "/product-category/women-heels",
                    label: "Heels",
                  },
                  // {
                  //   id: 3,
                  //   path: "/product-category/women-boots",
                  //   label: "Boots",
                  // },
                  // {
                  //   id: 4,
                  //   path: "/product-category/women-sports-shoes",
                  //   label: "Women Sports Shoes",
                  // },
                  // {
                  //   id: 5,
                  //   path: "/product-category/women-floaters",
                  //   label: "Women Floaters",
                  // },
                  {
                    id: 3,
                    path: "/product-category/women-sandals",
                    label: "Sandals",
                  },
                  // {
                  //   id: 7,
                  //   path: "/product-category/women-casual-shoes",
                  //   label: "Casual Shoes",
                  // },
                  // {
                  //   id: 4,
                  //   path: "/product-category/women-flip-flops-slides",
                  //   label: "Flip Flops & Slides",
                  // },
                  // {
                  //   id: 9,
                  //   path: "/product-category/women-sneakers",
                  //   label: "Sneakers",
                  // },
                ],
              },
            ],
          },
          {
            id: 5,
            path: "/product-category/accessories-women",
            columnItems: [
              {
                id: 1,
                path: "/product-category/accessories-women",
                label: "Accessories",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/women-jewellery",
                    label: "Jewellery",
                  },
                  // {
                  //   id: 2,
                  //   path: '/product-category/women-wallets',
                  //   label: 'Wallets',
                  // },
                  // {
                  //   id: 3,
                  //   path: '/product-category/women-purses',
                  //   label: 'Purses',
                  // },
                  // {
                  //   id: 4,
                  //   path: '/product-category/women-watches',
                  //   label: 'Watches',
                  // },
                  // {
                  //   id: 5,
                  //   path: '/product-category/women-sunglasses',
                  //   label: 'Sunglasses',
                  // },
                  {
                    id: 2,
                    path: "/product-category/women-scrunchies",
                    label: "Scrunchies",
                  },
                  // {
                  //   id: 3,
                  //   path: "/product-category/lingerie-accessories",
                  //   label: "Lingerie Accessories",
                  // },
                  // {
                  //   id: 8,
                  //   path: '/product-category/women-belts',
                  //   label: 'Belts',
                  // },
                  // {
                  //   id: 9,
                  //   path: '/product-category/women-ties',
                  //   label: 'Ties',
                  // },
                  // {
                  //   id: 4,
                  //   path: "/product-category/women-bags-backpacks",
                  //   label: "Bags & Backpacks",
                  // },
                  // {
                  //   id: 5,
                  //   path: "/product-category/women-hand-bags",
                  //   label: "Handbags",
                  // },
                  // {
                  //   id: 6,
                  //   path: "/product-category/women-caps",
                  //   label: "Caps",
                  // },
                  // {
                  //   id: 7,
                  //   path: "/product-category/women-hats",
                  //   label: "Hats",
                  // },
                  // {
                  //   id: 14,
                  //   path: '/product-category/women-gloves',
                  //   label: 'Gloves',
                  // },
                  // {
                  //   id: 15,
                  //   path: '/product-category/women-shawls-scarves',
                  //   label: 'Shawls & Scarves',
                  // },
                  // {
                  //   id: 16,
                  //   path: '/product-category/women-mufflers',
                  //   label: 'Mufflers',
                  // },
                ],
              },
            ],
          },
        ],
      },

      //  Mens Menu Below
      {
        id: 2,
        path: "/product-category/men",
        label: "Men",
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: "/product-category/men-top-wear",
                label: "Topwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/men-t-shirts",
                    label: "T Shirts",
                  },
                  {
                    id: 2,
                    path: "/product-category/men-casual-shirts",
                    label: "Casual Shirts",
                  },
                  // {
                  //   id: 3,
                  //   path: "/product-category/men-formal-shirts",
                  //   label: "Formal Shirts",
                  // },
                  // {
                  //   id: 4,
                  //   path: "/product-category/men-sweaters",
                  //   label: "Sweaters",
                  // },
                  // {
                  //   id: 3,
                  //   path: "/product-category/hoodies",
                  //   label: "Hoodies",
                  // },
                  {
                    id: 3,
                    path: "/product-category/men-tank-tops",
                    label: "Tank Tops",
                  },
                  // {
                  //   id: 7,
                  //   path: "/product-category/men-jackets",
                  //   label: "Jackets",
                  // },
                  // {
                  //   id: 8,
                  //   path: "/product-category/men-blazers-coats",
                  //   label: "Blazers & Coats",
                  // },
                  // {
                  //   id: 9,
                  //   path: "/product-category/men-suits",
                  //   label: "Suits",
                  // },
                  // {
                  //   id: 10,
                  //   path: "/product-category/men-rain-jackets",
                  //   label: "Rain Jackets",
                  // },
                ],
              },
              {
                id: 2,
                path: "/product-category/men-ethnic-wear",
                label: "Ethnic Wear",
                columnItemItems: [
                  // {
                  //   id: 1,
                  //   path: "/product-category/men-kurta",
                  //   label: "Kurta",
                  // },
                  {
                    id: 1,
                    path: "/product-category/men-sarongs",
                    label: "Sarong",
                  },
                  // {
                  //   id: 3,
                  //   path: "/product-category/men-traditional-tops",
                  //   label: "Traditional Tops",
                  // },
                  // {
                  //   id: 4,
                  //   path: "/product-category/men-traditional-bottoms",
                  //   label: "Traditional Bottoms",
                  // },
                  // {
                  //   id: 5,
                  //   path: "/product-category/batiks-men",
                  //   label: "Batik",
                  // },
                ],
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/product-category/men-bottom-wear",
                label: "Bottomwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/men-jeans",
                    label: "Denims",
                  },
                  // {
                  //   id: 2,
                  //   path: "/product-category/men-casual-pants",
                  //   label: "Casual Pants",
                  // },
                  // {
                  //   id: 3,
                  //   path: "/product-category/men-formal-pants",
                  //   label: "Formal Pants",
                  // },
                  {
                    id: 2,
                    path: "/product-category/men-shorts",
                    label: "Shorts",
                  },
                  // {
                  //   id: 5,
                  //   path: "/product-category/men-joggers",
                  //   label: "Joggers",
                  // },
                ],
              },
              {
                id: 2,
                path: "/product-category/men-innerwear-sleepwear",
                label: "Innerwear & Sleepwear",
                columnItemItems: [
                  // {
                  //   id: 1,
                  //   path: "/product-category/men-briefs",
                  //   label: "Briefs",
                  // },
                  {
                    id: 1,
                    path: "/product-category/men-boxer-briefs",
                    label: "Boxer Briefs",
                  },
                  {
                    id: 2,
                    path: "/product-category/boxers",
                    label: "Boxers",
                  },
                  // {
                  //   id: 4,
                  //   path: "/product-category/men-trunks",
                  //   label: "Trunks",
                  // },
                  {
                    id: 3,
                    path: "/product-category/men-jockstrap",
                    label: "Jockstrap",
                  },
                  // {
                  //   id: 6,
                  //   path: "/product-category/men-vests",
                  //   label: "Vests",
                  // },
                  // {
                  //   id: 7,
                  //   path: "/product-category/men-sleepwear",
                  //   label: "Sleepwear",
                  // },
                  // {
                  //   id: 8,
                  //   path: "/product-category/men-loungewear",
                  //   label: "Loungewear",
                  // },
                  // {
                  //   id: 9,
                  //   path: "/product-category/men-thermals",
                  //   label: "Thermals",
                  // },
                ],
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/product-category/men-sports-active-wear",
                label: "Sports & Active Wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/men-active-t-shirts",
                    label: "Active T-Shirts",
                  },
                  {
                    id: 2,
                    path: "/product-category/men-active-tank-tops",
                    label: "Active Tank Tops",
                  },
                  {
                    id: 3,
                    path: "/product-category/men-compression-tops",
                    label: "Compression Tops",
                  },
                  // {
                  //   id: 4,
                  //   path: "/product-category/men-track-pants",
                  //   label: "Track Pants",
                  // },
                  // {
                  //   id: 5,
                  //   path: "/product-category/men-active-tracksuits",
                  //   label: "Tracksuits",
                  // },
                  // {
                  //   id: 6,
                  //   path: "/product-category/men-jackets-sweatshirts",
                  //   label: "Jackets & Sweatshirts",
                  // },
                  {
                    id: 4,
                    path: "/product-category/men-sports-accessories",
                    label: "Sports Accessories",
                  },
                  {
                    id: 5,
                    path: "/product-category/men-sports-matching-sets",
                    label: "Sports Matching Sets",
                  },
                  // {
                  //   id: 8,
                  //   path: "/product-category/men-swimwear",
                  //   label: "Swimwear",
                  // },
                  // {
                  //   id: 7,
                  //   path: "/product-category/men-running-shorts",
                  //   label: "Running shorts",
                  // },
                  // {
                  //   id: 8,
                  //   path: "/product-category/men-athletic-shorts",
                  //   label: "Athletic shorts",
                  // },
                  // {
                  //   id: 9,
                  //   path: "/product-category/men-compression-shorts-longs",
                  //   label: "Compression shorts",
                  // },
                  // {
                  //   id: 10,
                  //   path: "/product-category/men-compression-shorts-longs",
                  //   label: "Compression longs",
                  // },
                ],
              },
            ],
          },
          {
            id: 4,
            columnItems: [
              {
                id: 1,
                path: "/product-category/men-footwear",
                label: "Footwear",
                columnItemItems: [
                  // {
                  //   id: 1,
                  //   path: "/product-category/men-casual-shoes",
                  //   label: "Casual Shoes",
                  // },
                  // {
                  //   id: 2,
                  //   path: "/product-category/men-sports-shoes",
                  //   label: "Sports Shoes",
                  // },
                  // {
                  //   id: 3,
                  //   path: "/product-category/men-formal-shoes",
                  //   label: "Formal Shoes",
                  // },
                  // {
                  //   id: 4,
                  //   path: "/product-category/men-sneakers",
                  //   label: "Sneakers",
                  // },
                  // {
                  //   id: 5,
                  //   path: "/product-category/men-sneakers",
                  //   label: "Sandals",
                  // },
                  // {
                  //   id: 6,
                  //   path: "/product-category/men-floaters",
                  //   label: "Floaters",
                  // },
                  // {
                  //   id: 7,
                  //   path: "/product-category/flip-flops-slides-men-footwear",
                  //   label: "Flip Flops & Slides",
                  // },
                  {
                    id: 1,
                    path: "/product-category/men-socks",
                    label: "Socks",
                  },
                  // {
                  //   id: 9,
                  //   path: "/product-category/men-slippers",
                  //   label: "Slippers",
                  // },
                  // {
                  //   id: 10,
                  //   path: "/product-category/men-boots",
                  //   label: "Boots",
                  // },
                  // {
                  //   id: 11,
                  //   path: "/product-category/men-clogs",
                  //   label: "Clogs",
                  // },
                ],
              },
            ],
          },
          {
            id: 5,
            columnItems: [
              {
                id: 1,
                path: "/product-category/men-fashion-accessories",
                label: "Fashion Accessories",
                columnItemItems: [
                  // {
                  //   id: 1,
                  //   path: "/product-category/men-wallets-cardholders",
                  //   label: "Wallets",
                  // },
                  // {
                  //   id: 2,
                  //   path: "/product-category/men-belts",
                  //   label: "Belts",
                  // },
                  // {
                  //   id: 3,
                  //   path: "/product-category/tie-bow",
                  //   label: "Tie & Bow",
                  // },
                  // {
                  //   id: 4,
                  //   path: "/product-category/men-tie-pin-cufflinks",
                  //   label: "Tie Pin & Cufflinks",
                  // },
                  // {
                  //   id: 5,
                  //   path: "/product-category/men-pocket-squares",
                  //   label: "Pocket Squares",
                  // },
                  // {
                  //   id: 1,
                  //   path: "/product-category/men-caps",
                  //   label: "Caps",
                  // },
                  {
                    id: 1,
                    path: "/product-category/men-hats",
                    label: "Hats",
                  },
                  // {
                  //   id: 8,
                  //   path: "/product-category/men-gloves",
                  //   label: "Gloves",
                  // },
                  // {
                  //   id: 9,
                  //   path: "/product-category/men-scarves",
                  //   label: "Scarves",
                  // },
                  // {
                  //   id: 10,
                  //   path: "/product-category/men-mufflers",
                  //   label: "Mufflers",
                  // },
                  // {
                  //   id: 11,
                  //   path: "/product-category/men-watches",
                  //   label: "Watches",
                  // },
                  {
                    id: 2,
                    path: "/product-category/men-jewellery",
                    label: "Jewellery",
                  },
                  // {
                  //   id: 4,
                  //   path: "/product-category/men-bags-backpacks",
                  //   label: "Bags & Backpacks",
                  // },
                  // {
                  //   id: 14,
                  //   path: "/product-category/men-sunglasses",
                  //   label: "Sunglasses",
                  // },
                ],
              },
            ],
          },
        ],
      },

      //  Kids Menu Below
      {
        id: 3,
        path: "/product-category/kids",
        label: "Kids",
        subMenu: [
          {
            id: 1,
            path: "/product-category/kids-boys-clothing",
            label: "Boys Clothing",
            subMenu: [
              {
                id: 1,
                path: "/product-category/baby-suits-boys",
                label: "Kids Boys Body Suits",
              },
              // {
              //   id: 2,
              //   path: "/product-category/kids-boys-bottom-wear",
              //   label: "Kids Boys Bottom Wear",
              // },
              // {
              //   id: 3,
              //   path: "/product-category/kids-boys-footwear",
              //   label: "Kids Boys Footwear",
              // },
              // {
              //   id: 4,
              //   path: "/product-category/kids-boys-jeans",
              //   label: "Kids Boys Jeans",
              // },
              // {
              //   id: 5,
              //   path: "/product-category/pants-boys",
              //   label: "Kids Boys Pants",
              // },
              // {
              //   id: 6,
              //   path: "/product-category/shirts-boys",
              //   label: "Kids Boys Shirts",
              // },
              // {
              //   id: 7,
              //   path: "/product-category/shorts-boys",
              //   label: "Kids Boys Shorts",
              // },
              {
                id: 2,
                path: "/product-category/kids-boys-sleepwear",
                label: "Kids Boys Sleepwear",
              },
              {
                id: 3,
                path: "/product-category/kids-boys-t-shirts",
                label: "Kids Boys T-Shirts",
              },
              // {
              //   id: 8,
              //   path: "/product-category/kids-boys-top-wear",
              //   label: "Kids Boys Top Wear",
              // },
              // {
              //   id: 8,
              //   path: "/product-category/kids-boys-traditional-wear",
              //   label: "Kids Boys Traditional Wear",
              // },
            ],
          },
          {
            id: 2,
            path: "/product-category/kids-girls-clothing",
            label: "Girls Clothing",
            subMenu: [
              // {
              //   id: 1,
              //   path: "/product-category/kids-girl-footwear",
              //   label: "Kids Girl Footwear",
              // },
              {
                id: 1,
                path: "/product-category/kids-girls-body-suits",
                label: "Kids Girls Body Suits",
              },
              // {
              //   id: 3,
              //   path: "/product-category/kids-girls-bottom-wear",
              //   label: "Kids Girls Bottom Wear",
              // },
              {
                id: 2,
                path: "/product-category/kids-girls-dresses",
                label: "Kids Girls Dresses",
              },
              {
                id: 3,
                path: "/product-category/kids-girls-frocks",
                label: "Kids Girls Frocks",
              },
              // {
              //   id: 6,
              //   path: "/product-category/kids-girls-jeans",
              //   label: "Kids Girls Jeans",
              // },
              // {
              //   id: 7,
              //   path: "/product-category/kids-girls-pants",
              //   label: "Kids Girls Pants",
              // },
              // {
              //   id: 8,
              //   path: "/product-category/kids-girls-shorts-skirts",
              //   label: "Kids Girls Shorts & Skirts",
              // },
              {
                id: 4,
                path: "/product-category/kids-girls-sleepwear",
                label: "Kids Girls Sleepwear",
              },
              {
                id: 5,
                path: "/product-category/kids-girls-t-shirts",
                label: "Kids Girls T-Shirts",
              },
              // {
              //   id: 11,
              //   path: "/product-category/kids-girls-top-wear",
              //   label: "Kids Girls Top Wear",
              // },
              {
                id: 6,
                path: "/product-category/kids-girls-traditional-wear",
                label: "Kids Girls Traditional Wear",
              },
            ],
          },
          {
            id: 3,
            path: "/product-category/kids-accessories",
            label: "Kids Accessories",
            // subMenu: [
            // {
            //   id: 1,
            //   path: "/product-category/kids-bags",
            //   label: "Kids Bags",
            // },
            // {
            //   id: 2,
            //   path: "/product-category/kids-caps-hats",
            //   label: "Kids Caps & Hats",
            // },
            // ],
          },
        ],
      },

      //  Beauty & Wellness Menu Below
      {
        id: 4,
        path: "/product-category/beauty-wellness",
        label: "Beauty & Wellness",
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: "/product-category/face-care",
                label: "Face Care",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/face-moisturizer",
                    label: "Moisturisers",
                  },
                  {
                    id: 2,
                    path: "/product-category/cleanser",
                    label: "Cleanser",
                  },
                  // {
                  //   id: 3,
                  //   path: "/product-category/masks-peel",
                  //   label: "Masks & Peel",
                  // },
                  {
                    id: 3,
                    path: "/product-category/sunscreen",
                    label: "Sunscreen",
                  },
                  {
                    id: 4,
                    path: "/product-category/serum-face",
                    label: "Serum",
                  },
                  {
                    id: 5,
                    path: "/product-category/face-wash",
                    label: "Face Wash",
                  },
                  {
                    id: 6,
                    path: "/product-category/eye-cream",
                    label: "Eye Creams",
                  },
                  {
                    id: 7,
                    path: "/product-category/lip-balm-face",
                    label: "Lip Balm",
                  },
                  {
                    id: 8,
                    path: "/product-category/beard-oil",
                    label: "Beard Oils",
                  },
                  {
                    id: 9,
                    path: "/product-category/after-shave",
                    label: "After Shave",
                  },
                  {
                    id: 10,
                    path: "/product-category/toners",
                    label: "Toners",
                  },
                  {
                    id: 11,
                    path: "/product-category/face-scrub",
                    label: "Face Scrubs",
                  },
                  {
                    id: 12,
                    path: "/product-category/shaving-cream-gel",
                    label: "Shaving Cream & Gel",
                  },
                  {
                    id: 13,
                    path: "/product-category/night-creams",
                    label: "Night Creams",
                  },
                  // {
                  //   id: 15,
                  //   path: "/product-category/waxing-strips",
                  //   label: "Waxing Strips",
                  // },
                  {
                    id: 14,
                    path: "/product-category/mists",
                    label: "Mists",
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/product-category/hair-care",
                label: "Hair Care",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/shampoo",
                    label: "Shampoo",
                  },
                  {
                    id: 2,
                    path: "/product-category/conditioner",
                    label: "Conditioner",
                  },
                  {
                    id: 3,
                    path: "/product-category/hair-cream",
                    label: "Hair Cream",
                  },
                  {
                    id: 4,
                    path: "/product-category/hair-oil",
                    label: "Hair Oil",
                  },
                  {
                    id: 5,
                    path: "/product-category/hair-gel",
                    label: "Hair Gel",
                  },
                  // {
                  //   id: 6,
                  //   path: "/product-category/hair-color",
                  //   label: "Hair Color",
                  // },
                  // {
                  //   id: 7,
                  //   path: "/product-category/hair-serum",
                  //   label: "Hair Serums",
                  // },
                  // {
                  //   id: 8,
                  //   path: "/product-category/hair-accessory",
                  //   label: "Hair Accessories",
                  // },
                  // {
                  //   id: 9,
                  //   path: "/product-category/hair-wax",
                  //   label: "Hair Wax",
                  // },
                  {
                    id: 6,
                    path: "/product-category/hair-spray",
                    label: "Hair Spray",
                  },
                  // {
                  //   id: 11,
                  //   path: "/product-category/hair-brushes",
                  //   label: "Hair Brushes",
                  // },
                  {
                    id: 7,
                    path: "/product-category/wigs-hair-extensions",
                    label: "Wigs & Hair Extensions",
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/product-category/body-care",
                label: "Body Care",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/body-lotion",
                    label: "Body Lotion",
                  },
                  {
                    id: 2,
                    path: "/product-category/body-wash",
                    label: "Body Wash",
                  },
                  {
                    id: 3,
                    path: "/product-category/body-scrub",
                    label: "Body Scrub",
                  },
                  {
                    id: 4,
                    path: "/product-category/body-hand-cream",
                    label: "Hand Cream",
                  },
                  {
                    id: 5,
                    path: "/product-category/soaps",
                    label: "Soaps",
                  },
                  {
                    id: 6,
                    path: "/product-category/deodorant",
                    label: "Deodorant",
                  },
                  // {
                  //   id: 7,
                  //   path: "/product-category/shaving-gel",
                  //   label: "Shaving Gel",
                  // },
                  // {
                  //   id: 8,
                  //   path: "/product-category/body-wax",
                  //   label: "Body Wax",
                  // },
                  // {
                  //   id: 9,
                  //   path: "/product-category/foot-cream",
                  //   label: "Foot Cream",
                  // },
                  // {
                  //   id: 10,
                  //   path: "/product-category/manicure-sets",
                  //   label: "Manicure Sets",
                  // },
                  // {
                  //   id: 11,
                  //   path: "/product-category/feminine-care",
                  //   label: "Feminine Care",
                  // },
                ],
              },
              {
                id: 2,
                path: "/product-category/fragrance",
                label: "Fragrances",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/mens-perfume",
                    label: "Mens Perfume",
                  },
                  {
                    id: 2,
                    path: "/product-category/womens-perfume",
                    label: "Womens Perfume",
                  },
                  {
                    id: 3,
                    path: "/product-category/body-mist",
                    label: "Body Mist",
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            columnItems: [
              {
                id: 1,
                path: "/product-category/makeup",
                label: "Makeup",
                columnItemItems: [
                  // {
                  //   id: 1,
                  //   path: "/product-category/lipsticks",
                  //   label: "Lipstick",
                  // },
                  // {
                  //   id: 2,
                  //   path: "/product-category/lip-gloss",
                  //   label: "Lip Gloss",
                  // },
                  // {
                  //   id: 3,
                  //   path: "/product-category/lip-liner",
                  //   label: "Lip Liner",
                  // },
                  // {
                  //   id: 4,
                  //   path: "/product-category/mascara",
                  //   label: "Mascara",
                  // },
                  // {
                  //   id: 5,
                  //   path: "/product-category/eyeliner",
                  //   label: "Eyeliner",
                  // },
                  // {
                  //   id: 6,
                  //   path: "/product-category/kajal",
                  //   label: "Kajal",
                  // },
                  // {
                  //   id: 7,
                  //   path: "/product-category/eye-shadow",
                  //   label: "Eye Shadow",
                  // },
                  // {
                  //   id: 8,
                  //   path: "/product-category/foundation",
                  //   label: "Foundation",
                  // },
                  // {
                  //   id: 9,
                  //   path: "/product-category/primer",
                  //   label: "Primer",
                  // },
                  // {
                  //   id: 10,
                  //   path: "/product-category/concealers",
                  //   label: "Concealer",
                  // },
                  // {
                  //   id: 11,
                  //   path: "/product-category/compact-powder",
                  //   label: "Compact Powder",
                  // },
                  {
                    id: 1,
                    path: "/product-category/nail-polish",
                    label: "Nail Polish",
                  },
                  // {
                  //   id: 13,
                  //   path: "/product-category/blush-makeup	",
                  //   label: "Blush",
                  // },
                  {
                    id: 2,
                    path: "/product-category/makeup-tools",
                    label: "Makeup Tools",
                  },
                  // {
                  //   id: 15,
                  //   path: "/product-category/nail-art-stickers",
                  //   label: "Nail Art & Stickers",
                  // },
                  // {
                  //   id: 16,
                  //   path: "/product-category/nail-polish-remover",
                  //   label: "Nail Polish Remover",
                  // },
                  // {
                  //   id: 17,
                  //   path: "/product-category/contact-lenses",
                  //   label: "Contact Lenses",
                  // },
                ],
              },
            ],
          },
          // {
          //   id: 5,
          //   path: "/product-category/appliances",
          //   columnItems: [
          //     {
          //       id: 1,
          //       path: "/product-category/appliances",
          //       label: "Appliances",
          //       columnItemItems: [
          //         {
          //           id: 1,
          //           path: "/product-category/hair-straightener",
          //           label: "Hair Straightener",
          //         },
          //         {
          //           id: 2,
          //           path: "/product-category/hair-dryer",
          //           label: "Hair Dryer",
          //         },
          //         {
          //           id: 3,
          //           path: "/product-category/epilator",
          //           label: "Epilators",
          //         },
          //         {
          //           id: 4,
          //           path: "/product-category/trimmers",
          //           label: "Trimmers",
          //         },
          //         {
          //           id: 5,
          //           path: "/product-category/curling-irons",
          //           label: "Curling Irons",
          //         },
          //         {
          //           id: 6,
          //           path: "/product-category/manicure-pedicure-machines",
          //           label: "Manicure/Pedicure Machines",
          //         },
          //         {
          //           id: 7,
          //           path: "/product-category/uv-lamps",
          //           label: "UV Lamps",
          //         },
          //         {
          //           id: 8,
          //           path: "/product-category/body-massagers",
          //           label: "Body Massagers",
          //         },
          //       ],
          //     },
          //     {
          //       id: 2,
          //       path: "/product-category/wellness",
          //       label: "Wellness",
          //     },
          //   ],
          // },
        ],
      },

      //  Home & Living Menu Below
      {
        id: 5,
        path: "/product-category/home-living",
        label: "Home & Living",
        columns: [
          // {
          //   columnItems: [
          //     {
          //       id: 1,
          //       path: "/product-category/bedding",
          //       label: "Bedding",
          //       columnItemItems: [
          //         // {
          //         //   id: 1,
          //         //   path: "/product-category/bed-runners",
          //         //   label: "Bed Runners",
          //         // },
          //         // {
          //         //   id: 2,
          //         //   path: "/product-category/mattress-protectors",
          //         //   label: "Mattress Protectors",
          //         // },
          //         // {
          //         //   id: 3,
          //         //   path: "/product-category/bedsheets",
          //         //   label: "Bedsheets",
          //         // },
          //         // {
          //         //   id: 4,
          //         //   path: "/product-category/quilts",
          //         //   label: "Quilts",
          //         // },
          //         // {
          //         //   id: 5,
          //         //   path: "/product-category/blankets",
          //         //   label: "Blankets",
          //         // },
          //         // {
          //         //   id: 6,
          //         //   path: "/product-category/pillows",
          //         //   label: "Pillows",
          //         // },
          //         // {
          //         //   id: 7,
          //         //   path: "/product-category/pillow-covers",
          //         //   label: "Pillow Covers",
          //         // },
          //         // {
          //         //   id: 8,
          //         //   path: "/product-category/bed-covers",
          //         //   label: "Bed Covers",
          //         // },
          //         // {
          //         //   id: 9,
          //         //   path: "/product-category/chair-pads-covers",
          //         //   label: "Chair Pads & Covers",
          //         // },
          //         // {
          //         //   id: 10,
          //         //   path: "/product-category/sofa-covers",
          //         //   label: "Sofa Covers",
          //         // },
          //       ],
          //     },
          //   ],
          // },
          {
            columnItems: [
              {
                id: 1,
                path: "/product-category/bath",
                label: "Bath",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/product-category/bath-towels",
                    label: "Bath Towels",
                  },
                  {
                    id: 2,
                    path: "/product-category/hand-face-towels",
                    label: "Hand & Face Towels",
                  },
                  // {
                  //   id: 3,
                  //   path: "/product-category/beach-towels",
                  //   label: "Beach Towels",
                  // },
                  {
                    id: 3,
                    path: "/product-category/towels-set",
                    label: "Towels Set",
                  },
                  // {
                  //   id: 5,
                  //   path: "/product-category/bath-rugs",
                  //   label: "Bath Rugs",
                  // },
                  // {
                  //   id: 6,
                  //   path: "/product-category/bath-robes",
                  //   label: "Bath Robes",
                  // },
                  {
                    id: 4,
                    path: "/product-category/bathroom-accessories",
                    label: "Bathroom Accessories",
                  },
                ],
              },

              // {
              //   id: 2,
              //   path: "/product-category/indoor-accessories",
              //   label: "Indoor Accessories",
              //   columnItemItems: [
              //     {
              //       id: 1,
              //       path: "/product-category/mosquito-nets",
              //       label: "Mosquito Nets",
              //     },
              //     {
              //       id: 2,
              //       path: "/product-category/baby-nets",
              //       label: "Baby nets",
              //     },
              //   ],
              // },
            ],
          },
          {
            columnItems: [
              {
                id: 2,
                path: "/product-category/lamps-lighting",
                label: "Lamps & Lighting",
                columnItemItems: [
                  // {
                  //   id: 1,
                  //   path: "/product-category/floor-lamps",
                  //   label: "Floor Lamps",
                  // },
                  {
                    id: 1,
                    path: "/product-category/ceiling-lamps",
                    label: "Ceiling Lamps",
                  },
                  // {
                  //   id: 3,
                  //   path: "/product-category/table-lamps",
                  //   label: "Table Lamps",
                  // },
                  {
                    id: 2,
                    path: "/product-category/wall-lamps",
                    label: "Wall Lamps",
                  },
                  // {
                  //   id: 5,
                  //   path: "/product-category/outdoor-lamps",
                  //   label: "Outdoor Lamps",
                  // },
                  // {
                  //   id: 6,
                  //   path: "/product-category/string-lights",
                  //   label: "String Lights",
                  // },
                  {
                    id: 3,
                    path: "/product-category/candles",
                    label: "Candles",
                  },
                ],
              },
              // {
              //   id: 3,
              //   path: "/product-category/outdoor-accessories",
              //   label: "Outdoor Accessories",
              //   columnItemItems: [
              //     {
              //       id: 1,
              //       path: "/product-category/umbrellas",
              //       label: "Umbrellas",
              //     },
              //     {
              //       id: 2,
              //       path: "/product-category/huts",
              //       label: "Huts",
              //     },
              //   ],
              // },
            ],
          },
          {
            columnItems: [
              {
                id: 3,
                path: "/product-category/kitchen-table",
                label: "Kitchen & Table",
                columnItemItems: [
                  // {
                  //   id: 1,
                  //   path: "/product-category/table-runners",
                  //   label: "Table Runners",
                  // },
                  {
                    id: 1,
                    path: "/product-category/dinnerware-serveware",
                    label: "Dinnerware & Serveware",
                  },
                  {
                    id: 2,
                    path: "/product-category/cups-mugs",
                    label: "Cups and Mugs",
                  },
                  // {
                  //   id: 4,
                  //   path: "/product-category/bakeware-cookware",
                  //   label: "Bakeware & Cookware",
                  // },
                  {
                    id: 3,
                    path: "/product-category/kitchen-storage-tools",
                    label: "Kitchen Storage & Tools",
                  },
                  // {
                  //   id: 6,
                  //   path: "/product-category/bar-drinkware",
                  //   label: "Bar & Drinkware",
                  // },
                  {
                    id: 4,
                    path: "/product-category/table-covers",
                    label: "Table Covers",
                  },
                ],
              },
              // {
              //   id: 5,
              //   path: "/product-category/pets",
              //   label: "Pets",
              // },
            ],
          },
        ],
      },
      //  Gifts Menu Below
      // {
      //   id: 6,
      //   path: "/product-category/avurudu",
      //   label: "Avurudu Collection",
      //   subMenu: [
      //     {
      //       id: 1,
      //       path: "/product-category/men-avurudu",
      //       label: "Men",
      //     },
      //     {
      //       id: 1,
      //       path: "/product-category/women-avurudu",
      //       label: "Women",
      //     },
      //     {
      //       id: 1,
      //       path: "/product-category/kids-avurudu",
      //       label: "Kids",
      //       subMenu: [
      //         {
      //           id: 1,
      //           path: "/product-category/boys-avurudu",
      //           label: "Boys Collection",
      //         },
      //         {
      //           id: 2,
      //           path: "/product-category/girls-avurudu",
      //           label: "Girls Collection",
      //         },
      //       ],
      //     },
      //     // {
      //     //   id: 1,
      //     //   path: '/product-category/occational-gifts',
      //     //   label: 'Occational Gifts',
      //     // subMenu: [
      //     //   {
      //     //     id: 1,
      //     //     path: '/product-category/birthday-gifts',
      //     //     label: 'Birthday Gifts',
      //     //   },
      //     //   {
      //     //     id: 2,
      //     //     path: '/product-category/wedding-gifts',
      //     //     label: 'Wedding Gifts',
      //     //   },
      //     //   {
      //     //     id: 3,
      //     //     path: '/product-category/baby-showers',
      //     //     label: 'Baby Showers',
      //     //   },
      //     //   {
      //     //     id: 4,
      //     //     path: '/product-category/anniversary-gifts',
      //     //     label: 'Anniversary Gifts',
      //     //   },
      //     //   {
      //     //     id: 5,
      //     //     path: '/product-category/graduation-gifts',
      //     //     label: 'Graduation Gifts',
      //     //   }
      //     // ]
      //     // },
      //     // {
      //     //   id: 2,
      //     //   path: '/product-category/seasonal-gifts',
      //     //   label: 'Seasonal Gifts',
      //     // subMenu: [
      //     //   {
      //     //     id: 1,
      //     //     path: '/product-category/aurudu-gifts',
      //     //     label: 'Aurudu Gifts',
      //     //   },
      //     //   {
      //     //     id: 2,
      //     //     path: '/product-category/christmas-gifts',
      //     //     label: 'Christmas Gifts',
      //     //   },
      //     //   {
      //     //     id: 3,
      //     //     path: '/product-category/valentines-gifts',
      //     //     label: 'Valentin’s Gifts',
      //     //   },
      //     //   {
      //     //     id: 4,
      //     //     path: '/product-category/mothers-day-gifts',
      //     //     label: 'Mother’s Day Gifts',
      //     //   },
      //     //   {
      //     //     id: 5,
      //     //     path: '/product-category/fathers-day-gifts',
      //     //     label: 'Father’s Day Gifts',
      //     //   },
      //     //   {
      //     //     id: 6,
      //     //     path: '/product-category/easter-gifts',
      //     //     label: 'Easter Gifts',
      //     //   },
      //     // ]
      //     // },
      //     // {
      //     //   id: 3,
      //     //   path: '/product-category/gift-sets-boxes',
      //     //   label: 'Gift Sets & Boxes',
      //     // },
      //     // {
      //     //   id: 4,
      //     //   path: '/product-category/gift-vouchers',
      //     //   label: 'Gift Vouchers',
      //     // }
      //     // {
      //     //   id:5,
      //     //   path: '/product-category/valentines-gift-boxes',
      //     //   label: 'Valentine’s Gift Boxes',
      //     // },
      //     // {
      //     //   id:6,
      //     //   path: '/product-category/valentine-gift-bundles',
      //     //   label: 'Valentine’s Gift Bundles',
      //     // }
      //   ],
      // },
      // {
      //   id: 6,
      //   path: "/product-category/gift",
      //   label: "Gifting",
      //   subMenu: [
      //     {
      //       id: 1,
      //       path: "/product-category/occational-gifts",
      //       label: "Occational Gifts",
      //       subMenu: [
      //         {
      //           id: 1,
      //           path: "/product-category/birthday-gifts",
      //           label: "Birthday Gifts",
      //         },
      //         {
      //           id: 2,
      //           path: "/product-category/wedding-gifts",
      //           label: "Wedding Gifts",
      //         },
      //         {
      //           id: 3,
      //           path: "/product-category/baby-showers",
      //           label: "Baby Showers",
      //         },
      //         {
      //           id: 4,
      //           path: "/product-category/anniversary-gifts",
      //           label: "Anniversary Gifts",
      //         },
      //         {
      //           id: 5,
      //           path: "/product-category/graduation-gifts",
      //           label: "Graduation Gifts",
      //         },
      //       ],
      //     },
      //     {
      //       id: 2,
      //       path: "/product-category/seasonal-gifts",
      //       label: "Seasonal Gifts",
      //       subMenu: [
      //         {
      //           id: 1,
      //           path: "/product-category/aurudu-gifts",
      //           label: "Avurudu Gifts",
      //         },
      //         {
      //           id: 2,
      //           path: "/product-category/christmas-gifts",
      //           label: "Christmas Gifts",
      //         },
      //         {
      //           id: 3,
      //           path: "/product-category/valentines-gifts",
      //           label: "Valentine’s Gifts",
      //         },
      //         {
      //           id: 4,
      //           path: "/product-category/easter-gifts",
      //           label: "Easter Gifts",
      //         },
      //         {
      //           id: 5,
      //           path: "/product-category/mothers-day-gifts",
      //           label: "Mother’s Day Gifts",
      //         },
      //         {
      //           id: 6,
      //           path: "/product-category/fathers-day-gifts",
      //           label: "Father’s Day Gifts",
      //         },
      //       ],
      //     },
      //     {
      //       id: 3,
      //       path: "/product-category/gift-sets-boxes",
      //       label: "Gift Sets & Boxes",
      //     },
      //     {
      //       id: 4,
      //       path: "/product-category/gift-vouchers",
      //       label: "Gift Vouchers",
      //     },
      //     // {
      //     //   id: 5,
      //     //   path: "/product-category/valentines-gift-boxes",
      //     //   label: "Valentine’s Gift Boxes",
      //     // },
      //     // {
      //     //   id: 6,
      //     //   path: "/product-category/valentine-gift-bundles",
      //     //   label: "Valentine’s Gift Bundles",
      //     // },
      //   ],
      // },
    ],

    // ************************************************************ //
    //Mobile screen women menu
    mobileMenu: [
      // MOBILE - WOMEN MENU
      {
        id: 1,
        path: "/product-category/women",
        label: "Women",
        subMenu: [
          {
            id: 1,
            path: "/product-category/dresses",
            label: "Dresses",
            subMenu: [
              // {
              //   id: 1,
              //   path: '/product-category/long-dresses',
              //   label: 'Long Dresses',
              // },
              {
                id: 1,
                path: "/product-category/midi-dresses",
                label: "Midi Dresses",
              },
              // {
              //   id: 3,
              //   path: '/product-category/short-dresses',
              //   label: 'Short Dresses',
              // },
              {
                id: 2,
                path: "/product-category/maxi-dresses",
                label: "Maxi Dresses",
              },
              {
                id: 3,
                path: "/product-category/mini-dress",
                label: "Mini Dresses",
              },
              {
                id: 4,
                path: "/product-category/party-dresses",
                label: "Party Dresses",
              },
              {
                id: 5,
                path: "/product-category/casual-dresses",
                label: "Casual Dresses",
              },
              {
                id: 6,
                path: "/product-category/women-jumpsuits",
                label: "Jumpsuits",
              },
              // {
              //   id: 9,
              //   path: '/product-category/shrugs',
              //   label: 'Shrugs',
              // },
              // {
              //   id: 10,
              //   path: "/product-category/rompers",
              //   label: "Rompers",
              // },
              {
                id: 7,
                path: "/product-category/matching-sets",
                label: "Matching Sets",
              },
              // {
              //   id: 12,
              //   path: '/product-category/women-cardigans',
              //   label: 'Cardigans',
              // }
            ],
          },
          {
            id: 2,
            path: "/product-category/women-formal-wear",
            label: "Formalwear",
            subMenu: [
              {
                id: 1,
                path: "/product-category/women-formal-dresses",
                label: "Formal Dresses",
              },
              {
                id: 2,
                path: "/product-category/women-formal-topwear",
                label: "Formal Topwear",
              },
              // {
              //   id: 3,
              //   path: "/product-category/women-formal-bottomwear",
              //   label: "Formal Pants",
              // },
              // {
              //   id: 4,
              //   path: '/product-category/women-formal-blazers',
              //   label: 'Blazers',
              // },
            ],
          },
          {
            id: 3,
            path: "/product-category/women-topwear",
            label: "Topwear",
            subMenu: [
              {
                id: 1,
                path: "/product-category/women-shirts",
                label: "Shirts",
              },
              {
                id: 2,
                path: "/product-category/women-t-shirts",
                label: "T-Shirts",
              },
              // {
              //   id: 3,
              //   path: '/product-category/women-sweaters-sweatshirts',
              //   label: 'Sweaters & Sweatshirts',
              // },
              {
                id: 3,
                path: "/product-category/women-kaftans",
                label: "Kaftans",
              },
              // {
              //   id: 5,
              //   path: '/product-category/women-jackets-coats',
              //   label: 'Jackets & Coats',
              // },
              {
                id: 4,
                path: "/product-category/blouses",
                label: "Blouses",
              },
              {
                id: 5,
                path: "/product-category/women-casual-tops",
                label: "Casual Tops",
              },
              {
                id: 6,
                path: "/product-category/women-tank-tops",
                label: "Tank Tops",
              },
              {
                id: 7,
                path: "/product-category/crop-tops",
                label: "Crop Tops",
              },
              {
                id: 8,
                path: "/product-category/women-tube-tops",
                label: "Tube Tops",
              },
              // {
              //   id: 9,
              //   path: "/product-category/hoodies-women",
              //   label: "Hoodies",
              // },
            ],
          },
          {
            id: 4,
            path: "/product-category/women-bottomwear",
            label: "Bottomwear",
            subMenu: [
              {
                id: 1,
                path: "/product-category/women-pants",
                label: "Pants",
              },
              // {
              //   id: 2,
              //   path: '/product-category/women-jeans',
              //   label: 'Jeans',
              // },
              {
                id: 2,
                path: "/product-category/women-shorts-bottom", // changes slug 1
                label: "Shorts",
              },
              {
                id: 3,
                path: "/product-category/women-skirts",
                label: "Skirts",
              },
              {
                id: 4,
                path: "/product-category/women-leggings", // changes slug 2
                label: "Leggings",
              },
            ],
          },
          // {
          //   id: 5,
          //   path: "/product-category/women-ethnic-wear",
          //   label: "Ethnic Wear",
          //   // subMenu: [
          //   //   {
          //   //     id: 1,
          //   //     path: '/product-category/women-saree',
          //   //     label: 'Saree',
          //   //   },
          //   //   {
          //   //     id: 2,
          //   //     path: '/product-category/women-lungi',
          //   //     label: 'Lungi',
          //   //   },
          //   //   {
          //   //     id: 3,
          //   //     path: '/product-category/women-kurthis',
          //   //     label: 'Kurthis',
          //   //   },
          //   //   {
          //   //     id: 4,
          //   //     path: '/product-category/women-shalwars',
          //   //     label: 'Shawls',
          //   //   },
          //   //   {
          //   //     id: 5,
          //   //     path: '/product-category/women-batiks',
          //   //     label: 'Batiks',
          //   //   }
          //   // ],
          // },
          {
            id: 5,
            path: "/product-category/women-sports-active-wear",
            label: "Sports & Active Wear",
            subMenu: [
              {
                id: 1,
                path: "/product-category/women-sports-active-wear-tops",
                label: "Tops",
              },
              {
                id: 2,
                path: "/product-category/women-sports-active-wear-leggings",
                label: "Leggings",
              },
              {
                id: 3,
                path: "/product-category/women-sports-active-wear-joggers",
                label: "Joggers",
              },
              {
                id: 4,
                path: "/product-category/women-sports-active-wear-shorts",
                label: "Shorts",
              },
              {
                id: 5,
                path: "/product-category/women-sports-bras",
                label: "Sports Bras",
              },
              // {
              //   id: 6,
              //   path: '/product-category/women-swimwear',
              //   label: 'Swimwear',
              // },
              // {
              //   id: 7,
              //   path: '/product-category/women-sports-active-wear-pants',
              //   label: 'Pants',
              // },
              // {
              //   id: 8,
              //   path: "/product-category/women-beachwear",
              //   label: "Beachwear",
              // },
              // {
              //   id: 9,
              //   path: '/product-category/women-sports-accessories',
              //   label: 'Sports Accessories',
              // }
            ],
          },
          {
            id: 7,
            path: "/product-category/women-innerwear-sleepwear",
            label: "Innerwear & Sleepwear",
            subMenu: [
              {
                id: 1,
                path: "/product-category/women-bra",
                label: "Bras",
              },
              {
                id: 2,
                path: "/product-category/women-briefs",
                label: "Briefs",
              },
              {
                id: 3,
                path: "/product-category/women-shapewear",
                label: "Shapewear",
              },
              {
                id: 4,
                path: "/product-category/women-sleepwear-loungewear",
                label: "Sleepwear & Loungewear",
              },
              // {
              //   id: 5,
              //   path: '/product-category/women-camisoles-thermals',
              //   label: 'Camisoles & Thermals',
              // },
              {
                id: 5,
                path: "/product-category/women-body-shapers",
                label: "Body shapers",
              },
              // {
              //   id: 6,
              //   path: "/product-category/women-eye-mask",
              //   label: "Eye Mask",
              // },
            ],
          },
          {
            id: 8,
            path: "/product-category/women-footwear",
            label: "Footwear",
            subMenu: [
              {
                id: 1,
                path: "/product-category/women-flats",
                label: "Flats",
              },
              {
                id: 2,
                path: "/product-category/women-heels",
                label: "Heels",
              },
              // {
              //   id: 3,
              //   path: '/product-category/women-boots',
              //   label: 'Boots',
              // },
              // {
              //   id: 4,
              //   path: '/product-category/women-sports-shoes',
              //   label: 'Women Sports Shoes',
              // },
              // {
              //   id: 5,
              //   path: '/product-category/women-floaters',
              //   label: 'Women Floaters',
              // },
              {
                id: 3,
                path: "/product-category/women-sandals",
                label: "Sandals",
              },
              // {
              //   id: 7,
              //   path: '/product-category/women-casual-shoes',
              //   label: 'Casual Shoes',
              // },
              // {
              //   id: 4,
              //   path: "/product-category/women-flip-flops-slides",
              //   label: "Flip Flops & Slides",
              // },
              // {
              //   id: 9,
              //   path: '/product-category/women-sneakers',
              //   label: 'Sneakers',
              // }
            ],
          },
          {
            id: 9,
            path: "/product-category/accessories-women",
            label: "Accessories",
            subMenu: [
              {
                id: 1,
                path: "/product-category/women-jewellery",
                label: "Jewellery",
              },
              // {
              //   id: 2,
              //   path: '/product-category/women-wallets',
              //   label: 'Wallets',
              // },
              // {
              //   id: 3,
              //   path: '/product-category/women-purses',
              //   label: 'Purses',
              // },
              // {
              //   id: 4,
              //   path: '/product-category/women-watches',
              //   label: 'Watches',
              // },
              // {
              //   id: 5,
              //   path: '/product-category/women-sunglasses',
              //   label: 'Sunglasses',
              // },
              {
                id: 2,
                path: "/product-category/women-scrunchies",
                label: "Scrunchies",
              },
              // {
              //   id: 3,
              //   path: "/product-category/lingerie-accessories",
              //   label: "Lingerie Accessories",
              // },
              // {
              //   id: 8,
              //   path: '/product-category/women-belts',
              //   label: 'Belts',
              // },
              // {
              //   id: 9,
              //   path: '/product-category/women-ties',
              //   label: 'Ties',
              // },
              // {
              //   id: 4,
              //   path: "/product-category/women-bags-backpacks",
              //   label: "Bags & Backpacks",
              // },
              // {
              //   id: 5,
              //   path: "/product-category/women-hand-bags",
              //   label: "Handbags",
              // },
              // {
              //   id: 6,
              //   path: "/product-category/women-caps",
              //   label: "Caps",
              // },
              // {
              //   id: 7,
              //   path: "/product-category/women-hats",
              //   label: "Hats",
              // },
              // {
              //   id: 14,
              //   path: '/product-category/women-gloves',
              //   label: 'Gloves',
              // },
              // {
              //   id: 15,
              //   path: '/product-category/women-shawls-scarves',
              //   label: 'Shawls & Scarves',
              // },
              // {
              //   id: 16,
              //   path: '/product-category/women-mufflers',
              //   label: 'Mufflers',
              // },
            ],
          },
        ],
      },

      // MOBILE - MENS MENU
      {
        id: 2,
        path: "/product-category/men",
        label: "Men",
        subMenu: [
          {
            id: 1,
            path: "/product-category/men-top-wear",
            label: "Topwear",
            subMenu: [
              {
                id: 1,
                path: "/product-category/men-t-shirts",
                label: "T Shirts",
              },
              {
                id: 2,
                path: "/product-category/men-casual-shirts",
                label: "Casual Shirts",
              },
              // {
              //   id: 3,
              //   path: "/product-category/men-formal-shirts",
              //   label: "Formal Shirts",
              // },
              // {
              //   id: 4,
              //   path: "/product-category/men-sweaters",
              //   label: "Sweaters",
              // },
              // {
              //   id: 3,
              //   path: "/product-category/hoodies",
              //   label: "Hoodies",
              // },
              {
                id: 3,
                path: "/product-category/men-tank-tops",
                label: "Tank Tops",
              },
              // {
              //   id: 7,
              //   path: "/product-category/men-jackets",
              //   label: "Jackets",
              // },
              // {
              //   id: 8,
              //   path: "/product-category/men-blazers-coats",
              //   label: "Blazers & Coats",
              // },
              // {
              //   id: 9,
              //   path: "/product-category/men-suits",
              //   label: "Suits",
              // },
              // {
              //   id: 10,
              //   path: "/product-category/men-rain-jackets",
              //   label: "Rain Jackets",
              // },
            ],
          },
          {
            id: 2,
            path: "/product-category/men-ethnic-wear",
            label: "Ethnic Wear",
            // subMenu: [
            //   {
            //     id: 1,
            //     path: '/product-category/men-kurta',
            //     label: 'Kurta',
            //   },
            //   {
            //     id: 2,
            //     path: '/product-category/men-sarongs',
            //     label: 'Sarong',
            //   },
            //   {
            //     id: 3,
            //     path: '/product-category/men-traditional-tops',
            //     label: 'Traditional Tops',
            //   },
            //   {
            //     id: 4,
            //     path: '/product-category/men-traditional-bottoms',
            //     label: 'Traditional Bottoms',
            //   },
            //   {
            //     id: 5,
            //     path: '/product-category/batiks-men',
            //     label: 'Batik',
            //   }
            // ]
          },
          {
            id: 3,
            path: "/product-category/men-bottom-wear",
            label: "Bottomwear",
            // subMenu: [
            //   {
            //     id: 1,
            //     path: '/product-category/men-jeans',
            //     label: 'Jeans',
            //   },
            //   {
            //     id: 2,
            //     path: '/product-category/men-casual-pants',
            //     label: 'Casual Pants',
            //   },
            //   {
            //     id: 3,
            //     path: '/product-category/men-formal-pants',
            //     label: 'Formal Pants',
            //   },
            //   {
            //     id: 4,
            //     path: '/product-category/men-shorts',
            //     label: 'Shorts',
            //   },
            //   {
            //     id: 5,
            //     path: '/product-category/men-joggers',
            //     label: 'Joggers',
            //   }
            // ],
          },
          {
            id: 4,
            path: "/product-category/men-innerwear-sleepwear",
            label: "Innerwear & Sleepwear",
            // subMenu: [
            //   {
            //     id: 1,
            //     path: '/product-category/men-briefs',
            //     label: 'Briefs',
            //   },
            //   {
            //     id: 2,
            //     path: '/product-category/men-boxer-briefs',
            //     label: 'Boxer Briefs',
            //   },
            //   {
            //     id: 3,
            //     path: '/product-category/boxers',
            //     label: 'Boxers',
            //   },
            //   {
            //     id: 4,
            //     path: '/product-category/men-trunks',
            //     label: 'Trunks',
            //   },
            //   {
            //     id: 5,
            //     path: '/product-category/men-jockstrap',
            //     label: 'Jockstrap',
            //   },
            //   {
            //     id: 6,
            //     path: '/product-category/men-vests',
            //     label: 'Vests',
            //   },
            //   {
            //     id: 7,
            //     path: '/product-category/men-sleepwear',
            //     label: 'Sleepwear',
            //   },
            //   {
            //     id: 8,
            //     path: '/product-category/men-loungewear',
            //     label: 'Loungewear',
            //   },
            //   {
            //     id: 9,
            //     path: '/product-category/men-thermals',
            //     label: 'Thermals',
            //   }
            // ],
          },
          {
            id: 5,
            path: "/product-category/men-sports-active-wear",
            label: "Sports & Active Wear",
            subMenu: [
              {
                id: 1,
                path: "/product-category/men-active-t-shirts",
                label: "Active T-Shirts",
              },
              {
                id: 2,
                path: "/product-category/men-active-tank-tops",
                label: "Active Tank Tops",
              },
              {
                id: 3,
                path: "/product-category/men-compression-tops",
                label: "Compression Tops",
              },
              // {
              //   id: 4,
              //   path: "/product-category/men-track-pants",
              //   label: "Track Pants",
              // },
              // {
              //   id: 5,
              //   path: "/product-category/men-active-tracksuits",
              //   label: "Tracksuits",
              // },
              // {
              //   id: 6,
              //   path: "/product-category/men-jackets-sweatshirts",
              //   label: "Jackets & Sweatshirts",
              // },
              {
                id: 4,
                path: "/product-category/men-sports-accessories",
                label: "Sports Accessories",
              },
              // {
              //   id: 8,
              //   path: "/product-category/men-swimwear",
              //   label: "Swimwear",
              // },
              // {
              //   id: 6,
              //   path: "/product-category/men-running-shorts",
              //   label: "Running shorts",
              // },
              // {
              //   id: 7,
              //   path: "/product-category/men-athletic-shorts",
              //   label: "Athletic shorts",
              // },
              // {
              //   id: 8,
              //   path: "/product-category/men-compression-shorts-longs",
              //   label: "Compression shorts & longs",
              // },
            ],
          },
          {
            id: 6,
            path: "/product-category/men-footwear",
            label: "Foot Wear",
            // subMenu: [
            //   {
            //     id: 1,
            //     path: '/product-category/men-casual-shoes',
            //     label: 'Casual Shoes',
            //   },
            //   {
            //     id: 2,
            //     path: '/product-category/men-sports-shoes',
            //     label: 'Sports Shoes',
            //   },
            //   {
            //     id: 3,
            //     path: '/product-category/men-formal-shoes',
            //     label: 'Formal Shoes',
            //   },
            //   {
            //     id: 4,
            //     path: '/product-category/men-sneakers',
            //     label: 'Sneakers',
            //   },
            //   {
            //     id: 5,
            //     path: '/product-category/men-sneakers',
            //     label: 'Sandals',
            //   },
            //   {
            //     id: 6,
            //     path: '/product-category/men-floaters',
            //     label: 'Floaters',
            //   },
            //   {
            //     id: 7,
            //     path: '/product-category/flip-flops-slides-men-footwear',
            //     label: 'Flip Flops & Slides',
            //   },
            //   {
            //     id: 8,
            //     path: '/product-category/men-socks',
            //     label: 'Socks',
            //   },
            //   {
            //     id: 9,
            //     path: '/product-category/men-slippers',
            //     label: 'Slippers',
            //   },
            //   {
            //     id: 10,
            //     path: '/product-category/men-boots',
            //     label: 'Boots',
            //   },
            //   {
            //     id: 11,
            //     path: '/product-category/men-clogs',
            //     label: 'Clogs',
            //   }
            // ]
          },
          {
            id: 7,
            path: "/product-category/men-fashion-accessories",
            label: "Fashion Accessories",
            // subMenu: [
            //   {
            //     id: 1,
            //     path: '/product-category/men-wallets-cardholders',
            //     label: 'Wallets',
            //   },
            //   {
            //     id: 2,
            //     path: '/product-category/men-belts',
            //     label: 'Belts',
            //   },
            //   {
            //     id: 3,
            //     path: '/product-category/tie-bow',
            //     label: 'Tie & Bow',
            //   },
            //   {
            //     id: 4,
            //     path: '/product-category/men-tie-pin-cufflinks',
            //     label: 'Tie Pin & Cufflinks',
            //   },
            //   {
            //     id: 5,
            //     path: '/product-category/men-pocket-squares',
            //     label: 'Pocket Squares',
            //   },
            //   {
            //     id: 6,
            //     path: '/product-category/men-caps',
            //     label: 'Caps',
            //   },
            //   {
            //     id: 7,
            //     path: '/product-category/men-hats',
            //     label: 'Hats',
            //   },
            //   {
            //     id: 8,
            //     path: '/product-category/men-gloves',
            //     label: 'Gloves',
            //   },
            //   {
            //     id: 9,
            //     path: '/product-category/men-scarves',
            //     label: 'Scarves',
            //   },
            //   {
            //     id: 10,
            //     path: '/product-category/men-mufflers',
            //     label: 'Mufflers',
            //   },
            //   {
            //     id: 11,
            //     path: '/product-category/men-watches',
            //     label: 'Watches',
            //   },
            //   {
            //     id: 12,
            //     path: '/product-category/men-jewellery',
            //     label: 'Jewellery',
            //   },
            //   {
            //     id: 13,
            //     path: '/product-category/men-bags-backpacks',
            //     label: 'Bags & Backpacks',
            //   },
            //   {
            //     id: 14,
            //     path: '/product-category/men-sunglasses',
            //     label: 'Sunglasses',
            //   }
            // ]
          },
        ],
      },

      // MOBILE - KIDS MENU
      {
        id: 3,
        path: "/product-category/kids",
        label: "Kids",
        subMenu: [
          {
            id: 1,
            path: "/product-category/kids-boys-clothing",
            label: "Boys Clothing",
            // subMenu: [
            //   {
            //     id: 1,
            //     path: '/product-category/baby-suits-boys',
            //     label: 'Kids Boys Body Suits',
            //   },
            //   {
            //     id: 2,
            //     path: '/product-category/kids-boys-bottom-wear',
            //     label: 'Kids Boys Bottom Wear',
            //   },
            //   {
            //     id: 3,
            //     path: '/product-category/kids-boys-footwear',
            //     label: 'Kids Boys Footwear',
            //   },
            //   {
            //     id: 4,
            //     path: '/product-category/kids-boys-jeans',
            //     label: 'Kids Boys Jeans',
            //   },
            //   {
            //     id: 5,
            //     path: '/product-category/pants-boys',
            //     label: 'Kids Boys Pants',
            //   },
            //   {
            //     id: 6,
            //     path: '/product-category/shirts-boys',
            //     label: 'Kids Boys Shirts',
            //   },
            //   {
            //     id: 7,
            //     path: '/product-category/shorts-boys',
            //     label: 'Kids Boys Shorts',
            //   },
            //   {
            //     id: 8,
            //     path: '/product-category/kids-boys-sleepwear',
            //     label: 'Kids Boys Sleepwear',
            //   },
            //   {
            //     id: 8,
            //     path: '/product-category/kids-boys-t-shirts',
            //     label: 'Kids Boys T-Shirts',
            //   },
            //   {
            //     id: 8,
            //     path: '/product-category/kids-boys-top-wear',
            //     label: 'Kids Boys Top Wear',
            //   },
            //   {
            //     id: 8,
            //     path: '/product-category/kids-boys-traditional-wear',
            //     label: 'Kids Boys Traditional Wear',
            //   },
            // ]
          },
          {
            id: 2,
            path: "/product-category/kids-girls-clothing",
            label: "Girls Clothing",
            // subMenu: [
            //   {
            //     id: 1,
            //     path: '/product-category/kids-girl-footwear',
            //     label: 'Kids Girl Footwear',
            //   },
            //   {
            //     id: 2,
            //     path: '/product-category/kids-girls-body-suits',
            //     label: 'Kids Girls Body Suits',
            //   },
            //   {
            //     id: 3,
            //     path: '/product-category/kids-girls-bottom-wear',
            //     label: 'Kids Girls Bottom Wear',
            //   },
            //   {
            //     id: 4,
            //     path: '/product-category/kids-girls-dresses',
            //     label: 'Kids Girls Dresses',
            //   },
            //   {
            //     id: 5,
            //     path: '/product-category/kids-girls-frocks',
            //     label: 'Kids Girls Frocks',
            //   },
            //   {
            //     id: 6,
            //     path: '/product-category/kids-girls-jeans',
            //     label: 'Kids Girls Jeans',
            //   },
            //   {
            //     id: 7,
            //     path: '/product-category/kids-girls-pants',
            //     label: 'Kids Girls Pants',
            //   },
            //   {
            //     id: 8,
            //     path: '/product-category/kids-girls-shorts-skirts',
            //     label: 'Kids Girls Shorts & Skirts',
            //   },
            //   {
            //     id: 9,
            //     path: '/product-category/kids-girls-sleepwear',
            //     label: 'Kids Girls Sleepwear',
            //   },
            //   {
            //     id: 10,
            //     path: '/product-category/kids-girls-t-shirts',
            //     label: 'Kids Girls T-Shirts',
            //   },
            //   {
            //     id: 11,
            //     path: '/product-category/kids-girls-top-wear',
            //     label: 'Kids Girls Top Wear',
            //   },
            //   {
            //     id: 12,
            //     path: '/product-category/kids-girls-traditional-wear',
            //     label: 'Kids Girls Traditional Wear',
            //   }
            // ]
          },
          {
            id: 3,
            path: "/product-category/kids-accessories",
            label: "Kids Accessories",
            // subMenu: [
            //   {
            //     id: 1,
            //     path: '/product-category/kids-bags',
            //     label: 'Kids Bags',
            //   },
            //   {
            //     id: 2,
            //     path: '/product-category/kids-caps-hats',
            //     label: 'Kids Caps & Hats',
            //   }
            // ]
          },
        ],
      },

      // BEAUTY & WELLNESS
      {
        id: 4,
        path: "/product-category/beauty-wellness",
        label: "Beauty & Wellness",
        subMenu: [
          {
            id: 1,
            path: "/product-category/face",
            label: "Face Care",
            subMenu: [
              {
                id: 1,
                path: "/product-category/face-moisturizer",
                label: "Moisturisers",
              },
              // {
              //   id: 2,
              //   path: '/product-category/cleanser',
              //   label: 'Cleanser',
              // },
              // {
              //   id: 3,
              //   path: '/product-category/masks-peel',
              //   label: 'Masks & Peel',
              // },
              // {
              //   id: 4,
              //   path: '/product-category/sunscreen',
              //   label: 'Sunscreen',
              // },
              {
                id: 2,
                path: "/product-category/serum-face",
                label: "Serum",
              },
              {
                id: 3,
                path: "/product-category/face-wash",
                label: "Face Wash",
              },
              // {
              //   id: 7,
              //   path: '/product-category/eye-cream',
              //   label: 'Eye Creams',
              // },
              {
                id: 4,
                path: "/product-category/lip-balm-face",
                label: "Lip Balm",
              },
              {
                id: 5,
                path: "/product-category/beard-oil",
                label: "Beard Oils",
              },
              {
                id: 6,
                path: "/product-category/after-shave",
                label: "After Shave",
              },
              {
                id: 7,
                path: "/product-category/toners",
                label: "Toners",
              },
              {
                id: 8,
                path: "/product-category/face-scrub",
                label: "Face Scrubs",
              },
              {
                id: 9,
                path: "/product-category/shaving-cream-gel",
                label: "Shaving Cream & Gel",
              },
              {
                id: 10,
                path: "/product-category/night-creams",
                label: "Night Creams",
              },
              // {
              //   id: 15,
              //   path: '/product-category/waxing-strips',
              //   label: 'Waxing Strips',
              // },
              {
                id: 11,
                path: "/product-category/mists",
                label: "Mists",
              },
            ],
          },
          {
            id: 2,
            path: "/product-category/hair-care",
            label: "Hair Care",
            subMenu: [
              {
                id: 1,
                path: "/product-category/shampoo",
                label: "Shampoo",
              },
              // {
              //   id: 2,
              //   path: '/product-category/conditioner',
              //   label: 'Conditioner',
              // },
              {
                id: 2,
                path: "/product-category/hair-cream",
                label: "Hair Cream",
              },
              {
                id: 3,
                path: "/product-category/hair-oil",
                label: "Hair Oil",
              },
              {
                id: 4,
                path: "/product-category/hair-gel",
                label: "Hair Gel",
              },
              // {
              //   id: 6,
              //   path: "/product-category/hair-color",
              //   label: "Hair Color",
              // },
              // {
              //   id: 7,
              //   path: "/product-category/hair-serum",
              //   label: "Hair Serums",
              // },
              // {
              //   id: 8,
              //   path: "/product-category/hair-accessory",
              //   label: "Hair Accessories",
              // },
              // {
              //   id: 9,
              //   path: "/product-category/hair-wax",
              //   label: "Hair Wax",
              // },
              {
                id: 5,
                path: "/product-category/hair-spray",
                label: "Hair Spray",
              },
              // {
              //   id: 11,
              //   path: '/product-category/hair-brushes',
              //   label: 'Hair Brushes',
              // },
              // {
              //   id: 12,
              //   path: '/product-category/wigs-hair-extensions',
              //   label: 'Wigs & Hair Extensions',
              // }
            ],
          },
          {
            id: 3,
            path: "/product-category/body-care",
            label: "Body Care",
            subMenu: [
              // {
              //   id: 1,
              //   path: '/product-category/body-lotion',
              //   label: 'Body Lotion',
              // },
              // {
              //   id: 2,
              //   path: '/product-category/body-wash',
              //   label: 'Body Wash',
              // },
              {
                id: 1,
                path: "/product-category/body-scrub",
                label: "Body Scrub",
              },
              // {
              //   id: 4,
              //   path: '/product-category/body-hand-cream',
              //   label: 'Hand Cream',
              // },
              {
                id: 2,
                path: "/product-category/soaps",
                label: "Soaps",
              },
              // {
              //   id: 6,
              //   path: '/product-category/deodorant',
              //   label: 'Deodorant',
              // },
              // {
              //   id: 7,
              //   path: '/product-category/shaving-gel',
              //   label: 'Shaving Gel',
              // },
              // {
              //   id: 8,
              //   path: '/product-category/body-wax',
              //   label: 'Body Wax',
              // },
              // {
              //   id: 9,
              //   path: '/product-category/foot-cream',
              //   label: 'Foot Cream',
              // },
              // {
              //   id: 10,
              //   path: '/product-category/manicure-sets',
              //   label: 'Manicure Sets',
              // },
              // {
              //   id: 11,
              //   path: '/product-category/feminine-care',
              //   label: 'Feminine Care',
              // }
            ],
          },
          {
            id: 4,
            path: "/product-category/fragrance",
            label: "Fragrance",
            subMenu: [
              {
                id: 1,
                path: "/product-category/mens-perfume",
                label: "Mens Perfume",
              },
              {
                id: 2,
                path: "/product-category/womens-perfume",
                label: "Womens Perfume",
              },
              // {
              //   id: 3,
              //   path: '/product-category/body-mist',
              //   label: 'Body Mist',
              // },
            ],
          },
          {
            id: 5,
            path: "/product-category/makeup",
            label: "Makeup",
            subMenu: [
              // {
              //   id: 1,
              //   path: '/product-category/lipsticks',
              //   label: 'Lipstick',
              // },
              // {
              //   id: 2,
              //   path: '/product-category/lip-gloss',
              //   label: 'Lip Gloss',
              // },
              // {
              //   id: 3,
              //   path: '/product-category/lip-liner',
              //   label: 'Lip Liner',
              // },
              // {
              //   id: 4,
              //   path: '/product-category/mascara',
              //   label: 'Mascara',
              // },
              // {
              //   id: 5,
              //   path: '/product-category/eyeliner',
              //   label: 'Eyeliner',
              // },
              // {
              //   id: 6,
              //   path: '/product-category/kajal',
              //   label: 'Kajal',
              // },
              // {
              //   id: 7,
              //   path: '/product-category/eye-shadow',
              //   label: 'Eye Shadow',
              // },
              // {
              //   id: 8,
              //   path: '/product-category/foundation',
              //   label: 'Foundation',
              // },
              // {
              //   id: 9,
              //   path: '/product-category/primer',
              //   label: 'Primer',
              // },
              // {
              //   id: 10,
              //   path: '/product-category/concealers',
              //   label: 'Concealer',
              // },
              // {
              //   id: 11,
              //   path: '/product-category/compact-powder',
              //   label: 'Compact Powder',
              // },
              {
                id: 1,
                path: "/product-category/nail-polish",
                label: "Nail Polish",
              },
              // {
              //   id: 13,
              //   path: '/product-category/blush-makeup	',
              //   label: 'Blush',
              // },
              // {
              //   id: 14,
              //   path: '/product-category/makeup-tools',
              //   label: 'Makeup Tools',
              // },
              // {
              //   id: 15,
              //   path: '/product-category/nail-art-stickers',
              //   label: 'Nail Art & Stickers',
              // },
              // {
              //   id: 16,
              //   path: '/product-category/nail-polish-remover',
              //   label: 'Nail Polish Remover',
              // },
              // {
              //   id: 17,
              //   path: '/product-category/contact-lenses',
              //   label: 'Contact Lenses',
              // }
            ],
          },
          // {
          //   id: 6,
          //   path: "/product-category/appliances",
          //   label: "Appliances",
          //   subMenu: [
          //     {
          //       id: 1,
          //       path: "/product-category/hair-straightener",
          //       label: "Hair Straightener",
          //     },
          //     {
          //       id: 2,
          //       path: "/product-category/hair-dryer",
          //       label: "Hair Dryer",
          //     },
          //     {
          //       id: 3,
          //       path: "/product-category/epilator",
          //       label: "Epilators",
          //     },
          //     {
          //       id: 4,
          //       path: "/product-category/trimmers",
          //       label: "Trimmers",
          //     },
          //     {
          //       id: 5,
          //       path: "/product-category/curling-irons",
          //       label: "Curling Irons",
          //     },
          //     {
          //       id: 6,
          //       path: "/product-category/manicure-pedicure-machines",
          //       label: "Manicure/Pedicure Machines",
          //     },
          //     {
          //       id: 7,
          //       path: "/product-category/uv-lamps",
          //       label: "UV Lamps",
          //     },
          //     {
          //       id: 8,
          //       path: "/product-category/body-massagers",
          //       label: "Body Massagers",
          //     },
          //   ],
          // },
          {
            id: 6,
            path: "/product-category/wellness",
            label: "Wellness",
          },
        ],
      },

      //  Home & Living Menu Below
      {
        id: 5,
        path: "/product-category/home-living",
        label: "Home & Living",
        subMenu: [
          // {
          //   id: 1,
          //   path: '/product-category/bedding',
          //   label: 'Bedding',
          //   subMenu: [
          //     {
          //       id: 1,
          //       path: '/product-category/bed-runners',
          //       label: 'Bed Runners',
          //     },
          //     {
          //       id: 2,
          //       path: '/product-category/mattress-protectors',
          //       label: 'Mattress Protectors',
          //     },
          //     {
          //       id: 3,
          //       path: '/product-category/bedsheets',
          //       label: 'Bedsheets',
          //     },
          //     {
          //       id: 4,
          //       path: '/product-category/quilts',
          //       label: 'Quilts',
          //     },
          //     {
          //       id: 5,
          //       path: '/product-category/blankets',
          //       label: 'Blankets',
          //     },
          //     {
          //       id: 6,
          //       path: '/product-category/pillows',
          //       label: 'Pillows',
          //     },
          //     {
          //       id: 7,
          //       path: '/product-category/pillow-covers',
          //       label: 'Pillow Covers',
          //     },
          //     {
          //       id: 8,
          //       path: '/product-category/bed-covers',
          //       label: 'Bed Covers',
          //     },
          //     {
          //       id: 9,
          //       path: '/product-category/chair-pads-covers',
          //       label: 'Chair Pads & Covers',
          //     },
          //     {
          //       id: 10,
          //       path: '/product-category/sofa-covers',
          //       label: 'Sofa Covers',
          //     }
          //   ]
          // },
          {
            id: 1,
            path: "/product-category/bath",
            label: "Bath",
            subMenu: [
              {
                id: 1,
                path: "/product-category/bath-towels",
                label: "Bath Towels",
              },
              // {
              //   id: 2,
              //   path: '/product-category/hand-face-towels',
              //   label: 'Hand & Face Towels',
              // },
              // {
              //   id: 3,
              //   path: "/product-category/beach-towels",
              //   label: "Beach Towels",
              // },
              // {
              //   id: 4,
              //   path: '/product-category/towels-set',
              //   label: 'Towels Set',
              // },
              // {
              //   id: 5,
              //   path: '/product-category/bath-rugs',
              //   label: 'Bath Rugs',
              // },
              // {
              //   id: 6,
              //   path: '/product-category/bath-robes',
              //   label: 'Bath Robes',
              // },
              // {
              //   id: 7,
              //   path: '/product-category/bathroom-accessories',
              //   label: 'Bathroom Accessories',
              // }
            ],
          },
          {
            id: 2,
            path: "/product-category/lamps-lighting",
            label: "Lamps & Lighting",
            subMenu: [
              // {
              //   id: 1,
              //   path: '/product-category/floor-lamps',
              //   label: 'Floor Lamps',
              // },
              {
                id: 1,
                path: "/product-category/ceiling-lamps",
                label: "Ceiling Lamps",
              },
              // {
              //   id: 3,
              //   path: '/product-category/table-lamps',
              //   label: 'Table Lamps',
              // },
              {
                id: 2,
                path: "/product-category/wall-lamps",
                label: "Wall Lamps",
              },
              // {
              //   id: 5,
              //   path: '/product-category/outdoor-lamps',
              //   label: 'Outdoor Lamps',
              // },
              // {
              //   id: 6,
              //   path: '/product-category/string-lights',
              //   label: 'String Lights',
              // },
              {
                id: 3,
                path: "/product-category/candles",
                label: "Candles",
              },
            ],
          },
          {
            id: 3,
            path: "/product-category/kitchen-table",
            label: "Kitchen & Table",
            subMenu: [
              // {
              //   id: 1,
              //   path: '/product-category/table-runners',
              //   label: 'Table Runners',
              // },
              {
                id: 1,
                path: "/product-category/dinnerware-serveware",
                label: "Dinnerware & Serveware",
              },
              {
                id: 2,
                path: "/product-category/cups-mugs",
                label: "Cups and Mugs",
              },
              // {
              //   id: 4,
              //   path: '/product-category/bakeware-cookware',
              //   label: 'Bakeware & Cookware',
              // },
              {
                id: 3,
                path: "/product-category/kitchen-storage-tools",
                label: "Kitchen Storage & Tools",
              },
              // {
              //   id: 6,
              //   path: '/product-category/bar-drinkware',
              //   label: 'Bar & Drinkware',
              // },
              // {
              //   id: 7,
              //   path: '/product-category/table-covers',
              //   label: 'Table Covers',
              // }
            ],
          },
          // {
          //   id: 3,
          //   path: "/product-category/indoor-accessories",
          //   label: "Indoor Accessories",
          //   subMenu: [
          //     {
          //       id: 1,
          //       path: "/product-category/mosquito-nets",
          //       label: "Mosquito Nets",
          //     },
          //     // {
          //     //   id: 2,
          //     //   path: '/product-category/baby-nets',
          //     //   label: 'Baby nets',
          //     // }
          //   ],
          // },
          // {
          //   id: 4,
          //   path: "/product-category/outdoor-accessories",
          //   label: "Outdoor Accessories",
          //   subMenu: [
          //     // {
          //     //   id: 1,
          //     //   path: "/product-category/umbrellas",
          //     //   label: "Umbrellas",
          //     // },
          //     // {
          //     //   id: 2,
          //     //   path: '/product-category/huts',
          //     //   label: 'Huts',
          //     // }
          //   ],
          // },
          // {
          //   id: 7,
          //   path: "/product-category/pets",
          //   label: "Pets",
          // },
        ],
      },

      // Gift
      // {
      //   id: 6,
      //   path: "/product-category/avurudu",
      //   label: "Avurudu Collection",
      //   subMenu: [
      //     {
      //       id: 1,
      //       path: "/product-category/men-avurudu",
      //       label: "Men",
      //     },
      //     {
      //       id: 1,
      //       path: "/product-category/women-avurudu",
      //       label: "Women",
      //     },
      //     {
      //       id: 1,
      //       path: "/product-category/kids-avurudu",
      //       label: "Kids",
      //       subMenu: [
      //         {
      //           id: 1,
      //           path: "/product-category/boys-avurudu",
      //           label: "Boys Collection",
      //         },
      //         {
      //           id: 2,
      //           path: "/product-category/girls-avurudu",
      //           label: "Girls Collection",
      //         },
      //       ],
      //     },
      //     // {
      //     //   id: 1,
      //     //   path: '/product-category/occational-gifts',
      //     //   label: 'Occational Gifts',
      //     //   subMenu: [
      //     //     {
      //     //       id: 1,
      //     //       path: '/product-category/birthday-gifts',
      //     //       label: 'Birthday Gifts',
      //     //     },
      //     //     {
      //     //       id: 2,
      //     //       path: '/product-category/wedding-gifts',
      //     //       label: 'Wedding Gifts',
      //     //     },
      //     //     {
      //     //       id: 3,
      //     //       path: '/product-category/baby-showers',
      //     //       label: 'Baby Showers',
      //     //     },
      //     //     {
      //     //       id: 4,
      //     //       path: '/product-category/anniversary-gifts',
      //     //       label: 'Anniversary Gifts',
      //     //     },
      //     //     {
      //     //       id: 5,
      //     //       path: '/product-category/graduation-gifts',
      //     //       label: 'Graduation Gifts',
      //     //     }
      //     //   ]
      //     // },
      //     // {
      //     //   id: 2,
      //     //   path: '/product-category/seasonal-gifts',
      //     //   label: 'Seasonal Gifts',
      //     //   subMenu: [
      //     // {
      //     //   id: 1,
      //     //   path: '/product-category/aurudu-gifts',
      //     //   label: 'Aurudu Gifts',
      //     // },
      //     // {
      //     //   id: 2,
      //     //   path: '/product-category/christmas-gifts',
      //     //   label: 'Christmas Gifts',
      //     // },
      //     // {
      //     //   id: 3,
      //     //   path: '/product-category/valentines-gifts',
      //     //   label: 'Valentin’s Gifts',
      //     // },
      //     // {
      //     //   id: 4,
      //     //   path: '/product-category/easter-gifts',
      //     //   label: 'Easter Gifts',
      //     // },
      //     // {
      //     //   id: 5,
      //     //   path: '/product-category/mothers-day-gifts',
      //     //   label: 'Mother’s Day Gifts',
      //     // },
      //     // {
      //     //   id: 6,
      //     //   path: '/product-category/fathers-day-gifts',
      //     //   label: 'Father’s Day Gifts',
      //     //     // }
      //     //   ]
      //     // },
      //     // {
      //     //   id: 3,
      //     //   path: '/product-category/gift-sets-boxes',
      //     //   label: 'Gift Sets & Boxes',
      //     // },
      //     // {
      //     //   id: 4,
      //     //   path: '/product-category/gift-vouchers',
      //     //   label: 'Gift Vouchers',
      //     // }
      //     // {
      //     //   id: 5 ,
      //     //   path: '/product-category/valentines-gift-boxes',
      //     //   label: 'Valentine’s Gift Boxes',
      //     // },
      //     // {
      //     //   id: 6 ,
      //     //   path: '/product-category/valentine-gift-bundles',
      //     //   label: 'Valentine’s Gift Bundles',
      //     // }
      //   ],
      // },
      // {
      //   id: 6,
      //   path: "/product-category/gift",
      //   label: "Gifting",
      //   subMenu: [
      //     {
      //       id: 1,
      //       path: "/product-category/occational-gifts",
      //       label: "Occational Gifts",
      //       subMenu: [
      //         {
      //           id: 1,
      //           path: "/product-category/birthday-gifts",
      //           label: "Birthday Gifts",
      //         },
      //         {
      //           id: 2,
      //           path: "/product-category/wedding-gifts",
      //           label: "Wedding Gifts",
      //         },
      //         {
      //           id: 3,
      //           path: "/product-category/baby-showers",
      //           label: "Baby Showers",
      //         },
      //         {
      //           id: 4,
      //           path: "/product-category/anniversary-gifts",
      //           label: "Anniversary Gifts",
      //         },
      //         {
      //           id: 5,
      //           path: "/product-category/graduation-gifts",
      //           label: "Graduation Gifts",
      //         },
      //       ],
      //     },
      //     {
      //       id: 2,
      //       path: "/product-category/seasonal-gifts",
      //       label: "Seasonal Gifts",
      //       subMenu: [
      //         {
      //           id: 1,
      //           path: "/product-category/aurudu-gifts",
      //           label: "Avurudu Gifts",
      //         },
      //         {
      //           id: 2,
      //           path: "/product-category/christmas-gifts",
      //           label: "Christmas Gifts",
      //         },
      //         {
      //           id: 3,
      //           path: "/product-category/valentines-gifts",
      //           label: "Valentine’s Gifts",
      //         },
      //         {
      //           id: 4,
      //           path: "/product-category/easter-gifts",
      //           label: "Easter Gifts",
      //         },
      //         {
      //           id: 5,
      //           path: "/product-category/mothers-day-gifts",
      //           label: "Mother’s Day Gifts",
      //         },
      //         {
      //           id: 6,
      //           path: "/product-category/fathers-day-gifts",
      //           label: "Father’s Day Gifts",
      //         },
      //       ],
      //     },
      //     {
      //       id: 3,
      //       path: "/product-category/gift-sets-boxes",
      //       label: "Gift Sets & Boxes",
      //     },
      //     {
      //       id: 4,
      //       path: "/product-category/gift-vouchers",
      //       label: "Gift Vouchers",
      //     },
      //     // {
      //     //   id: 5,
      //     //   path: "/product-category/valentines-gift-boxes",
      //     //   label: "Valentine’s Gift Boxes",
      //     // },
      //     // {
      //     //   id: 6,
      //     //   path: "/product-category/valentine-gift-bundles",
      //     //   label: "Valentine’s Gift Bundles",
      //     // },
      //   ],
      // },
      // {
      //   id: 7,
      //   path: '/product-category/christmas-collections',
      //   label: 'Christmas Collection',
      // }
    ],

    /* *************************************************************************************************** */

    // categoryMenu: [
    //   {
    //     id: 1,
    //     path: "/",
    //     label: "menu-womens-fashion",
    //     icon: <WomenIcon />,
    //     columns: [
    //       {
    //         id: 1,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/top-wear",
    //             label: "menu-top-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/t-shit-shirtrt",
    //                 label: "menu-t-shirt",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shirts",
    //                 label: "menu-casual-shirts",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/formal-shirts",
    //                 label: "menu-formal-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/blazwers-coats",
    //                 label: "menu-blazwers-coats",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/suits",
    //                 label: "menu-suits",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/jackets",
    //                 label: "menu-jackets",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/belt-scarves",
    //             label: "menu-belt-scarves",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/watches-wearables",
    //             label: "menu-watches-wearables",
    //           },
    //         ],
    //       },
    //       {
    //         id: 2,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/western-wear",
    //             label: "menu-western-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/dresses",
    //                 label: "menu-dresses",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/jumpsuits",
    //                 label: "menu-jumpsuits",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/tops-t-shirt",
    //                 label: "menu-tops-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/shorts-skirts",
    //                 label: "menu-shorts-skirts",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/shurgs",
    //                 label: "menu-shurgs",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/blazers",
    //                 label: "menu-blazers",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/plus-size",
    //             label: "menu-plus-size",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/sunglasses-frames",
    //             label: "menu-sunglasses-frames",
    //           },
    //         ],
    //       },
    //       {
    //         id: 3,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/footwear",
    //             label: "menu-footwear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/flats",
    //                 label: "menu-flats",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shoes",
    //                 label: "menu-casual-shoes",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/heels",
    //                 label: "menu-heels",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/boots",
    //                 label: "menu-boots",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/sports-active-wear",
    //             label: "menu-sports-active-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/clothing",
    //                 label: "menu-clothing",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/footwear",
    //                 label: "menu-footwear",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/sports-accessories",
    //                 label: "menu-sports-accessories",
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     id: 2,
    //     path: "/",
    //     label: "menu-mens-fashion",
    //     icon: <MenIcon />,
    //     columns: [
    //       {
    //         id: 1,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/top-wear",
    //             label: "menu-top-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/t-shit-shirtrt",
    //                 label: "menu-t-shirt",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shirts",
    //                 label: "menu-casual-shirts",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/formal-shirts",
    //                 label: "menu-formal-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/blazwers-coats",
    //                 label: "menu-blazwers-coats",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/suits",
    //                 label: "menu-suits",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/jackets",
    //                 label: "menu-jackets",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/belt-scarves",
    //             label: "menu-belt-scarves",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/watches-wearables",
    //             label: "menu-watches-wearables",
    //           },
    //         ],
    //       },
    //       {
    //         id: 2,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/western-wear",
    //             label: "menu-western-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/dresses",
    //                 label: "menu-dresses",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/jumpsuits",
    //                 label: "menu-jumpsuits",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/tops-t-shirt",
    //                 label: "menu-tops-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/shorts-skirts",
    //                 label: "menu-shorts-skirts",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/shurgs",
    //                 label: "menu-shurgs",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/blazers",
    //                 label: "menu-blazers",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/plus-size",
    //             label: "menu-plus-size",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/sunglasses-frames",
    //             label: "menu-sunglasses-frames",
    //           },
    //         ],
    //       },
    //       {
    //         id: 3,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/footwear",
    //             label: "menu-footwear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/flats",
    //                 label: "menu-flats",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shoes",
    //                 label: "menu-casual-shoes",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/heels",
    //                 label: "menu-heels",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/boots",
    //                 label: "menu-boots",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/sports-active-wear",
    //             label: "menu-sports-active-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/clothing",
    //                 label: "menu-clothing",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/footwear",
    //                 label: "menu-footwear",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/sports-accessories",
    //                 label: "menu-sports-accessories",
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     id: 3,
    //     path: "/",
    //     label: "menu-watches",
    //     icon: <WatchIcon />,
    //     columns: [
    //       {
    //         id: 1,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/top-wear",
    //             label: "menu-top-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/t-shit-shirtrt",
    //                 label: "menu-t-shirt",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shirts",
    //                 label: "menu-casual-shirts",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/formal-shirts",
    //                 label: "menu-formal-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/blazwers-coats",
    //                 label: "menu-blazwers-coats",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/suits",
    //                 label: "menu-suits",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/jackets",
    //                 label: "menu-jackets",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/belt-scarves",
    //             label: "menu-belt-scarves",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/watches-wearables",
    //             label: "menu-watches-wearables",
    //           },
    //         ],
    //       },
    //       {
    //         id: 2,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/western-wear",
    //             label: "menu-western-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/dresses",
    //                 label: "menu-dresses",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/jumpsuits",
    //                 label: "menu-jumpsuits",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/tops-t-shirt",
    //                 label: "menu-tops-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/shorts-skirts",
    //                 label: "menu-shorts-skirts",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/shurgs",
    //                 label: "menu-shurgs",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/blazers",
    //                 label: "menu-blazers",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/plus-size",
    //             label: "menu-plus-size",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/sunglasses-frames",
    //             label: "menu-sunglasses-frames",
    //           },
    //         ],
    //       },
    //       {
    //         id: 3,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/footwear",
    //             label: "menu-footwear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/flats",
    //                 label: "menu-flats",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shoes",
    //                 label: "menu-casual-shoes",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/heels",
    //                 label: "menu-heels",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/boots",
    //                 label: "menu-boots",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/sports-active-wear",
    //             label: "menu-sports-active-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/clothing",
    //                 label: "menu-clothing",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/footwear",
    //                 label: "menu-footwear",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/sports-accessories",
    //                 label: "menu-sports-accessories",
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     id: 4,
    //     path: "/",
    //     label: "menu-wallets",
    //     icon: <WalletIcon />,
    //     columns: [
    //       {
    //         id: 1,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/top-wear",
    //             label: "menu-top-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/t-shit-shirtrt",
    //                 label: "menu-t-shirt",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shirts",
    //                 label: "menu-casual-shirts",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/formal-shirts",
    //                 label: "menu-formal-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/blazwers-coats",
    //                 label: "menu-blazwers-coats",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/suits",
    //                 label: "menu-suits",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/jackets",
    //                 label: "menu-jackets",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/belt-scarves",
    //             label: "menu-belt-scarves",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/watches-wearables",
    //             label: "menu-watches-wearables",
    //           },
    //         ],
    //       },
    //       {
    //         id: 2,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/western-wear",
    //             label: "menu-western-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/dresses",
    //                 label: "menu-dresses",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/jumpsuits",
    //                 label: "menu-jumpsuits",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/tops-t-shirt",
    //                 label: "menu-tops-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/shorts-skirts",
    //                 label: "menu-shorts-skirts",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/shurgs",
    //                 label: "menu-shurgs",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/blazers",
    //                 label: "menu-blazers",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/plus-size",
    //             label: "menu-plus-size",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/sunglasses-frames",
    //             label: "menu-sunglasses-frames",
    //           },
    //         ],
    //       },
    //       {
    //         id: 3,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/footwear",
    //             label: "menu-footwear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/flats",
    //                 label: "menu-flats",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shoes",
    //                 label: "menu-casual-shoes",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/heels",
    //                 label: "menu-heels",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/boots",
    //                 label: "menu-boots",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/sports-active-wear",
    //             label: "menu-sports-active-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/clothing",
    //                 label: "menu-clothing",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/footwear",
    //                 label: "menu-footwear",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/sports-accessories",
    //                 label: "menu-sports-accessories",
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     id: 5,
    //     path: "/",
    //     label: "menu-bags",
    //     icon: <BagIcon />,
    //     columns: [
    //       {
    //         id: 1,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/top-wear",
    //             label: "menu-top-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/t-shit-shirtrt",
    //                 label: "menu-t-shirt",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shirts",
    //                 label: "menu-casual-shirts",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/formal-shirts",
    //                 label: "menu-formal-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/blazwers-coats",
    //                 label: "menu-blazwers-coats",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/suits",
    //                 label: "menu-suits",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/jackets",
    //                 label: "menu-jackets",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/belt-scarves",
    //             label: "menu-belt-scarves",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/watches-wearables",
    //             label: "menu-watches-wearables",
    //           },
    //         ],
    //       },
    //       {
    //         id: 2,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/western-wear",
    //             label: "menu-western-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/dresses",
    //                 label: "menu-dresses",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/jumpsuits",
    //                 label: "menu-jumpsuits",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/tops-t-shirt",
    //                 label: "menu-tops-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/shorts-skirts",
    //                 label: "menu-shorts-skirts",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/shurgs",
    //                 label: "menu-shurgs",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/blazers",
    //                 label: "menu-blazers",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/plus-size",
    //             label: "menu-plus-size",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/sunglasses-frames",
    //             label: "menu-sunglasses-frames",
    //           },
    //         ],
    //       },
    //       {
    //         id: 3,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/footwear",
    //             label: "menu-footwear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/flats",
    //                 label: "menu-flats",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shoes",
    //                 label: "menu-casual-shoes",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/heels",
    //                 label: "menu-heels",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/boots",
    //                 label: "menu-boots",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/sports-active-wear",
    //             label: "menu-sports-active-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/clothing",
    //                 label: "menu-clothing",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/footwear",
    //                 label: "menu-footwear",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/sports-accessories",
    //                 label: "menu-sports-accessories",
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     id: 6,
    //     path: "/",
    //     label: "menu-jewelry",
    //     icon: <JewelryIcon />,
    //     columns: [
    //       {
    //         id: 1,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/top-wear",
    //             label: "menu-top-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/t-shit-shirtrt",
    //                 label: "menu-t-shirt",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shirts",
    //                 label: "menu-casual-shirts",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/formal-shirts",
    //                 label: "menu-formal-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/blazwers-coats",
    //                 label: "menu-blazwers-coats",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/suits",
    //                 label: "menu-suits",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/jackets",
    //                 label: "menu-jackets",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/belt-scarves",
    //             label: "menu-belt-scarves",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/watches-wearables",
    //             label: "menu-watches-wearables",
    //           },
    //         ],
    //       },
    //       {
    //         id: 2,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/western-wear",
    //             label: "menu-western-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/dresses",
    //                 label: "menu-dresses",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/jumpsuits",
    //                 label: "menu-jumpsuits",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/tops-t-shirt",
    //                 label: "menu-tops-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/shorts-skirts",
    //                 label: "menu-shorts-skirts",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/shurgs",
    //                 label: "menu-shurgs",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/blazers",
    //                 label: "menu-blazers",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/plus-size",
    //             label: "menu-plus-size",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/sunglasses-frames",
    //             label: "menu-sunglasses-frames",
    //           },
    //         ],
    //       },
    //       {
    //         id: 3,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/footwear",
    //             label: "menu-footwear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/flats",
    //                 label: "menu-flats",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shoes",
    //                 label: "menu-casual-shoes",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/heels",
    //                 label: "menu-heels",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/boots",
    //                 label: "menu-boots",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/sports-active-wear",
    //             label: "menu-sports-active-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/clothing",
    //                 label: "menu-clothing",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/footwear",
    //                 label: "menu-footwear",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/sports-accessories",
    //                 label: "menu-sports-accessories",
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     id: 7,
    //     path: "/",
    //     label: "menu-sunglasses",
    //     icon: <SunglassIcon />,
    //     columns: [
    //       {
    //         id: 1,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/top-wear",
    //             label: "menu-top-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/t-shit-shirtrt",
    //                 label: "menu-t-shirt",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shirts",
    //                 label: "menu-casual-shirts",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/formal-shirts",
    //                 label: "menu-formal-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/blazwers-coats",
    //                 label: "menu-blazwers-coats",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/suits",
    //                 label: "menu-suits",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/jackets",
    //                 label: "menu-jackets",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/belt-scarves",
    //             label: "menu-belt-scarves",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/watches-wearables",
    //             label: "menu-watches-wearables",
    //           },
    //         ],
    //       },
    //       {
    //         id: 2,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/western-wear",
    //             label: "menu-western-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/dresses",
    //                 label: "menu-dresses",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/jumpsuits",
    //                 label: "menu-jumpsuits",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/tops-t-shirt",
    //                 label: "menu-tops-shirts",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/shorts-skirts",
    //                 label: "menu-shorts-skirts",
    //               },
    //               {
    //                 id: 5,
    //                 path: "/product-category/shurgs",
    //                 label: "menu-shurgs",
    //               },
    //               {
    //                 id: 6,
    //                 path: "/product-category/blazers",
    //                 label: "menu-blazers",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/plus-size",
    //             label: "menu-plus-size",
    //           },
    //           {
    //             id: 3,
    //             path: "/product-category/sunglasses-frames",
    //             label: "menu-sunglasses-frames",
    //           },
    //         ],
    //       },
    //       {
    //         id: 3,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/footwear",
    //             label: "menu-footwear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/flats",
    //                 label: "menu-flats",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shoes",
    //                 label: "menu-casual-shoes",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/heels",
    //                 label: "menu-heels",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/boots",
    //                 label: "menu-boots",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/sports-active-wear",
    //             label: "menu-sports-active-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/clothing",
    //                 label: "menu-clothing",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/footwear",
    //                 label: "menu-footwear",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/sports-accessories",
    //                 label: "menu-sports-accessories",
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     id: 8,
    //     path: "/",
    //     label: "menu-sneakers",
    //     icon: <SneakerIcon />,
    //     columns: [
    //       {
    //         id: 3,
    //         columnItems: [
    //           {
    //             id: 1,
    //             path: "/product-category/footwear",
    //             label: "menu-footwear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/flats",
    //                 label: "menu-flats",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/casual-shoes",
    //                 label: "menu-casual-shoes",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/heels",
    //                 label: "menu-heels",
    //               },
    //               {
    //                 id: 4,
    //                 path: "/product-category/boots",
    //                 label: "menu-boots",
    //               },
    //             ],
    //           },
    //           {
    //             id: 2,
    //             path: "/product-category/sports-active-wear",
    //             label: "menu-sports-active-wear",
    //             columnItemItems: [
    //               {
    //                 id: 1,
    //                 path: "/product-category/clothing",
    //                 label: "menu-clothing",
    //               },
    //               {
    //                 id: 2,
    //                 path: "/product-category/footwear",
    //                 label: "menu-footwear",
    //               },
    //               {
    //                 id: 3,
    //                 path: "/product-category/sports-accessories",
    //                 label: "menu-sports-accessories",
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],

    // page header menu's
    pagesMenu: [
      {
        id: 1,
        path: "/deals",
        label: "Deals Today",
        icon: (
          <img
            src="https://images.harrietshopping.com/front-web/gif/energy-deals.gif"
            alt="deals"
            className="w-6 h-auto transition transform animate-scaleInOut"
          />
        ),
      },
      {
        id: 2,
        path: "/new-arrivals",
        label: "New Arrivals",
      },
      {
        id: 3,
        path: "/best-sellers",
        label: "Best Sellers",
      },
      // {
      //   id: 3,
      //   path: "https://blog.harrietshopping.com",
      //   label: "Blog",
      // },
    ],
  },
};
