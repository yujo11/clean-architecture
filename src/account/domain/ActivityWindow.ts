import { AccountId } from "./Account";
import { Activity } from "./Activity";
import { Money } from "./Money";

export class ActivityWindow {
  private activities: Activity[];

  constructor(activities: Activity[] | Activity) {
    if (Array.isArray(activities)) {
      this.activities = activities;
    } else {
      this.activities = [activities];
    }
  }

  getStartTimestamp(): Date {
    if (this.activities.length === 0) {
      throw new Error("No activities found");
    }
    return this.activities.reduce((earliest, activity) => {
      return earliest < activity.getTimestamp()
        ? earliest
        : activity.getTimestamp();
    }, this.activities[0].getTimestamp());
  }

  getEndTimestamp(): Date {
    if (this.activities.length === 0) {
      throw new Error("No activities found");
    }
    return this.activities.reduce((latest, activity) => {
      return latest > activity.getTimestamp()
        ? latest
        : activity.getTimestamp();
    }, this.activities[0].getTimestamp());
  }

  calculateBalance(accountId?: AccountId): Money {
    let depositBalance = Money.ZERO;
    let withdrawalBalance = Money.ZERO;

    for (let activity of this.activities) {
      if (activity.getOwnerAccountId() === accountId) {
        depositBalance = Money.add(depositBalance, activity.getMoney());
      }
      if (activity.getSourceAccountId() === accountId) {
        withdrawalBalance = Money.add(withdrawalBalance, activity.getMoney());
      }
    }

    return Money.add(depositBalance, withdrawalBalance.negate());
  }

  getActivities(): ReadonlyArray<Activity> {
    return this.activities;
  }

  addActivity(activity: Activity): void {
    this.activities.push(activity);
  }
}
