import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import "../styles/styles.css";

const TasksForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    author: "",
  });

  async function handleSubmit() {
    if (
      !(task.title === "") &&
      !(task.description === "") &&
      !(task.author === "")
    ) {
      await axios.post(
        "https://ies-task-manager.herokuapp.com/api/tasks",
        task
      );
    }
  }

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;

    const newTask = {
      ...task,
      [name]: value,
    };

    setTask(newTask);
  }

  return (
    <div className="tasksForm">
      <h4>Task Builder</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            name="author"
            value={task.author}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Generate task
        </Button>
      </Form>
    </div>
  );
};

export default TasksForm;
