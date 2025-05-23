export const filterByRole = (items, userRoles = []) => {
    return items.filter((item) => {
      return !item.roles || item.roles.some((role) => userRoles.includes(role));
    });
  };