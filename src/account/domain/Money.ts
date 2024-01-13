import bigInt, { BigInteger } from "big-integer";

export class Money {
  private readonly amount: BigInteger;

  private constructor(amount: BigInteger) {
    this.amount = amount;
  }

  public static ZERO: Money = new Money(bigInt(0));

  public static of(value: number): Money {
    return new Money(bigInt(value));
  }

  public isPositiveOrZero(): boolean {
    return this.amount.compare(0) >= 0;
  }

  public isNegative(): boolean {
    return this.amount.compare(0) < 0;
  }

  public isPositive(): boolean {
    return this.amount.compare(0) > 0;
  }

  public isGreaterThanOrEqualTo(money: Money): boolean {
    return this.amount.compare(money.amount) >= 0;
  }

  public isGreaterThan(money: Money): boolean {
    return this.amount.compare(money.amount) > 0;
  }

  public static add(a: Money, b: Money): Money {
    return new Money(a.amount.add(b.amount));
  }

  public minus(money: Money): Money {
    return new Money(this.amount.subtract(money.amount));
  }

  public plus(money: Money): Money {
    return new Money(this.amount.add(money.amount));
  }

  public static subtract(a: Money, b: Money): Money {
    return new Money(a.amount.subtract(b.amount));
  }

  public negate(): Money {
    return new Money(this.amount.negate());
  }
}
