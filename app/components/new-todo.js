import Component from '@ember/component';

export default Component.extend({
  classNames: ['new-todo'],
  classNameBindings: ['isOpen'],
  isOpen: false,
  actions: {
    toggleIsOpen() {
      this.set('isOpen', !this.isOpen);
    },
    addTodo(e) {
      e.preventDefault();

      this.addTodo({
        title: this.title,
        dueDate: this.dueDate
      });

      this.setProperties({
        title: undefined,
        dueDate: undefined
      });

      this.set('isOpen', false);
    }
  }
});
