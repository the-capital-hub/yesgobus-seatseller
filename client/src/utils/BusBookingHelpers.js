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
