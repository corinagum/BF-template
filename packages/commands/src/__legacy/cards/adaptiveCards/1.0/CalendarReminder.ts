// http://adaptivecards.io/samples/CalendarReminder.html

export default () => ({
  $schema: 'https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  speak:
    "<s>Your  meeting about \"Adaptive Card design session\"<break strength='weak'/> is starting at 12:30pm</s><s>Do you want to snooze <break strength='weak'/> or do you want to send a late notification to the attendees?</s>",
  body: [
    {
      type: 'TextBlock',
      text: 'Adaptive Card design session',
      size: 'large',
      weight: 'bolder'
    },
    {
      type: 'TextBlock',
      text: 'Conf Room 112/3377 (10)'
    },
    {
      type: 'TextBlock',
      text: '12:30 PM - 1:30 PM'
    },
    {
      type: 'TextBlock',
      text: 'Snooze for'
    },
    {
      type: 'Input.ChoiceSet',
      label: 'Snooze time',
      id: 'snooze',
      style: 'compact',
      choices: [
        {
          title: '5 minutes',
          value: '5',
          isSelected: true
        },
        {
          title: '15 minutes',
          value: '15'
        },
        {
          title: '30 minutes',
          value: '30'
        }
      ]
    }
  ],
  actions: [
    {
      type: 'Action.Http',
      method: 'POST',
      url: 'http://foo.com',
      title: 'Snooze'
    },
    {
      type: 'Action.Http',
      method: 'POST',
      url: 'http://foo.com',
      title: "I'll be late"
    },
    {
      type: 'Action.Http',
      method: 'POST',
      url: 'http://foo.com',
      title: 'Dismiss'
    }
  ]
});
