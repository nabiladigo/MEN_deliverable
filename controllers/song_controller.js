create( data, callBack ) {
    if (!data) return console.log("missing data in first argument");

    if (typeof callBack !== "function") {
      return console.log("missing function in second argument");
    }

    let error, newItem;

    const isEmpty = Object.keys(data).every(field => data[field] === "");

    if (isEmpty) {
      error = { message: `you have empty fields` };
    } else {
      
      newItem = new this.#Model( data, this.#generateId());

      this.#items[newItem.id] = newItem;
    }

    return callBack(error, newItem);
  }