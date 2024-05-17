const StringAvatar = (name: string | undefined): { children: string } => {
  if (!name) {
    return {
      children: 'NA',
    };
  }

  const initials = name
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase())
    .join('');

  return {
    children: initials,
  };
};

export default StringAvatar;