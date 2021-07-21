import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserFileData } from 'app/shared/model/userapp/user-file-data.model';
import {IUserDetails} from "../../../shared/model/userapp/cvUserDetails.model";
import {IUploadFileMessage} from "app/shared/model/userapp/upload.file.message.model";

type EntityResponseType = HttpResponse<IUserFileData>;
type EntityArrayResponseType = HttpResponse<IUserFileData[]>;

@Injectable({ providedIn: 'root' })
export class UserFileDataService {
  public resourceUrl = SERVER_API_URL + 'services/userapp/api/uploadedFiles';

  constructor(protected http: HttpClient) {}

  create(userFileData: IUserFileData): Observable<EntityResponseType> {
    return this.http.post<IUserFileData>(this.resourceUrl, userFileData, { observe: 'response' });
  }

  update(userFileData: IUserFileData): Observable<EntityResponseType> {
    return this.http.put<IUserFileData>(this.resourceUrl, userFileData, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserFileData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  downloadByFileName(fileName: string) : Observable<Blob> {

    return this.http.get(`${this.resourceUrl}/${fileName}`, {
      responseType: 'blob'
    });

  }

  findByCandidateId(id : String) : Observable<EntityArrayResponseType> {

    return this.http.get<IUserFileData[]>(`${this.resourceUrl}/user/${id}`, {  observe: 'response' });

  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserFileData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  uploadFileForCandidate(file: File, candidateId: string)  : Observable<HttpResponse<IUploadFileMessage>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('candidateId', candidateId);


    return this.http.post<IUploadFileMessage>(`${this.resourceUrl}`, formData, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
