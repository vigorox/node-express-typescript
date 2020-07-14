import moment from 'moment';

export class DateUtil {
  static sameDate = (date1: Date, date2: Date): boolean => {
    const t1 = moment(date1);
    const t2 = moment(date2);

    if (t1.diff(t2) === 0) {
      return true;
    } else {
      return false;
    }
  }
}
