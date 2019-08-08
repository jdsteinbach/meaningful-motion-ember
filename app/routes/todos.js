import Route from '@ember/routing/route';
import { A } from '@ember/array';

import moment from 'moment';

import Todo from '../models/todo';

export default Route.extend({
  model() {
    let brakes = Todo.create({
      title: 'Get brakes checked',
      dueDate: moment('2019-09-24').utc().format()
    });

    let slides = Todo.create({
      title: 'Finish EmberCamp slides',
      dueDate: moment('2019-09-15').utc().format()
    });

    let groceries = Todo.create({
      title: 'Buy groceries',
      dueDate: moment('2019-08-06').utc().format()
    });

    let vacay = Todo.create({
      title: 'Book vacation',
      dueDate: moment('2019-09-17').utc().format()
    });

    return A([brakes, slides, groceries, vacay]);
  }
});
