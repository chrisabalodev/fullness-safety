// Type definitions
export interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  imageUrl: string;
}

export interface SpecificationField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  required: boolean;
  options?: string[];
  unit?: string;
  icon: string;
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
  slug: string;
  specificationFields: SpecificationField[];
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isNew: string | null;
  brand: string | null;
  reference: string | null;
  images: ProductImage[];
  technicalSheetUrl: string | null;
  specifications: Record<string, any>;
  subCategoryId: string;
  documentation: {
    technicalSheet?: {
      url: string;
      format: string;
      size: string;
      lastUpdate: string;
    };
    certifications?: {
      name: string;
      number: string;
      validUntil: string;
      url: string;
    }[];
    instructions?: {
      title: string;
      language: string;
      url: string;
    }[];
  };
}

export interface Quote {
  id: string;
  productId: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  quantity: number;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  createdAt: string;
}

// Export storage functions
export {
  getCategories,
  getSubCategories,
  getSubCategory,
  getProducts,
  getProduct,
  addCategory,
  updateCategory,
  deleteCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  addProduct,
  updateProduct,
  deleteProduct,
  getQuotes,
  getQuote,
  addQuote,
  updateQuoteStatus,
  getSpecificationFields,
  addSpecificationField,
  updateSpecificationField,
  deleteSpecificationField
} from './storage';