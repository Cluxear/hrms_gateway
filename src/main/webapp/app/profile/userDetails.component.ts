import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { Candidate, ICandidate } from 'app/shared/model/userapp/candidate.model';
import {UserService} from "app/core/user/user.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'jhi-user-details',
  templateUrl: './userDetails.component.html',
})
export class UserDetailsComponent implements OnInit {
  candidate: ICandidate = new Candidate();
  showUploads = false;
  image : any;
  isImageLoading?: boolean;
  safeImage?: SafeUrl ;
  appId? : number;
  constructor(private readonly sanitizer: DomSanitizer, protected userService: UserService, protected activatedRoute: ActivatedRoute, protected accountService: AccountService, protected route: Router) {}

  ngOnInit(): void {
    // TODO: fetch candidate or employee based on user Role.
    this.activatedRoute.params.subscribe(params => this.appId = params.id2)
    this.activatedRoute.data.subscribe(({ candidate }) => {
      this.candidate = candidate;
      const mediaType = 'application/image';
      this.userService.getImage(this.candidate.id!).subscribe(data => {
     //   const blob = new Blob([data], { type: mediaType });
     /*   const objectURL = URL.createObjectURL(data);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);*/
        this.createImageFromBlob(data);


        console.log(this.image);
        this.isImageLoading = false;


      }, error => {
        this.isImageLoading = false;
        console.log(error);
      })
    });



    /* this.activatedRoute.params.subscribe(params => {
      const urlParams = Object.assign({}, params);
      delete urlParams.login;
      urlParams.login = this.accountService.getLogin();
      this.route.navigate([], { relativeTo: this.activatedRoute, queryParams: urlParams });

    })
*/
  }
  export() : void {
    this.userService.exportUserToExcel(this.candidate.id!).subscribe(blob  => saveAs(blob) );
  }
  createImageFromBlob(image: Blob) : void {
    if (image && image.size > 0) {
      console.log("image exists" + image.arrayBuffer())
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        this.image = reader.result;

        console.log(" inside reader" + this.image.toString());
      }, false);
if( image ) {
  reader.readAsDataURL(image);

}
    } /*else {
    } */


  }
}
