import { Category, SubCategory, Product, Quote, SpecificationField } from './db';
import data from '@/data/db.json';

// Initialize with sample data
const initialData = {
  categories: data.categories || [],
  subCategories: data.subCategories || [],
  products: data.products || [],
  quotes: []
};

let memoryDb = { ...initialData };

// Read database
function readDb() {
  return memoryDb;
}

// Write database
function writeDb(data: typeof memoryDb) {
  memoryDb = { ...data };
}

// Categories
export async function getCategories(): Promise<Category[]> {
  return Promise.resolve(readDb().categories);
}

export async function addCategory(category: Omit<Category, 'id'>): Promise<Category> {
  const db = readDb();
  const newCategory: Category = {
    ...category,
    id: crypto.randomUUID()
  };
  db.categories.push(newCategory);
  writeDb(db);
  return Promise.resolve(newCategory);
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<Category | null> {
  const db = readDb();
  const index = db.categories.findIndex(c => c.id === id);
  if (index === -1) return Promise.resolve(null);
  
  db.categories[index] = { ...db.categories[index], ...category };
  writeDb(db);
  return Promise.resolve(db.categories[index]);
}

export async function deleteCategory(id: string): Promise<boolean> {
  const db = readDb();
  const initialLength = db.categories.length;
  db.categories = db.categories.filter(c => c.id !== id);
  db.subCategories = db.subCategories.filter(sc => sc.categoryId !== id);
  writeDb(db);
  return Promise.resolve(db.categories.length < initialLength);
}

// SubCategories
export async function getSubCategories(categoryId?: string): Promise<SubCategory[]> {
  const db = readDb();
  if (categoryId) {
    return Promise.resolve(db.subCategories.filter(sc => sc.categoryId === categoryId));
  }
  return Promise.resolve(db.subCategories);
}

export async function getSubCategory(id: string): Promise<SubCategory | null> {
  const db = readDb();
  return Promise.resolve(db.subCategories.find(sc => sc.id === id) || null);
}

export async function addSubCategory(subCategory: Omit<SubCategory, 'id'>): Promise<SubCategory> {
  const db = readDb();
  const newSubCategory: SubCategory = {
    ...subCategory,
    id: crypto.randomUUID(),
    specificationFields: subCategory.specificationFields || []
  };
  db.subCategories.push(newSubCategory);
  writeDb(db);
  return Promise.resolve(newSubCategory);
}

export async function updateSubCategory(id: string, subCategory: Partial<SubCategory>): Promise<SubCategory | null> {
  const db = readDb();
  const index = db.subCategories.findIndex(sc => sc.id === id);
  if (index === -1) return Promise.resolve(null);
  
  db.subCategories[index] = { ...db.subCategories[index], ...subCategory };
  writeDb(db);
  return Promise.resolve(db.subCategories[index]);
}

export async function deleteSubCategory(id: string): Promise<boolean> {
  const db = readDb();
  const initialLength = db.subCategories.length;
  db.subCategories = db.subCategories.filter(sc => sc.id !== id);
  writeDb(db);
  return Promise.resolve(db.subCategories.length < initialLength);
}

// Products
export async function getProducts(categoryId?: string, subCategoryId?: string): Promise<Product[]> {
  const db = readDb();
  let products = db.products;
  
  if (subCategoryId) {
    products = products.filter(p => p.subCategoryId === subCategoryId);
  } else if (categoryId) {
    const subCategoryIds = db.subCategories
      .filter(sc => sc.categoryId === categoryId)
      .map(sc => sc.id);
    products = products.filter(p => subCategoryIds.includes(p.subCategoryId));
  }
  
  return Promise.resolve(products);
}

export async function getProduct(id: string): Promise<Product | null> {
  const db = readDb();
  const product = db.products.find(p => p.id === id);
  if (!product) return Promise.resolve(null);

  const subCategory = db.subCategories.find(sc => sc.id === product.subCategoryId);
  if (!subCategory) return Promise.resolve(product);

  const specifications: Record<string, any> = {};
  subCategory.specificationFields.forEach(field => {
    specifications[field.name] = product.specifications[field.name] || null;
  });

  return Promise.resolve({
    ...product,
    specifications
  });
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const db = readDb();
  const newProduct: Product = {
    ...product,
    id: crypto.randomUUID()
  };
  db.products.push(newProduct);
  writeDb(db);
  return Promise.resolve(newProduct);
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product | null> {
  const db = readDb();
  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) return Promise.resolve(null);
  
  db.products[index] = { ...db.products[index], ...product };
  writeDb(db);
  return Promise.resolve(db.products[index]);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = readDb();
  const initialLength = db.products.length;
  db.products = db.products.filter(p => p.id !== id);
  writeDb(db);
  return Promise.resolve(db.products.length < initialLength);
}

// Quotes
export async function getQuotes(): Promise<Quote[]> {
  const db = readDb();
  return Promise.resolve(db.quotes);
}

export async function getQuote(id: string): Promise<Quote | null> {
  const db = readDb();
  return Promise.resolve(db.quotes.find(q => q.id === id) || null);
}

export async function addQuote(quote: Omit<Quote, 'id' | 'status' | 'createdAt'>): Promise<Quote> {
  const db = readDb();
  const newQuote: Quote = {
    ...quote,
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  db.quotes.push(newQuote);
  writeDb(db);
  return Promise.resolve(newQuote);
}

export async function updateQuoteStatus(id: string, status: Quote['status']): Promise<Quote | null> {
  const db = readDb();
  const quoteIndex = db.quotes.findIndex(q => q.id === id);
  
  if (quoteIndex === -1) {
    return Promise.resolve(null);
  }
  
  db.quotes[quoteIndex] = {
    ...db.quotes[quoteIndex],
    status
  };
  
  writeDb(db);
  return Promise.resolve(db.quotes[quoteIndex]);
}

// Specification Fields
export async function getSpecificationFields(subCategoryId: string): Promise<SpecificationField[]> {
  const db = readDb();
  const subCategory = db.subCategories.find(sc => sc.id === subCategoryId);
  return Promise.resolve(subCategory?.specificationFields || []);
}

export async function addSpecificationField(
  subCategoryId: string,
  field: Omit<SpecificationField, 'id'>
): Promise<SpecificationField | null> {
  const db = readDb();
  const subCategoryIndex = db.subCategories.findIndex(sc => sc.id === subCategoryId);
  
  if (subCategoryIndex === -1) return Promise.resolve(null);
  
  const newField: SpecificationField = {
    ...field,
    id: crypto.randomUUID()
  };
  
  if (!db.subCategories[subCategoryIndex].specificationFields) {
    db.subCategories[subCategoryIndex].specificationFields = [];
  }
  
  db.subCategories[subCategoryIndex].specificationFields.push(newField);
  writeDb(db);
  return Promise.resolve(newField);
}

export async function updateSpecificationField(
  subCategoryId: string,
  fieldId: string,
  field: Partial<SpecificationField>
): Promise<SpecificationField | null> {
  const db = readDb();
  const subCategoryIndex = db.subCategories.findIndex(sc => sc.id === subCategoryId);
  
  if (subCategoryIndex === -1) return Promise.resolve(null);
  
  const fieldIndex = db.subCategories[subCategoryIndex].specificationFields.findIndex(
    f => f.id === fieldId
  );
  
  if (fieldIndex === -1) return Promise.resolve(null);
  
  db.subCategories[subCategoryIndex].specificationFields[fieldIndex] = {
    ...db.subCategories[subCategoryIndex].specificationFields[fieldIndex],
    ...field
  };
  
  writeDb(db);
  return Promise.resolve(db.subCategories[subCategoryIndex].specificationFields[fieldIndex]);
}

export async function deleteSpecificationField(
  subCategoryId: string,
  fieldId: string
): Promise<boolean> {
  const db = readDb();
  const subCategoryIndex = db.subCategories.findIndex(sc => sc.id === subCategoryId);
  
  if (subCategoryIndex === -1) return Promise.resolve(false);
  
  const initialLength = db.subCategories[subCategoryIndex].specificationFields.length;
  db.subCategories[subCategoryIndex].specificationFields = 
    db.subCategories[subCategoryIndex].specificationFields.filter(f => f.id !== fieldId);
  
  writeDb(db);
  return Promise.resolve(db.subCategories[subCategoryIndex].specificationFields.length < initialLength);
}