# Flow

## Overview

Flow is a simple project management tool that helps organize daily tasks using a Kanban board interface.

It was built as an exercise to get some familiarity with handling drag and drop in react and using inertiajs to build a monolithic app.

It also allowed me to get some insight on how to keep a dynamic interface like a kanban board correctly sorted in a database.

### Position Management

The current implementation adds a `position` field to the `tasks` table that is used to manage the visual order of the tasks within the board.

To do so we use two constants:

`POSITION_GAP` : Determines how far apart a newly created task should be from the previous task, it is set to an arbitrarily large number to try and avoid collisions between task positions.

`POSITION_MIN` : Determines the minimum position value that a task can have.

When a new task is created, we automatically calculate and set its position within the column based on the existing tasks positions,
to do so we query the database to find the highest position value among existing tasks in the same column and then add the `POSITION_GAP` to this highest position value to determine the newly created task's position.

After saving the task, we then check if its position is less than `POSITION_MIN`.

If it is, we reset the previous `position` value to 0 and then execute an SQL UPDATE statement to adjust the positions of all tasks in the same column.

When an existing task is moved to a new position its `position` field is recalculated based on the following logic:

```
if (previousTask && nextTask):
    movedTaskPosition = (previousTask.position + nextTask.position) / 2;
else if (previousTask):
    movedTaskPosition = previousTask.position + previousTask.position / 2;
else if (nextTask):
    movedTaskPosition = nextTask.position / 2;
```

## Current Features

- **Kanban Board**: Organize your tasks into columns and move them around with a drag and drop interface.
- **Tags**: Categorize tasks with tags for easier filtering and organization.
- **Dark Mode**: Toggle between light and dark themes.

## Technologies Used

- ![Laravel](https://img.shields.io/badge/Laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
- ![Inertia.js](https://img.shields.io/badge/Inertia.js-%231E64A1.svg?style=for-the-badge&logo=inertia&logoColor=white)
- ![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-%23778BF5.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2314A0F4.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
