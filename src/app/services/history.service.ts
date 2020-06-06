import { Injectable } from '@angular/core';
import { BranchNameHistory } from './history';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private storageKey = 'history_key';

  private historyItems: Array<BranchNameHistory>;

  constructor() { }

  public addBranchName(branchName: string) {
    this.ensureHistoryItems();
    this.historyItems.unshift(new BranchNameHistory(branchName));
    this.saveHistoryItems();
  }

  public getHistory(): Array<BranchNameHistory> {
    this.ensureHistoryItems();
    return this.historyItems;
  }

  private ensureHistoryItems() {
    if (this.historyItems) {
      return;
    }

    const json = localStorage.getItem(this.storageKey);
    if (!json) {
      this.historyItems = new Array<BranchNameHistory>();
    }

    this.historyItems = JSON.parse(json);
  }

  private saveHistoryItems() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.historyItems));
  }
}
