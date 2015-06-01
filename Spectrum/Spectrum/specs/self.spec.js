describe("Core Testing Framework (Mocha, Chai)", function () {
    it("should pass a basic chai expectation", function () {
        expect(true).to.be.true;
    });

    it.skip("should skip the failing basic chai expectation", function () {
        expect(false).to.be.true;
    });
});

describe("sinon fake server", function () {

    var server;

    beforeEach(function () {
        server = sinon.fakeServer.create()
        server.respondWith("GET", "http://www.example.com/test",
            [200, { "Content-Type": "application/json" }, "{ retailers: 'success' }"])
    });

    it("should return the expected mock data (chai expect)", function (done) {
        var callback = sinon.spy();

        WinJS.xhr({
            url: "http://www.example.com/test"
        })
        .then(function (msg) {
            return msg.responseText;
        })
        .then(callback)
        .then(function () {
            expect(callback.calledWith("{ retailers: 'success' }")).to.be.true;
            done();
        });

        server.respond();
    });

    it.skip("should return the expected mock data (sinon-chai expect)", function (done) {
        var callback = sinon.spy();

        WinJS.xhr({
            url: "http://www.example.com/test"
        })
        .then(function (msg) {
            return msg.responseText;
        })
        .then(callback)
        .then(function () {
            expect(callback).to.have.been.calledWith("{ retailers: 'sucscess' }");
            done();
        });

        server.respond();
    });
});