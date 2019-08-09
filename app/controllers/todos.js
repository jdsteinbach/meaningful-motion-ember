import Controller from '@ember/controller';
import { computed } from '@ember/object';

import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';
import { parallel } from 'ember-animated';

import moment from 'moment';

import Todo from '../models/todo';

export default Controller.extend({
  outstandingItems: computed('model.@each.{dueDate,completed}', function() {
    return this.model
      .filterBy('completed', false)
      .sortBy('sortableDate');
  }),

  completedItems: computed('model.@each.{dueDate,completed}', function() {
    return this.model
      .filterBy('completed', true)
      .sortBy('sortableDate');
  }),

  actions: {
    addTodo(todo) {
      let newTodo = Todo.create({
        title: todo.title,
        dueDate: moment(todo.dueDate).utc().format('YYYY-MM-DD'),
        completed: false
      });

      this.model.pushObject(newTodo);
    },

    toggleCompleted(todo) {
      let toggledTodo = this.model.findBy('uid', todo.uid);

      toggledTodo.set('completed', !toggledTodo.completed);
    },

    editTodo(todo) {
      let editedTodo = this.model.findBy('uid', todo.uid);

      editedTodo.setProperties({
        title: todo.get('title'),
        dueDate: moment(todo.get('dueDate')).utc().format('YYYY-MM-DD')
      });
    },

    deleteTodo(todo) {
      if(confirm(`Delete “${todo.title}?”`)) {
        this.model.removeObject(todo);
      }
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
