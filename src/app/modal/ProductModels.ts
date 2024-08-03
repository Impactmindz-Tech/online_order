export interface ProductsModels {
  id: string;
  category: string;
  Name: string;
  ImageUrl: string;
  Description?: string; // Optional
  // meal:string;
    meal: Record<string, string>;
  // Add other properties if needed
}
