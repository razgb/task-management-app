12-07-2024:

things to do: deadline 1st Aug.

===== WIDGET IDEAS =====

fucking remove the workspace bullshit file i have no idea how it works.

Take a look at how I removed font sizes from classNames in @ErrorPage.tsx. Replace both icons sizes with the closest font size value you can and add the styles to each element that has one. If an element does not have a text size class or style please add it to it. Such as a normal p element with no specified sizes. Here is the original font size hook source @useFontSize.tsx.

- button style inconsistencies with textsize prop and useFontSize hook

- padding inconsistency with font size increases in
  accessibility.

- Settings:
  -> Color blind mode.
  -> User profile.
  -> FAQ setup & animations.
  -> Task settings.
  -> Activity log setup for notifications. (might remove this tbh)

- Maybe an admin link for setting up notifications but it's out of scope.

- Habit tracker.

- Calendar view and being able to see posts that have been given a deadline. Expanded UI too.

- Analytics chart that shows number of tasks completed per day.

- create reminder widget for upcoming tasks. For the 4 most upcoming widgets.  
  -> If the user happens to not use due dates, remove the widget entirely.

- pomodoro widget
  -> when turned on user can also see it in the dashboard page.
  -> can be paused, and reset inside the dashboard.
  -> notifications for the user when using since they'll be tabbed out alot.
  -> Quick task creator that goes inside the general test group that's premade for users.

===== APP wide ideas =====

- fixing design of application for larger screen sizes: font sizes and padding.
- the phone design of the application.

- set up firebase for the application.
- flatten the architecture as much as possible with the collections.
