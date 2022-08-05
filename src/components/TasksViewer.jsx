import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import "../styles/styles.css";

const TasksViewer = () => {
  const [tasksList, setTasksList] = useState([]);

  async function handleSubmit() {
    await axios
      .get("https://ies-task-manager.herokuapp.com/api/tasks")
      .then((response) => {
        if (response.status === 200) {
          setTasksList(response.data);
        }
      });
  }

  async function deleteTask() {
    await axios
      .delete(
        "https://ies-task-manager.herokuapp.com/api/tasks/" + deleteTaskId
      )
      .then((response) => {
        if (response) {
          window.location.reload();
        }
      });
  }

  useEffect(() => {
    handleSubmit();
  }, []);

  const [modalTask, setModalTask] = useState({
    title: "",
    description: "",
    author: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteTaskId, setDeleteTaskId] = useState(0);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const handleDeleteTaskClose = () => setShowDeleteTask(false);
  const handleDeleteTaskShow = () => setShowDeleteTask(true);

  const [isEdit, setIsEdit] = useState(false);

  const [editTask, setEditTask] = useState({
    id: 0,
    title: "",
    description: "",
    author: "",
  });

  async function handleEdit() {
    editTask.id = modalTask.id;
    if (
      !(editTask.title === "") &&
      !(editTask.description === "") &&
      !(editTask.author === "")
    ) {
      await axios
        .put("https://ies-task-manager.herokuapp.com/api/tasks", editTask)
        .then((response) => {
          if (response.status === 200) {
            window.location.reload();
          }
        });
    }
  }
  async function handleFinishTask() {
    await axios
      .put(
        "https://ies-task-manager.herokuapp.com/api/tasks/finalize/" +
          modalTask.id
      )
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      });
  }

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;

    const newTask = {
      ...editTask,
      [name]: value,
    };

    setEditTask(newTask);
  }

  return (
    <div className="tasksViewer">
      {tasksList.map((task) => (
        <Form key={task.id} className="taskViewer">
          <h5>Title</h5>
          <p>{task.title}</p>
          <h5>Author</h5>
          <p>{task.author}</p>
          <h5>The task is:</h5>
          <p>{task.finished === true ? "Finished" : "Unfinished"}</p>

          <Button
            variant="warning"
            onClick={() => {
              setModalTask({
                id: task.id,
                title: task.title,
                description: task.description,
                author: task.author,
              });
              handleShow();
            }}
          >
            View
          </Button>

          {isEdit ? (
            <Modal show={show} onHide={handleClose}>
              <Form>
                <Modal.Header>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={modalTask.title}
                      name="title"
                      value={editTask.title}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder={modalTask.description}
                      name="description"
                      value={editTask.description}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={modalTask.author}
                      name="author"
                      value={editTask.author}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsEdit(false);
                    }}
                  >
                    Close
                  </Button>

                  <Button
                    variant="success"
                    type="submit"
                    onClick={() => {
                      handleEdit();
                    }}
                  >
                    Save Change
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          ) : (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>{modalTask.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>Description</h5>

                <p>{modalTask.description}</p>

                <h6>
                  The task is:
                  {modalTask.finished === true ? " Finished" : " Unfinished"}
                </h6>
                <h6>Author: {modalTask.author}</h6>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>

                <Button
                  variant="warning"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  className="buttonFinishTask me-2"
                  variant="success"
                  onClick={() => {
                    handleFinishTask();
                  }}
                >
                  Finish task
                </Button>
              </Modal.Footer>
            </Modal>
          )}

          <Button
            className="ms-2"
            variant="danger"
            onClick={() => {
              setDeleteTaskId(task.id);
              handleDeleteTaskShow();
            }}
          >
            Delete
          </Button>

          <Modal show={showDeleteTask} onHide={handleDeleteTaskClose}>
            <Modal.Header>
              <Modal.Title>Delete task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this task?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteTaskClose}>
                Close
              </Button>

              <Button
                className="buttonFinishTask me-2"
                variant="danger"
                type="submit"
                onClick={() => {
                  deleteTask();
                }}
              >
                Delete task
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      ))}
    </div>
  );
};

export default TasksViewer;
