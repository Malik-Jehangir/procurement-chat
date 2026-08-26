import { Component, inject } from '@angular/core';
import { ProcurementService } from '../../services/procurement';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  procurement = inject(ProcurementService);

 openSection(
  section:
    'new-request' |
    'dashboard' |
    'requests' |
    'suppliers' |
    'purchase-orders' |
    'invoices'
): void {

  this.procurement.setActiveSection(section);
}
}