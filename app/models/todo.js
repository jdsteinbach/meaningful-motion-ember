import EmberObject, { computed }from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default EmberObject.extend({
  title: '',
  completed: false,
  dueDate: '',
  uid: computed('title', function() {
    return guidFor(this);
  })
});
