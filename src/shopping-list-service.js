const shoppingService = {
    getAllItems(knex) {
        return knex.select('*').from('shopping_list')
    },
    getItemById(knex, id) {
        return knex
            .select('*')
            .from('shopping_list')
            .where('id', id)
            .first()
    },
    deleteItem(knex, id) {
        return knex
            .from('shopping_list')
            .where('id', id)
            .delete()
    },
    updateItem(knex, id, newItem) {
        return knex
            .where('id', id)
            .update(newItem)
        
    },
    insertItem(knex, item) {
        return knex
            .insert(item)
            .into('shopping_list')
            .returning('*')
            .then(rows => rows[0])
    }
}

module.exports = shoppingService