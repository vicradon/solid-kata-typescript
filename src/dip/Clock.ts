import { MonthDay } from './MonthDay';

export class Clock {
  monthDay(): MonthDay {
    const today = new Date();
    return new MonthDay(today.getMonth() + 1, today.getDate());
  }
}
