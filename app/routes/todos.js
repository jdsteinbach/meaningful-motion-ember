import Route from '@ember/routing/route';
import { A } from '@ember/array';

import moment from 'moment';

import Todo from '../models/todo';

export default Route.extend({
  model() {
    let dog = Todo.create({
      title: 'Walk the dog',
      dueDate: moment('2019-8-4').utc()
    });

    let slides = Todo.create({
      title: 'Finish EmberCamp slides',
      dueDate: moment('2019-8-14').utc()
    });

    return A([dog, slides]);
  }
});
