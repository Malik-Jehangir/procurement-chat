import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowProgress } from './workflow-progress';

describe('WorkflowProgress', () => {
  let component: WorkflowProgress;
  let fixture: ComponentFixture<WorkflowProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowProgress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
