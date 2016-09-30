package models

import (
	"fmt"
)

var DefaultTaskList *TaskManager

type Task struct {
	ID    int64  // Unique identifier
	Title string // Description
	Done  bool   // Is this task done?
}

// NewTask creates a new task given a title, that can't be empty.
func NewTask(title string) (*Task, error) {
	if title == "" {
		return nil, fmt.Errorf("empty title")
	}
	return &Task{0, title, false}, nil
}

// TaskManager manages a list of tasks in memory.
type TaskManager struct {
	tasks  []*Task
	lastID int64
}

// NewTaskManager returns an empty TaskManager.
func NewTaskManager() *TaskManager {
	return &TaskManager{}
}

// Save saves the given Task in the TaskManager.
func (m *TaskManager) Save(task *Task) (*Task, error) {
	if task.ID == 0 {
		m.lastID++
		task.ID = m.lastID
		newTask := cloneTask(task)
		m.tasks = append(m.tasks, newTask)
		return newTask, nil
	}

	for i, t := range m.tasks {
		if t.ID == task.ID {
			m.tasks[i] = cloneTask(task)
			return m.tasks[i], nil
		}
	}
	return nil, fmt.Errorf("unknown task")
}

// cloneTask creates and returns a deep copy of the given Task.
func cloneTask(t *Task) *Task {
	c := *t
	return &c
}

func (m *TaskManager) Delete(ID int64) error {
	for i, t := range m.tasks {
		if t.ID == ID {
			m.tasks = append(m.tasks[:i], m.tasks[i+1:]...)
			return nil
		}
	}
	return fmt.Errorf("unknown task")
}

// All returns the list of all the Tasks in the TaskManager.
func (m *TaskManager) All() []*Task {
	return m.tasks
}

func (m *TaskManager) CompleteAll(Done bool) {
	for _, t := range m.tasks {
		t.Done = Done
	}
}

func (m *TaskManager) ClearCompleted() {
	tasks := []*Task{}
	for _, t := range m.tasks {
		if !t.Done {
			tasks = append(tasks, t)
		}
	}
	m.tasks = tasks
}

// Find returns the Task with the given id in the TaskManager and a boolean
// indicating if the id was found.
func (m *TaskManager) Find(ID int64) (*Task, bool) {
	for _, t := range m.tasks {
		if t.ID == ID {
			return t, true
		}
	}
	return nil, false
}

func init() {
	DefaultTaskList = NewTaskManager()
}
