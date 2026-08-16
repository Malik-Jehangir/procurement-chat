import { Component, inject } from '@angular/core';
import { ProcurementService } from '../../services/procurement';
import { Supplier } from '../../models/procurement.models';

@Component({
  selector: 'app-quote-comparison',
  imports: [],
  templateUrl: './quote-comparison.html',
  styleUrl: './quote-comparison.css'
})
export class QuoteComparison {

  procurement = inject(ProcurementService);

  selectSupplier(supplier: Supplier): void {

    this.procurement.selectedSupplier.set(supplier);

    this.procurement.currentStage.set(
      'supplier-selection'
    );

    this.procurement.addUserMessage(
      `Select ${supplier.name}.`
    );

    setTimeout(() => {

      this.procurement.currentStage.set('approval');

      this.procurement.addAssistantMessage(
        `${supplier.name} has been selected for BHD ${supplier.price + supplier.delivery}. This purchase requires manager approval.`,
        [
          {
            label: 'Request approval',
            value: 'request-approval'
          }
        ]
      );

    }, 500);
  }
}