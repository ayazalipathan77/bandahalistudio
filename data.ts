import { Artwork, Collection, Exhibition, ClientDiaryEntry, InstagramPost } from './types';

// Helper to generate more items for pagination demo
const generateMoreCollections = (): Collection[] => {
  const base = [
    {
      id: 'c1',
      title: 'Textures of Sindh',
      description: 'Signature relief works capturing the crumbling mud walls, ancient doors, and tactile heritage of rural Sindh.',
      yearRange: '2020-2024',
      coverImage: 'https://picsum.photos/seed/bandah_col1/800/1000'
    },
    {
      id: 'c2',
      title: 'Women of Thar',
      description: 'A vibrant homage to the resilience and grace of Thari women, focusing on their colorful attire against the desert palette.',
      yearRange: '2018-2021',
      coverImage: 'https://picsum.photos/seed/bandah_col2/800/1000'
    },
    {
      id: 'c3',
      title: 'Silent Architecture',
      description: 'Studies of abandoned spaces, wooden Jharokas, and the play of light in the narrow streets of old villages.',
      yearRange: '2015-2019',
      coverImage: 'https://picsum.photos/seed/bandah_col3/800/1000'
    }
  ];
  
  // Duplicate to create items for pagination
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
        title: 'Thari Woman with Matka',
        medium: 'Relief & Oil on Canvas',
        year: '2024',
        dimensions: '36 x 48 in',
        status: 'Available',
        imageUrl: 'https://picsum.photos/seed/bandah_real1/800/1000',
        collectionId: 'c2',
        description: 'A textured portrayal of a Thari woman carrying water, emphasizing the vibrant reds and yellows of her dress against the stark desert background. The canvas mimics the texture of sand and fabric.'
      },
      {
        id: 'a2',
        title: 'The Old Mud Wall',
        medium: 'Mixed Media Relief',
        year: '2023',
        dimensions: '48 x 48 in',
        status: 'Sold',
        imageUrl: 'https://picsum.photos/seed/bandah_real2/800/1200',
        collectionId: 'c1',
        description: 'Bandah Ali’s signature relief technique brings the crumbling texture of a village mud wall to life, capturing the history etched into the soil.'
      },
      {
        id: 'a3',
        title: 'Village Courtyard',
        medium: 'Oil on Canvas',
        year: '2022',
        dimensions: '30 x 40 in',
        status: 'Available',
        imageUrl: 'https://picsum.photos/seed/bandah_real3/1000/1000',
        collectionId: 'c1',
        description: 'A peaceful afternoon in a Sindh village. The play of shadows on the textured ground creates a sense of quiet nostalgia.'
      },
      {
        id: 'a4',
        title: 'Wooden Jharoka',
        medium: 'Relief on Wood Panel',
        year: '2021',
        dimensions: '24 x 36 in',
        status: 'Reserved',
        imageUrl: 'https://picsum.photos/seed/bandah_real4/800/1000',
        collectionId: 'c3',
        description: 'Detailed relief work depicting an intricate wooden window (Jharoka), symbolizing the architectural heritage of the region.'
      },
      {
        id: 'a5',
        title: 'Colors of the Desert',
        medium: 'Acrylic & Relief',
        year: '2023',
        dimensions: '40 x 60 in',
        status: 'Available',
        imageUrl: 'https://picsum.photos/seed/bandah_real5/1200/800',
        collectionId: 'c2',
        description: 'A group of women walking through the dunes. The painting focuses on the rhythm of their movement and the contrast of their clothes against the earth.'
      },
      {
        id: 'a6',
        title: 'Still Life with Pottery',
        medium: 'Mixed Media',
        year: '2020',
        dimensions: '24 x 24 in',
        status: 'Available',
        imageUrl: 'https://picsum.photos/seed/bandah_real6/800/800',
        collectionId: 'c1',
        description: 'Traditional clay pots resting against a textured wall. A study of light, shadow, and the tactile nature of everyday objects.'
      },
      {
        id: 'a7',
        title: 'Waiting by the Door',
        medium: 'Oil on Canvas',
        year: '2019',
        dimensions: '36 x 36 in',
        status: 'Sold',
        imageUrl: 'https://picsum.photos/seed/bandah_real7/900/1300',
        collectionId: 'c2',
        description: 'A solitary figure waiting by an ancient wooden door. The painting explores themes of longing and the passage of time.'
      },
      {
        id: 'a8',
        title: 'Harvest in Punjab',
        medium: 'Oil on Canvas',
        year: '2018',
        dimensions: '48 x 60 in',
        status: 'Sold',
        imageUrl: 'https://picsum.photos/seed/bandah_real8/800/1000',
        collectionId: 'c1',
        description: 'While known for Sindh, this piece captures the lush harvest season, showing the artist’s versatility in capturing different rural landscapes.'
      }
    ];

    // Duplicate to create items for pagination
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
    title: 'Earthly Echoes',
    gallery: 'Clifton Art Gallery',
    location: 'Karachi, PK',
    startDate: '2024-02-15',
    endDate: '2024-02-28',
    status: 'Past',
    imageUrl: 'https://picsum.photos/seed/exhibit_ba1/1200/800'
  },
  {
    id: 'e2',
    title: 'Heritage Preserved',
    gallery: 'ArtChowk Gallery',
    location: 'Karachi, PK',
    startDate: '2023-11-10',
    endDate: '2023-11-25',
    status: 'Past',
    imageUrl: 'https://picsum.photos/seed/exhibit_ba2/1200/800'
  },
  {
    id: 'e3',
    title: 'Colors of Soil',
    gallery: 'Grandeur Art Gallery',
    location: 'Karachi, PK',
    startDate: '2022-05-01',
    endDate: '2022-05-15',
    status: 'Past',
    imageUrl: 'https://picsum.photos/seed/exhibit_ba3/1200/800'
  }
];

export const CLIENT_DIARIES: ClientDiaryEntry[] = [
  {
    id: 'cd1',
    title: 'Private Residence',
    location: 'DHA Phase 8, Karachi',
    date: 'January 2024',
    description: 'A large-scale relief painting commissioned for a modern living room, adding organic texture to a minimalist space.',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'cd2',
    title: 'Corporate Lobby',
    location: 'I.I. Chundrigar Rd, Karachi',
    date: 'November 2023',
    description: 'Three textured panels representing the history of Sindh installed in the main reception area.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'cd3',
    title: 'Farmhouse Villa',
    location: 'Gadap Town',
    date: 'August 2023',
    description: 'A "Village Courtyard" piece placed in a rustic farmhouse, perfectly complementing the traditional architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'cd4',
    title: 'Architectural Office',
    location: 'Clifton, Karachi',
    date: 'June 2023',
    description: 'Selected specifically for the textural depth, this relief work serves as a focal point for the creative studio.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  { id: 'i1', imageUrl: 'https://picsum.photos/seed/insta_ba1/400/400', caption: 'Adding the final textures to the mud wall series. #ReliefArt', permalink: '#', likes: 642 },
  { id: 'i2', imageUrl: 'https://picsum.photos/seed/insta_ba2/400/400', caption: 'The colors of Thar never cease to inspire. #Sindh', permalink: '#', likes: 420 },
  { id: 'i3', imageUrl: 'https://picsum.photos/seed/insta_ba3/400/400', caption: 'Opening night at Clifton Art Gallery. Thank you for coming!', permalink: '#', likes: 889 },
  { id: 'i4', imageUrl: 'https://picsum.photos/seed/insta_ba4/400/400', caption: 'Studio vibes. Clay, paint, and silence.', permalink: '#', likes: 315 },
];