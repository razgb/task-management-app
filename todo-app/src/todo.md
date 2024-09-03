Things to do: deadline 14th Aug.

<WidgetIdeas>
- Analytics chart that shows number of tasks completed per day.
- create reminder widget for upcoming tasks. For the 4 most upcoming widgets.
  -> If the user happens to not use due dates, remove the widget entirely.
</WidgetIdeas>
<CurrentPlan>

**least importantant**
- An input element must have an autocomplete attribute. (later)
- gradient for the backgrounds of all pages. (half complete) (not sure on what type of gradient...)
- Theme button not as thick as other menu buttons.

- Fully rewrite the error and success components.

**mid importantance**
- Refresh page on task expanded feature. (fetching single task from firebase)
  -> After create a skeleton load for this feature.

- Timer widget needs to be larger to fill out dashboard.

- Fully setup and review login for users.
- Logging out feature.
  -> Own modal component.

- Found bug for changing break and work modes button in the timer page.

**Leave this for after the beta**
- Reorder feature on the main TasksPage.
  -> Requires another firebase reset for new structure.
  -> Same position style reordering and client side updates done with the subtasks before.

**most importantant**
- Optimistic updates on queryClient.
- Create a function that asserts an object begin a tasktype[] upon being true (if checks).

- error boundary component for important parts of application.

- Create verification component.
- Create a verification function that refreshes the
  page and checks verification status again. (only solution to think of currently).
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
