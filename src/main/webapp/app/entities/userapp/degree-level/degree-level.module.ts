import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { DegreeLevelComponent } from './degree-level.component';
import { DegreeLevelDetailComponent } from './degree-level-detail.component';
import { DegreeLevelUpdateComponent } from './degree-level-update.component';
import { DegreeLevelDeleteDialogComponent } from './degree-level-delete-dialog.component';
import { degreeLevelRoute } from './degree-level.route';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(degreeLevelRoute)],
  declarations: [DegreeLevelComponent, DegreeLevelDetailComponent, DegreeLevelUpdateComponent, DegreeLevelDeleteDialogComponent],
  entryComponents: [DegreeLevelDeleteDialogComponent],
})
export class UserappDegreeLevelModule {}
