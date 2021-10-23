import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSelectMenu(url) {

    this.router.navigateByUrl(url);
  }

  // onClickLsnMall() {
  //   document.location.href = environment.lsnMallUrl;
  // }

  get innerWidth(): number {
    return window.innerWidth;
  } 

}
