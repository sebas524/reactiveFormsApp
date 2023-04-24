import { Component } from '@angular/core';

interface Options {
  title: string;
  route: string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [],
})
export class SideMenuComponent {
  public reactiveMenu: Options[] = [
    {
      title: 'basic',
      route: './reactive/basic',
    },
    {
      title: 'dynamic',
      route: './reactive/dynamic',
    },
    {
      title: 'switches',
      route: './reactive/switches',
    },
  ];

  public authMenu: Options[] = [
    {
      title: 'register',
      route: './auth/register',
    },
  ];
}
