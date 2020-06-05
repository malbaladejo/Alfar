import { Component } from '@angular/core';
import { faQuestionCircle, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngMalJiraBranchName';
  isSideNavOpened = false;
  faQuestionCircle = faQuestionCircle;
  faHome = faHome;

  toggleSideNav() {
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  navigateTo() {
    this.isSideNavOpened = false;
  }
}
