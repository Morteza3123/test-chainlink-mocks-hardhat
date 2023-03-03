const { expect } = require("chai");


describe("TestOracle", function () {

    async function deployContractsFixture() {

        //deploy mock oracle
        const MockOracle = await ethers.getContractFactory("MockV3Aggregator");
        const mockOracle = await MockOracle.deploy(
            "18", // decimals
            "1000"// initialAnswer
        );

        //deploy mock oracle
        const PriceConsumer = await ethers.getContractFactory("PriceConsumerV3");
        const priceConsumer = await PriceConsumer.deploy(
            mockOracle.address // mock oracle address
        );

        return { mockOracle, priceConsumer };
      }

      it("get oracle initial answer", async function () {
        const { mockOracle, priceConsumer } = await deployContractsFixture();
        const answer = await priceConsumer.getLatestPrice();
        expect(Number(answer)).to.equal(1000);
      });

      it("change mock data and get new oracle answer", async function () {
        const { mockOracle, priceConsumer } = await deployContractsFixture();
        mockOracle.updateAnswer("2000");
        const answer = await priceConsumer.getLatestPrice();
        expect(Number(answer)).to.equal(2000);
      });
})