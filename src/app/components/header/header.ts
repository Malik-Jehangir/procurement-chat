import { Component, inject, signal } from '@angular/core';
import { ProcurementService } from '../../services/procurement';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  procurement = inject(ProcurementService);

  mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(value => !value);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

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
  this.closeMobileMenu();
}
}