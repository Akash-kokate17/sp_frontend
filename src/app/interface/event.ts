export interface Event {
_id:string,
  name: string;
  phoneNo: string;
  email: string;
  eventType: string;
  orderDate: string; 
  eventBookingDate: string;
  location: string;
  serviceName: string;
  clientMsg?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'; 
  sharpyCount: string;
  ledScreenCount: string;
}
