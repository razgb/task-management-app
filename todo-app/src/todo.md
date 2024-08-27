Things to do: deadline 14th Aug.

<WidgetIdeas>
- Analytics chart that shows number of tasks completed per day.
- create reminder widget for upcoming tasks. For the 4 most upcoming widgets.
  -> If the user happens to not use due dates, remove the widget entirely.
</WidgetIdeas>
<CurrentPlan>

make this an exported function that fake promises.
// await new Promise((_, reject) => setTimeout(reject, 1000)); // testing failures.

**last thing you were doing**
- changing drag & drop for subtasks to be based on titles and not IDs anymore.
- fix client side position updates

**least importantant**
- An input element must have an autocomplete attribute. (later)
- gradient for the backgrounds of all pages. (half complete) (not sure on what type of gradient...)

**mid importantance**
- subtask removal
- subtask status updates

this does work and is a better idea than current solution so let's do this in free time.
- Incorrect architecture in firebase. Let's use Maps/Objects instead of arrays.
  -> Keys should be based on titles. Since in this apps they are unique.
  ->

**most importantant**
- optimistic updates on queryClient.

- create a function that asserts an object begin a tasktype[] upon being true (if checks).

- error boundary component for important parts of application.
- This document does not exist. It will not appear in queries or snapshots
  -> https://firebase.google.com/docs/firestore/using-console?hl=en&authuser=0&_gl=1*1tiysxz*_ga*MTUwNDk5OTIwNC4xNzIzOTA5OTA1*_ga_CW55HF8NVT*MTcyNDE3ODY0MC44LjEuMTcyNDE3ODY3Ni4yNC4wLjA.#non-existent_ancestor_documents

- Create verification component.
- Create a verification function that refreshes the
  page and checks verification status again. (only solution to think of currently).
</CurrentPlan>
**most important end**

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
