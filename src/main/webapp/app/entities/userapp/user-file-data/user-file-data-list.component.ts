import {Component, Input, OnInit} from "@angular/core";
import moment from "moment/moment";
import {UserFileDataService} from "./user-file-data.service";
import {ActivatedRoute} from "@angular/router";
import {IUserFileData} from "../../../shared/model/userapp/user-file-data.model";
import { saveAs } from 'file-saver';

@Component({
  selector: 'jhi-user-file-list',
  templateUrl: './user-file-data-list.component.html',
})
export class UserFileDataListComponent implements OnInit {

  userFileList? : IUserFileData[];
  @Input() userId?: string;

  constructor(private activatedRoute: ActivatedRoute, private userFileService: UserFileDataService) {
  }

  ngOnInit() : void {
    console.log( " inside userFile list ");

    this.activatedRoute.params.subscribe( (params) => {
      if(params.userId) {
        const userId = params.userId;
        this.userFileService.findByCandidateId(userId).subscribe(res => {

             this.userFileList =  res.body || [];
        })
      }
      else if(this.userId !== undefined) {
        this.userFileService.findByCandidateId(this.userId).subscribe(res => {

          this.userFileList =  res.body || [];
        })
      }
    })
  }
  downloadFile(filename: string) : void {
    this.userFileService.
    downloadByFileName(filename).subscribe(blob =>{
      saveAs(blob, filename);

    })
  }
}
