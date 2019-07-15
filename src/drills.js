const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: 'postgresql://dunder-mifflin@localhost/knex-practice'
})

function search(searchTerm) {
    knexInstance
        .from('shopping_list')
        .select('*')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(res => console.log(res))
}

function findPage(pageNumber) {
    const itemsPerPage = 6
    const offset = (pageNumber - 1) * itemsPerPage
    knexInstance
        .from('shopping_list')
        .select('*')
        .offset(offset)
        .limit(itemsPerPage)
        .then(res => console.log(res))
}

function getItemsAfterDate(daysAgo) {
    knexInstance
        .from('shopping_list')
        .select('*')
        .where('date_added', '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(res => console.log(res))
}

function totalCost() {
    knexInstance
        .from('shopping_list')
        .select('category')
        .groupBy('category')
        .sum('price as total')
        .then(res => console.log(res))
}

totalCost()