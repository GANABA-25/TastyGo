export const getInitials = (fullName?: string) => {
  if (!fullName) return "";

  const names = fullName.trim().split(/\s+/);

  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};
