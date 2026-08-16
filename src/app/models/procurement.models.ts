export type MessageSender = 'user' | 'assistant';

export type ProcurementStage =
  | 'need'
  | 'requirements'
  | 'material'
  | 'event-date'
  | 'event-time'
  | 'event-location'
  | 'supplier-search'
  | 'rfq'
  | 'quotations'
  | 'supplier-selection'
  | 'approval'
  | 'purchase-order'
  | 'delivery'
  | 'goods-receipt'
  | 'invoice'
  | 'matching'
  | 'payment'
  | 'complete';

export interface ChatMessage {
  id: number;
  sender: MessageSender;
  text: string;
  timestamp: Date;
  type?: 'text' | 'options' | 'quotes' | 'success';
  options?: ChatOption[];
}

export interface ChatOption {
  label: string;
  value: string;
}

export interface Supplier {
  id: number;
  name: string;
  price: number;
  delivery: number;
  rating: number;
  deliveryTime: string;
  recommended?: boolean;
}

export interface ProcurementRequest {
  item: string;
  quantity: number;
  type: 'buy' | 'rent' | '';
  material: string;
  color: string;
  eventDate: string;
  eventTime: string;
  location: string;
}

export interface PurchaseOrder {
  poNumber: string;
  supplier: string;
  item: string;
  quantity: number;
  total: number;
  status: string;
}