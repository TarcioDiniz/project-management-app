const StringAvatar = (name: string | undefined): { children: string } => {
  if (!name) {
    return {
      children: 'NA',
    };
  }

  const words = name.split(' ');
  const initials = words.length > 1
    ? (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
    : words[0].charAt(0).toUpperCase();

  return {
    children: initials,
  };
};

export default StringAvatar;
