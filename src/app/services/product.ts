import { Injectable, Signal, computed, signal } from '@angular/core';

export type ProductCategory = 'Men' | 'Women' | 'Sample' | 'Unisex';
export type FragranceFamily = 'Floral' | 'Woody' | 'Citrus' | 'Oriental';
export type Mood = 'Romantic' | 'Bold' | 'Fresh' | 'Elegant';

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  gallery: string[];
  category: ProductCategory;
  family: FragranceFamily;
  rating: number;
  reviews: number;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: 1 | 2 | 3 | 4 | 5;
  intensity: 1 | 2 | 3 | 4 | 5;
  moodTags: Mood[];
  featured?: boolean;
  bestSeller?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = signal<Product[]>([
    {
      id: 1,
      name: 'Oud Noir',
      brand: 'Aurelia',
      description: 'A deep, mysterious blend of agarwood and smoked incense.',
      longDescription:
        'An opulent dark oud composition wrapped in smoldering frankincense and polished saffron. Designed for evening wear with remarkable projection and graceful dry-down.',
      price: 240,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1615485499978-1279c3d6ac3d?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1595425959632-343516309831?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Men',
      family: 'Woody',
      rating: 4.8,
      reviews: 218,
      topNotes: ['Saffron', 'Pink Pepper'],
      heartNotes: ['Oud Accord', 'Incense'],
      baseNotes: ['Patchouli', 'Amber', 'Leather'],
      longevity: 5,
      intensity: 4,
      moodTags: ['Bold', 'Elegant'],
      featured: true,
      bestSeller: true
    },
    {
      id: 2,
      name: 'Rose Eclat',
      brand: 'Aurelia',
      description: 'Velvety damask rose with notes of pink pepper and vanilla.',
      longDescription:
        'A couture floral fragrance where rose petals bloom over creamy vanilla and white musk. Sophisticated, luminous, and ideal for elegant daytime wear.',
      price: 195,
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Women',
      family: 'Floral',
      rating: 4.7,
      reviews: 167,
      topNotes: ['Pink Pepper', 'Pear'],
      heartNotes: ['Damask Rose', 'Peony'],
      baseNotes: ['Vanilla', 'Cashmere Musk'],
      longevity: 4,
      intensity: 3,
      moodTags: ['Romantic', 'Elegant'],
      featured: true,
      bestSeller: true
    },
    {
      id: 3,
      name: 'Cedrat Blanc',
      brand: 'Aurelia',
      description: 'Zesty citrus balanced with Himalayan cedarwood.',
      longDescription:
        'Bright and sparkling citrus meets textured cedar to create an energetic scent profile with modern restraint. A refined warm-weather signature.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d22f?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1523293182086-7651a899d22f?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1592701828557-0749021870bd?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Unisex',
      family: 'Citrus',
      rating: 4.5,
      reviews: 104,
      topNotes: ['Bergamot', 'Cedrat'],
      heartNotes: ['Neroli', 'Green Tea'],
      baseNotes: ['Cedarwood', 'Vetiver'],
      longevity: 3,
      intensity: 2,
      moodTags: ['Fresh', 'Elegant'],
      featured: true
    },
    {
      id: 4,
      name: 'Ambre Soir',
      brand: 'Aurelia',
      description: 'Warm amber and labdanum for unforgettable evenings.',
      longDescription:
        'A sensual amber story with a resinous heart and velvety base. Crafted for twilight gatherings and candlelit moments.',
      price: 210,
      image: 'https://images.unsplash.com/photo-1583445013765-46c2049d5045?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1583445013765-46c2049d5045?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1557827334-1823ca87c58d?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1595425959632-343516309831?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Women',
      family: 'Oriental',
      rating: 4.9,
      reviews: 241,
      topNotes: ['Mandarin', 'Cardamom'],
      heartNotes: ['Labdanum', 'Benzoin'],
      baseNotes: ['Amber', 'Tonka Bean', 'Vanilla'],
      longevity: 5,
      intensity: 4,
      moodTags: ['Bold', 'Romantic'],
      bestSeller: true
    },
    {
      id: 5,
      name: 'The Discovery Set',
      brand: 'Aurelia',
      description: 'Five signature scents in 2ml sample vials.',
      longDescription:
        'A curated exploration of our iconic compositions, each sample designed to be worn at least twice to reveal full evolution on skin.',
      price: 45,
      image: 'https://images.unsplash.com/photo-1592914610354-fd35984456b2?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1592914610354-fd35984456b2?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1616601432703-a1288647e30d?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Sample',
      family: 'Floral',
      rating: 4.6,
      reviews: 301,
      topNotes: ['Mixed Signature Notes'],
      heartNotes: ['House Collection Selection'],
      baseNotes: ['Layering Cards Included'],
      longevity: 3,
      intensity: 3,
      moodTags: ['Fresh', 'Romantic'],
      featured: true,
      bestSeller: true
    },
    {
      id: 6,
      name: 'Noir Intense',
      brand: 'Aurelia',
      description: 'Concentrated essence of darkness and grace.',
      longDescription:
        'An extrait concentration with immersive spice and woods. Distinctive yet balanced, made for those who prefer a commanding signature.',
      price: 280,
      image: 'https://images.unsplash.com/photo-1595425959632-343516309831?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1595425959632-343516309831?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Men',
      family: 'Woody',
      rating: 4.7,
      reviews: 92,
      topNotes: ['Black Pepper', 'Juniper'],
      heartNotes: ['Smoked Tea', 'Orris'],
      baseNotes: ['Guaiac Wood', 'Ambergris'],
      longevity: 5,
      intensity: 5,
      moodTags: ['Bold', 'Elegant'],
      bestSeller: true
    },
    {
      id: 7,
      name: 'Floral Muse',
      brand: 'Aurelia',
      description: 'A bouquet of white flowers and crystalline musk.',
      longDescription:
        'An airy floral design for everyday sophistication. Transparent petals and clean musk create an effortless, polished aura.',
      price: 175,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Women',
      family: 'Floral',
      rating: 4.4,
      reviews: 88,
      topNotes: ['Freesia', 'Lemon Blossom'],
      heartNotes: ['Tuberose', 'Jasmine Sambac'],
      baseNotes: ['Musk', 'Sandalwood'],
      longevity: 3,
      intensity: 2,
      moodTags: ['Fresh', 'Romantic']
    },
    {
      id: 8,
      name: 'Midnight Musk',
      brand: 'Aurelia',
      description: '2ml sample of our best-selling evening fragrance.',
      longDescription:
        'A compact sample of our seductive musk-forward profile, ideal for travel and evening touchups.',
      price: 12,
      image: 'https://images.unsplash.com/photo-1615485499978-1279c3d6ac3d?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1615485499978-1279c3d6ac3d?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1592914610354-fd35984456b2?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1616601432703-a1288647e30d?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Sample',
      family: 'Oriental',
      rating: 4.3,
      reviews: 55,
      topNotes: ['Saffron'],
      heartNotes: ['Iris', 'Musk'],
      baseNotes: ['Amber', 'Tonka'],
      longevity: 3,
      intensity: 3,
      moodTags: ['Bold', 'Romantic']
    },
    {
      id: 9,
      name: 'Cuir Royal',
      brand: 'Aurelia',
      description: 'Rich Tuscan leather and tobacco leaf with a hint of raspberry.',
      longDescription:
        'A refined leather fragrance where juicy raspberry sparks against smoky tobacco and suede. Distinguished and memorable.',
      price: 260,
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1592701828557-0749021870bd?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1595425959632-343516309831?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Men',
      family: 'Woody',
      rating: 4.8,
      reviews: 133,
      topNotes: ['Raspberry', 'Saffron'],
      heartNotes: ['Leather', 'Violet Leaf'],
      baseNotes: ['Tobacco', 'Cedar', 'Moss'],
      longevity: 4,
      intensity: 4,
      moodTags: ['Bold', 'Elegant'],
      bestSeller: true
    },
    {
      id: 10,
      name: 'Jasmin Pur',
      brand: 'Aurelia',
      description: 'Hand-picked night-blooming jasmine from the fields of Grasse.',
      longDescription:
        'An intimate jasmine soliflore elevated with subtle green nuances and a creamy dry-down for sophisticated floral lovers.',
      price: 220,
      image: 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Women',
      family: 'Floral',
      rating: 4.9,
      reviews: 176,
      topNotes: ['Neroli', 'Green Mandarin'],
      heartNotes: ['Jasmine Grandiflorum', 'Orange Blossom'],
      baseNotes: ['Silk Musk', 'Sandalwood'],
      longevity: 4,
      intensity: 3,
      moodTags: ['Romantic', 'Elegant'],
      bestSeller: true
    },
    {
      id: 11,
      name: 'Vetiver Terra',
      brand: 'Aurelia',
      description: 'Earthy vetiver rooted in fresh soil and mineral accords.',
      longDescription:
        'A modern vetiver profile that feels crisp, grounded, and quietly confident, with subtle smoky undertones.',
      price: 185,
      image: 'https://images.unsplash.com/photo-1592701828557-0749021870bd?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1592701828557-0749021870bd?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1523293182086-7651a899d22f?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Men',
      family: 'Woody',
      rating: 4.5,
      reviews: 67,
      topNotes: ['Grapefruit', 'Juniper'],
      heartNotes: ['Vetiver', 'Clary Sage'],
      baseNotes: ['Cedar', 'Mineral Amber'],
      longevity: 4,
      intensity: 3,
      moodTags: ['Fresh', 'Elegant']
    },
    {
      id: 12,
      name: 'Santal Mystique',
      brand: 'Aurelia',
      description: 'Creamy Australian sandalwood with exotic spices.',
      longDescription:
        'Creamy sandalwood meets cardamom and warm skin musk in a smooth, comforting signature scent.',
      price: 205,
      image: 'https://images.unsplash.com/photo-1557827334-1823ca87c58d?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1557827334-1823ca87c58d?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1583445013765-46c2049d5045?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1595425959632-343516309831?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Women',
      family: 'Oriental',
      rating: 4.6,
      reviews: 119,
      topNotes: ['Cardamom', 'Bergamot'],
      heartNotes: ['Sandalwood', 'Iris'],
      baseNotes: ['Vanilla', 'White Amber'],
      longevity: 4,
      intensity: 3,
      moodTags: ['Elegant', 'Romantic']
    },
    {
      id: 13,
      name: 'Oud Noir Sample',
      brand: 'Aurelia',
      description: '2ml sample of our mysterious Oud Noir.',
      longDescription:
        'A compact format of Oud Noir for on-the-go wear and discovery layering sessions.',
      price: 15,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=900',
      gallery: [
        'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1615485499978-1279c3d6ac3d?auto=format&fit=crop&q=80&w=900',
        'https://images.unsplash.com/photo-1592914610354-fd35984456b2?auto=format&fit=crop&q=80&w=900'
      ],
      category: 'Sample',
      family: 'Woody',
      rating: 4.4,
      reviews: 46,
      topNotes: ['Saffron'],
      heartNotes: ['Oud Accord'],
      baseNotes: ['Amber', 'Leather'],
      longevity: 3,
      intensity: 3,
      moodTags: ['Bold', 'Elegant']
    }
  ]);

  getProducts(): Signal<Product[]> {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products().find((product) => product.id === id);
  }

  getProductsByCategory(category: ProductCategory): Signal<Product[]> {
    return computed(() => this.products().filter((product) => product.category === category));
  }

  getFeaturedProducts(): Signal<Product[]> {
    return computed(() => this.products().filter((product) => product.featured));
  }

  getBestSellers(): Signal<Product[]> {
    return computed(() => this.products().filter((product) => product.bestSeller));
  }

  getProductsByFamily(family: FragranceFamily): Product[] {
    return this.products().filter((product) => product.family === family);
  }

  searchProducts(query: string): Product[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return [];
    }

    return this.products().filter((product) => {
      const notes = [...product.topNotes, ...product.heartNotes, ...product.baseNotes].join(' ');
      const haystack = [product.name, product.description, product.family, product.category, notes].join(' ').toLowerCase();
      return haystack.includes(normalized);
    });
  }

  getRecommendedByMood(mood: Mood): Product[] {
    return this.products().filter((product) => product.moodTags.includes(mood)).slice(0, 4);
  }

  getRelatedProducts(productId: number): Product[] {
    const currentProduct = this.getProductById(productId);
    if (!currentProduct) {
      return [];
    }

    return this.products()
      .filter((product) => product.id !== productId && product.family === currentProduct.family)
      .slice(0, 4);
  }
}
