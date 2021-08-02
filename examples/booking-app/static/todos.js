'use strict';

const e = React.createElement;

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoaded: false,
      items: [],
      status: 'all',
      edit: null,
      newTodo: ''
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewChange = this.handleNewChange.bind(this);
    this.loadTodos = this.loadTodos.bind(this);
    this.disableEdit = this.disableEdit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount() {
    this.loadTodos(this.state.status)
  }

  disableEdit(event) {
    if (this.state.edit !== null) {
      if (event.target && event.target.name && event.target.name.split('.')[0] === String(this.state.edit)) {
      } else {

        let item = this.state.items[this.state.edit]

        this.updateTodo({
          id: item.id,
          name: item.name
        })

        this.setState({ edit: null });
      }
    }
  }

  addTodo() {
    this.updateTodo({
      id: (Math.random() * 999999)|0,
      name: this.state.newTodo
    })

    this.setState({ newTodo: '' });
  }

  loadTodos(status) {

    if (status !== this.state.status) {
      this.setState({ status });
    }

    fetch("/todos?status="+status)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.items.map(item => item.value ? item.value : item)
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  updateTodo(data) {
    fetch("/todos/"+ data.id + "?status="+this.state.status, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items.map(item => item.value ? item.value : item)
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  deleteTodo(i) {

    fetch("/todos/"+ this.state.items[i].id + "?status="+this.state.status, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items.map(item => item.value ? item.value : item)
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleCheckbox(event) {
    const target = event.target;
    const index = target.name.split('.')[0];

    const item = this.state.items[index]

    this.updateTodo({
      id: item.id,
      status: target.checked ? 'complete' : 'incomplete',
      completed: target.checked ? new Date().toISOString() : null,
      duedate: item.duedate
    })

    let items = this.state.items
    items[index].status = target.checked ? 'complete' : 'incomplete'

    this.setState({ items });
  }

  handleChange(event) {
    const target = event.target;
    const index = target.name.split('.')[0];
    const field = target.name.split('.')[1];
    // this.setState({value: event.target.value});

    let items = this.state.items
    items[index][field] = event.target.value

    this.setState({ items });
  }

  handleNewChange(event) {
    this.setState({newTodo: event.target.value});
  }

  editDueDate(i) {
    if (i !== this.state.editDue) {
      this.setState({ editDue: i }); 
      const elem = document.querySelector('input[name="' + i + '.duedate"]');
      if (!elem.classList.contains('datepicker-input')) {
        const datepicker = new Datepicker(elem, {
          autohide: true,
          clearBtn: true
        });
        datepicker.show()

        let updateDueDate = (event) => {
          if (this.state.editDue !== null) {
            this.updateTodo({ 
              id: this.state.items[this.state.editDue].id,
              duedate: event.detail.date ? new Date(event.detail.date) : null,
              status: 'incomplete'
            })
            this.setState({ editDue: null });
            //elem.removeEventListener('changeDate',updateDueDate) 
            try { datepicker.destroy() } catch(e) {}
          }
        }

        elem.addEventListener('changeDate', (event) => updateDueDate(event));
      }
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div onClick={this.disableEdit}>
          <div>
            <button className={this.state.status === 'all' ? 'on' : ''} onClick={() => this.loadTodos('all')}>Show All</button>
            <button className={this.state.status === 'incomplete' ? 'on' : ''} onClick={() => this.loadTodos('incomplete')}>Show Incomplete</button>
            <button className={this.state.status === 'complete' ? 'on' : ''} onClick={() => this.loadTodos('complete')}>Show Completed</button>
          </div>
          { items.length > 0 ?
            <ul>
              {items.map((item,i) => (
                <li key={item.id}>
                  <input type="checkbox"
                    name={i+'.todo'}
                    checked={item.status === 'complete'}
                    onChange={this.handleCheckbox}
                  />
                  { this.state.edit === i ? 
                    <input type="text" name={i+'.name'} style={{width:'50%'}}
                      value={this.state.items[i].name}
                      onChange={this.handleChange}
                      onKeyDown={(e) => { e.key === 'Enter' ? this.disableEdit({}) : '' } } />
                    : <span 
                        onClick={() => this.setState({ edit: i }) } 
                        className={item.status === 'complete' ? 'complete' : ''}>{item.name}</span>
                  }
                  { item.status === 'complete' ?
                      <span className={'timeComplete'}>{item.completed ? new Date(item.completed).toLocaleString([],{year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}) : ''}</span>
                    :     
                      <input onClick={() => this.editDueDate(i) } 
                        type="text" 
                        name={i+'.duedate'}
                        className={'due'}
                        value={
                          item.duedate ? new Date(item.duedate).toLocaleDateString([],{year: 'numeric', month: 'numeric', day: 'numeric'})
                          : '[add due date]'
                        }
                        onChange={this.handleChange}
                      />
  
                   
                  }
                  <span className={'delete'} onClick={() => this.deleteTodo(i) }>❌</span>
                </li>
              ))}
            </ul>
          : <h3>There are currently no TODO items</h3>
        }

          <div style={{paddingTop:'1em'}}>
            <input type="text" name="todo" value={this.state.newTodo}
              style={{marginRight:'0.2em',width:'50%'}}
              onChange={this.handleNewChange}
              onKeyDown={(e) => { e.key === 'Enter' ? this.addTodo() : '' } } 
            />
            <button onClick={()=>this.addTodo()}>ADD TODO</button>
          </div>

          
        </div>
      );
    }
  } 
}

const domContainer = document.querySelector('#todo_container');
ReactDOM.render(e(Todos), domContainer);



 