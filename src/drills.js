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

findPage(23)