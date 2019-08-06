import Component from '@ember/component';

export default Component.extend({
  tagName: 'li',
  classNames: ['todo-item'],
  classNameBindings: ['todo.completed:is-completed'],
  attributeBindings: ['todo.uid:data-uid'],
  actions: {
    updateTodo() {
      this.updateItem(this.todo);
    },
    editTodo() {
      this.editItem(this.todo);
    },
    deleteTodo() {
      this.deleteItem(this.todo);
    }
  }
});
