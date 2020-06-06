import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StringService } from '../services/string.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private stringService: StringService) { }

  private _selectedBranchType = 'feature';
  private _jiraName: string;
  public branchName = '';

  public branchTypes = ['feature', 'bugfix'];

  ngOnInit(): void {
  }

  public get selectedBranchType(): string {
    return this._selectedBranchType;
  }

  public set selectedBranchType(value: string) {
    this._selectedBranchType = value;
    this.buildBranchName();
  }

  public get jiraName(): string {
    return this._jiraName;
  }

  public set jiraName(value: string) {
    this._jiraName = value;
    this.buildBranchName();
  }

  private buildBranchName() {

    this.branchName = null;

    if (!this._jiraName || !this.selectedBranchType) {
      return;
    }

    this.branchName = this.selectedBranchType + '/' + this.getFormattedBranchName();
    this.clipboard.copy(this.branchName);
    this.openSnackBar();
  }

  private openSnackBar() {
    this.snackBar.open('Le nom de la branche a été copié dans le presse papier', null, {
      duration: 2000,
    });
  }

  private getFormattedBranchName(): string {
    const name = this.stringService.removeUnauthorizedCharacters(this._jiraName);
    const lines = name.split('\n');

    if (lines.length === 1) {
      return this.stringService.removeDuplicateString(name, '--', '-');
    }

    return lines[0] + '-' + this.stringService.removeDuplicateString(lines[1], '--', '-').toLocaleLowerCase();
  }
}
