import { Component, inject } from '@angular/core';
import { ProcurementService } from '../../services/procurement';

@Component({
  selector: 'app-records',
  imports: [],
  templateUrl: './records.html',
  styleUrl: './records.css'
})
export class Records {

  procurement = inject(ProcurementService);

  requests = [
    {
      id: 'REQ-2026-001',
      title: '100 White Event Chairs',
      quantity: '100 chairs',
      location: 'Bahrain Financial Harbour, South Tower, Grand Hall Number 6, Manama, Bahrain',
      date: '10 September 2026',
      status: 'Approved',
      amount: 'BHD 550'
    },
    {
      id: 'REQ-2026-002',
      title: 'Office Laptops',
      quantity: '12 laptops',
      location: 'Manama',
      date: '18 September 2026',
      status: 'Pending Approval',
      amount: 'BHD 12,400'
    },
    {
      id: 'REQ-2026-003',
      title: 'Marketing Brochures',
      quantity: '2,000 brochures',
      location: 'Bahrain',
      date: '25 September 2026',
      status: 'RFQ in Progress',
      amount: 'BHD 1,850'
    }
  ];


  suppliers = [
    {
      id: 'SUP-001',
      name: 'Royal Seating Bahrain',
      category: 'Event Furniture',
      location: 'Bahrain',
      rating: '4.8 / 5',
      status: 'Certified By Aqvyr',
      note: 'Selected supplier for 100-chair procurement.'
    },
    {
      id: 'SUP-002',
      name: 'Bahrain Event Rentals',
      category: 'Event Furniture',
      location: 'Bahrain',
      rating: '4.2 / 5',
      status: 'Certified By Aqvyr',
      note: 'Quotation received: BHD 600.'
    },
    {
      id: 'SUP-003',
      name: 'TechSource Middle East',
      category: 'IT Equipment',
      location: 'Manama',
      rating: '4.6 / 5',
      status: 'Certified By Aqvyr',
      note: 'Preferred supplier for computer equipment.'
    },
    {
      id: 'SUP-004',
      name: 'PrintWorks Bahrain',
      category: 'Printing',
      location: 'Bahrain',
      rating: '4.4 / 5',
      status: 'Not certified yet',
      note: 'Currently undergoing supplier assessment.'
    }
  ];


  purchaseOrders = [
    {
      id: 'PO-10458',
      supplier: 'Royal Seating Bahrain',
      description: '100 White Event Chairs',
      quantity: '100',
      amount: 'BHD 550',
      date: '08 September 2026',
      status: 'Delivered'
    },
    {
      id: 'PO-10459',
      supplier: 'TechSource Middle East',
      description: '12 Business Laptops',
      quantity: '12',
      amount: 'BHD 12,400',
      date: '15 September 2026',
      status: 'Awaiting Delivery'
    },
    {
      id: 'PO-10460',
      supplier: 'PrintWorks Bahrain',
      description: 'Marketing Brochures',
      quantity: '2,000',
      amount: 'BHD 1,850',
      date: '20 September 2026',
      status: 'Draft'
    }
  ];


  invoices = [
    {
      id: 'INV-887',
      po: 'PO-10458',
      supplier: 'Royal Seating Bahrain',
      description: '100 White Event Chairs',
      amount: 'BHD 550',
      match: '3-Way Match Passed',
      status: 'Ready for Payment'
    },
    {
      id: 'INV-888',
      po: 'PO-10459',
      supplier: 'TechSource Middle East',
      description: '12 Business Laptops',
      amount: 'BHD 12,400',
      match: 'Awaiting Goods Receipt',
      status: 'On Hold'
    },
    {
      id: 'INV-889',
      po: 'PO-10460',
      supplier: 'PrintWorks Bahrain',
      description: 'Marketing Brochures',
      amount: 'BHD 1,950',
      match: 'Amount Mismatch',
      status: 'Review Required'
    }
  ];
}