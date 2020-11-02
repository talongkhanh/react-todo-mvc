import React, { PureComponent } from 'react';
import classNames from 'classnames'

class TodoItem extends PureComponent {

    render() {
        const { todo, content, isComplete, isEdit} = this.props;
        const todoContentClasses = classNames('content', {completed: isComplete});
        const todoItemClasses = classNames('todo-item', {editting: isEdit});
        return (
            <div className={todoItemClasses}>
                <div className="left" onClick={this.props.toggleCompleted({todo})}>
                    {
                        isComplete ? <i className="fas fa-check-circle check-complete"></i> :
                        <div className="check-active"></div>
                    }
                </div>
                <div className={todoContentClasses} onDoubleClick={this.props.onEdit({todo})}>
                    {
                        !isEdit && content 
                    }
                    {
                        
                        isEdit && <input className="edit-todo" type="text" 
                        defaultValue={content} autoFocus 
                        onKeyDown={this.props.onKeyDown({todo})}
                        onBlur={this.props.onBlur({todo})}
                        />
                    }
                </div>
                <div className="right" onClick={this.props.deleteTodo({todo})}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
        );
    }
}

export default TodoItem;