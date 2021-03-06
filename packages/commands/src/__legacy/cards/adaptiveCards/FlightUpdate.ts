// http://adaptivecards.io/samples/FlightUpdate.html

export default () => ({
  $schema: 'https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  speak: '<s>Flight KL0605 to San Fransisco has been delayed.</s><s>It will not leave until 10:10 AM.</s>',
  body: [
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          size: 'auto',
          items: [
            {
              type: 'Image',
              altText: 'Airplane image',
              size: 'small',
              url: 'http://adaptivecards.io/content/airplane.png'
            }
          ]
        },
        {
          type: 'Column',
          size: 'stretch',
          items: [
            {
              type: 'TextBlock',
              text: 'Flight Status',
              horizontalAlignment: 'right',
              isSubtle: true
            },
            {
              type: 'TextBlock',
              text: 'DELAYED',
              horizontalAlignment: 'right',
              size: 'large',
              color: 'attention'
            }
          ]
        }
      ]
    },
    {
      type: 'ColumnSet',
      separation: 'strong',
      columns: [
        {
          type: 'Column',
          size: 'stretch',
          items: [
            {
              type: 'TextBlock',
              text: 'Passengers',
              isSubtle: true
            },
            {
              type: 'TextBlock',
              text: 'Sarah Hum'
            },
            {
              type: 'TextBlock',
              text: 'Jeremy Goldberg'
            },
            {
              type: 'TextBlock',
              text: 'Evan Litvak'
            }
          ]
        },
        {
          type: 'Column',
          size: 'auto',
          items: [
            {
              type: 'TextBlock',
              text: 'Seat',
              horizontalAlignment: 'right',
              isSubtle: true
            },
            {
              type: 'TextBlock',
              text: '14A',
              horizontalAlignment: 'right'
            },
            {
              type: 'TextBlock',
              text: '14B',
              horizontalAlignment: 'right'
            },
            {
              type: 'TextBlock',
              text: '14C',
              horizontalAlignment: 'right'
            }
          ]
        }
      ]
    },
    {
      type: 'ColumnSet',
      separation: 'strong',
      columns: [
        {
          type: 'Column',
          size: 1,
          items: [
            {
              type: 'TextBlock',
              text: 'Flight',
              isSubtle: true
            },
            {
              type: 'TextBlock',
              text: 'KL0605'
            }
          ]
        },
        {
          type: 'Column',
          size: 'auto',
          items: [
            {
              type: 'TextBlock',
              text: 'Departs',
              isSubtle: true,
              horizontalAlignment: 'center'
            },
            {
              type: 'TextBlock',
              text: '10:10 AM',
              color: 'attention',
              weight: 'bolder',
              horizontalAlignment: 'center'
            }
          ]
        },
        {
          type: 'Column',
          size: 1,
          items: [
            {
              type: 'TextBlock',
              text: 'Arrives',
              isSubtle: true,
              horizontalAlignment: 'right'
            },
            {
              type: 'TextBlock',
              text: '12:00 AM',
              color: 'attention',
              horizontalAlignment: 'right',
              weight: 'bolder'
            }
          ]
        }
      ]
    },
    {
      type: 'ColumnSet',
      separation: 'strong',
      columns: [
        {
          type: 'Column',
          size: 1,
          items: [
            {
              type: 'TextBlock',
              text: 'Amsterdam',
              isSubtle: true
            },
            {
              type: 'TextBlock',
              text: 'AMS',
              size: 'extraLarge',
              color: 'accent'
            }
          ]
        },
        {
          type: 'Column',
          size: 'auto',
          items: [
            {
              type: 'TextBlock',
              text: ' '
            },
            {
              type: 'Image',
              url: 'http://adaptivecards.io/content/airplane.png',
              size: 'small'
            }
          ]
        },
        {
          type: 'Column',
          size: 1,
          items: [
            {
              type: 'TextBlock',
              text: 'San Francisco',
              isSubtle: true,
              horizontalAlignment: 'right'
            },
            {
              type: 'TextBlock',
              text: 'SFO',
              horizontalAlignment: 'right',
              size: 'extraLarge',
              color: 'accent'
            }
          ]
        }
      ]
    }
  ]
});
