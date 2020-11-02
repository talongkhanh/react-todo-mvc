import React, { Component } from 'react';

class AddTodo extends Component {
    render() {
        const { todos, isAllComplete, addNewTodo } = this.props
        const active = isAllComplete && 'active';

        return (
            <div className="add-todo">
                { todos.length > 0 && 
                <i className={`fas fa-chevron-down check-all ${active}`} 
                onClick={this.props.checkCompleteAll}></i> 
                } 
                <input 
                type="text" 
                placeholder="What needs to be done?" 
                autoFocus 
                onKeyDown = { addNewTodo }
                />
            </div>
        );
    }
}

export default AddTodo;