import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import {LoginComponent} from "./login.component";
import {LOGIN_ROUTE} from "./login.route";

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild([LOGIN_ROUTE])],
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ]
})
export class HrmsGatewayLoginModule {}
