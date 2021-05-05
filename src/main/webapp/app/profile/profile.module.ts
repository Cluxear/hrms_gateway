import { NgModule } from '@angular/core';
import { HrmsGatewaySharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTE, PROFILE_ROUTE, USER_DETAILS_ROUTE } from './profile.route';
import { ProfileComponent } from './profile.component';
import { UserappCandidateModule } from 'app/entities/userapp/candidate/candidate.module';
import { DashboardHRComponent } from 'app/profile/dashboardHR.component';
import { UserDetailsComponent } from 'app/profile/userDetails.component';
import { SkillappSkillModule } from 'app/entities/skillapp/skill/skill.module';

@NgModule({
  imports: [
    HrmsGatewaySharedModule,
    RouterModule.forChild([PROFILE_ROUTE, DASHBOARD_ROUTE, USER_DETAILS_ROUTE]),
    UserappCandidateModule,
    SkillappSkillModule,
  ],
  declarations: [ProfileComponent, DashboardHRComponent, UserDetailsComponent],
  exports: [UserDetailsComponent],
})
export class HrmsGatewayProfileModule {}
