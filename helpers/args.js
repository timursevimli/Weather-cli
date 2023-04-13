const getArgs = (args) => {

  const res = {};
  const [...params] = args.splice(2);

  params.forEach((value, index, array) => {
    if (value.charAt(0) !== '-') return;
    if (index === array.length - 1) {
      res[value.substring(1)] = true;
    } else if (array[index + 1] !== '-') {
      res[value.substring(1)] = array[index + 1];
    } else {
      res[value.substring(1)] = true;
    }
  });
  return res;
};

export { getArgs };
