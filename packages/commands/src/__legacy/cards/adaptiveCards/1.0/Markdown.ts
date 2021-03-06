const { PUBLIC_URL } = process.env;

export default () => ({
  $schema: 'https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json',
  version: '1.0',
  type: 'AdaptiveCard',
  body: [
    {
      type: 'TextBlock',
      text: `![Surface](${PUBLIC_URL}assets/surface1.jpg)\r\n\r\n## Basic formatting\r\n\r\nParagraphs can be written like so. A paragraph is the \r\nbasic block of Markdown. \r\nA paragraph is what text will turn \r\ninto when there is no reason it should become anything else.\r\n\r\nParagraphs must be separated by a blank line. Basic formatting of *italics* \nand **bold** is supported. This *can be **nested** like* so.\r\n\r\n## Lists\r\n\r\n### Ordered list\r\n\r\n1. one\r\n2. two\r\n3. three\r\n4. four\r\n\r\n### Unordered list\r\n\r\n* An item\r\n* Another item\r\n* Yet another item\r\n* And there\'s more...\r\n\r\n## Paragraph modifiers\r\n\r\n### Code block\r\n\r\n\`\`\`\r\nCode blocks are very useful for developers and other \r\npeople who look at code or other things that are written \r\nin plain text. As you can see, it uses a fixed-width font.\r\n\`\`\`\r\n\r\nYou can also make \`inline code\` to add code into other things.\r\n\r\n### Quote\r\n\r\n> Here is a quote. What this is should be self explanatory. \r\n> Quotes are automatically indented when they are used.\r\n\r\n# h1\r\n## h2\r\n### h3\r\n#### h4\r\n\r\n### Headings *can* also contain **formatting**\r\n\r\n## URLs\r\n\r\nURLs can be made in a handful of ways:\r\n\r\n* A named link to [MarkItDown][3]. The easiest way to do these is to\n select what you want to make a link and hit \`Ctrl+L\`.\r\n* Another named link to [MarkItDown](http://www.markitdown.net/)\r\n* Some links have [query strings](https://bing.com?q=some value) \nthat need encoding\r\n* Sometimes you just want a URL like <http://www.markitdown.net/>.\r\n\r\n## Horizontal rule\r\n\r\nA horizontal rule is a line that goes across the middle of the page.\r\n\r\n---\r\n\r\nIt\'s sometimes handy for breaking things up.\r\n\r\n\r\n## Table\r\n|header1|header 2|\n|----|----|\n| cell 1 | cell 2|\n| cell three | cell four|\r\n\r\n## Whitespace\r\n\r\nHere\'s a line.\r\n\r\nThis has the standard two newlines before it.\r\n\r\n\r\n\r\nThis has four newlines before it.\r\n\r\n\r\n\r\n\r\n\r\nThis has six newlines before it.\r\n\r\n<br/><br/><br/><br/>This has two newlines and four &lt;br/&gt; tags before it.`,
      wrap: true
    }
  ]
});
