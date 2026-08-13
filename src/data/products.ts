import { ProductPackage } from '../types';

export const PRODUCTS: ProductPackage[] = [
  {
    id: 'cream',
    name: 'Glowing Skin Face Cream',
    tagline: 'Deep Moisture & Complexion Brightening',
    priceFormatted: '₦14,500',
    originalPriceFormatted: '₦18,000',
    discountBadge: 'Save 20%',
    description: 'Nourishing facial moisturizer formulated to restore softness, fade dark spots, and lock in radiant hydration all day long.',
    features: [
      'Brightens dull & tired skin',
      'Fades dark spots & hyperpigmentation',
      'Provides 24-hour hydration',
      'Non-greasy, fast-absorbing formula'
    ],
    image: '/src/assets/images/glowing_skin_set_1785880770004.jpg'
  },
  {
    id: 'wash',
    name: 'Glowing Skin Face Wash',
    tagline: 'Gentle Cleansing & Pore Refining',
    priceFormatted: '₦11,500',
    originalPriceFormatted: '₦15,000',
    discountBadge: 'Save 23%',
    description: 'Deeply cleanses dirt, excess oil, and impurities without stripping natural skin moisture. Leaves face feeling fresh and smooth.',
    features: [
      'Removes stubborn dirt & makeup',
      'Refines pores & combats breakouts',
      'Maintains natural pH balance',
      'Suitable for sensitive & daily use'
    ],
    image: '/src/assets/images/glowing_skin_set_1785880770004.jpg'
  },
  {
    id: 'serum',
    name: 'Glowing Skin Serum',
    tagline: 'Targeted Dark Spot & Scar Repair',
    priceFormatted: '₦16,500',
    originalPriceFormatted: '₦22,000',
    discountBadge: 'Save 25%',
    description: 'Concentrated serum rich in active botanical skin restorers. Penetrates deep layers to clear acne scars and sun damage.',
    features: [
      'Rapid dark spot fading formula',
      'Smooths uneven skin texture',
      'Boosts natural glow & firmness',
      'Lightweight drops for quick absorption'
    ],
    image: '/src/assets/images/glowing_skin_set_1785880770004.jpg'
  },
  {
    id: 'complete-set',
    name: 'Complete Glowing Skin Set',
    tagline: 'The Ultimate Transformation Bundle',
    priceFormatted: '₦34,500',
    originalPriceFormatted: '₦48,000',
    discountBadge: 'BEST VALUE - SAVE 28%',
    description: 'All 3 power products together (Face Wash + Serum + Cream) for complete, synergistic skincare perfection. Free priority delivery!',
    features: [
      'Includes Face Wash + Serum + Face Cream',
      'Maximum glow & fastest spot clearance',
      'Complimentary fast delivery',
      'Most recommended by 98% of buyers'
    ],
    image: '/src/assets/images/glowing_skin_hero_1785880694562.jpg',
    isPopular: true
  }
];

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'Abuja FCT', 'Other / International'
];
