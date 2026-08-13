export interface Order {
  id: string;
  fullName: string;
  phoneNumber: string;
  whatsAppNumber: string;
  email?: string;
  deliveryAddress: string;
  state: string;
  cityTown: string;
  product: string;
  quantity: string;
  usedBefore: string;
  hearAboutUs: string;
  additionalNotes?: string;
  consent: boolean;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
}

export interface ProductPackage {
  id: string;
  name: string;
  tagline: string;
  priceFormatted: string;
  originalPriceFormatted?: string;
  discountBadge?: string;
  description: string;
  features: string[];
  image: string;
  isPopular?: boolean;
}

export interface OrderFormData {
  fullName: string;
  phoneNumber: string;
  whatsAppNumber: string;
  email: string;
  deliveryAddress: string;
  state: string;
  cityTown: string;
  product: string;
  quantity: string;
  usedBefore: string;
  hearAboutUs: string;
  additionalNotes: string;
  consent: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
