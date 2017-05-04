
/*
*   File:       barbellweights.js
*   Project:    barbell weight calculator
*   Date:       April 2017
*
*   Author:      Todd Hibbs
*
*   Description: For the given lift and working weight, it calculates the number of sets, warmup weights
*                and the plates needed for each set.
*       
*                There are two ways to calculate the warmup weights. 
*
*                Default: The Starting Strength method of calculating 40%, 60%, and 80% of the working weight
*                Option 2: Something I call QUARTERS which is 25%, 50%, 75% after removing the bar (bar + 45's for deadlift)
*                
*/


const BAR_WEIGHT = 45;
const PLATE_WEIGHTS = [45,35,25,10,5,2.5];
const ROUND_TO = 5;
const STARTING_STRENGTH = 1;
const QUARTERS = 2;

class BarbellWeight {
    constructor(workingWeight, lift, options) {
        this.workingWeight = workingWeight;
        this.lift = lift;  
        this.isDeadlift = (lift == 'deadlift');

        this.options = options || { program: STARTING_STRENGTH }

        this.baseWeight = 0; 
        if (this.options.program === QUARTERS) {
            this.baseWeight = BAR_WEIGHT + (this.isDeadlift ? 90 : 0);
        }
        this.dynamicWeight = this.workingWeight - this.baseWeight;

        this.results = {
            lift: lift,
            workingWeight: workingWeight,
            sets: [
                {
                    totalWeight: BAR_WEIGHT,
                    plateWeight: 0,
                    sideWeight: 0,
                    reps: 5,
                    sets: 2,
                    plates: {}
                }
            ]
        };

        this._calculateResults();
    }

    _calculateResults() {
        this._calculateExactWarmupWeights();
        this._calculateEstimatedWarmupWeights();
        this._calculatePlates(); 
    }

    getResults() {
        return this.results;
    }

    _calculateExactWarmupWeights() {

        let exactWeights = [];
        let tempWeight = 0;

        if (this.options.program === STARTING_STRENGTH) {

            //40%
            tempWeight = this.workingWeight * .4;
            exactWeights.push(tempWeight < BAR_WEIGHT ? BAR_WEIGHT : tempWeight);

            //60%
            tempWeight = this.workingWeight * .6
            exactWeights.push(tempWeight < BAR_WEIGHT ? BAR_WEIGHT : tempWeight);

            //80%
            tempWeight = this.workingWeight * .8
            exactWeights.push(tempWeight < BAR_WEIGHT ? BAR_WEIGHT : tempWeight);

            //100%
            exactWeights.push(this.workingWeight);
        }   

        else {   

            //25%
            tempWeight = this.baseWeight + this.dynamicWeight * .25;
            exactWeights.push(tempWeight < BAR_WEIGHT ? BAR_WEIGHT : tempWeight);

            //50%
            tempWeight = this.baseWeight + this.dynamicWeight * .5;
            exactWeights.push(tempWeight < BAR_WEIGHT ? BAR_WEIGHT : tempWeight);

            //75%
            tempWeight = this.baseWeight + this.dynamicWeight * .75;
            exactWeights.push(tempWeight < BAR_WEIGHT ? BAR_WEIGHT : tempWeight);

            //100%
            exactWeights.push(this.workingWeight);
        }

        this.exactWeights = exactWeights;
        return exactWeights;
    }

    _calculateEstimatedWarmupWeights() {

        let estimatedWeights = [];

        for (let i = 0; i < 3; i++) {
            estimatedWeights.push(Math.round(this.exactWeights[i] / ROUND_TO) * ROUND_TO);
        }
        estimatedWeights.push(this.workingWeight);

        this.estimatedWeights = estimatedWeights;
        return estimatedWeights;
    }

    _calculatePlates() {
        //calculates plates for a single side


        for(let i = 0; i < 4; i++) {

            let reps = 5;
            switch(i) {
                case 0: 
                    reps = 5;
                    break;
                case 1:
                    reps = 3;
                    break;
                case 2:
                    reps = 2;
                    break;
                default:
                    reps = 5
            }

            let warmupSet = { 
                totalWeight: this.estimatedWeights[i],
                plateWeight: this.estimatedWeights[i] - BAR_WEIGHT,
                sideWeight: ((this.estimatedWeights[i] - BAR_WEIGHT) / 2),
                reps: reps,
                sets: i === 3 ? 3 : 1,
                plates: {}
            };

            let totalSideWeight = warmupSet.sideWeight;
            let currentSideWeight = totalSideWeight;

            warmupSet.plates.fortyFive = Math.floor(currentSideWeight / 45);
            currentSideWeight -= 45 * warmupSet.plates.fortyFive;

            warmupSet.plates.twentyFive = Math.floor(currentSideWeight / 25);
            currentSideWeight -= 25 * warmupSet.plates.twentyFive;

            warmupSet.plates.ten = Math.floor(currentSideWeight / 10);
            currentSideWeight -= 10 * warmupSet.plates.ten;

            warmupSet.plates.five = Math.floor(currentSideWeight / 5);
            currentSideWeight -= 5 * warmupSet.plates.five;

            warmupSet.plates.twoPointFive = Math.floor(currentSideWeight / 2.5);
            currentSideWeight -= 2.5 * warmupSet.plates.twoPointFive;

            warmupSet.plates.extra = currentSideWeight;

            this.results.sets.push(warmupSet);
        }
    }

}

module.exports = {
    BarbellWeight: BarbellWeight
}










