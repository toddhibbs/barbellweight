# BarbellWeight
=========

Simple class to calculate warmup weights for barbell exercises such as squats, deadlift and presses.

## Installation

  `npm install barbellweights`

## Usage

    var results = new BarbellWeight(300, 'squats').getResults();

    This uses the default Starting Strength calculations of empty bar, 40%, 60%, 80%, and working weight


    var results = new BarbellWeight(300, 'squats', {program: 'QUARTERS'}).getResults();

    This uses calculations of empty bar, 25%, 50%, 75%, and working weight. The Percentages remove the bar
    weight (bar plus 45lb plates for deadlift) when making the calculations.


## Tests

  `npm test`