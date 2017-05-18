
const { BarbellWeight } = require('./barbellweights.js');

let results = new BarbellWeight(185, 'deadlift').getResults();

console.log();
console.log('Lift: ', results.lift);
console.log('Total Weight: ', results.workingWeight);
console.log();

for (let i = 0; i < results.sets.length; i++) {

    console.log('totalWeight: ', results.sets[i].totalWeight);
    console.log('plateWeight: ', results.sets[i].plateWeight);
    console.log('sideWeight: ', results.sets[i].sideWeight);
    console.log('sets: ', results.sets[i].sets);
    console.log('reps: ', results.sets[i].reps);

    if (results.sets[i].plates.fortyFive > 0) {
        console.log(results.sets[i].plates.fortyFive + " - 45 lbs");
    }
    if (results.sets[i].plates.thirtyFive > 0) {
        console.log(results.sets[i].plates.thirtyFive + ' - 35 lbs');
    }
    if (results.sets[i].plates.twentyFive > 0) {
        console.log(results.sets[i].plates.twentyFive + ' - 25 lbs');
    }
    if (results.sets[i].plates.ten > 0) {
        console.log(results.sets[i].plates.ten + ' - 10 lbs');
    }
    if (results.sets[i].plates.five > 0) {
        console.log(results.sets[i].plates.five + ' - 5 lbs');
    }
    if (results.sets[i].plates.twoPointFive > 0) {
        console.log(results.sets[i].plates.twoPointFive + ' - 2.5 lbs');
    }
    if (results.sets[i].plates.extra > 0) {
        console.log(results.sets[i].plates.extra + ' - extra');
    }

    console.log();
}

// console.log(results);