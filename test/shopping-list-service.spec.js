const shoppingService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping List service object`, () => {
    let db
    let testItems = [
        {   
            id: 1,
            name: 'cheese wiz',
            price: '12.99',
            checked: true,
            category: 'Main',
            date_added: new Date(`2019-07-16T10:36:55.199Z`)
        },
        {
            id: 2,
            name: 'wanda',
            price: '23.20',
            checked: false,
            category: 'Lunch',
            date_added: new Date(`2019-07-16T10:36:55.199Z`)
        }
    ]
    //create connection to db
    before(() => {
        db= knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    }) 
    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())
    after(() => {
        db.destroy()
    })

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .insert(testItems)
                .into('shopping_list')
        })
        it(`getAllItems() return all shopping list items from shopping_list table`, () => {
            return shoppingService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testItems)
                })
        })
        it(`getItemById() returns specific item`, () => {
            const secondId = 2
            const secondItem = testItems[secondId - 1]
            return shoppingService.getItemById(db, secondId)
                .then(actual => {
                    expect(actual).to.eql(secondItem)
                })
        })
        it(`updateItem() updates item with matching id`, () => {
            const secondId  = 2
            const newListData = {
                name: 'fish',
                price: '3.50'
            }
            return shoppingService.updateItem(db, secondId, newListData)
                .then(() => shoppingService.getItemById(db, secondId))
                .then(actual => {
                    expect(actual).to.eql({
                        id: secondId,
                        ...newListData})
                })
        })
        it(`deleteItem() deletes item with matching id`, () => {
            const secondId  = 2
            const expectedItems = testItems.filter(item => item.id !== secondId)
            return shoppingService.deleteItem(db, secondId)
                .then(() => shoppingService.getAllItems(db))
                .then(actual => {
                    expect(actual).to.eql(expectedItems)
                })
        })
    })
    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllItems() returns an empty array`, () => {
            return shoppingService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })
        it(`insertItem() inserts a new item`, () => {
            const newItem = {
                id: 1,
                name: 'item new',
                price: '9.80',
                checked: true,
                category: 'Snack',
                date_added: new Date('2020-01-01T00:00:00.000Z'),
            }
            return shoppingService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql(newItem)
                })
        })
    })
})
