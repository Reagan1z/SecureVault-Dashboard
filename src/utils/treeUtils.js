/**
 * Finds the ancestors of a node in a recursive tree structure.
 * @param {Array} nodes - The tree data (e.g., from data.json)
 * @param {string} targetId - The ID of the node to find the path for
 * @returns {Array|null} Array of ancestor nodes including the target, or null if not found
 */
export const findPath = (nodes, targetId) => {
  for (const node of nodes) {
    if (node.id === targetId) {
      return [node];
    }
    if (node.children) {
      const path = findPath(node.children, targetId);
      if (path) {
        return [node, ...path];
      }
    }
  }
  return null;
};
