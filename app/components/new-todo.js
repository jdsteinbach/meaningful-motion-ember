import Component from '@ember/component';

export default Component.extend({
  classNames: ['new-todo'],
  classNameBindings: ['isOpen'],
  isOpen: false,
  actions: {
    toggleIsOpen() {
      return !this.isOpen;
    }
  }
});
