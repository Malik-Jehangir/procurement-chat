import { Component, inject } from '@angular/core';

import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Chat } from './components/chat/chat';
import { WorkflowProgress } from './components/workflow-progress/workflow-progress';
import { Records } from './components/records/records';
import { Dashboard } from './components/dashboard/dashboard';

import { ProcurementService } from './services/procurement';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Sidebar,
    Chat,
    WorkflowProgress,
    Records,
    Dashboard
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  procurement = inject(ProcurementService);

}