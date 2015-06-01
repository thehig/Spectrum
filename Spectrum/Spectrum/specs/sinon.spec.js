function sinonTest(parameter, callback) {
    callback(parameter);
};

describe("sinonTest", function () {

    var param;

    beforeEach(function() {
        param = "Hello World";
        spy = sinon.spy();
    });

    it("should have a sinonTest function that returns the parameter to the callback function", function(done) {
        sinonTest(param, function(testOutput) {
            expect(testOutput).to.equal(param);
            done();
        });
    });

    it("should call the callback once", function() {
        sinonTest(param, spy);
        expect(spy).to.have.been.calledOnce;
    });

    it("should call the callback with the correct parameter (chai expect)", function () {
        sinonTest(param, spy);
        expect(spy.args[0][0]).to.equal(param);
    });

    it("should call the callback with the correct parameter (sinon-chai expect)", function () {
        sinonTest(param, spy);
        expect(spy).to.have.been.calledWith(param);
    });

    describe("Intentionally failing tests", function() {
        it("should fail the test with an appropriate message (chai)", function () {
            sinonTest(param, spy);
            expect(spy.args[0][0]).to.not.equal(param);
        });

        it("should fail the test with an appropriate message (sinon-chai)", function () {
            sinonTest(param, spy);
            expect(spy).to.have.not.been.calledWith(param);
        });
    });
    
});