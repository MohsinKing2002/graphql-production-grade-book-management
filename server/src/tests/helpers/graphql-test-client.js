export const executeOperation = async (server, operation, variables = {}) => {
  return server.executeOperation({
    query: operation,
    variables,
  });
};
