import {AfterViewInit, Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {PageService} from "../../service/page.service";
import {Router} from "@angular/router";
import {distinctUntilChanged} from "rxjs";
import {menuOptions} from "../../model/menu/menu-options";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  appName = environment.appName;
  menuOptions = menuOptions;
  opened = false;
  page = '';

  constructor(private pageService: PageService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.pageService.getHeader().pipe(
        distinctUntilChanged()
    ).subscribe(header => {
      this.page = header;
    });
  }

  ngAfterViewInit(): void {
  }
}
