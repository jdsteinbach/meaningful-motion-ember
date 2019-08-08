import Controller from '@ember/controller';
import { computed, set } from '@ember/object';

import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';
import { parallel } from 'ember-animated';

import moment from 'moment';

import Todo from '../models/todo';

export default Controller.extend({
  outstandingItems: computed('model.@each.completed', function() {
    return this.model.filterBy('completed', false).sortBy('dueDate');
  }),

  completedItems: computed('model.@each.completed', function() {
    return this.model.filterBy('completed', true).sortBy('dueDate');
  }),

  actions: {
    addTodo(todo) {
      let newTodo = Todo.create({
        title: todo.title,
        dueDate: moment(todo.dueDate).utc().format()
      });

      this.model.pushObject(newTodo);
      return this.model.sortBy('dueDate');
    },

    toggleCompleted(todo) {
      let toggledTodo = this.model.findBy('uid', todo.uid);

      set(toggledTodo, 'completed', !toggledTodo.completed);
    },

    editTodo(todo) {
      let editedTodo = this.model.findBy('uid', todo.uid);

      Object.keys(todo).map(k => {
        this.set(editedTodo, k, todo[k]);
      });
    },

    deleteTodo(todo) {
      this.model.removeObject(todo);
    }
  },

  slideItems: function * (context) {
    let {
      beacons,
      keptSprites,
      insertedSprites,
      receivedSprites,
      removedSprites,
      sentSprites
    } = context;

    insertedSprites.forEach(sprite => {
      sprite.startAtSprite(beacons.add);
      parallel(move(sprite));
    });

    sentSprites.forEach(sprite => {
      parallel(move(sprite), scale(sprite));
    });

    keptSprites.forEach(sprite => {
      parallel(move(sprite), scale(sprite));
    });

    receivedSprites.forEach(sprite => {
      sprite.moveToFinalPosition();
    });

    removedSprites.forEach(sprite => {
      sprite.endAtSprite(beacons.trash);
      move(sprite);
    });

    yield;
  }
});
