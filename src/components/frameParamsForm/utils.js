export const filterDataByType = (type, data, config) => {
  return data
    .filter((item) => item.type === type)
    .map((item) =>
      item.material
        ? { ...item, materialName: addMaterialName(item.material, config) }
        : { ...item }
    );
};

const addMaterialName = (material, config = []) => {
  return (
    config.filter((item) => item.type === 'material').find((item) => item.key === material).name ||
    'Материал не определен'
  );
};

export const calcSquare = (width, length) => {
  return width && length ? (width * length).toFixed(2) : 0;
};

export const calcCell = (width, length, pipeObj, frameObj) => {
  let cellWidth = 0;
  let cellLength = 0;
  if (width && length && pipeObj && frameObj) {
    const { width: pipeWidth } = pipeObj;
    const { step: frameStep } = frameObj;
    const calcCellSize = (size) => {
      const qtyCell = Math.ceil(size / frameStep);
      return ((size - ((qtyCell + 1) * pipeWidth) / 1000) / qtyCell).toFixed(2);
    };
    cellWidth = calcCellSize(width);
    cellLength = calcCellSize(length);
  }
  return { cellWidth, cellLength };
};

export const calcListQty = (square, width) => {
  if (square && width) {
    return Math.ceil(square / width);
  }
};

export const calcPipeQty = (square, material, config) => {
  const fixParams = config.find((item) => item.type === 'fix' && item.key === material);
  if (square && fixParams?.value) {
    return Math.ceil(square * fixParams?.value);
  }
};

export const calcFixQty = (square, material, config) => {
  const fixParams = config.find((item) => item.type === 'fix' && item.key === material);
  if (square && fixParams?.value) {
    return Math.ceil(square * fixParams?.value);
  }
};

export const calcTotalAmount = (materials) => {
  const totalAmount = materials.reduce((amount, material) => amount + +material.amount, 0);
  return totalAmount.toFixed(2);
};