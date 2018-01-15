import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { fetchTodos } from './index'

const Todos = ({ todos, ...rest }) => {
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            Title: {todo.title}, 
            Author: {todo.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

const enhancer = compose(
  connect(({ todos }) => todos, { fetchTodos: fetchTodos }),
  lifecycle({
    componentDidMount() {
      this.props.fetchTodos()
    }
  })
);

export default enhancer(Todos);
