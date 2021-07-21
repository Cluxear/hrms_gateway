import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEvaluationSheet, EvaluationSheet } from 'app/shared/model/interviewapp/evaluation-sheet.model';
import { EvaluationSheetService } from './evaluation-sheet.service';
import { EvaluationSheetComponent } from './evaluation-sheet.component';
import { EvaluationSheetDetailComponent } from './evaluation-sheet-detail.component';
import { EvaluationSheetUpdateComponent } from './evaluation-sheet-update.component';

@Injectable({ providedIn: 'root' })
export class EvaluationSheetResolve implements Resolve<IEvaluationSheet> {
  constructor(private service: EvaluationSheetService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEvaluationSheet> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((evaluationSheet: HttpResponse<EvaluationSheet>) => {
          if (evaluationSheet.body) {
            return of(evaluationSheet.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EvaluationSheet());
  }
}

export const evaluationSheetRoute: Routes = [
  {
    path: '',
    component: EvaluationSheetComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.interviewappEvaluationSheet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EvaluationSheetDetailComponent,
    resolve: {
      evaluationSheet: EvaluationSheetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.interviewappEvaluationSheet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EvaluationSheetUpdateComponent,
    resolve: {
      evaluationSheet: EvaluationSheetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.interviewappEvaluationSheet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EvaluationSheetUpdateComponent,
    resolve: {
      evaluationSheet: EvaluationSheetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.interviewappEvaluationSheet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
