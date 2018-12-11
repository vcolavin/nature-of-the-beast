# Hey

This is a little side project I'm working on with a friend. Maybe it will go somewhere, maybe it won't. It was bootstrapped with create-react-app version 2.1.1, with the typescript flag.

## To run:

It shouldn't be too hard.

-   `$ npm install`
-   `$ npm start`

## To deploy to github pages

found at http://vcolavin.com/nature-of-the-beast/

-   `$ npm run deploy`

### Todo list

-   [x] keep cursor at the end of the prompt when moving through history
-   [x] use Redux instead of a POJO
-   [x] fix issue where QuietForest is appearing as undefined in neighbors
-   [x] tab completion
-   [x] Make the console writing permission revocable, or make running utilities cancellable. E.g. we don't want `whoami` to run through its whole dialog if we've `cd`'d to another location
-   [x] make input prompt change based on location
-   [x] get text to wrap correctly on long passages
-   [x] cooler terminal styling (e.g. https://css-tricks.com/old-timey-terminal-styling/)
-   [x] date utility (probably replicate `date +%s`)
-   [x] Switch typescript back to strict mode
-   [ ] Use browser APIs to change some things about the story (e.g. sound, location, camera, time)
-   [ ] A tutorial
-   [x] Improved help utility (can give help for particular utilities)
-   [ ] Create an ambient ASCII sound visualizer.
-   [ ] introduce concept of aliased utilities. don't overthink this, but this way "pwd" and "look" can be the same.
-   [x] make locations a little more complicated. can they behave anything like the "whoami" tool?
-   [x] `$ cd ..` should work
-   [ ] create richer features for locations... interactivity, items, different descriptions based on state
-   [ ] create usable items and an inventory. e.g. "use key on lock"
    -   [ ] To achieve this, we'll also need "use" utility which accepts several arguments
-   [ ] the look utility should accept two arguments: "at", and an item
-   [ ] `listen` utility, similar to `look`
-   [x] [per redux docs](https://redux.js.org/basics/reducers#note-on-relationships), don't store relations as actual objects (e.g. `location.neighbors: Location[]`), but IDs (e.g. `location.neighborSlugs: string[]`), and create get/set helpers in place
-   [ ] Rewritable console lines. For example, how would a loading bar be simulated? Probably by having the terminal buffer optionally contain components which handle their own output.
-   [x] Tab completion should work on whatever the last argument is, not just the second argument
-   [x] Use react-redux to connect the terminal component to redux store
-   [ ] use browser speech synthesis API to read out the text. maybe with different voices for different situations. This will make it accessible to blind people too, which is something I'd been struggling with. https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#SpeechSynthesis
-   [x] make it look ok on mobile
-   [ ] input field should be a separate component. this will probably lead to a beneficial refactor of the monolithic terminal component and all the state that it holds.
-   [ ] items and locations should have different colors in tab completion.
-   [x] tab completion should work for items
-   [x] once an item is picked up it should no longer be in visible in the location
-   [ ] different terminal style while someone else has control of the terminal. Maybe pulsing red or something.
