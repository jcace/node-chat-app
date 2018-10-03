var expect = require('expect');

var {
  generateMessage,
  generateLocationMessage
} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';

    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });

  })
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = "Json"
    var latitude = 10;
    var longitude = -10;

    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.from).toBe('Json');
    expect(message.url).toBe('https://www.google.com/maps?q=10,-10');
    expect(message.createdAt).toBeA('number');

  })
})