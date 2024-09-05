# Task Page Overview

The Task Page is designed to manage tasks across different columns, providing a seamless drag-and-drop experience. It consists of three main components: **TaskPage**, **TaskColumn**, and **Task**.

## Components

### TaskPage

- The **TaskPage** component serves as the main container for the task management interface. It holds the state for all tasks and their respective columns (e.g., Draft, In-Progress, Complete).
- It initializes the task data and passes it down to the **TaskColumn** components as props.

### TaskColumn

- Each **TaskColumn** represents a specific category of tasks. It receives tasks as props from the **TaskPage** and renders them using the **Task** component.
- The column listens for drag-and-drop events:
  - **onDragOver**: Prevents the default behavior to allow dropping.
  - **onDrop**: Handles the drop event, retrieves the task data, and updates the state in the **TaskPage** to reflect the new task arrangement.

### Task

- The **Task** component represents an individual task. It is made draggable by setting the `draggable` attribute and defining the **onDragStart** event.
- When dragging starts, the task's data is serialized and attached to the drag event, allowing it to be accessed during the drop.

## Process Flow

1. **Initialization**: The **TaskPage** initializes the task data and renders multiple **TaskColumn** components.
2. **Dragging a Task**: When a user starts dragging a task, the **onDragStart** event is triggered, serializing the task data.
3. **Dropping a Task**: Upon dropping the task in a different column, the **onDrop** event retrieves the serialized data, removes the task from its original column, and adds it to the new column.
4. **State Update**: The **TaskPage** updates its state to reflect the new arrangement of tasks across columns, ensuring a smooth user experience.

This architecture allows for efficient task management and a clear separation of concerns between components, enhancing maintainability and scalability.
