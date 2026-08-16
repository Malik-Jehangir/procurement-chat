import { Component, inject } from '@angular/core';
import { ProcurementService } from '../../services/procurement';

@Component({
  selector: 'app-workflow-progress',
  imports: [],
  templateUrl: './workflow-progress.html',
  styleUrl: './workflow-progress.css'
})
export class WorkflowProgress {

  procurement = inject(ProcurementService);

  steps = [
    'Request',
    'Suppliers',
    'RFQ',
    'Approval',
    'PO',
    'Delivery',
    'Payment'
  ];
}