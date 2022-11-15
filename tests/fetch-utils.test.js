import { getAMessage } from "../utils/fetch-util"

//Example Testing Fetch
afterEach(() => {
    fetch.resetMocks();
})

test("gets a Message", async () => {
    
    //ARRANGE
    const player = {
            id: 1,
            name: 'Mike',
            pos: 'C'
    }
    fetch.mockResponseOnce(JSON.stringify(player))

    //ACT
    const message = await getAMessage();
    //ASSERT
    expect(message).toEqual(player);
});

test("throw error on Message Fetch", async () => {
    
    //ARRANGE
    fetch.mockReject(() => "API failure");

    //ACT
    async function failMessage() {
        await getAMessage();
    }

    //ASSERT
    await expect(failMessage()).rejects.toThrow(Error);
});