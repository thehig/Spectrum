describe("Testing Framework", function () {
    it("should pass a basic chai expectation", function () {
        expect(true).to.be.true;
    });

    it.skip("should skip the failing basic chai expectation", function () {
        expect(false).to.be.true;
    });
});