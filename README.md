# 🔖 Wikipedia Bookmark Userscript

With the help of Claude Sonnet 4.6 I built a small userscript that adds two things to every Wikipedia page:

- 🔖 A **bookmark icon** in the page toolbar that instantly saves the article to your Reading Lists
- A **"Saved" link** in the top-right personal menu that takes you straight to `Special:ReadingLists`

It works on **every language edition of Wikipedia** and displays messages in the language set in your Wikipedia preferences (Italian, English, French, German, Spanish, Portuguese, Chinese, Russian, Japanese, Arabic).

---

## Installation

1. Enable Reading Lists: **Preferences → Gadgets → Enable Reading Lists**
2. Go to `https://meta.wikimedia.org/wiki/User:USERNAME/global.js`
3. Paste the contents of `global.js` and save
4. Hard-reload any Wikipedia page (`Ctrl+Shift+R`)

> ⚠️ The file must be saved on **Meta-Wiki** (`meta.wikimedia.org`), not on your local Wikipedia. Only from there will it load across all language editions.

---

## How it works

When you click the bookmark, the script saves the page using two parameters:

- `project` → the address of the Wikipedia you are visiting (e.g. `https://fr.wikipedia.org`)
- `title` → the title of the page in that language (e.g. `Rome`)

This means you can save the same topic in multiple languages as separate entries in your Reading List.

---

## Supported languages

| Code | Language |
|------|----------|
| `it` | Italian |
| `en` | English |
| `fr` | French |
| `de` | German |
| `es` | Spanish |
| `pt` | Portuguese |
| `zh` | Chinese |
| `ru` | Russian |
| `ja` | Japanese |
| `ar` | Arabic |

For any other language the script falls back to English.

---

## Troubleshooting

**The bookmark icon doesn't appear**
Make sure you saved the code at `meta.wikimedia.org/wiki/User:USERNAME/global.js` and not on your local Wikipedia.

**"No list found" error**
Reading Lists are not enabled. Go to **Preferences → Gadgets** and enable them.

**Messages appear in English instead of my language**
Your language may not be in the dictionary yet. Open an issue or a pull request to add it!

---

## Contributing

Want to add a language or improve the script? Open a **pull request** — the `i18n` dictionary in `global.js` is the right place to add new translations.

---

*Built with the assistance of [Claude Sonnet 4.6](https://www.anthropic.com) by Anthropic.*

