const mockCreate = jest.fn();

export const OpenAI = jest.fn().mockImplementation(function() {
  this.chat = {
    completions: {
      create: mockCreate
    }
  };
});

export { mockCreate }; 