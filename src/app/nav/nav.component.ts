import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})

export class NavComponent implements OnInit {
  @ViewChild('navWrapper') navWrapper: ElementRef;
  showButton = true;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    //subscribes to observable to check if router is on create page, and hides button via ngIf
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showButton = this.router.url !== '/create';
      }
    });
  }

  //Listener for scroll to trigger a class and animation, with certain offset. MAY REMOVE....
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const header = this.navWrapper.nativeElement;
  //   const scrollTop = window.scrollY  - 140;
  //
  //   if (scrollTop > header.offsetTop) {
  //     this.renderer.addClass(header, 'is-fixed');
  //   } else {
  //     this.renderer.removeClass(header, 'is-fixed');
  //   }
  // }

  onButtonClick() {
    this.router.navigate(['/create']);
  }
}
