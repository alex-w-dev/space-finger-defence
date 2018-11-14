import { Subject } from 'rxjs';

export default class Events {
  afterGameStatusChange = new Subject();
}