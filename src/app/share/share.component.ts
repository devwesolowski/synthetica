import {Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.less']
})
export class ShareComponent implements OnInit {
  currentUrl: string;
  @Input() articleTitle: string;

  constructor(private location: Location) {
  }

  ngOnInit() {
    this.currentUrl = this.location.prepareExternalUrl(this.location.path());
  }
}
