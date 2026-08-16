import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProcurementService } from '../../services/procurement';
import { QuoteComparison } from '../quote-comparison/quote-comparison';

@Component({
  selector: 'app-chat',
  imports: [
  FormsModule,
  DatePipe,
  QuoteComparison
],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {

  procurement = inject(ProcurementService);

  userInput = '';

  @ViewChild('messagesContainer')
  messagesContainer!: ElementRef<HTMLDivElement>;

  sendMessage(): void {

  const message = this.userInput.trim();

  if (!message) {
    return;
  }

  this.procurement.addUserMessage(message);

  this.userInput = '';

  this.scrollToBottom();

  this.processMessage(message);
}

  processMessage(message: string): void {

  const stage = this.procurement.currentStage();

  switch (stage) {

    case 'need':
      this.handleNeed(message);
      break;

    case 'requirements':
      this.handleRequirements(message);
      break;

    case 'material':
      this.handleMaterial(message);
      break;

    case 'event-date':
      this.handleEventDate(message);
      break;

    case 'event-time':
      this.handleEventTime(message);
      break;

    case 'event-location':
      this.handleEventLocation(message);
      break;

    case 'supplier-search':
      this.handleSupplierSearch();
      break;

    default:
      this.addAssistantMessageAndScroll(
        'Please use one of the options above to continue.'
      );
  }

  this.scrollToBottom();
}

  handleNeed(message: string): void {

    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes('chair') &&
      lowerMessage.includes('100')
    ) {

      this.procurement.request.update(request => ({
        ...request,
        item: 'White Event Chairs',
        quantity: 100
      }));

      this.procurement.currentStage.set('requirements');

      setTimeout(() => {

        this.addAssistantMessageAndScroll(
          'Absolutely. I can help with that. Would you like to buy or rent the 100 chairs?',
          [
            {
              label: 'Rent chairs',
              value: 'rent'
            },
            {
              label: 'Buy chairs',
              value: 'buy'
            }
          ]
        );

      }, 400);

    } else {

      setTimeout(() => {

        this.addAssistantMessageAndScroll(
          'For this prototype, try saying: "I need 100 chairs for an event."'
        );

      }, 400);
    }
  }

  handleSupplierSearch(): void {
  this.addAssistantMessageAndScroll(
    'Please use the "Send RFQ" button above to continue.'
  );
}

  selectOption(value: string): void {

    if (value === 'rent') {

  this.procurement.addUserMessage(
    'I would like to rent them.'
  );

  this.procurement.request.update(request => ({
    ...request,
    type: 'rent'
  }));

  this.procurement.currentStage.set('material');

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      'Great! What type of material would you prefer for the chairs?',
      [
        {
          label: 'Plastic',
          value: 'material-plastic'
        },
        {
          label: 'Wood',
          value: 'material-wood'
        },
        {
          label: 'Metal',
          value: 'material-metal'
        }
      ]
    );

  }, 400);
}

if (
  value === 'material-plastic' ||
  value === 'material-wood' ||
  value === 'material-metal'
) {

  const materialMap: Record<string, string> = {
    'material-plastic': 'Plastic',
    'material-wood': 'Wood',
    'material-metal': 'Metal'
  };

  const material = materialMap[value];

  this.procurement.addUserMessage(material);

  this.procurement.request.update(request => ({
    ...request,
    material: material
  }));

  this.procurement.currentStage.set('event-date');

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      'Got it. What is the date of your event?'
    );

  }, 400);
}

    if (value === 'buy') {

      this.addAssistantMessageAndScroll(
        'For this prototype, let’s continue using the rental workflow.'
      );
    }

    if (value === 'find-suppliers') {

      this.findSuppliers();
    }

    if (value === 'send-rfq') {

  this.procurement.addUserMessage(
    'Yes, send the RFQ.'
  );

  this.procurement.currentStage.set('rfq');

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      'RFQ #RFQ-2026-001 has been sent to 3 approved suppliers. '
    );

  }, 500);

  setTimeout(() => {

    this.procurement.currentStage.set('quotations');

    this.addAssistantMessageAndScroll(
      'All 3 suppliers have responded. I’ve compared their quotations below.'
    );

  }, 1200);
}

if (value === 'request-approval') {

  this.procurement.addUserMessage(
    'Request manager approval.'
  );

  this.procurement.currentStage.set('approval');

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      'Approval request has been sent to Sarah. '
    );

  }, 500);

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      'Sarah has approved the procurement request. Would you like me to create the Purchase Order?',
      [
        {
          label: 'Create Purchase Order',
          value: 'create-po'
        }
      ]
    );

  }, 1200);
}

if (value === 'create-po') {

  this.procurement.addUserMessage(
    'Create the Purchase Order.'
  );

  const supplier = this.procurement.selectedSupplier();

  if (!supplier) {
    return;
  }

  this.procurement.purchaseOrder.set({
    poNumber: 'PO-10458',
    supplier: supplier.name,
    item: '100 White Event Chairs',
    quantity: 100,
    total: supplier.price + supplier.delivery,
    status: 'Sent'
  });

  this.procurement.currentStage.set('purchase-order');

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      `Purchase Order PO-10458 has been created and sent to ${supplier.name}. `,
      [
        {
          label: 'Confirm Delivery',
          value: 'confirm-delivery'
        }
      ]
    );

  }, 600);
}
if (value === 'confirm-delivery') {

  this.procurement.addUserMessage(
    'Confirm delivery.'
  );

  this.procurement.currentStage.set('delivery');

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      'The supplier has delivered the chairs. Did you receive all 100 chairs in acceptable condition?',
      [
        {
          label: 'Yes, all received',
          value: 'goods-received'
        },
        {
          label: 'Report a problem',
          value: 'delivery-problem'
        }
      ]
    );

  }, 600);
}
if (value === 'goods-received') {

  this.procurement.addUserMessage(
    'Yes, all 100 chairs were received in acceptable condition.'
  );

  this.procurement.currentStage.set('goods-receipt');

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      'Goods Receipt GRN-456 has been created successfully. '
    );

  }, 500);

  setTimeout(() => {

    this.procurement.currentStage.set('invoice');

    this.addAssistantMessageAndScroll(
      'Invoice INV-887 has been received from the supplier. Would you like me to perform the 3-way match?',
      [
        {
          label: 'Perform 3-Way Match',
          value: 'three-way-match'
        }
      ]
    );

  }, 1200);
}
if (value === 'delivery-problem') {

  this.procurement.addUserMessage(
    'There is a problem with the delivery.'
  );

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      'I’ve flagged the delivery for review. Payment will remain on hold until the delivery issue is resolved.'
    );

  }, 500);
}
  }

  handleEventDate(message: string): void {

  this.procurement.request.update(request => ({
    ...request,
    eventDate: message
  }));

  this.procurement.currentStage.set('event-time');

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      'Perfect. What time does your event start?'
    );

  }, 400);
}

handleEventTime(message: string): void {

  this.procurement.request.update(request => ({
    ...request,
    eventTime: message
  }));

  this.procurement.currentStage.set('event-location');

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      'Great! And where will the event take place?'
    );

  }, 400);
}

handleMaterial(message: string): void {

  this.procurement.request.update(request => ({
    ...request,
    material: message
  }));

  this.procurement.currentStage.set('event-date');

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      'Got it. What is the date of your event?'
    );

  }, 400);
}

handleEventLocation(message: string): void {

  this.procurement.request.update(request => ({
    ...request,
    location: message
  }));

  const request = this.procurement.request();

  setTimeout(() => {

    this.addAssistantMessageAndScroll(
      `Perfect! Here’s what I have:

${request.quantity} ${request.material} event chairs
Rental
Date: ${request.eventDate}
Time: ${request.eventTime}
Location: ${request.location}

Shall I search our approved suppliers?`,
      [
        {
          label: 'Find suppliers',
          value: 'find-suppliers'
        }
      ]
    );

  }, 400);
}

  handleRequirements(message: string): void {
    console.log(message);
  }

  findSuppliers(): void {

    this.procurement.addUserMessage(
      'Yes, find approved suppliers.'
    );

    this.procurement.request.update(request => ({
      ...request,
      color: 'White',
    }));

    this.procurement.currentStage.set('supplier-search');

    setTimeout(() => {

      const request = this.procurement.request();

this.addAssistantMessageAndScroll(
  `I found 5 approved event-furniture suppliers near ${request.location}. I selected the 3 most suitable suppliers. Shall I send an RFQ?`
);

      this.addAssistantMessageAndScroll(
        'Send RFQ to the best three suppliers?',
        [
          {
            label: 'Send RFQ',
            value: 'send-rfq'
          }
        ]
      );

    }, 600);
  }

  private addAssistantMessageAndScroll(
  text: string,
  options?: { label: string; value: string }[]
): void {

  this.procurement.addAssistantMessage(text, options);

  this.scrollToBottom();
}

 scrollToBottom(): void {

  requestAnimationFrame(() => {

    requestAnimationFrame(() => {

      if (this.messagesContainer) {

        const element =
          this.messagesContainer.nativeElement;

        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        });
      }

    });

  });
}
}