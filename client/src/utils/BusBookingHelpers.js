// Sort Partners -- Add VRL Travels to top
export function sortPartners(partnersList) {
  const sortKey = "VRL Travels";

  let sortedPartners = [...partnersList];
  let vrlIndex = sortedPartners?.indexOf(sortKey);
  //   console.log("VRL Index", vrlIndex);
  if (vrlIndex !== -1) {
    sortedPartners.splice(vrlIndex, 1);
    sortedPartners.unshift(sortKey);
    // console.log("VRL index present - sorted points", sortedPartners);
    return sortedPartners;
  } else {
    // console.log("VRL index not present - sorted points", sortedPartners);
    return sortedPartners;
  }
}

// Sort Buses
export function sortBuses(busList, sortData) {
  if (!sortData) return busList;

  let { ascending, sortBy } = sortData;
  let sortKey;
  switch (sortBy) {
    case "price":
      sortKey = { srs: "show_fare_screen", vrl: "lowestPrice" };
      break;

    default:
      break;
  }

  let copy = [...busList];

  copy.sort((a, b) => {
    let typeOfA = a.type;
    let typeOfB = b.type;

    if (a[sortKey[typeOfA]] < b[sortBy[typeOfB]]) {
      return -1;
    }

    if (a[sortKey[typeOfA]] > b[sortBy[typeOfB]]) {
      return 1;
    }

    return 0;
  });

  if (!ascending) {
    return copy.reverse();
  }

  return copy;
}
