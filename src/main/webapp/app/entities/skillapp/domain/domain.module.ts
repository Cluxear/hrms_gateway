import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { DomainComponent } from './domain.component';
import { DomainDetailComponent } from './domain-detail.component';
import { DomainUpdateComponent } from './domain-update.component';
import { DomainDeleteDialogComponent } from './domain-delete-dialog.component';
import { domainRoute } from './domain.route';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(domainRoute)],
  declarations: [DomainComponent, DomainDetailComponent, DomainUpdateComponent, DomainDeleteDialogComponent],
  entryComponents: [DomainDeleteDialogComponent],
})
export class SkillappDomainModule {}
