import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserInterview, UserInterview } from 'app/shared/model/dataapp/user-interview.model';
import { UserInterviewService } from './user-interview.service';
import { UserInterviewComponent } from './user-interview.component';
import { UserInterviewDetailComponent } from './user-interview-detail.component';
import { UserInterviewUpdateComponent } from './user-interview-update.component';

@Injectable({ providedIn: 'root' })
export class UserInterviewResolve implements Resolve<IUserInterview> {
  constructor(private service: UserInterviewService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserInterview> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userInterview: HttpResponse<UserInterview>) => {
          if (userInterview.body) {
            return of(userInterview.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserInterview());
  }
}

export const userInterviewRoute: Routes = [
  {
    path: '',
    component: UserInterviewComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.dataappUserInterview.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserInterviewDetailComponent,
    resolve: {
      userInterview: UserInterviewResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.dataappUserInterview.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserInterviewUpdateComponent,
    resolve: {
      userInterview: UserInterviewResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.dataappUserInterview.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserInterviewUpdateComponent,
    resolve: {
      userInterview: UserInterviewResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.dataappUserInterview.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
