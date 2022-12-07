import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      todos: [],
    }
    this.onChange=this.onChange.bind(this);
    this.add = this.add.bind(this);
    this.sortTodo=this.sortTodo.bind(this);
    this.remove =this.remove.bind(this);
 

  }

  componentDidMount(){
    var current = this;
    var load = new XMLHttpRequest();
    load.onreadystatechange = function() {
      if (load.readyState === 4 && load.status === 200) {
        var todos = JSON.parse(load.responseText);
        console.log(todos);
        current.setState({todos: todos});
      } 
      else{
        console.log(load.responseText);
      }
    };
    load.open("GET", "https://cse204.work/todos");
    load.setRequestHeader("x-api-key", "3d3b6b-cbe564-ffd618-b64d7b-4af84e");
    load.send();
  }

  onChange(event) {
    var current = this;
    current.setState(
      {input: event.target.value}
    );
  }

  add(event) {
    var current = this;
    event.preventDefault();
    var data = {
      text: this.state.input
    }
    this.setState(
      {input: ''}
    );
    var newToList = new XMLHttpRequest();
    newToList.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        current.setState(
          {todos: [...current.state.todos, JSON.parse(this.responseText)]}
        );
      } 
      else {
        console.log(this.responseText);
      }
    };
    newToList.open("POST", "https://cse204.work/todos", true);
    newToList.setRequestHeader("x-api-key", "3d3b6b-cbe564-ffd618-b64d7b-4af84e");
    newToList.setRequestHeader("Content-type", "application/json");
    newToList.send(JSON.stringify(data));
  }

  sortTodo() {
    const sorting = this.state.todos;
    sorting.sort(function (a, b) {
      return a.text.localeCompare(b.text);
          
    })

    this.setState({todos: sorting});
  }

  remove(id) {
    var current = this;
    const final = current.state.todos.filter((todo) => 
      {if (todo.id != id) {
          return todo;
        }
      });
      current.setState(
        {todos: final}
      );
  } 

  render() {
    return (

      <div id = "allcontent">
        <span className="todobox">   
         <h1 id="name">Bella and Yinas Todo App</h1>
        <NewTodo add={this.add} input={this.state.input} onChange={this.onChange}/>
        <button id="sort" onClick={this.sortTodo} >Sort Alphabetically</button>
        </span>
        <ul id="todos">
          {this.state.todos.map((todo)=>
        <Todo key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} remove={this.remove}/>
        )}
        </ul>
    </div>

    );
  }
}

export default App;
