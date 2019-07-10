import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['new-todo'],
  classNameBindings: ['isOpen'],
  isOpen: false,
  actions: {
    toggleIsOpen() {
      return !this.isOpen;
    }
  }
});
