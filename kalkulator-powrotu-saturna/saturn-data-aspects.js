/**
 * NEOROMANTYCZNY — SATURN ASPECTS COMBINER
 * Scala moduły aspektów (Part 1 + Part 2) w jeden rejestr SATURN_ASPECTS_DATA
 */
(function () {
  function getAspectsData() {
    return Object.assign(
      {},
      window.SATURN_ASPECTS_PART1 || {},
      window.SATURN_ASPECTS_PART2 || {}
    );
  }

  window.SATURN_ASPECTS_DATA = getAspectsData();
  window.getSaturnAspectsData = getAspectsData;
})();
