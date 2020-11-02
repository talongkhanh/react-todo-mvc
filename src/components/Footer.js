import React, { Component } from 'react';

class Footer extends Component {
    render() {
        const item = this.props.todos.filter((todo) => todo.isComplete === false).length;
        const hasClear = this.props.todos.filter((todo) => todo.isComplete === true).length;
        const { clearCompleted, filterAll, filterActive, filterCompleted, filter } = this.props;
        const filterAllClasses = filter===0 ? 'footer-filter-all actived-filter' : 'footer-filter-all'
        const filterActiveClasses = filter===1 ? 'footer-filter-active actived-filter' : 'footer-filter-active'
        const filterCompletedClasses = filter===2 ? 'footer-filter-completed actived-filter' : 'footer-filter-completed'
        return (
            <div className="footer">
                <div className="footer-item-left">{ item } item left</div>
                <div className="footer-filter"> 
                    <span className={filterAllClasses} onClick={filterAll}>All</span>
                    <span className={filterActiveClasses} onClick={filterActive}>Active</span>
                    <span className={filterCompletedClasses} onClick={filterCompleted}>Completed</span>
                </div>
                {
                    hasClear > 0 && 
                    <div className="footer-clear-completed" 
                    onClick={clearCompleted}>Clear completed</div>
                }
            </div>
        );
    }
}

export default Footer;