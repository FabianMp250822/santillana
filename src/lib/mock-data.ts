
export type LotStatus = 'Available' | 'Reserved' | 'Sold';

export interface Lot {
  id: string;
  area: number;
  status: LotStatus;
  path: string; // SVG path data
  images: string[];
  description: string;
}

export const lots: Lot[] = [
  {
    id: 'A-01',
    area: 520.5,
    status: 'Available',
    path: 'M50 50 L150 50 L150 150 L50 150 Z',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    description: 'Spacious corner lot with excellent views of the green areas. Ideal for a large family home.'
  },
  {
    id: 'A-02',
    area: 480.0,
    status: 'Reserved',
    path: 'M160 50 L260 50 L260 150 L160 150 Z',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    description: 'Centrally located lot, close to the main amenities and club house.'
  },
  {
    id: 'A-03',
    area: 610.2,
    status: 'Sold',
    path: 'M270 50 L370 50 L370 150 L270 150 Z',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    description: 'Premium lot with private access to the lakefront.'
  },
  {
    id: 'B-01',
    area: 550.0,
    status: 'Available',
    path: 'M50 160 L150 160 L150 260 L50 260 Z',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    description: 'Quiet lot situated in a low-traffic area, perfect for tranquility.'
  },
  {
    id: 'B-02',
    area: 535.8,
    status: 'Available',
    path: 'M160 160 L260 160 L260 260 L160 260 Z',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    description: 'Lot with a gentle slope, offering unique architectural possibilities.'
  },
  {
    id: 'C-01',
    area: 720.0,
    status: 'Sold',
    path: 'M50 270 L150 270 L150 370 L50 370 Z',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    description: 'One of the largest lots in the project, offering ample space and privacy.'
  },
];

export const amenities = [
    {
      name: 'Portería de Lujo',
      description: 'An imposing entrance with 24/7 security that guarantees your peace of mind and that of your family, reflecting the status and exclusivity of the project.',
      image: 'https://placehold.co/800x600.png',
      hint: 'luxury gate security'
    },
    {
      name: '2 Islas Privadas',
      description: 'Escape to your own paradise. Two exclusive islands for residents, perfect for relaxation, private events, or simply enjoying nature at its best.',
      image: 'https://placehold.co/800x600.png',
      hint: 'private island tropical'
    },
    {
      name: 'Zonas de BBQ',
      description: 'Spaces designed for family and social entertainment. Equipped with everything you need to enjoy barbecues and outdoor gatherings.',
      image: 'https://placehold.co/800x600.png',
      hint: 'bbq area family'
    },
    {
      name: 'Cancha de Tenis',
      description: 'For lovers of the sport, a tennis court with professional specifications, perfect for practicing and playing exciting matches.',
      image: 'https://placehold.co/800x600.png',
      hint: 'tennis court sport'
    },
    {
      name: 'Cancha Múltiple',
      description: 'A versatile space for basketball, volleyball, and other sports. The meeting point for physical activity and community fun.',
      image: 'https://placehold.co/800x600.png',
      hint: 'basketball court sports'
    },
    {
      name: 'Parque Infantil',
      description: 'A safe and fun area for the little ones, where they can play, socialize, and create unforgettable memories in a natural environment.',
      image: 'https://placehold.co/800x600.png',
      hint: 'playground park children'
    },
    {
      name: 'Cicloruta',
      description: 'Tour the project and its beautiful landscapes through an internal bike path, ideal for daily exercise, family walks, and connecting with nature.',
      image: 'https://placehold.co/800x600.png',
      hint: 'bike path nature'
    },
    {
      name: 'Gimnasio Biosaludable',
      description: 'Stay fit outdoors with our bio-healthy gym, equipped with machines for cardiovascular and strength exercises in a natural setting.',
      image: 'https://placehold.co/800x600.png',
      hint: 'outdoor gym fitness'
    }
  ];

export const galleryCategories = [
    {
      name: 'Aerial Views',
      images: [
        { src: 'https://placehold.co/800x600.png', alt: 'Aerial view of the entire project', hint: 'aerial project' },
        { src: 'https://placehold.co/800x600.png', alt: 'Sunrise over the main lake', hint: 'sunrise lake' },
        { src: 'https://placehold.co/800x600.png', alt: 'Lush green areas from above', hint: 'green aerial' },
      ],
    },
    {
      name: 'Luxury Gate',
      images: [
        { src: 'https://placehold.co/800x600.png', alt: 'Main entrance gate at daytime', hint: 'luxury gate' },
        { src: 'https://placehold.co/800x600.png', alt: 'Security booth and landscaping', hint: 'security entrance' },
      ],
    },
    {
      name: 'Private Islands',
      images: [
        { src: 'https://placehold.co/800x600.png', alt: 'Bridge to a private island', hint: 'island bridge' },
        { src: 'https://placehold.co/800x600.png', alt: 'Secluded beach on an island', hint: 'private beach' },
      ],
    },
    {
      name: 'BBQ Areas',
      images: [
        { src: 'https://placehold.co/800x600.png', alt: 'Modern BBQ pit area', hint: 'modern bbq' },
        { src: 'https://placehold.co/800x600.png', alt: 'Family enjoying a barbecue', hint: 'family barbecue' },
      ],
    },
    {
        name: 'Sports Amenities',
        images: [
          { src: 'https://placehold.co/800x600.png', alt: 'Tennis courts', hint: 'tennis court' },
          { src: 'https://placehold.co/800x600.png', alt: 'Basketball court', hint: 'basketball court' },
          { src: 'https://placehold.co/800x600.png', alt: 'Cycling path through nature', hint: 'cycling path' },
        ],
      },
      {
        name: 'Family Areas',
        images: [
          { src: 'https://placehold.co/800x600.png', alt: "Children's playground", hint: 'playground park' },
          { src: 'https://placehold.co/800x600.png', alt: 'Community pool', hint: 'community pool' },
        ],
      },
      {
        name: 'Nature and Environment',
        images: [
          { src: 'https://placehold.co/800x600.png', alt: 'Walking trail through the forest', hint: 'forest trail' },
          { src: 'https://placehold.co/800x600.png', alt: 'View of the surrounding mountains', hint: 'mountain view' },
        ],
      },
  ];
