import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

export default Component.extend({
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

    disableEditing() {
      this.set('isEditing', false);
    },

    editTodo() {
      this.editItem(this.todo);

      this.set('isEditing', false);
    },

    deleteTodo() {
      this.deleteItem(this.todo);
    }
  }
});
