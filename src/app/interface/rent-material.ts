export interface RentMaterial {
  _id?: string; 
  name: string;
  phoneNo: string;
  email: string;
  address: string;
  addressProofType: string;
  sharpyLightCount: number;
  ledScreenCount: number;
  price: number;
  clientNote?: string;
  fileName?: string;
  rentDate: string; 
  createdAt?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'; 
}

