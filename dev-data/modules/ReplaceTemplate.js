const module.exports = (temp, product) => {
  let outPut = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  outPut = outPut.replace(/{%IMAGE%}/g, product.image);
  outPut = outPut.replace(/{%QUANTITY%}/g, product.quantity);
  outPut = outPut.replace(/{%PRICE%}/g, product.price);
  outPut = outPut.replace(/{%NUTROTION%}/g, product.nutrients);
  outPut = outPut.replace(/{%FROM%}/g, product.from);
  outPut = outPut.replace(/{%DESCRIPITION%}/g, product.description);
  outPut = outPut.replace(/{%ID%}/g, product.id);
  if (!product.organic)
    outPut = outPut.replace(/{%NOT_ORGANIC%}/g, "not_organic");
  return outPut;
};
