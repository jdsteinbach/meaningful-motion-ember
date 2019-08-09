import EmberObject, { computed }from '@ember/object';
import { guidFor } from '@ember/object/internals';
import moment from 'moment';

export default EmberObject.extend({
  title: '',

  completed: false,

  dueDate: '',

  uid: computed('title', function() {
    return guidFor(this);
  }),

  sortableDate: computed('dueDate', function() {
    return moment(this.dueDate).format();
  })
});
