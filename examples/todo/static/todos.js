"use strict";

const formatDate = (date) =>
  new Date(date).toLocaleDateString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
const Spinner = ({ width = 30, height = 30 }) => (
  <div className='spinner' style={{ width, height }} />
);

const Checkbox = ({ label, onChange, checked }) => (
  <label class='checkbox'>
    <span class='checkbox__input'>
      <input
        type='checkbox'
        name='checkbox'
        onChange={onChange}
        checked={checked}
      />
      <span class='checkbox__control'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          aria-hidden='true'
          focusable='false'
        >
          <path
            fill='none'
            stroke='currentColor'
            stroke-width='3'
            d='M1.73 12.91l6.37 6.37L22.79 4.59'
          />
        </svg>
      </span>
    </span>
    <p className={`font-regular ${checked ? "line-through" : ""}`}>{label}</p>
  </label>
);
const TodoRow = ({ item, setItems, fetchTodos, updateTodo }) => {
  const duedateRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);

  const deleteTodo = async (item) => {
    setLoading(true);
    try {
      setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
      const result = await fetch(`/todos/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (result.ok) {
        await fetchTodos();
      }
    } catch (e) {}
    setLoading(false);
  };
  const changeDueDate = async (event) => {
    await updateTodo({
      ...item,
      duedate: event.detail.date ? new Date(event.detail.date) : null
    });
  };
  React.useEffect(() => {
    const elem = duedateRef && duedateRef.current;
    if (elem) {
      new Datepicker(elem, {
        autohide: true,
        clearBtn: true
      });
      elem.addEventListener("changeDate", (event) => changeDueDate(event));
      elem.value = item.duedate ? formatDate(item.duedate) : "add due date";
    }
    return () => {};
  }, [duedateRef]);

  return (
    <div className='list-row' key={`item-${item.id}`}>
      <Checkbox
        label={item.name}
        onChange={(e) =>
          updateTodo({
            ...item,
            status: e.target.checked ? "complete" : "incomplete",
            completed: e.target.checked ? new Date().toISOString() : null
          })
        }
        checked={item.status === "complete"}
      />
      <div className='list-row__duedate'>
        <svg
          width='20'
          height='20'
          viewBox='0 0 32 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g opacity='0.5'>
            <path
              d='M11.9999 5.66667H19.9999M11.9999 5.66667V3M11.9999 5.66667V8.33333M11.9999 5.66667H5.33325V13.6667M19.9999 5.66667H26.6666V13.6667M19.9999 5.66667V3M19.9999 5.66667V8.33333M5.33325 13.6667V25.6667H26.6666V13.6667M5.33325 13.6667H26.6666'
              stroke='#FD5750'
              stroke-width='2'
              stroke-linecap='square'
            />
          </g>
        </svg>

        <input ref={duedateRef} type='text' />
      </div>

      {loading ? (
        <Spinner width={10} height={10} />
      ) : (
        <button
          className='list-row__delete-button'
          onClick={() => deleteTodo(item)}
        >
          <svg
            width='22'
            height='22'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 12L20 20M20 12L12 20M28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16Z'
              stroke='#FD5750'
              stroke-width='2'
              stroke-linecap='square'
            />
          </svg>
        </button>
      )}
    </div>
  );
};
const Todos = () => {
  const [newValue, setNewValue] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingAddNew, setLoadingAddNew] = React.useState(false);
  const updateTodo = async (item) => {
    if (!item) {
      setLoadingAddNew(true);
    }
    const data = item || {
      id: (Math.random() * 999999) | 0,
      name: newValue,
      status: "incomplete"
    };
    setItems((prevItems) =>
      item
        ? prevItems.map((i) => (i.id === item.id ? item : i))
        : [...prevItems, data]
    );
    const result = await fetch(`/todos/${data.id}?status=incomplete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (result.ok) {
      await fetchTodos();
      setNewValue("");
    }
    setLoadingAddNew(false);
  };

  const fetchTodos = async () => {
    if (!items.length) {
      setLoading(true);
    }
    try {
      let todos = await fetch(`/todos?status=${status}`);

      if (todos.ok) {
        todos = await todos.json();
        setItems(todos.items.sort((a, b) => a.createdAt - b.createdAt));
      }
    } catch (e) {}
    setLoading(false);
  };
  
  React.useEffect(() => {
    fetchTodos();
    return () => {};
  }, [status]);
  return (
    <div>
      <div className='filter-buttons-wrapper'>
        <button
          onClick={() => setStatus("all")}
          className={status === "all" ? "primary" : ""}
        >
          Show All
        </button>
        <button
          onClick={() => setStatus("incomplete")}
          className={status === "incomplete" ? "primary" : ""}
        >
          Show Incomplete
        </button>
        <button
          onClick={() => setStatus("complete")}
          className={status === "complete" ? "primary" : ""}
        >
          Show Completed
        </button>
      </div>
      <hr />
      {loading ? (
        <div class='spinner-wrapper'>
          <Spinner />
        </div>
      ) : (
        <div className='list-wrapper'>
          {items.map((item) => (
            <TodoRow
              key={`list-row-${item.id}`}
              item={item}
              fetchTodos={fetchTodos}
              updateTodo={updateTodo}
              setItems={setItems}
            />
          ))}
        </div>
      )}
      <hr />
      <div className='add-new-todo-row'>
        <div className='add-new-todo-row__input'>
          <svg
            viewBox='0 0 40 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M19.9999 8.33325V19.9999M19.9999 19.9999V31.6666M19.9999 19.9999H8.33325M19.9999 19.9999H31.6666'
              stroke='#FD5750'
              stroke-width='2'
              stroke-linecap='square'
            />
          </svg>

          <input
            placeholder='Add new to do'
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                updateTodo();
              }
            }}
          />
        </div>
        {loadingAddNew ? (
          <Spinner />
        ) : (
          <button className='primary' onClick={() => updateTodo()}>
            Add
          </button>
        )}
      </div>
    </div>
  );
};
const domContainer = document.querySelector("#todo_container");
ReactDOM.render(React.createElement(Todos), domContainer);
