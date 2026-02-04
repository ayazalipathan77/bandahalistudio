import { Artwork, Collection, Exhibition, ClientDiaryEntry, InstagramPost } from './types';

// Helper to generate more items for pagination demo
const generateMoreCollections = (): Collection[] => {
  const base = [
    {
      id: 'c1',
      title: 'Heritage of Stone',
      description: 'Relief works capturing the ancient textures of Mohenjo-daro and the rugged landscapes of Balochistan.',
      yearRange: '2022-2024',
      coverImage: 'https://picsum.photos/seed/bandah1/800/1000'
    },
    {
      id: 'c2',
      title: 'Colors of Sindh',
      description: 'Vibrant studies of rural life, utilizing traditional Ajrak patterns and earthy tones.',
      yearRange: '2019-2021',
      coverImage: 'https://picsum.photos/seed/bandah2/800/1000'
    },
    {
      id: 'c3',
      title: 'Sufi Silence',
      description: 'Abstract figurative works exploring the spiritual movements of the dervish.',
      yearRange: '2015-2018',
      coverImage: 'https://picsum.photos/seed/bandah3/800/1000'
    }
  ];
  
  // Duplicate to create 12 items
  let result: Collection[] = [...base];
  for(let i=0; i<3; i++) {
     result = [...result, ...base.map(item => ({...item, id: item.id + '_dup_' + i, title: item.title + ' ' + (i+2)}))];
  }
  return result;
};

export const COLLECTIONS: Collection[] = generateMoreCollections();

const generateMoreArtworks = (): Artwork[] => {
    const base: Artwork[] = [
      {
        id: 'a1',
        title: 'Indus Relief I',
        medium: 'Mixed media on wood panel',
        year: '2024',
        dimensions: '120 x 150 cm',
        status: 'Available',
        imageUrl: 'https://picsum.photos/seed/bandah_art1/800/1000',
        collectionId: 'c1',
        description: 'A tactile exploration of the Indus Valley civilization, merging ancient script with modern texture.'
      },
      {
        id: 'a2',
        title: 'Women of Tharparkar',
        medium: 'Oil on canvas',
        year: '2023',
        dimensions: '90 x 120 cm',
        status: 'Sold',
        imageUrl: 'https://picsum.photos/seed/bandah_art2/800/1200',
        collectionId: 'c2',
        description: 'Capturing the resilience and vivid attire of women in the Thar desert.'
      },
      {
        id: 'a3',
        title: 'The Dervish Turn',
        medium: 'Acrylic and gold leaf',
        year: '2018',
        dimensions: '100 x 100 cm',
        status: 'Available',
        imageUrl: 'https://picsum.photos/seed/bandah_art3/1000/1000',
        collectionId: 'c3',
        description: 'Motion blurred spiritual dance, emphasizing the loss of self in the divine.'
      },
      {
        id: 'a4',
        title: 'Old Lahore Gate',
        medium: 'Charcoal and pastel',
        year: '2021',
        dimensions: '60 x 90 cm',
        status: 'Reserved',
        imageUrl: 'https://picsum.photos/seed/bandah_art4/800/1000',
        collectionId: 'c2',
        description: 'Architectural study of the Walled City, focusing on light and shadow in narrow streets.'
      },
      {
        id: 'a5',
        title: 'Mountain Silence',
        medium: 'Relief sculpture on canvas',
        year: '2024',
        dimensions: '150 x 200 cm',
        status: 'Available',
        imageUrl: 'https://picsum.photos/seed/bandah_art5/1200/800',
        collectionId: 'c1',
        description: 'Inspired by the textures of the Karakoram range.'
      },
      {
        id: 'a6',
        title: 'Blue Pottery Study',
        medium: 'Oil on linen',
        year: '2020',
        dimensions: '40 x 40 cm',
        status: 'Available',
        imageUrl: 'https://picsum.photos/seed/bandah_art6/800/800',
        collectionId: 'c2',
        description: 'Detailed study of Multani Kashi Gari patterns.'
      },
      {
        id: 'a7',
        title: 'Echoes of Rumi',
        medium: 'Ink and wash',
        year: '2017',
        dimensions: '90 x 140 cm',
        status: 'Available',
        imageUrl: 'https://picsum.photos/seed/bandah_art7/900/1300',
        collectionId: 'c3',
        description: 'Calligraphic abstraction based on the poetry of Rumi.'
      },
      {
        id: 'a8',
        title: 'Harvest Season',
        medium: 'Oil on canvas',
        year: '2019',
        dimensions: '100 x 150 cm',
        status: 'Sold',
        imageUrl: 'https://picsum.photos/seed/bandah_art8/800/1000',
        collectionId: 'c2',
        description: 'Golden wheat fields of Punjab during the harvest.'
      }
    ];

    // Duplicate to create 24 items for pagination
    let result: Artwork[] = [...base];
    for(let i=0; i<2; i++) {
        result = [...result, ...base.map(item => ({...item, id: item.id + '_dup_' + i, title: item.title + ' ' + (i+2)}))];
    }
    return result;
}

export const ARTWORKS: Artwork[] = generateMoreArtworks();

export const EXHIBITIONS: Exhibition[] = [
  {
    id: 'e1',
    title: 'Soil & Soul',
    gallery: 'VM Art Gallery',
    location: 'Karachi, PK',
    startDate: '2024-11-10',
    endDate: '2024-12-15',
    status: 'Upcoming',
    imageUrl: 'https://picsum.photos/seed/exhibit_pk1/1200/800'
  },
  {
    id: 'e2',
    title: 'Retrospective',
    gallery: 'Alhamra Art Center',
    location: 'Lahore, PK',
    startDate: '2023-03-05',
    endDate: '2023-04-20',
    status: 'Past',
    imageUrl: 'https://picsum.photos/seed/exhibit_pk2/1200/800'
  },
  {
    id: 'e3',
    title: 'Eastern Horizons',
    gallery: 'PNCA',
    location: 'Islamabad, PK',
    startDate: '2022-09-01',
    endDate: '2022-10-15',
    status: 'Past',
    imageUrl: 'https://picsum.photos/seed/exhibit_pk3/1200/800'
  }
];

export const CLIENT_DIARIES: ClientDiaryEntry[] = [
  {
    id: 'cd1',
    title: 'Private Residence',
    location: 'DHA Phase 6, Karachi',
    date: 'October 2024',
    description: 'Commissioned relief work installed in a double-height living space, complementing the brutalist architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'cd2',
    title: 'Corporate HQ',
    location: 'Gulberg, Lahore',
    date: 'August 2024',
    description: 'A series of three large-scale oil paintings for the executive boardroom.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'cd3',
    title: 'Modern Villa',
    location: 'Islamabad',
    date: 'July 2024',
    description: 'Minimalist calligraphy piece placed in the entrance foyer.',
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'cd4',
    title: 'Penthouse Apartment',
    location: 'Clifton, Karachi',
    date: 'May 2024',
    description: 'Textured relief panels bringing organic warmth to a contemporary space.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'cd5',
    title: 'Boutique Hotel',
    location: 'Hunza Valley',
    date: 'April 2024',
    description: 'Landscape works reflecting the surrounding mountains installed in the lobby.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'cd6',
    title: 'Architectural Studio',
    location: 'Lahore',
    date: 'February 2024',
    description: 'A stark, monochromatic piece selected for the main creative studio.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&q=80&w=1000'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  { id: 'i1', imageUrl: 'https://picsum.photos/seed/insta_pk1/400/400', caption: 'Work in progress. #reliefart', permalink: '#', likes: 542 },
  { id: 'i2', imageUrl: 'https://picsum.photos/seed/insta_pk2/400/400', caption: 'Sunset at the studio.', permalink: '#', likes: 320 },
  { id: 'i3', imageUrl: 'https://picsum.photos/seed/insta_pk3/400/400', caption: 'Installation day at VM Gallery.', permalink: '#', likes: 489 },
  { id: 'i4', imageUrl: 'https://picsum.photos/seed/insta_pk4/400/400', caption: 'Tea and textures.', permalink: '#', likes: 215 },
];