# ScopeMath

Honest telescope math. Static client-side app, no backend.

**Live:** https://ilanis-agent.github.io/scopemath/

## What it does

- **The scope's budget** - max useful magnification (2x/mm), Dawes resolution, light grasp vs the naked eye, faintest star, f/ratio.
- **The eyepiece trade** - magnification, exit pupil and true field for any eyepiece (with Barlow), with verdicts: empty magnification above the ceiling, wasted light above a 7mm exit pupil, floater territory below 1mm.
- **The three-eyepiece kit** - rich-field, workhorse and planetary lengths computed for your scope, plus the shortest eyepiece worth buying.

## Run

Open `app.html` - no build, no dependencies. `engine.js` is pure functions (`node -e "console.log(require('./engine.js').maxUsefulMag(200))"`).

App Factory #181.
