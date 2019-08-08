import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

export default Component.extend({
  tagName: 'li',

  classNames: ['todo-item'],

  classNameBindings: [
    'todo.completed:is-completed',
    'isActionsOpen:is-actions-open',
    'isEditing',
    'isOverdue'
  ],

  attributeBindings: ['todo.uid:data-uid'],

  isActionsOpen: false,

  isEditing: false,

  isOverdue: computed('todo.{dueDate,completed}', function() {
    return (new Date(this.todo.dueDate) < new Date()) && !this.todo.completed;
  }),

  actions: {
    updateTodo() {
      this.updateItem(this.todo);
    },

    toggleEditing() {
      this.setProperties({
        'isEditing': true,
        'isActionsOpen': false
      });

      run(function() {
        document.getElementById('title').focus();
      });
    },

    editTodo() {
      this.editItem(this.todo);
      this.set('isEditing', false);
    },

    deleteTodo() {
      this.deleteItem(this.todo);
    },

    toggleActions() {
      this.set('isActionsOpen', !this.isActionsOpen);
    }
  }
});
