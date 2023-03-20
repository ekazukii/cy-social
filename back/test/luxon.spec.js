const { DateTime } = require('luxon');

describe('Luxon lib', () => {
  it('Should parse valid iso string', () => {
    expect(DateTime.now().invalidReason).toBe(null);
    expect(DateTime.fromISO('2023-03-19T13:18:48.305+01:00').invalidReason).toBe(null);
  });

  it('Should not parse valid iso string', () => {
    expect(DateTime.fromISO('lsfkdk,f,kdsfkl').invalidReason).toBeDefined();
  });
});
