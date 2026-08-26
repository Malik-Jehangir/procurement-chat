import {
  Component,
  OnInit,
  signal
} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  showNotification = signal(false);


  // Dashboard statistics

  stats = [
    {
      label: 'Total Orders',
      value: '24',
      change: '+4 this month',
      icon: '▤'
    },
    {
      label: 'Total Spend',
      value: 'BHD 8,450',
      change: '+12% this month',
      icon: '◈'
    },
    {
      label: 'Pending Orders',
      value: '7',
      change: 'Needs attention',
      icon: '◷'
    },
    {
      label: 'Completed',
      value: '92%',
      change: 'On-time completion',
      icon: '✓'
    }
  ];


  // Hardcoded incoming orders

  incomingOrders = [
    {
      id: 'PO-10461',
      item: '100 Wooden Event Chairs',
      supplier: 'Bahrain Event Rentals',
      amount: 'BHD 550',
      delivery: '10 Sep 2026',
      status: 'New'
    },
    {
      id: 'PO-10462',
      item: '12 Business Laptops',
      supplier: 'TechSource Bahrain',
      amount: 'BHD 4,200',
      delivery: '14 Sep 2026',
      status: 'Processing'
    },
    {
      id: 'PO-10463',
      item: 'Office Stationery',
      supplier: 'Gulf Office Supplies',
      amount: 'BHD 320',
      delivery: '16 Sep 2026',
      status: 'Confirmed'
    },
    {
      id: 'PO-10464',
      item: 'Marketing Brochures',
      supplier: 'Bahrain Print House',
      amount: 'BHD 780',
      delivery: '20 Sep 2026',
      status: 'New'
    }
  ];


  // Fake chart values.
  // We will use them to create a responsive CSS chart.

  performance = [
    {
      month: 'Mar',
      orders: 9,
      height: 40
    },
    {
      month: 'Apr',
      orders: 13,
      height: 58
    },
    {
      month: 'May',
      orders: 11,
      height: 49
    },
    {
      month: 'Jun',
      orders: 16,
      height: 71
    },
    {
      month: 'Jul',
      orders: 19,
      height: 84
    },
    {
      month: 'Aug',
      orders: 22,
      height: 96
    }
  ];


  recentActivity = [
    {
      title: 'New purchase order received',
      description: 'PO-10461 · 100 Wooden Event Chairs',
      time: '5 minutes ago'
    },
    {
      title: 'Invoice approved',
      description: 'INV-887 · Bahrain Event Rentals',
      time: '35 minutes ago'
    },
    {
      title: '3-way match completed',
      description: 'PO-10458 matched successfully',
      time: '1 hour ago'
    },
    {
      title: 'Supplier quotation received',
      description: 'RFQ-2026-014 · TechSource Bahrain',
      time: '2 hours ago'
    }
  ];


  ngOnInit(): void {

    // Show notification whenever dashboard is opened.

    this.showNotification.set(true);

    setTimeout(() => {
      this.showNotification.set(false);
    }, 4000);
  }


  closeNotification(): void {
    this.showNotification.set(false);
  }
}