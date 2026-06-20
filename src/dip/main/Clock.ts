export class Clock {
  public monthDay(): { month: number; day: number } {
    const now = new Date();
    return {
      month: now.getMonth() + 1, // JavaScript months are 0-indexed
      day: now.getDate()
    };
  }
}
