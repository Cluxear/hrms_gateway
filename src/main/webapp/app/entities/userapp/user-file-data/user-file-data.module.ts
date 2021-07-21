import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { UserFileDataComponent } from './user-file-data.component';
import { UserFileDataDetailComponent } from './user-file-data-detail.component';
import { UserFileDataUpdateComponent } from './user-file-data-update.component';
import { UserFileDataDeleteDialogComponent } from './user-file-data-delete-dialog.component';
import { userFileDataRoute } from './user-file-data.route';
import {UserFileDataListComponent} from "./user-file-data-list.component";

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(userFileDataRoute)],
  declarations: [ UserFileDataComponent, UserFileDataDetailComponent, UserFileDataUpdateComponent, UserFileDataDeleteDialogComponent],
  entryComponents: [UserFileDataDeleteDialogComponent],
  exports: [
    UserFileDataListComponent
  ]
})
export class UserappUserFileDataModule {}
