'use strict';

const expect = require('chai').expect;
const { BarbellWeight } = require('../barbellweights.js');

describe('BarbellWeight', function() {

    it('should correctly set the workingWeight property', function() {
        let results = new BarbellWeight(100, 'squats').getResults();
        expect(results).to.have.property('workingWeight');
        expect(results.workingWeight).to.equal(100);
    });

    it('should not set warmup weight to less than the barbell', function() {
        let results = new BarbellWeight(100, 'squats').getResults();
        expect(results.sets[2].totalWeight).to.be.at.least(45);
    });

    it('should calculate the 40% correctly', function() {
        let results = new BarbellWeight(300, 'squats').getResults();
        expect(results.sets[1].totalWeight).to.equal(120);
        expect(results.sets[1].plates.thirtyFive).to.equal(1);
        expect(results.sets[1].plates.twoPointFive).to.equal(1);
    });

    it('should calculate the 60% correctly', function() {
        let results = new BarbellWeight(300, 'squats').getResults();
        expect(results.sets[2].totalWeight).to.equal(180);
        expect(results.sets[2].plates.fortyFive).to.equal(1);
        expect(results.sets[2].plates.ten).to.equal(2);
        expect(results.sets[2].plates.twoPointFive).to.equal(1);
    });

    it('should calculate the 80% correctly', function() {
        let results = new BarbellWeight(300, 'squats').getResults();
        expect(results.sets[3].totalWeight).to.equal(240);
        expect(results.sets[3].plates.fortyFive).to.equal(2);
        expect(results.sets[3].plates.five).to.equal(1);
        expect(results.sets[3].plates.twoPointFive).to.equal(1);
    });

    it('should calculate the working weight correctly', function() {
        let results = new BarbellWeight(300, 'squats').getResults();
        expect(results.sets[4].totalWeight).to.equal(300);
        expect(results.sets[4].plateWeight).to.equal(255);
        expect(results.sets[4].sideWeight).to.equal(127.5);
        expect(results.sets[4].plates.fortyFive).to.equal(2);
        expect(results.sets[4].plates.thirtyFive).to.equal(1);
        expect(results.sets[4].plates.twoPointFive).to.equal(1);
    });

    it('should calculate the extra small plates correctly', function() {
        let results = new BarbellWeight(302, 'squats').getResults();
        expect(results.sets[4].totalWeight).to.equal(302);
        expect(results.sets[4].plateWeight).to.equal(257);
        expect(results.sets[4].sideWeight).to.equal(128.5);
        expect(results.sets[4].plates.fortyFive).to.equal(2);
        expect(results.sets[4].plates.thirtyFive).to.equal(1);
        expect(results.sets[4].plates.twoPointFive).to.equal(1);
        expect(results.sets[4].plates.extra).to.equal(1);
    });

    it('should correctly set STARTING_STRENGTH mode by default', function() {
        let results = new BarbellWeight(445, 'squats').getResults();
        expect(results.program).to.equal('STARTING_STRENGTH');
    });

    it('should correctly set STARTING_STRENGTH mode explicitly', function() {
        let results = new BarbellWeight(445, 'squats', { program: 'STARTING_STRENGTH' }).getResults();
        expect(results.program).to.equal('STARTING_STRENGTH');
    });

    it('should correctly set QUARTERS mode', function() {
        let results = new BarbellWeight(445, 'squats', { program: 'QUARTERS' }).getResults();
        expect(results.program).to.equal('QUARTERS');
    });

    it('should calculate the 25% correctly for QUARTERS mode', function() {
        let results = new BarbellWeight(445, 'squats', { program: 'QUARTERS' }).getResults();
        expect(results.sets[1].totalWeight).to.equal(145);
        expect(results.sets[1].plateWeight).to.equal(100);
        expect(results.sets[1].sideWeight).to.equal(50);
        expect(results.sets[1].plates.fortyFive).to.equal(1);
        expect(results.sets[1].plates.thirtyFive).to.equal(0);
        expect(results.sets[1].plates.five).to.equal(1);
        expect(results.sets[1].plates.twoPointFive).to.equal(0);
    });


});
