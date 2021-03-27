import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { UserApplicationComponent } from './user-application.component';
import { UserApplicationDetailComponent } from './user-application-detail.component';
import { UserApplicationUpdateComponent } from './user-application-update.component';
import { UserApplicationDeleteDialogComponent } from './user-application-delete-dialog.component';
import { userApplicationRoute } from './user-application.route';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(userApplicationRoute)],
  declarations: [
    UserApplicationComponent,
    UserApplicationDetailComponent,
    UserApplicationUpdateComponent,
    UserApplicationDeleteDialogComponent,
  ],
  entryComponents: [UserApplicationDeleteDialogComponent],
})
export class DataappUserApplicationModule {}
