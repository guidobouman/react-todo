/** @jsx React.DOM */

var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

var TodoApp = React.createClass({
  hasLocalstorage: ('localStorage' in window && window['localStorage'] !== null),

  getInitialState: function() {
    storedItems = this.hasLocalstorage ? JSON.parse(window.localStorage['todo_items']) : [];
    return {items: storedItems, text: ''};
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';

    if (this.hasLocalstorage)
      window.localStorage['todo_items'] = JSON.stringify(nextItems);

    this.setState({items: nextItems, text: nextText});
  },

  render: function() {
    return (
      <div>
        <h1>React ToDo</h1>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

React.renderComponent(
  <TodoApp />,
  document.body
);