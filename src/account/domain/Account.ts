import { Money } from "./Money";
import { ActivityWindow } from "./ActivityWindow";
import { Activity } from "./Activity";

export class Account {
  private readonly id?: AccountId;
  private readonly baselineBalance: Money;
  private readonly activityWindow: ActivityWindow;

  private constructor(
    id: AccountId | undefined,
    baselineBalance: Money,
    activityWindow: ActivityWindow,
  ) {
    this.id = id;
    this.baselineBalance = baselineBalance;
    this.activityWindow = activityWindow;
  }

  public static withoutId(
    baselineBalance: Money,
    activityWindow: ActivityWindow,
  ): Account {
    return new Account(undefined, baselineBalance, activityWindow);
  }

  public static withId(
    accountId: AccountId,
    baselineBalance: Money,
    activityWindow: ActivityWindow,
  ): Account {
    return new Account(accountId, baselineBalance, activityWindow);
  }

  getId(): AccountId | undefined {
    return this.id;
  }

  getBaselineBalance(): Money {
    return this.baselineBalance;
  }

  getActivityWindow(): ActivityWindow {
    return this.activityWindow;
  }

  calculateBalance(): Money {
    return Money.add(
      this.baselineBalance,
      this.activityWindow.calculateBalance(this.id),
    );
  }

  withdraw(money: Money, targetAccountId: AccountId): boolean {
    if (!this.mayWithdraw(money)) {
      return false;
    }

    const withdrawal = new Activity({
      ownerAccountId: this.id,
      targetAccountId,
      sourceAccountId: this.id,
      timestamp: new Date(),
      money,
    });

    this.activityWindow.addActivity(withdrawal);
    return true;
  }

  private mayWithdraw(money: Money): boolean {
    return Money.add(
      this.calculateBalance(),
      money.negate(),
    ).isPositiveOrZero();
  }

  deposit(money: Money, sourceAccountId: AccountId): boolean {
    const deposit = new Activity({
      ownerAccountId: this.id,
      sourceAccountId,
      targetAccountId: this.id,
      timestamp: new Date(),
      money,
    });

    this.activityWindow.addActivity(deposit);
    return true;
  }
}

export class AccountId {
  private readonly value?: number;

  constructor(value?: number) {
    this.value = value;
  }

  getValue(): number | undefined {
    return this.value;
  }
}
