import {Component, Input} from '@angular/core';
import {Author} from "../interfaces/author";

@Component({
  selector: 'app-about-author',
  templateUrl: './about-author.component.html',
  styleUrls: ['./about-author.component.less']
})
export class AboutAuthorComponent {
  @Input() author?: Author;
}
