import Route from '@ember/routing/route';
import { A } from '@ember/array';

import Todo from '../models/todo';

export default Route.extend({
  model() {
    let brakes = Todo.create({
      title: 'Get brakes checked',
      dueDate: '2019-09-24',
      completed: false
    });

    let slides = Todo.create({
      title: 'Finish EmberCamp slides',
      dueDate: '2019-09-15',
      completed: false
    });

    let groceries = Todo.create({
      title: 'Buy groceries',
      dueDate: '2019-09-26',
      completed: false
    });

    let vacay = Todo.create({
      title: 'Book vacation',
      dueDate: '2019-09-17',
      completed: true
    });

    return A([brakes, slides, groceries, vacay]);
  }
});
