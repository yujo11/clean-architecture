import { AccountId } from "./Account";
import { Money } from "./Money";

export class Activity {
  private id?: ActivityId;
  private readonly ownerAccountId?: AccountId;
  private readonly sourceAccountId?: AccountId;
  private readonly targetAccountId?: AccountId;
  private readonly timestamp: Date;
  private readonly money: Money;

  constructor({
    ownerAccountId,
    sourceAccountId,
    targetAccountId,
    timestamp,
    money,
  }: {
    ownerAccountId?: AccountId;
    sourceAccountId?: AccountId;
    targetAccountId?: AccountId;
    timestamp: Date;
    money: Money;
  }) {
    this.ownerAccountId = ownerAccountId;
    this.sourceAccountId = sourceAccountId;
    this.targetAccountId = targetAccountId;
    this.timestamp = timestamp;
    this.money = money;
  }

  getId(): ActivityId | undefined {
    return this.id;
  }

  getOwnerAccountId(): AccountId | undefined {
    return this.ownerAccountId;
  }

  getSourceAccountId(): AccountId | undefined {
    return this.sourceAccountId;
  }

  getTargetAccountId(): AccountId | undefined {
    return this.targetAccountId;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }

  getMoney(): Money {
    return this.money;
  }
}

export class ActivityId {
  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}
