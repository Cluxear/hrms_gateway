import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import {RegisterComponent} from "./register.component";
import {REGISTER_ROUTE} from "./register.route";

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild([REGISTER_ROUTE])],
  declarations: [RegisterComponent],
})
export class HrmsGatewayRegisterModule {}
