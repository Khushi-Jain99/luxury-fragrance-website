import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  category: 'Men' | 'Women' | 'Sample';
  featured?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = signal<Product[]>([
    {
      id: 1,
      name: 'Oud Noir',
      brand: 'Luminaire',
      description: 'A deep, mysterious blend of agarwood and smoked incense.',
      price: 240,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
      category: 'Men',
      featured: true
    },
    {
      id: 2,
      name: 'Rose Éclat',
      brand: 'Luminaire',
      description: 'Velvety damask rose with notes of pink pepper and vanilla.',
      price: 195,
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
      category: 'Women',
      featured: true
    },
    {
      id: 3,
      name: 'Cédrat Blanc',
      brand: 'Luminaire',
      description: 'Zesty citrus balanced with Himalayan cedarwood.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d22f?auto=format&fit=crop&q=80&w=800',
      category: 'Men'
    },
    {
      id: 4,
      name: 'Ambre Soir',
      brand: 'Luminaire',
      description: 'Warm amber and labdanum for unforgettable evenings.',
      price: 210,
      image: 'https://images.unsplash.com/photo-1583445013765-46c2049d5045?auto=format&fit=crop&q=80&w=800',
      category: 'Women'
    },
    {
      id: 5,
      name: 'The Discovery Set',
      brand: 'Luminaire',
      description: 'Five signature scents in 2ml sample vials.',
      price: 45,
      image: 'https://images.unsplash.com/photo-1592914610354-fd35984456b2?auto=format&fit=crop&q=80&w=800',
      category: 'Sample',
      featured: true
    },
    {
      id: 6,
      name: 'Noir Intense',
      brand: 'Luminaire',
      description: 'Concentrated essence of darkness and grace.',
      price: 280,
      image: 'https://images.unsplash.com/photo-1595425959632-343516309831?auto=format&fit=crop&q=80&w=800',
      category: 'Men'
    },
    {
      id: 7,
      name: 'Floral Muse',
      brand: 'Luminaire',
      description: 'A bouquet of white flowers and crystalline musk.',
      price: 175,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
      category: 'Women'
    },
    {
      id: 8,
      name: 'Midnight Musk',
      brand: 'Luminaire',
      description: '2ml sample of our best-selling evening fragrance.',
      price: 12,
      image: 'https://images.unsplash.com/photo-1615485499978-1279c3d6ac3d?auto=format&fit=crop&q=80&w=800',
      category: 'Sample'
    },
    {
      id: 9,
      name: 'Cuir Royal',
      brand: 'Luminaire',
      description: 'Rich Tuscan leather and tobacco leaf with a hint of raspberry.',
      price: 260,
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800',
      category: 'Men'
    },
    {
      id: 10,
      name: 'Jasmin Pur',
      brand: 'Luminaire',
      description: 'Hand-picked night-blooming jasmine from the fields of Grasse.',
      price: 220,
      image: 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=800',
      category: 'Women'
    },
    {
      id: 11,
      name: 'Vetiver Terra',
      brand: 'Luminaire',
      description: 'Earthy vetiver rooted in fresh soil and mineral accords.',
      price: 185,
      image: 'https://images.unsplash.com/photo-1592701828557-0749021870bd?auto=format&fit=crop&q=80&w=800',
      category: 'Men'
    },
    {
      id: 12,
      name: 'Santal Mystique',
      brand: 'Luminaire',
      description: 'Creamy Australian sandalwood with exotic spices.',
      price: 205,
      image: 'https://images.unsplash.com/photo-1557827334-1823ca87c58d?auto=format&fit=crop&q=80&w=800',
      category: 'Women'
    },
    {
      id: 13,
      name: 'Oud Noir Sample',
      brand: 'Luminaire',
      description: '2ml sample of our mysterious Oud Noir.',
      price: 15,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
      category: 'Sample'
    }
  ]);

  getProducts() {
    return this.products;
  }

  getProductsByCategory(category: 'Men' | 'Women' | 'Sample') {
    return signal(this.products().filter(p => p.category === category));
  }

  getFeaturedProducts() {
    return signal(this.products().filter(p => p.featured));
  }
}
