# [pitch](https://pitch-iota.vercel.app)

## What is this?

This is a web app for generating baseball and softball pitch calling cards.

Coaches enter the types of pitches they want in a game, abbreviations for those pitches, and the frequency with which they should occur, and then click a button to generate a randomized grid of those pitch abbreviations which a player wears on their wrist.

During the game, the coach calls out numbers from a sheet that corresponds to the player’s card. The player looks at their wrist to see what style of pitch to throw, and since only a random number was called, the other team doesn’t know what type of pitch to expect.

## Why did I make this?

I previously made a [Java application](https://github.com/johnjago/pitch-card-generator) for this which no longer works.

Since a few coaches still wanted to use it, I recreated it as a web app.

## Can I try it out?

Yes! It’s live at [pitch-iota.vercel.app](https://pitch-iota.vercel.app).

***

## Local development

This project is made with Next.js.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `pages/index.js`. The page
auto-updates as you edit the file.

## License

MIT
