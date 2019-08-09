import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

import Changeset from 'ember-changeset';

export default Component.extend({
  init() {
    this._super(...arguments);

    this.changeset = new Changeset(this.todo);
  },

  tagName: 'li',

  classNames: ['todo-item'],

  classNameBindings: [
    'todo.completed:is-completed',
    'isEditing',
    'isOverdue'
  ],

  attributeBindings: ['todo.uid:data-uid'],

  isEditing: false,

  isOverdue: computed('todo.{dueDate,completed}', function() {
    return (new Date(this.todo.dueDate) < new Date()) && !this.todo.completed;
  }),

  actions: {
    toggleTodoCompleted() {
      this.updateItem(this.todo);
    },

    enableEditing() {
      this.set('isEditing', true);

      run.scheduleOnce('afterRender', this, function() {
        document.getElementById(`title-${this.todo.uid}`).focus();
      });
    },

    cancelEditing() {
      this.changeset.rollback();

      this.set('isEditing', false);
    },

    editTodo() {
      this.changeset.save();

      this.editItem(this.todo);

      this.set('isEditing', false);
    },

    deleteTodo() {
      this.deleteItem(this.todo);
    }
  }
});
