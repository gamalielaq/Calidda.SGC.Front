import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee, faReply } from '@fortawesome/free-solid-svg-icons';
import { headerService } from 'src/app/services/header.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faReply = faReply;
  visibleSidebar: boolean = true;
  menuItems: any[];
  userId: number = 1;

  constructor(
    public headerService: headerService,
    public routing: Router
  ) { }

  ngOnInit(): void {
    this.headerService.sidenav$.subscribe(res => {
      this.visibleSidebar = res;
    });
    this.headerService.userId$.subscribe(res => {
      this.userId = res;
      this.loadData();
    });
    this.loadData();
  }

  loadData() {
    switch (this.userId) {
      case 1:
        this.menuItems = Constant.AdminMenuItems;
        break;
      case 2:
        this.menuItems = Constant.SecretaryMenuItems;
        break;
      default:
        this.menuItems = Constant.AdminMenuItems;
        break;
    }
  }

  profile() {
    this.routing.navigate(['manager/profile']);
  }


}

export class Constant {
  static AdminMenuItems = [
    { routing: '/manager/dashboard', label: 'Inicio', icon:'home' },
    { routing: '/manager/comites', label: 'Comités', icon:'article' },
    { routing: '/manager/dashboard', label: 'Firmas', icon:'assessment' },
    { routing: '/manager/mantenimiento', label: 'Mantenimiento', icon:'build'  }
  ]
  static SecretaryMenuItems = [
    { routing: '/secretary/dashboard', label: 'Inicio', icon:'home' },
    { routing: '/secretary/comites', label: 'Comités', icon:'article' },
    { routing: '/secretary/dashboard', label: 'Firmas', icon:'assessment' },
    { routing: '/secretary/mantenimiento', label: 'Mantenimiento', icon:'build'  },
    { routing: '/secretary/mantenimiento', label: 'Atención de compromisos', icon:''}
  ]
}
