import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _clipboard: Clipboard, private _snackBar: MatSnackBar) { }

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

    if (!this._jiraName || !this.selectedBranchType)
      return;

    this.branchName = this.selectedBranchType + '/' + this.getFormattedBranchName();
    this._clipboard.copy(this.branchName);
    this.openSnackBar();
  }

  private openSnackBar() {
    this._snackBar.open("Le nom de la branche a été copié dans le presse papier", null, {
      duration: 2000,
    });
  }

  private getFormattedBranchName(): string {

    var name = this._jiraName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/'/g, '-')
      .replace(/ /, '-')
      .replace(/\r/, '')
      .replace(/[^a-zA-Z0-9]/g, '-');

    var lines = name.split('\n');

    if (lines.length == 1)
      return this.removeDuplicateString(name, '--', '-');

    return lines[0] + '-' + this.removeDuplicateString(lines[1], '--', '-').toLocaleLowerCase()
  }

  private removeDuplicateString(value: string, search: string, replace: string): string {
    while (value.indexOf(search) >= 0)
      value = value.replace(search, replace);
    return value;
  }
}
