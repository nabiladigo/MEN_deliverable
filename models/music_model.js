class Collection {
    #Model
    #currentId
    #items
    constructor(model, startingData) {
        this.#Model = model;
        this.#currentId = 0;
        this.#items = this.#populateItems( startingData );
    }

    /**
     * @description It will take an array as a argument 
     * @returns on Object that contains the { id as a key } and { te item as the value } 
     */

    #populateItems( startingData ) {
        return startingData.reduce(( acc, item, idx ) => {
            this.#currentId = idx;
            acc[this.#currentId] = new this.#Model(item, idx)
            return acc;
        }, {});
    }

    #generateId(){
        return ++this.#currentId
    }

    /**
     * @description Will return an array with all items availible in this.items
     * @returns array
     */

    find() {
        return Object.values(this.#items);
    }

    /**
     * @description Will return item match with the itemId
     * @param { string } itemId
     * @param { function } callBack Will return error or item
     * @returns function;
     */

    findById( itemId, callBack ) {
        if (!itemId) return console.log("missing id in first argument");
    
        if (typeof callBack !== "function") {
            return console.log("missing function in second argument");
        }
    
        let error;
        const item = this.#items[itemId];
    
        if (!item) {
            error = { message: `item with id "${itemId}" can't be found` };
        }
    
        return callBack(error, item);
    }

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
    
    findByIdAndDelete( itemId, callBack ) {
        let error = null;
        const item = this.#items[itemId]
        const isDeleted = delete this.#items[itemId];
    
        if ( !isDeleted ) {
          error = { message: `item with id "${itemId}" can't be found` };
        }
    
        return callBack(error, item);
     }
     findByIdAndUpdate( itemId, data, callBack ) {
        let error = null;
        const item = this.#items[itemId];
    
        if (!item) {
            error = { message: `item can't be found` };
        } else {
            this.#items[itemId] = {
                ...item,
                ...data
            }
        }
    
        return callBack(error, this.#items[itemId]);
    }
};

class Song {
    constructor( data, id ) {
        this.id = id;
        this.song = data.song;
        this.image = data.image;
        this.singer = data.singer;
        this.date= data.date;
    }
}

module.exports = new Collection(Song, [
    {
        song:"Hello",
        singer:"Beyonce",
        image: "https://upload.wikimedia.org/wikipedia/en/a/ac/Beyonce_-_Halo.png",
        date: "2014"
    },
    {
        song:"Bad Habits",
        singer:"Ed Sheeran",
        image: "https://img.youtube.com/vi/orJSJGHjBLI/hqdefault.jpg",
        date: "2021"
    },
    {
        song:"J'en ai marre",
        singer:"Najat Aatabou-نجاة اعتابو",
        image: "https://static.infofamouspeople.com/avatar/bn3fp1r2a2a8t90v86t0_faces_aatabou-najat-image.jpg",
        date: "2021"
    },
    {
        song:"Twinkle Little Star",
        singer:"Baby Lullabies",
        image: "https://i.ytimg.com/vi/-JRJibhgwUQ/maxresdefault.jpg",
        date: "2021"
    }

]);