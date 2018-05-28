const formatRoute = (title, id) => {
  let str = title.replace(/[\/\\^$*+?.():|[\]{},']/gi, '').replace(/ /gi, '-').toLowerCase();
  return `${str}-${id}`;
}

export default formatRoute;