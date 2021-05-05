import {Injectable} from "@angular/core";
import {SERVER_API_URL} from "../app/app.constants";
import {ISkill} from "../app/shared/model/skillapp/skill.model";
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {IUser} from "../app/core/user/user.model";

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  public resourceUrl = 'http://localhost:9080/auth/admin/master/console/#/realms/jhipster/users';


  constructor(protected http: HttpClient) {}


  create(user: IUser): Observable<HttpResponse<any>> {

    return this.http.post<ISkill>(this.resourceUrl, user, { observe: 'response' });
  }


}
