/* ScopeMath engine - honest telescope math. Pure functions, no DOM. */
var ScopeEngine = (function () {
  function r1(x) { return Math.round(x * 10) / 10; }
  function r2(x) { return Math.round(x * 100) / 100; }

  function magnification(scopeFL, epFL) {
    if (epFL <= 0) throw new Error('eyepiece focal length must be positive');
    return r1(scopeFL / epFL);
  }

  /* mm of light beam leaving the eyepiece - your eye can only use about 7 */
  function exitPupil(apertureMm, mag) {
    return r1(apertureMm / mag);
  }

  /* the optics ceiling: 2x per mm of aperture (50x per inch) */
  function maxUsefulMag(apertureMm) {
    return Math.round(2 * apertureMm);
  }

  function trueFOV(apparentFOV, mag) {
    return r2(apparentFOV / mag);
  }

  /* Dawes resolution limit in arcseconds */
  function dawesLimit(apertureMm) {
    return r2(116 / apertureMm);
  }

  /* light grasp vs the naked 7mm dark-adapted eye */
  function lightGrasp(apertureMm) {
    return Math.round(Math.pow(apertureMm / 7, 2));
  }

  /* rough faintest star under dark skies */
  function limitingMag(apertureMm) {
    return r1(2 + 5 * Math.log10(apertureMm));
  }

  function fRatio(scopeFL, apertureMm) {
    return r1(scopeFL / apertureMm);
  }

  function eyepieceForMag(scopeFL, mag) {
    return r1(scopeFL / mag);
  }

  /* shortest eyepiece worth buying for this scope */
  function minEpFL(scopeFL, apertureMm) {
    return r1(scopeFL / maxUsefulMag(apertureMm));
  }

  function magVerdict(mag, apertureMm) {
    var cap = maxUsefulMag(apertureMm);
    if (mag > cap) return 'empty magnification - past the ' + cap + 'x optics ceiling, the blur just gets bigger';
    if (mag > cap * 0.75) return 'theoretical reach - usable only on steady nights with good seeing';
    if (mag >= cap * 0.4) return 'the workhorse range - planets, doubles, small clusters';
    return 'low power cruising - wide fields, bright images, star hopping';
  }

  function exitVerdict(pupilMm) {
    if (pupilMm > 7) return 'wasted light - a dark-adapted pupil opens to about 7mm and no further';
    if (pupilMm >= 5) return 'rich-field glow - maximum brightness for faint fuzzies';
    if (pupilMm >= 2) return 'general-purpose beam - good contrast, comfortable view';
    if (pupilMm >= 1) return 'planetary territory - dimmer but sharper on small targets';
    return 'dim and cranky - eye floaters start photobombing below 1mm';
  }

  return {
    magnification: magnification, exitPupil: exitPupil, maxUsefulMag: maxUsefulMag,
    trueFOV: trueFOV, dawesLimit: dawesLimit, lightGrasp: lightGrasp,
    limitingMag: limitingMag, fRatio: fRatio, eyepieceForMag: eyepieceForMag,
    minEpFL: minEpFL, magVerdict: magVerdict, exitVerdict: exitVerdict
  };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = ScopeEngine;
