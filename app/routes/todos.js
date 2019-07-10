import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { A } from '@ember/array';

let ToDo = EmberObject.extend({
  title: '',
  completed: false
})

export default Route.extend({
  model() {
    return A([
      ToDo.create({
        title: 'Walk the dog'
      }),
      ToDo.create({
        title: 'Finish EmberCamp slides'
      })
    ]);
  }
});
