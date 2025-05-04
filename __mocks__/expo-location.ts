export default {
  requestForegroundPermissionsAsync: jest.fn(() => ({
    status: "granted",
  })),
  getCurrentPositionAsync: jest.fn(() => ({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  })),
};
