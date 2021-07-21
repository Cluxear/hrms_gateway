import {Component, Input, OnInit} from "@angular/core";


@Component({
  selector: 'jhi-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {

  @Input() message = '';

  constructor() { }

  ngOnInit() : void {
  }
}
