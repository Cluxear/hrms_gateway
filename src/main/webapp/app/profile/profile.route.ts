import { Route } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CandidateResolve } from 'app/entities/userapp/candidate/candidate.route';
import { AccountService } from 'app/core/auth/account.service';
import { DashboardHRComponent } from 'app/home/dashboardHR.component';
import { UserDetailsComponent } from 'app/profile/userDetails.component';

export const PROFILE_ROUTE: Route = {
  path: 'profile',
  component: ProfileComponent,
  resolve: {
    candidate: CandidateResolve,
  },
  data: {
    authorities: [],
    pageTitle: 'profile.title',
  },
};
export const DASHBOARD_ROUTE: Route = {
  path: 'dashboard',
  component: DashboardHRComponent,
  resolve: {
    candidate: CandidateResolve,
  },
  data: {
    authorities: [],
    pageTitle: 'dashboard.title',
  },
};
export const USER_DETAILS_ROUTE: Route = {
  path: 'user_details/:id/:id2',
  component: UserDetailsComponent,
  resolve: {
    candidate: CandidateResolve,
  },
  data: {
    authorities: [],
    pageTitle: 'user-details.title',
  },
};
