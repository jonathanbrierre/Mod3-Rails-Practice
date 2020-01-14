# Lists, Lists, Lists

# Requirements
<!-- * When a user loads the page:
 all the lists in the database (5 of them) should be loaded in as options in the select box. -->
 
<!-- * When the select box _changes_ AND the user chooses a list,
 the name, priority and the tasks of the list should be rendered on the page. -->
 
  A form to add a new task associated with the chosen list should also be rendered.


* When the form to add a new task is submitted, it should also be able to add a task to the list that is currently being displayed. The new task should be persisted in the backend and also get rendered on to the bottom of the list.

<!-- * If the task is "done", then the checkbox next to the task name should be checked. If it isn't done, the checkbox should be blank. -->
<!-- * When a checkbox changes state, it should persist in the backend. In other words, if a task was completed and the user checks the task off and refreshes the page, the task should still be checked off. -->

# API
```
$ cd ListAPI               # Change into the directory
$ bundle install           # Install the appropriate dependencies/gems
$ rails db:migrate         # Migrate the database
$ rails db:seed            # Seeds the database
$ rails server             # Start the server
```

## Getting All the Lists For the Select Box

```JavaScript
#=> Example Request
  GET '/lists'
#=> Example Response
[
  {
    "id": 1,
    "name": "Grocery List",
    "priority": "Low",
    "tasks": [
      {
        "id": 1,
        "done": true,
        "name": "Baking Soda"
      },
      {
        "id": 2,
        "done": true,
        "name": "Loquats"
      },
      //..
    ]
  },
  {
    "id": 2,
    "name": "Coding Languages to Learn",
    "priority": "High",
    "tasks": [
      {
        "id": 6,
        "done": true,
        "name": "PLANC"
      },
      {
        "id": 7,
        "done": false,
        "name": "SIGNAL"
      },
      //...
    ]
  },
  //...
]
```

For styling purposes, the HTML of the lists rendered in `#list-select` should look like the following:

```HTML
  <option value="${LIST ID}">${LIST NAME}</option>
```

## When the Select Box Gets Changed

Consider and look up which event should fire off the event handler for the select box! (It should not be a `click` or a `submit`.) When you find out the event, consider how to get the _value_ out of the chosen list on the select box. Use that to make the fetch to a list's show page!

```JavaScript
#=> Example Request
  GET '/lists/1'
#=> Example Response
{
  "id": 1,
  "name": "Grocery List",
  "priority": "Low",
  "tasks": [
    {
      "id": 1,
      "done": true,
      "name": "Baking Soda"
    },
    {
      "id": 2,
      "done": true,
      "name": "Loquats"
    },
    {
      "id": 3,
      "done": false,
      "name": "Cinnamon"
    },
    {
      "id": 4,
      "done": false,
      "name": "Blueberries"
    },
    {
      "id": 5,
      "done": true,
      "name": "Spring Onions"
    }
  ]
}
```

The name of the chosen list should be shown within the `#main-list-name` h1 tag, with the priority of the chosen list.

And when rendering out the tasks of the list, depending on whether the task is done or not, the HTML in the `#main-list-tasks` should look like the following:

If the task is *not* done:
```HTML
<li class="list-group-item d-flex justify-content-between align-items-center">
  ${TASK NAME}
  <input type="checkbox" class="task-checkbox">
</li>
```

If the task is done:
```HTML
<li class="list-group-item d-flex justify-content-between align-items-center">
  ${TASK NAME}
  <input type="checkbox" checked class="task-checkbox">
</li>
```

The form to add a task should be rendered in the `#task-form-container` should have the following HTML classes:

```HTML
<form id="new-task-form">
  <label for="task-name">Task Name:</label>
  <input type="text" id="task-name" >
  <input type="submit" value="Create new Task">
</form>
```

## Checking off a Task
```JavaScript
#=> Example Request
  PATCH `/tasks/${task_id}`

  Required Headers:
    {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

  Required Body:
    {
      done: true or false (depending on whether the task should be done or not, respectively)
    }

#=> Example Response
  {
    id: 100,
    name: "JavaScript",
    done: false
  }
```

## Submitting the Form

```JavaScript
#=> Example Request
  POST `/tasks`

  Required Headers:
    {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

  Required Body:
    {
      name: "Name of the Task",
      done: false,
      list_id: ID of the list currently on the page
    }

#=> Example Response
  {
    id: 100,
    content: "Content of the Review",
    done: false
  }
```

The new task should then be rendered onto the page, following a similar format to how the tasks were originally rendered onto the page on the `#main-list-tasks`.
