import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { EvaluationSheetComponent } from './evaluation-sheet.component';
import { EvaluationSheetDetailComponent } from './evaluation-sheet-detail.component';
import { EvaluationSheetUpdateComponent } from './evaluation-sheet-update.component';
import { EvaluationSheetDeleteDialogComponent } from './evaluation-sheet-delete-dialog.component';
import { evaluationSheetRoute } from './evaluation-sheet.route';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(evaluationSheetRoute)],
  declarations: [
    EvaluationSheetComponent,
    EvaluationSheetDetailComponent,
    EvaluationSheetUpdateComponent,
    EvaluationSheetDeleteDialogComponent,
  ],
  entryComponents: [EvaluationSheetDeleteDialogComponent],
})
export class InterviewappEvaluationSheetModule {}
