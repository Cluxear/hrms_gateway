import { NgModule } from '@angular/core';
import { HrmsGatewaySharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import {DashboardHRComponent} from "app/home/dashboardHR.component";
import {RouterModule} from "@angular/router";
import {FilterPipe} from "app/shared/util/filter.pipe";
import {UserFileDataListComponent} from "app/entities/userapp/user-file-data/user-file-data-list.component";

@NgModule({
  imports: [HrmsGatewaySharedLibsModule, RouterModule],
  declarations: [FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, HasAnyAuthorityDirective, DashboardHRComponent, UserFileDataListComponent ],
  exports: [HrmsGatewaySharedLibsModule, FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, HasAnyAuthorityDirective, DashboardHRComponent, UserFileDataListComponent],
})
export class HrmsGatewaySharedModule {}
