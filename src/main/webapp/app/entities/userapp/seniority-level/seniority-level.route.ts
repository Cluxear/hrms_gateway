import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISeniorityLevel, SeniorityLevel } from 'app/shared/model/userapp/seniority-level.model';
import { SeniorityLevelService } from './seniority-level.service';
import { SeniorityLevelComponent } from './seniority-level.component';
import { SeniorityLevelDetailComponent } from './seniority-level-detail.component';
import { SeniorityLevelUpdateComponent } from './seniority-level-update.component';

@Injectable({ providedIn: 'root' })
export class SeniorityLevelResolve implements Resolve<ISeniorityLevel> {
  constructor(private service: SeniorityLevelService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISeniorityLevel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((seniorityLevel: HttpResponse<SeniorityLevel>) => {
          if (seniorityLevel.body) {
            return of(seniorityLevel.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SeniorityLevel());
  }
}

export const seniorityLevelRoute: Routes = [
  {
    path: '',
    component: SeniorityLevelComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappSeniorityLevel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SeniorityLevelDetailComponent,
    resolve: {
      seniorityLevel: SeniorityLevelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappSeniorityLevel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SeniorityLevelUpdateComponent,
    resolve: {
      seniorityLevel: SeniorityLevelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappSeniorityLevel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SeniorityLevelUpdateComponent,
    resolve: {
      seniorityLevel: SeniorityLevelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappSeniorityLevel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
