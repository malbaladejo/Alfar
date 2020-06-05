export class BranchNameHistory {
    constructor(public branchName: string = null, public date: Date = null, ) {
        if (!date)
            this.date = new Date();
    }
}