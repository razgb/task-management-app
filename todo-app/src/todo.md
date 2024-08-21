Things to do: deadline 14th Aug.

<WidgetIdeas>
- Analytics chart that shows number of tasks completed per day.
- create reminder widget for upcoming tasks. For the 4 most upcoming widgets.
  -> If the user happens to not use due dates, remove the widget entirely.
</WidgetIdeas>

<CurrentPlan>


**last thing you were doing**

- changing drag & drop for subtasks to be based on titles and not IDs anymore.
- separate client side optimistic change from asyncMutate function.
- add client side remove and async remove functions to code & the UI.

-- **less importantance** --
- An input element must have an autocomplete attribute. (later)
- gradient for the backgrounds of all pages. (half complete) (not sure on what type of gradient...)

-- **mid importantance** --
- Subtask uploading for the user.
- When there is a app wide error or success, hide navigation with an opacity transition,
  and render modal. Looks much better than layering on top.

-- **high importantance** --
- create a function that asserts an object begin a tasktype[] upon being true (if checks).
- error boundary component for important parts of application.
- This document does not exist. It will not appear in queries or snapshots
  -> https://firebase.google.com/docs/firestore/using-console?hl=en&authuser=0&_gl=1*1tiysxz*_ga*MTUwNDk5OTIwNC4xNzIzOTA5OTA1*_ga_CW55HF8NVT*MTcyNDE3ODY0MC44LjEuMTcyNDE3ODY3Ni4yNC4wLjA.#non-existent_ancestor_documents

- Create verification component.
- Create a verification function that refreshes the
  page and checks verification status again. (only solution to think of currently).
</CurrentPlan>

<AppWideIdeas>
- the phone design of the application.
</AppWideIdeas>


Task Structure:
--------------
task: {
  id: string,
  title: string,
  description: string, (optional)
  dueDate: string, (unix timestamp)
  status: string, (draft, inProgress, completed)
  subtasks: [
    {
      id: string,
      title: string,
      position: number,
      completed: boolean,
    }
  ],
}
