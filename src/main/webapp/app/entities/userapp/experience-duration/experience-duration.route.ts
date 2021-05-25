import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExperienceDuration, ExperienceDuration } from 'app/shared/model/userapp/experience-duration.model';
import { ExperienceDurationService } from './experience-duration.service';
import { ExperienceDurationComponent } from './experience-duration.component';
import { ExperienceDurationDetailComponent } from './experience-duration-detail.component';
import { ExperienceDurationUpdateComponent } from './experience-duration-update.component';

@Injectable({ providedIn: 'root' })
export class ExperienceDurationResolve implements Resolve<IExperienceDuration> {
  constructor(private service: ExperienceDurationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExperienceDuration> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((experienceDuration: HttpResponse<ExperienceDuration>) => {
          if (experienceDuration.body) {
            return of(experienceDuration.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ExperienceDuration());
  }
}

export const experienceDurationRoute: Routes = [
  {
    path: '',
    component: ExperienceDurationComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappExperienceDuration.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExperienceDurationDetailComponent,
    resolve: {
      experienceDuration: ExperienceDurationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappExperienceDuration.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExperienceDurationUpdateComponent,
    resolve: {
      experienceDuration: ExperienceDurationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappExperienceDuration.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExperienceDurationUpdateComponent,
    resolve: {
      experienceDuration: ExperienceDurationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappExperienceDuration.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
