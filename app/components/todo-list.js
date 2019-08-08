import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'ul',

  classNames: 'todo-list',

  attributeBindings: ['totalItems:data-count'],

  totalItems: computed('items', function() {
    return this.items.length;
  })
});
