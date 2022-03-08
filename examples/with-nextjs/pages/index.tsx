import { params } from "@serverless/cloud";
import { useEffect, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";

import Head from "next/head";
import Image from "next/image";
import dots from "../public/cloud-dots.svg";
import text from "../public/cloud-text.svg";

const Spinner = ({ width = 30, height = 30 }) => (
  <div className="spinner" style={{ width, height }} />
);

const Checkbox = ({ label, onChange, checked }) => (
  <label className="checkbox">
    <span className="checkbox__input">
      <input
        type="checkbox"
        name="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <span className="checkbox__control">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            d="M1.73 12.91l6.37 6.37L22.79 4.59"
          />
        </svg>
      </span>
    </span>
    <p className={`font-regular ${checked ? "line-through" : ""}`}>{label}</p>
  </label>
);

const TodoRow = ({ item, deleteTodo, updateTodo }) => {
  const changeDueDate = async (value) => {
    console.log("changeDueDate", value);
    await updateTodo({
      ...item,
      duedate: value ? new Date(value) : null,
    });
  };

  return (
    <div className="list-row" key={`item-${item.id}`}>
      <Checkbox
        label={item.name}
        onChange={(e) =>
          updateTodo({
            ...item,
            status: e.target.checked ? "complete" : "incomplete",
            completed: e.target.checked ? new Date().toISOString() : null,
          })
        }
        checked={item.status === "complete"}
      />
      <div className="list-row__duedate">
        <svg
          width="20"
          height="20"
          viewBox="0 0 32 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <path
              d="M11.9999 5.66667H19.9999M11.9999 5.66667V3M11.9999 5.66667V8.33333M11.9999 5.66667H5.33325V13.6667M19.9999 5.66667H26.6666V13.6667M19.9999 5.66667V3M19.9999 5.66667V8.33333M5.33325 13.6667V25.6667H26.6666V13.6667M5.33325 13.6667H26.6666"
              stroke="#FD5750"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </g>
        </svg>
        <DayPickerInput value={item.duedate} onDayChange={changeDueDate} />
      </div>

      <button
        className="list-row__delete-button"
        onClick={() => deleteTodo(item)}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12L20 20M20 12L12 20M28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16Z"
            stroke="#FD5750"
            strokeWidth="2"
            strokeLinecap="square"
          />
        </svg>
      </button>
    </div>
  );
};

const Todos = () => {
  const [newValue, setNewValue] = useState("");
  const [status, setStatus] = useState("all");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAddNew, setLoadingAddNew] = useState(false);

  const updateTodo = async (item?: any) => {
    if (!item) {
      setLoadingAddNew(true);
    }
    const data = item || {
      id: (Math.random() * 999999) | 0,
      name: newValue,
      status: "incomplete",
    };
    setItems((prevItems) =>
      item
        ? prevItems.map((i) => (i.id === item.id ? item : i))
        : [...prevItems, data]
    );
    const result = await fetch(`/api/todos/${data.id}?status=incomplete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      let result = (await fetch(`/api/todos?status=${status}`)) as any;
      if (result.ok) {
        const json = await result.json();
        setItems(
          json.items
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((item) => ({
              ...item,
              duedate: item.duedate ? new Date(item.duedate) : null,
            }))
        );
      }
    } catch (e) {}
    setLoading(false);
  };

  const deleteTodo = async (item) => {
    try {
      setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
      const result = await fetch(`/api/todos/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.ok) {
        await fetchTodos();
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchTodos();
  }, [status]);

  return (
    <div>
      <div className="filter-buttons-wrapper">
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
        <div className="spinner-wrapper">
          <Spinner />
        </div>
      ) : (
        <div className="list-wrapper">
          {items.map((item) => (
            <TodoRow
              key={`list-row-${item.id}`}
              item={item}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      )}
      <hr />
      <div className="add-new-todo-row">
        <div className="add-new-todo-row__input">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.9999 8.33325V19.9999M19.9999 19.9999V31.6666M19.9999 19.9999H8.33325M19.9999 19.9999H31.6666"
              stroke="#FD5750"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>

          <input
            placeholder="Add new to do"
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
          <button className="primary" onClick={() => updateTodo()}>
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="root">
      <Head>
        <title>Cloud Next.js Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="cloud-dots">
        <Image src={dots} alt="Serverless Cloud" />
        <Image src={dots} alt="Serverless Cloud" className="cloud-dots-flip" />
      </div>
      <div className="container">
        <header>
          <div>
            <Image src={text} alt="Serverless Cloud" />
            <h1 className="text-center">
              Welcome to <br />
              Serverless Cloud
            </h1>
            <h3 className="grey text-center">
              The way serverless was meant to be
            </h3>
          </div>
          <div>
            <h2 className="text-center">
              This is a sample <br />
              Serverless TODO app.
            </h2>
            <h4 className="grey text-center font-regular">
              It uses Serverless Data, an API, a scheduled task, and a little
              bit of <br />
              React to implement a simple TODO application.
            </h4>
          </div>
        </header>
        <main>
          <Todos />
        </main>
        <h4 className="grey text-center">
          Please visit the full documentation for more information: <br />
          <a
            href="https://serverless.com/cloud/docs"
            target="_black"
            rel="noopener"
          >
            https://serverless.com/cloud/docs
          </a>
        </h4>
      </div>
    </div>
  );
}
