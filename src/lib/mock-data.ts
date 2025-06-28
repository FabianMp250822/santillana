import { type translations } from './translations';

export type TranslationKey = keyof typeof translations.en;

export type LotStatus = 'Available' | 'Reserved' | 'Sold';

export interface Lot {
  id: string;
  area: number;
  status: LotStatus;
  path: string; // SVG path data
  images: string[];
  descriptionKey: TranslationKey;
}

export const lots: Lot[] = [
  {
    id: 'A-01',
    area: 520.5,
    status: 'Available',
    path: 'M50 50 L150 50 L150 150 L50 150 Z',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    descriptionKey: 'lot_A01_desc'
  },
  {
    id: 'A-02',
    area: 480.0,
    status: 'Reserved',
    path: 'M160 50 L260 50 L260 150 L160 150 Z',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    descriptionKey: 'lot_A02_desc'
  },
  {
    id: 'A-03',
    area: 610.2,
    status: 'Sold',
    path: 'M270 50 L370 50 L370 150 L270 150 Z',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    descriptionKey: 'lot_A03_desc'
  },
  {
    id: 'B-01',
    area: 550.0,
    status: 'Available',
    path: 'M50 160 L150 160 L150 260 L50 260 Z',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    descriptionKey: 'lot_B01_desc'
  },
  {
    id: 'B-02',
    area: 535.8,
    status: 'Available',
    path: 'M160 160 L260 160 L260 260 L160 260 Z',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    descriptionKey: 'lot_B02_desc'
  },
  {
    id: 'C-01',
    area: 720.0,
    status: 'Sold',
    path: 'M50 270 L150 270 L150 370 L50 370 Z',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    descriptionKey: 'lot_C01_desc'
  },
];

interface Amenity {
    key: string;
    nameKey: TranslationKey;
    descriptionKey: TranslationKey;
    image: string;
    hint: string;
}

export const amenities: Amenity[] = [
    {
      key: 'LuxuryGate',
      nameKey: 'featureLuxuryGatehouseTitle',
      descriptionKey: 'amenityLuxuryGate_Desc',
      image: 'https://i.ibb.co/VYNNnDtQ/porteria.jpg',
      hint: 'luxury gate security'
    },
    {
      key: 'PrivateSurveillance',
      nameKey: 'amenityPrivateSurveillance',
      descriptionKey: 'amenityPrivateSurveillance_Desc',
      image: 'https://placehold.co/800x600.png',
      hint: 'security camera'
    },
    {
      key: 'Pool',
      nameKey: 'amenityPool',
      descriptionKey: 'amenityPool_Desc',
      image: 'https://placehold.co/800x600.png',
      hint: 'family pool'
    },
    {
      key: 'Lake',
      nameKey: 'amenityLake',
      descriptionKey: 'amenityLake_Desc',
      image: 'https://placehold.co/800x600.png',
      hint: 'lake dock'
    },
    {
      key: 'Fishing',
      nameKey: 'amenityRecreationalFishing',
      descriptionKey: 'amenityRecreationalFishing_Desc',
      image: 'https://placehold.co/800x600.png',
      hint: 'recreational fishing'
    },
    {
      key: 'PrivateIslands',
      nameKey: 'featurePrivateIslandsTitle',
      descriptionKey: 'amenityPrivateIslands_Desc',
      image: 'https://placehold.co/800x600.png',
      hint: 'private island tropical'
    },
    {
      key: 'Playground',
      nameKey: 'featurePlaygroundTitle',
      descriptionKey: 'amenityPlayground_Desc',
      image: 'https://placehold.co/800x600.png',
      hint: 'playground park'
    },
    {
      key: 'MultiPurposeCourt',
      nameKey: 'amenityMultiPurposeCourt',
      descriptionKey: 'amenityMultiCourt_Desc',
      image: 'https://i.ibb.co/DfKs3xh8/recreacion.jpg',
      hint: 'basketball court sports'
    },
    {
      key: 'ReadingZone',
      nameKey: 'amenityReadingZone',
      descriptionKey: 'amenityReadingZone_Desc',
      image: 'https://placehold.co/800x600.png',
      hint: 'reading park'
    },
    {
      key: 'VisitorParking',
      nameKey: 'amenityVisitorParking',
      descriptionKey: 'amenityVisitorParking_Desc',
      image: 'https://placehold.co/800x600.png',
      hint: 'parking lot'
    },
    {
      key: 'PedestrianPaths',
      nameKey: 'amenityPedestrianPaths',
      descriptionKey: 'amenityPedestrianPaths_Desc',
      image: 'https://placehold.co/800x600.png',
      hint: 'walking trail nature'
    },
    {
      key: 'PetPark',
      nameKey: 'amenityPetPark',
      descriptionKey: 'amenityPetPark_Desc',
      image: 'https://placehold.co/800x600.png',
      hint: 'pet park dog'
    },
    {
      key: 'AcLounge',
      nameKey: 'amenityAcLounge',
      descriptionKey: 'amenityAcLounge_Desc',
      image: 'https://i.ibb.co/TxNzY4db/zona-social.jpg',
      hint: 'lounge interior modern'
    },
    {
      key: 'BioHealthyGym',
      nameKey: 'amenityBioHealthyGym',
      descriptionKey: 'amenityBioHealthyGym_Desc',
      image: 'https://i.ibb.co/ZRVb3W4B/ginnacio-area-libre.jpg',
      hint: 'outdoor gym'
    },
    {
      key: 'ConnectorBridge',
      nameKey: 'amenityConnectorBridge',
      descriptionKey: 'amenityConnectorBridge_Desc',
      image: 'https://placehold.co/800x600.png',
      hint: 'bridge water'
    },
    {
      key: 'TreetopTerrace',
      nameKey: 'amenityTreetopTerrace',
      descriptionKey: 'amenityTreetopTerrace_Desc',
      image: 'https://placehold.co/800x600.png',
      hint: 'treehouse terrace view'
    },
];

interface GalleryImage {
    src: string;
    altKey: TranslationKey;
    hint: string;
}

interface GalleryCategory {
    key: string;
    nameKey: TranslationKey;
    images: GalleryImage[];
}

export const galleryCategories: GalleryCategory[] = [
    {
      key: 'aerial',
      nameKey: 'galleryCatAerial',
      images: [
        { src: 'https://placehold.co/800x600.png', altKey: 'gallery_img_aerial_1_alt', hint: 'aerial project' },
        { src: 'https://placehold.co/800x600.png', altKey: 'gallery_img_aerial_2_alt', hint: 'sunrise lake' },
        { src: 'https://placehold.co/800x600.png', altKey: 'gallery_img_aerial_3_alt', hint: 'green aerial' },
      ],
    },
    {
      key: 'gate',
      nameKey: 'galleryCatGate',
      images: [
        { src: 'https://i.ibb.co/VYNNnDtQ/porteria.jpg', altKey: 'gallery_img_gate_1_alt', hint: 'luxury gate' },
        { src: 'https://i.ibb.co/xS02g6Tm/porteria-dos.jpg', altKey: 'gallery_img_gate_2_alt', hint: 'security entrance' },
      ],
    },
    {
      key: 'islands',
      nameKey: 'galleryCatIslands',
      images: [
        { src: 'https://placehold.co/800x600.png', altKey: 'gallery_img_islands_1_alt', hint: 'island bridge' },
        { src: 'https://placehold.co/800x600.png', altKey: 'gallery_img_islands_2_alt', hint: 'private beach' },
      ],
    },
    {
      key: 'bbq',
      nameKey: 'galleryCatBBQ',
      images: [
        { src: 'https://placehold.co/800x600.png', altKey: 'gallery_img_bbq_1_alt', hint: 'modern bbq' },
        { src: 'https://placehold.co/800x600.png', altKey: 'gallery_img_bbq_2_alt', hint: 'family barbecue' },
      ],
    },
    {
        key: 'sports',
        nameKey: 'galleryCatSports',
        images: [
          { src: 'https://i.ibb.co/DfKs3xh8/recreacion.jpg', altKey: 'gallery_img_sports_1_alt', hint: 'sports court' },
          { src: 'https://i.ibb.co/ZRVb3W4B/ginnacio-area-libre.jpg', altKey: 'gallery_img_sports_2_alt', hint: 'outdoor gym' },
          { src: 'https://i.ibb.co/TxNzY4db/zona-social.jpg', altKey: 'gallery_img_sports_3_alt', hint: 'social area' },
        ],
      },
      {
        key: 'family',
        nameKey: 'galleryCatFamily',
        images: [
          { src: 'https://placehold.co/800x600.png', altKey: 'gallery_img_family_1_alt', hint: 'playground park' },
          { src: 'https://placehold.co/800x600.png', altKey: 'gallery_img_family_2_alt', hint: 'community pool' },
        ],
      },
      {
        key: 'nature',
        nameKey: 'galleryCatNature',
        images: [
          { src: 'https://placehold.co/800x600.png', altKey: 'gallery_img_nature_1_alt', hint: 'forest trail' },
          { src: 'https://placehold.co/800x600.png', altKey: 'gallery_img_nature_2_alt', hint: 'mountain view' },
        ],
      },
  ];


