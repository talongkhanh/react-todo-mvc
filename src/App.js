import React, { Component } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";

import shortid from "shortid";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 0,
            todos: [
                
            ],

        };
    }
    componentDidMount() {
        let todoItems = localStorage.getItem('todos');
        todoItems = JSON.parse(todoItems)
        if(todoItems) {
            this.setState({
            todos: todoItems
            })
        } else {
            this.setState({
                todos: []
            })
        }
        
    }
    componentDidUpdate() {
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }
    toggleCompleted = (todo) => {
        return (e) => {
            const { todos } = this.state;
            const index = todos.indexOf(todo.todo);
            this.setState({
                todos: [
                    ...todos.slice(0, index),
                    {
                        ...todo.todo,
                        isComplete: !todo.todo.isComplete,
                    },
                    ...todos.slice(index + 1),
                ],
            });
        };
    };

    deleteTodo = (todo) => {
        return (e) => {
            const { todos } = this.state;
            const index = todos.indexOf(todo.todo);
            this.setState({
                todos: [...todos.slice(0, index), ...todos.slice(index + 1)],
            });
            
        };
    };

    isAllComplete() {
        const { todos } = this.state;
        const isAllComplete = (todo) => todo.isComplete === true;

        return todos.every(isAllComplete);
    }

    checkCompleteAll = () => {
        const { todos } = this.state;

        const todosCompleted = todos.map((todo) =>
            !this.isAllComplete()
                ? { ...todo, isComplete: true }
                : { ...todo, isComplete: false }
        );
        this.setState({
            todos: todosCompleted,
        });
    };

    addNewTodo = (e) => {
        let content = e.target.value;
        content = content.trim();
        if (e.keyCode === 13 && content) {
            this.setState({
                todos: [
                    {
                        id: shortid.generate(),
                        content: content,
                        isComplete: false,
                        isEdit: false,
                    },
                    ...this.state.todos,
                ],
            });
            e.target.value = "";
        }
    };

    onEdit = (todo) => {
        return (e) => {
            const { todos } = this.state;
            const index = todos.indexOf(todo.todo);
            this.setState({
                todos: [
                    ...todos.slice(0, index),
                    {
                        ...todo.todo,
                        isEdit: !todo.todo.isEdit,
                    },
                    ...todos.slice(index + 1),
                ],
            });
        };
    };

    onBlur = (todo) => {
        return (e) => {
            e.preventDefault();
            const { todos } = this.state;
            const index = todos.indexOf(todo.todo);
            console.log(e.target.value);
            let content = e.target.value;
            content = content.trim();
            this.setState({
                todos: [
                    ...todos.slice(0, index),
                    {
                        ...todo.todo,
                        isEdit: false,
                        content: content,
                    },
                    ...todos.slice(index + 1),
                ],
            });
        };
    };

    onKeyDown = (todo) => {
        return (e) => {
            const { todos } = this.state;
            const index = todos.indexOf(todo.todo);
            if (e.keyCode === 13) {
                let content = e.target.value;
                content = content.trim();
                this.setState({
                    todos: [
                        ...todos.slice(0, index),
                        {
                            ...todo.todo,
                            isEdit: false,
                            content: content,
                        },
                        ...todos.slice(index + 1),
                    ],
                });
            } else console.log(e.target.value);
        };
    };

    clearCompleted = () => {
        const { todos } = this.state;
        const newList = todos.filter((todo) => todo.isComplete === false)
        this.setState({
            todos: newList
        })
    };

    filterAll = () => {
        this.setState({
            filter: 0
        })
    }

    filterActive = () => {
        this.setState({
            filter: 1
        })
    }

    filterCompleted = () => {
        this.setState({
            filter: 2
        })
    }

    render() {
        const todoList = [...this.state.todos].map((todo) => (
            <TodoItem
                key={todo.id}
                todo={todo}
                content={todo.content}
                isComplete={todo.isComplete}
                isEdit={todo.isEdit}
                toggleCompleted={this.toggleCompleted}
                deleteTodo={this.deleteTodo}
                onKeyDown={this.onKeyDown}
                onEdit={this.onEdit}
                onBlur={this.onBlur}
                filter={this.state.filter}
            />
        ));
        const todoListActive = [...this.state.todos].filter(todo =>todo.isComplete === false).map((todo) => (
            <TodoItem
                key={todo.id}
                todo={todo}
                content={todo.content}
                isComplete={todo.isComplete}
                isEdit={todo.isEdit}
                toggleCompleted={this.toggleCompleted}
                deleteTodo={this.deleteTodo}
                onKeyDown={this.onKeyDown}
                onEdit={this.onEdit}
                onBlur={this.onBlur}
                filter={this.state.filter}
            />
        ));
        const todoListCompled = [...this.state.todos].filter(todo =>todo.isComplete === true).map((todo) => (
            <TodoItem
                key={todo.id}
                todo={todo}
                content={todo.content}
                isComplete={todo.isComplete}
                isEdit={todo.isEdit}
                toggleCompleted={this.toggleCompleted}
                deleteTodo={this.deleteTodo}
                onKeyDown={this.onKeyDown}
                onEdit={this.onEdit}
                onBlur={this.onBlur}
                filter={this.state.filter}
            />
        ));

        return (
            <div className="todo-app">
                <div className="wrapper">
                    <Header />
                    <AddTodo
                        checkCompleteAll={this.checkCompleteAll}
                        todos={this.state.todos}
                        isAllComplete={this.isAllComplete()}
                        addNewTodo={this.addNewTodo}
                    />
                    {
                        this.state.filter === 0 && todoList
                    }
                    {
                        this.state.filter === 1 && todoListActive
                    }
                    {
                        this.state.filter === 2 && todoListCompled
                    }
                </div>
                {this.state.todos.length > 0 && 
                <Footer 
                todos={[...this.state.todos]}
                clearCompleted={this.clearCompleted}
                filterAll={this.filterAll}
                filterActive={this.filterActive}
                filterCompleted={this.filterCompleted} 
                filter={this.state.filter}
                />}
                <div className="infomation">
                    <p>Double click to edit</p>
                    <p>Coding by khanhta</p>
                    <p>completed in 2020-27-10</p>
                    <p>TodoMVC</p>
                </div>
            </div>
        );
    }
}

export default App;
