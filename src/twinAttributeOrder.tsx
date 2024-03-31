// Code for sorting the twin attributes by the user preferences

// The "document" for ordering the twins different attributes
const preferredOrder: string[] = [
    'contact',
    'features',
    'manufacturer',
    'privacy',
    'favouriteGame',
    'dt-id',
    'baseurl',
    'description',
    'hosting-iri',
    'edit',
    'editJson',
    'age',
    'relations',
  ]
  
  const OrderAttributes = (originalArray: Array<[string, unknown]>) => {
    const twinKeys = originalArray.map((_) => _[0])
  
    // Seek all of the twin's attributes that are not included in user preferences and then add them to an array
    const extras = []
    for (let i = 0; i < twinKeys.length; i++) {
      if (!preferredOrder.includes(twinKeys[i])) {
        extras.push(originalArray[i])
      }
    }
  
    // Order all the twin attributes that are included in the user preferences
    const importantKeys = []
    for (let i = 0; i < preferredOrder.length; i++) {
      const index = twinKeys.indexOf(preferredOrder[i])
      if (index !== -1) {
        importantKeys.push(originalArray[index])
      }
    }
  
    // Concatenate the two arrays, first the ordered user preferenced attributes and then all of the remaining twin attributes
    // And filter out "name" , "description" and "dt-id"
    const reso = importantKeys
      .concat(extras)
      .filter(
        (item) =>
          item[0] != 'name' && item[0] != 'description' && item[0] != 'dt-id'
      )
  
    return reso
  }
  
  export default OrderAttributes
  