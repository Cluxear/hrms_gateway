import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAcademicExperience, AcademicExperience } from 'app/shared/model/userapp/academic-experience.model';
import { AcademicExperienceService } from './academic-experience.service';
import { AcademicExperienceComponent } from './academic-experience.component';
import { AcademicExperienceDetailComponent } from './academic-experience-detail.component';
import { AcademicExperienceUpdateComponent } from './academic-experience-update.component';

@Injectable({ providedIn: 'root' })
export class AcademicExperienceResolve implements Resolve<IAcademicExperience> {
  constructor(private service: AcademicExperienceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAcademicExperience> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((academicExperience: HttpResponse<AcademicExperience>) => {
          if (academicExperience.body) {
            return of(academicExperience.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AcademicExperience());
  }
}

export const academicExperienceRoute: Routes = [
  {
    path: '',
    component: AcademicExperienceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappAcademicExperience.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AcademicExperienceDetailComponent,
    resolve: {
      academicExperience: AcademicExperienceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappAcademicExperience.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AcademicExperienceUpdateComponent,
    resolve: {
      academicExperience: AcademicExperienceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappAcademicExperience.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AcademicExperienceUpdateComponent,
    resolve: {
      academicExperience: AcademicExperienceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappAcademicExperience.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
