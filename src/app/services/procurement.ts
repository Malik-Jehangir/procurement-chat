import { Injectable, signal } from '@angular/core';
import {
  ChatMessage,
  ProcurementRequest,
  ProcurementStage,
  PurchaseOrder,
  Supplier
} from '../models/procurement.models';

@Injectable({
  providedIn: 'root'
})
export class ProcurementService {

  readonly currentStage = signal<ProcurementStage>('need');

  readonly request = signal<ProcurementRequest>({
  item: '',
  quantity: 0,
  type: '',
  material: '',
  color: '',
  eventDate: '',
  eventTime: '',
  location: ''
});

  readonly selectedSupplier = signal<Supplier | null>(null);

  readonly purchaseOrder = signal<PurchaseOrder | null>(null);

  readonly activeSection = signal<
  'new-request' |
  'requests' |
  'suppliers' |
  'purchase-orders' |
  'invoices'
>('new-request');

setActiveSection(
  section:
    'new-request' |
    'requests' |
    'suppliers' |
    'purchase-orders' |
    'invoices'
): void {
  this.activeSection.set(section);
}

  readonly suppliers: Supplier[] = [
    {
      id: 1,
      name: 'Bahrain Event Rentals',
      price: 600,
      delivery: 0,
      rating: 4.2,
      deliveryTime: '2 days'
    },
    {
      id: 2,
      name: 'Royal Seating Bahrain',
      price: 550,
      delivery: 0,
      rating: 4.8,
      deliveryTime: '1 day',
      recommended: true
    },
    {
      id: 3,
      name: 'Event Furniture Co.',
      price: 480,
      delivery: 100,
      rating: 3.9,
      deliveryTime: '3 days'
    }
  ];

  readonly messages = signal<ChatMessage[]>([
    {
      id: 1,
      sender: 'assistant',
      text: 'Hi! I’m your procurement assistant. What would you like to procure today?',
      timestamp: new Date()
    }
  ]);

  addMessage(message: ChatMessage): void {
    this.messages.update(messages => [...messages, message]);
  }

  addUserMessage(text: string): void {
    this.addMessage({
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date()
    });
  }

  addAssistantMessage(
    text: string,
    options?: { label: string; value: string }[]
  ): void {
    this.addMessage({
      id: Date.now(),
      sender: 'assistant',
      text,
      timestamp: new Date(),
      type: options ? 'options' : 'text',
      options
    });
  }
}