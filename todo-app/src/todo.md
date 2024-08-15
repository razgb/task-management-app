Things to do: deadline 14th Aug.

<WidgetIdeas>
- Analytics chart that shows number of tasks completed per day.
- create reminder widget for upcoming tasks. For the 4 most upcoming widgets.
  -> If the user happens to not use due dates, remove the widget entirely.
</WidgetIdeas>

<CurrentPlan>
- Add dummy user data to firebase.
  -> User tasks for all 3 columns (no subtasks).
  -> Subtask uploading for the user.

- error boundary component for important parts of application.
- An input element must have an autocomplete attribute. (later)
- gradient for the backgrounds of all pages. (half complete) (not sure on what type of gradient...)
- Correct UserContextType.user structure for type safety.
- Create verification component.
- Create a verification function that refreshes the
  page and checks verification status again. (only solution to think of currently).
</CurrentPlan>

<AppWideIdeas>
- the phone design of the application.
- set up firebase for the application.
- flatten the architecture as much as possible with the collections.
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
