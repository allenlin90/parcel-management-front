export default () => {
    return {
        endpoints: {
            allHubs: '/hub', // GET
            assignToHubs: '/hub/assign', // POST
        },
        hubs: [],
        error: null,
    }
}